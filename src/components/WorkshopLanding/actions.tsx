'use server'

import { createHash } from 'node:crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Resend } from 'resend'
import type { CreateEmailOptions } from 'resend'

import { WorkshopNotificationEmail } from '@/emails/workshop-notification'
import { WorkshopReplyEmail } from '@/emails/workshop-reply'

export type WorkshopLead = {
  name: string
  whatsapp: string
  company: string
  email: string
  need: string
  spend: string
  consent: boolean
}

const FROM = 'Toggle Solutions <hello@toggle.solutions>'
const INBOX = 'hello@toggle.solutions'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// One message for every server-side failure — never tell a visitor which part broke,
// always give them a way to reach us anyway.
const SEND_FAILED =
  "We couldn't submit that. Please WhatsApp us at +60 12-568 8681 and we'll pick it up right away."

export async function sendWorkshopLead(lead: WorkshopLead) {
  const name = lead.name?.trim() ?? ''
  const company = lead.company?.trim() ?? ''
  const email = lead.email?.trim() ?? ''
  const whatsapp = lead.whatsapp?.trim() ?? ''

  if (
    !name ||
    !company ||
    !EMAIL_RE.test(email) ||
    whatsapp.replace(/\D/g, '').length < 9 ||
    !lead.consent
  ) {
    return { success: false, error: 'Please check your details and try again.' }
  }

  const need = lead.need || 'Not specified'
  const spend = lead.spend || 'Not specified'

  // Store first, email second: the database is the record of the lead, email is only
  // the notification. If this write fails there's nothing to notify anyone about.
  const payload = await getPayload({ config: configPromise })
  let leadId: string | number
  try {
    const doc = await payload.create({
      collection: 'workshop-leads',
      data: { name, company, email, whatsapp, need, spend, consent: true, emailed: false },
    })
    leadId = doc.id
  } catch (err) {
    console.error('[workshop-lead] failed to store lead:', err)
    return { success: false, error: SEND_FAILED }
  }

  // ponytail: constructed per-call — a module-level Resend throws on a missing key,
  // which crashes the import and takes the whole form down.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Deploy misconfiguration, not a visitor mistake. The lead is safe in the database,
    // so the visitor gets a success — we just have to notice the log.
    console.error(`[workshop-lead] RESEND_API_KEY is not set — lead ${leadId} stored but unemailed`)
    return { success: true }
  }
  const resend = new Resend(apiKey)
  const isDev = process.env.NODE_ENV === 'development'
  // In dev the auto-reply goes to our own inbox instead of whatever address was typed —
  // real mail we can actually look at, and never a stranger (or a bouncing test address).
  const adminTo = INBOX
  const customerTo = isDev ? INBOX : email

  // Keyed on the submission's contents, not the clock: a double-click or a Next.js
  // action retry dedupes inside Resend's 24h window, while a genuine resubmission
  // with different answers hashes differently and sends (no 409 conflict).
  const submission = createHash('sha256')
    .update(JSON.stringify([name, company, email, whatsapp, need, spend]))
    .digest('hex')
    .slice(0, 16)

  const adminSent = await send(
    resend,
    {
      from: FROM,
      to: adminTo,
      replyTo: email,
      subject: `New workshop lead: ${name} (${company})`,
      react: (
        <WorkshopNotificationEmail
          name={name}
          company={company}
          email={email}
          whatsapp={whatsapp}
          need={need}
          spend={spend}
        />
      ),
    },
    `workshop-lead/${submission}`,
  )

  // The lead is already stored, so a failed notification is our problem, not the
  // visitor's — leave `emailed` unticked and let the admin list surface it.
  if (adminSent) {
    await payload
      .update({ collection: 'workshop-leads', id: leadId, data: { emailed: true } })
      .catch((err) => console.error(`[workshop-lead] could not flag ${leadId} as emailed:`, err))
  }

  // ponytail: auto-reply failure doesn't fail the submission — we already have the lead.
  await send(
    resend,
    {
      from: FROM,
      to: customerTo,
      replyTo: INBOX,
      subject: 'Got it — your teardown request is in',
      react: <WorkshopReplyEmail name={name.split(' ')[0] || name} need={need} />,
    },
    `workshop-reply/${submission}`,
  )

  return { success: true }
}

// The Resend SDK returns { data, error } rather than throwing, and only rate limits
// and server errors are worth retrying — validation and idempotency conflicts never are.
const RETRYABLE = new Set(['rate_limit_exceeded', 'api_error', 'concurrent_idempotent_requests'])

async function send(
  resend: Resend,
  payload: CreateEmailOptions,
  idempotencyKey: string,
  maxRetries = 2,
): Promise<boolean> {
  for (let attempt = 0; ; attempt++) {
    try {
      const { error } = await resend.emails.send(payload, { idempotencyKey })
      if (!error) return true

      if (!RETRYABLE.has(error.name) || attempt === maxRetries) {
        console.error(`[workshop-lead] ${idempotencyKey} failed (${error.name}): ${error.message}`)
        return false
      }
      console.warn(`[workshop-lead] ${idempotencyKey} ${error.name}, retry ${attempt + 1}`)
    } catch (err) {
      // Network/render failure — the SDK only returns errors for API responses.
      if (attempt === maxRetries) {
        console.error(`[workshop-lead] ${idempotencyKey} threw:`, err)
        return false
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000))
  }
}

/**
 * Seeds Organizations (plus the Modules and Case Studies they depend on) from
 * src/scripts/data/workshop-organizations.json.
 *
 * Safe to run against production:
 *   - Idempotent upsert by natural key: org.slug, module.title, and case studies
 *     by name + context + description. Re-running updates in place rather than
 *     creating duplicates.
 *   - Never deletes. Docs not present in the JSON are left untouched.
 *   - Writes nothing unless --confirm is passed.
 *
 *   npm run seed:orgs              # dry run, prints the plan
 *   npm run seed:orgs -- --confirm # actually writes
 *
 * Target database is whatever DATABASE_URL points at, so for production run it
 * with that env var set to the production connection string.
 */
import 'dotenv/config'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '../payload.config'
import type { LUCIDE_ICON_OPTIONS } from '../collections/Modules'

type Icon = (typeof LUCIDE_ICON_OPTIONS)[number]

type SourceOrg = {
  slug: string
  name: string
  sector: string
  headline: string
  situation: string
  pathway: { code: string; name: string; shape: string; why: string }
  pillars: { title: string; body: string }[]
  modules: { id: string; name: string; track: string; focus: boolean; why: string }[]
  outcomes: string[]
  proof: { label: string; body: string }
}

/**
 * Canonical copy per module id. The Modules collection is shared across
 * organizations, so the org-specific "why" lines in the source JSON cannot be
 * stored on it — one description per module is the schema's shape.
 */
const MODULE_COPY: Record<string, { title: string; description: string; icon: Icon }> = {
  'AI-1': {
    title: 'AI Basics',
    description:
      'The shared starting point — what these tools actually do, what they cost, and which ones are worth paying for before anyone signs up.',
    icon: 'Rocket',
  },
  'AI-2': {
    title: 'AI Literacy',
    description:
      'Judge AI output quickly: what to trust, what to check, and where a claim still needs a human eye.',
    icon: 'ShieldCheck',
  },
  'AI-3': {
    title: 'Prompting and Tools',
    description:
      'The practical skill that makes every later module faster, built into prompt libraries that hold your voice and survive the person who wrote them.',
    icon: 'Puzzle',
  },
  'AI-5': {
    title: 'Agentic AI and Claude Code',
    description:
      'Hand whole tasks to an agent — the repeat reporting, admin and production work your team currently does by hand every week.',
    icon: 'Code',
  },
  'AI-7': {
    title: 'AI on a Budget',
    description:
      'A working AI stack for a small monthly cost, sized to your business rather than an enterprise, without subscriptions piling up.',
    icon: 'ShoppingCart',
  },
  'MK-1': {
    title: 'Marketing Foundation',
    description:
      'Get your audience, offer and positioning written down, so it reads as a brand rather than a feed.',
    icon: 'Layers',
  },
  'MK-2': {
    title: 'Performance Basics',
    description: 'How paid channels actually work from the inside, before you commit budget.',
    icon: 'TrendingUp',
  },
  'MK-3': {
    title: 'Content and Organic',
    description:
      'Turn the work you already do into steady content, with a plan that holds across every platform you post on.',
    icon: 'Megaphone',
  },
  'MK-4': {
    title: 'Data and Measurement',
    description:
      'Count enquiries, leads and conversions in a way you trust, and know which channel earns you money.',
    icon: 'BarChart',
  },
  'AX-1': {
    title: 'AI in Marketing',
    description:
      'Map your own funnel and find where AI saves the most hours — and where it should stay out.',
    icon: 'Brain',
  },
  'AX-2': {
    title: 'AI Content and Copy',
    description:
      'Turn one brief into finished captions, offers and long-form copy across languages and audiences, in a single sitting.',
    icon: 'Lightbulb',
  },
  'AX-3': {
    title: 'AI Creative and Visuals',
    description:
      'Get more finished assets out of every shoot — vertical cuts, thumbnails and alternate hooks at volume.',
    icon: 'Zap',
  },
  'AX-4': {
    title: 'AI Ads and Performance',
    description:
      'Campaign structure, budgets and testing rules that put spend where it converts and cut what does not.',
    icon: 'Target',
  },
  'AX-5': {
    title: 'AI SEO and Discovery',
    description:
      'Hold and grow discovery as search shifts toward AI-generated answers, and win the moment people compare.',
    icon: 'Compass',
  },
  'AX-6': {
    title: 'AI Data and Reporting',
    description:
      'Turn platform and ad data into a weekly read anyone can act on, without a manual rebuild every Monday.',
    icon: 'BarChart',
  },
  'AX-7': {
    title: 'AI CRM and Conversations',
    description:
      'Reply to enquiries faster and follow up on every one — usually where the quickest wins sit.',
    icon: 'Users',
  },
  'AX-8': {
    title: 'Build Your Workflow',
    description:
      'The closing module: the weekend becomes a written workflow, so the next hire ships in week one instead of week five.',
    icon: 'Workflow',
  },
  'AX-9': {
    title: 'AI Dashboards, Sites and Reports',
    description:
      'Dashboards your team ships without raising a ticket, so spend and results are visible the day they move.',
    icon: 'Layers',
  },
}

/** Pulls "6x ROAS" / "47% CPL" style figures out of the proof copy for the stats array. */
function extractStats(body: string): { number: number; text: string }[] {
  const matches = [...body.matchAll(/(\d[\d,]*(?:\.\d+)?)\s?(x|%)\b[^.]*/gi)]
  const stats = matches.slice(0, 3).map((m) => ({
    number: parseFloat(m[1].replace(/,/g, '')),
    text: m[0].trim().replace(/^,\s*/, ''),
  }))
  return stats.length > 0 ? stats : [{ number: 0, text: body.split('.')[0] }]
}

const DATA_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'data',
  'workshop-organizations.json',
)

async function seed() {
  const confirm = process.argv.includes('--confirm')
  const orgs: SourceOrg[] = JSON.parse(readFileSync(DATA_PATH, 'utf8'))

  // Fail before touching the DB if the data references a module we have no copy for.
  const missing = [...new Set(orgs.flatMap((o) => o.modules.map((m) => m.id)))].filter(
    (id) => !MODULE_COPY[id],
  )
  if (missing.length > 0) {
    throw new Error(`No MODULE_COPY entry for module id(s): ${missing.join(', ')}`)
  }

  // Identity of a proof is its label AND its body: two orgs can share a label
  // ("EduKids, e-commerce and education") while carrying different write-ups.
  const proofKey = (p: SourceOrg['proof']) => `${p.label}\n${p.body}`
  const proofs = new Map<string, SourceOrg['proof']>()
  for (const org of orgs) proofs.set(proofKey(org.proof), org.proof)

  const dbHost = process.env.DATABASE_URL?.match(/@([^/?]+)/)?.[1] ?? 'unknown host'
  console.log(`Target database: ${dbHost}`)
  console.log(
    `Plan: upsert ${Object.keys(MODULE_COPY).length} modules, ${proofs.size} case studies, ${orgs.length} organizations.`,
  )

  if (!confirm) {
    console.log('\nDry run — nothing written. Re-run with --confirm to apply.')
    process.exit(0)
  }

  const payload = await getPayload({ config })

  /** Find-by-natural-key, then update or create. Never deletes. */
  async function upsert(
    collection: 'modules' | 'case-studies' | 'organizations',
    where: Where,
    data: Record<string, unknown>,
  ): Promise<number> {
    const { docs } = await payload.find({ collection, where, limit: 1, pagination: false })
    if (docs[0]) {
      const updated = (await payload.update({
        collection,
        id: docs[0].id,
        data,
      } as never)) as unknown as { id: number }
      return updated.id
    }
    const created = (await payload.create({ collection, data } as never)) as { id: number }
    return created.id
  }

  const moduleIds: Record<string, number> = {}
  for (const [id, copy] of Object.entries(MODULE_COPY)) {
    moduleIds[id] = await upsert('modules', { title: { equals: copy.title } }, { ...copy })
  }
  console.log(`Upserted ${Object.keys(moduleIds).length} modules`)

  const caseStudyIds: Record<string, number> = {}
  let csOrder = 0
  for (const [key, proof] of proofs) {
    const [rawName, ...contextParts] = proof.label.split(',')
    const name = rawName.trim()
    const context = contextParts.join(',').trim() || 'Case study'
    // Match on all three fields. name alone collapses distinct proofs ("Kith and
    // Kin" appears 3x with different angles); name+context still collapses the
    // two EduKids / UNITAR pairs that share a label but not a body. Trade-off:
    // editing a description in the admin makes the next run create a new doc
    // rather than update that one.
    caseStudyIds[key] = await upsert(
      'case-studies',
      {
        and: [
          { name: { equals: name } },
          { context: { equals: context } },
          { description: { equals: proof.body } },
        ],
      },
      {
        name,
        context,
        stats: extractStats(proof.body),
        description: proof.body,
        order: csOrder++,
      },
    )
  }
  console.log(`Upserted ${Object.keys(caseStudyIds).length} case studies`)

  let orgOrder = 0
  for (const org of orgs) {
    await upsert(
      'organizations',
      { slug: { equals: org.slug } },
      {
        slug: org.slug,
        name: org.name,
        sector: org.sector,
        headline: org.headline,
        situation: org.situation,
        pathway: org.pathway,
        pillars: org.pillars,
        modules: org.modules.map((m) => moduleIds[m.id]),
        outcomes: org.outcomes.map((outcome) => ({ outcome })),
        proof: caseStudyIds[proofKey(org.proof)],
        order: orgOrder++,
      },
    )
  }
  console.log(`Upserted ${orgs.length} organizations`)

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

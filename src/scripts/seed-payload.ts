/**
 * Seed script — populates CaseStudies, FAQ, Team, and Topics with placeholder data.
 * Clears each collection first. Run with: npm run seed
 *
 * Content below is a placeholder scaffold, not real copy — replace with actual
 * case studies / FAQs / team bios / topics before seeding preview or production.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const caseStudies = [
  {
    name: 'Placeholder Client A',
    context: 'E-commerce · MY',
    stats: [{ number: 6, text: 'x ROAS on TikTok' }],
    description: 'Replace with a real case study description.',
    order: 0,
  },
]

const faq = [
  {
    question: 'Placeholder question?',
    answer: 'Replace with a real answer.',
    order: 0,
  },
]

const team = [
  {
    name: 'Placeholder Name',
    role: 'Head of Growth · 8 yrs',
    description: 'Replace with a real bio.',
    order: 0,
  },
]

const topics = [
  {
    title: 'Placeholder Topic',
    description: 'Replace with a real description.',
    order: 0,
  },
]

async function seed() {
  const payload = await getPayload({ config })

  for (const [slug, docs] of [
    ['case-studies', caseStudies],
    ['faq', faq],
    ['team', team],
    ['topics', topics],
  ] as const) {
    const { docs: existing } = await payload.find({ collection: slug, limit: 0, pagination: false })
    for (const doc of existing) {
      await payload.delete({ collection: slug, id: doc.id })
    }
    for (const data of docs) {
      await payload.create({ collection: slug, data })
    }
    console.log(`Seeded ${docs.length} ${slug} doc(s)`)
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

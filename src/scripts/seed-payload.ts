/**
 * Seed script — populates FAQ and Organizations with placeholder data.
 * Clears each collection first. Run with: npm run seed
 *
 * Content below is a placeholder scaffold, not real copy — replace with actual
 * FAQs / organization pathways before seeding preview or production.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const faq = [
  {
    question: 'Placeholder question?',
    answer: 'Replace with a real answer.',
    order: 0,
  },
]

const caseStudies = [
  {
    name: 'Placeholder Case Study',
    context: 'Placeholder · MY',
    stats: [{ number: 1, text: 'Replace with a real stat.' }],
    description: 'Replace with a real case study description.',
    order: 0,
  },
]

const modules = [
  {
    title: 'Placeholder Module',
    description: 'Replace with a real module description.',
    icon: 'Rocket' as const,
  },
]

function organizations(caseStudyId: number, moduleIds: number[]) {
  return [
    {
      slug: 'placeholder-org',
      name: 'Placeholder Org',
      sector: 'Placeholder sector',
      headline: 'Replace with a real headline.',
      situation: 'Replace with a real situation description.',
      pathway: {
        code: 'P?',
        name: 'Replace with a real pathway name',
        shape: 'Replace with a real pathway shape.',
        why: 'Replace with why this pathway fits.',
      },
      pillars: [{ title: 'Placeholder pillar', body: 'Replace with real pillar copy.' }],
      modules: moduleIds,
      outcomes: [{ outcome: 'Replace with a real outcome.' }],
      proof: caseStudyId,
      order: 0,
    },
  ]
}

async function seed() {
  const payload = await getPayload({ config })

  for (const slug of ['faq', 'case-studies', 'modules', 'organizations'] as const) {
    const { docs: existing } = await payload.find({ collection: slug, limit: 0, pagination: false })
    for (const doc of existing) {
      await payload.delete({ collection: slug, id: doc.id })
    }
  }

  const createdFaq = await Promise.all(faq.map((data) => payload.create({ collection: 'faq', data })))
  console.log(`Seeded ${createdFaq.length} faq doc(s)`)

  const createdCaseStudies = await Promise.all(
    caseStudies.map((data) => payload.create({ collection: 'case-studies', data })),
  )
  console.log(`Seeded ${createdCaseStudies.length} case-studies doc(s)`)

  const createdModules = await Promise.all(
    modules.map((data) => payload.create({ collection: 'modules', data })),
  )
  console.log(`Seeded ${createdModules.length} modules doc(s)`)

  const orgDocs = organizations(
    createdCaseStudies[0].id,
    createdModules.map((m) => m.id),
  )
  await Promise.all(orgDocs.map((data) => payload.create({ collection: 'organizations', data })))
  console.log(`Seeded ${orgDocs.length} organizations doc(s)`)

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

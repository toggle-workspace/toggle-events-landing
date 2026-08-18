const text = (value: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

const heading = (tag: 'h1' | 'h2', value: string) => ({
  type: 'heading',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

const paragraph = (value: string) => ({
  type: 'paragraph',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const richText = (...children: ReturnType<typeof heading | typeof paragraph>[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const defaultHeroRichText = richText(
  heading('h1', 'We build software that ships'),
  paragraph(
    'Toggle Solutions partners with founders and teams to design, build, and support products that actually reach customers.',
  ),
)

export const defaultServicesRichText = [
  richText(
    heading('h2', 'Product Engineering'),
    paragraph('End-to-end web and mobile builds, from prototype to production.'),
  ),
  richText(
    heading('h2', 'Platform Integrations'),
    paragraph('CMS, payments, and third-party APIs wired up right the first time.'),
  ),
  richText(
    heading('h2', 'Ongoing Support'),
    paragraph('Maintenance, monitoring, and iteration after launch.'),
  ),
]

export const defaultAboutRichText = richText(
  heading('h2', 'About'),
  paragraph(
    "We're a small, senior team that cares about shipping working software, not over-engineered demos. Every project gets direct access to the people building it.",
  ),
  paragraph('"Toggle Solutions shipped our platform faster than we thought possible." — A. Rahman'),
  paragraph('"Clear communication and solid engineering from start to finish." — S. Lim'),
)

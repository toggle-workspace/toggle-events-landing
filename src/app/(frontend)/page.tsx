import type { Metadata } from 'next'

import { WorkshopLanding } from '@/components/WorkshopLanding'

export const metadata: Metadata = {
  title: 'Toggle × TikTok Workshop — Landing Page Prototype',
}

// Page content comes from Payload, so it must be read at request time. Without
// this the route is prerendered at build time and CMS edits never show up.
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <article className="pb-24">
      <WorkshopLanding />
    </article>
  )
}

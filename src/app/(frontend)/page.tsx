import type { Metadata } from 'next'

import { WorkshopLanding } from '@/components/WorkshopLanding'

export const metadata: Metadata = {
  title: 'Toggle × TikTok Workshop — Landing Page Prototype',
}

export default function Page() {
  return (
    <article className="pb-24">
      <WorkshopLanding />
    </article>
  )
}

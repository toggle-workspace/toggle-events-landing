import React from 'react'

import type { Home } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const Hero: React.FC<NonNullable<Home['hero']>> = ({ links, media, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {media && typeof media === 'object' && (
        <div className="mt-8">
          <Media imgClassName="w-full rounded" priority resource={media} />
        </div>
      )}
    </div>
  )
}

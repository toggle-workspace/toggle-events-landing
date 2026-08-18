import type { Field, GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { CallToAction } from '../blocks/CallToAction/config'
import { Content } from '../blocks/Content/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { revalidateHome } from './hooks/revalidateHome'
import {
  defaultAboutRichText,
  defaultHeroRichText,
  defaultServicesRichText,
} from './defaultContent'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const heroWithDefaults = {
  ...hero,
  fields: hero.fields.map((field) => {
    if ('name' in field && field.name === 'richText') {
      return { ...field, defaultValue: defaultHeroRichText }
    }
    if ('name' in field && field.name === 'links') {
      return {
        ...field,
        defaultValue: [
          {
            link: {
              url: 'mailto:hello@toggle.solutions',
              label: 'Get in touch',
              newTab: false,
              appearance: 'default',
            },
          },
        ],
      }
    }
    return field
  }) as Field[],
}

const defaultLayout = [
  {
    blockType: 'content' as const,
    columns: defaultServicesRichText.map((richText) => ({
      size: 'oneThird' as const,
      richText,
      enableLink: false,
    })),
  },
  {
    blockType: 'content' as const,
    columns: [
      {
        size: 'full' as const,
        richText: defaultAboutRichText,
        enableLink: false,
      },
    ],
  },
  {
    blockType: 'cta' as const,
    links: [
      {
        link: {
          url: 'mailto:hello@toggle.solutions',
          label: 'hello@toggle.solutions',
          newTab: false,
          appearance: 'outline',
        },
      },
    ],
  },
]

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Home',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [heroWithDefaults],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
              required: true,
              defaultValue: defaultLayout,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
}

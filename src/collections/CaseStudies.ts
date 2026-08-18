import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'context'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'context',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "E-commerce · MY"',
      },
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'number',
          type: 'number',
          required: true,
          admin: {
            description: 'e.g. 6 for "6x", or 47 for "−47%"',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "x ROAS on TikTok" or "% CPL"',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first',
      },
      defaultValue: 0,
    },
  ],
  defaultSort: 'order',
}

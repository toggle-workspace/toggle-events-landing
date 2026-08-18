import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Head of Growth · 8 yrs"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkedin',
      type: 'text',
      admin: {
        description: 'Full LinkedIn profile URL',
      },
    },
    {
      name: 'social',
      type: 'text',
      admin: {
        description: 'Any other social link (e.g. TikTok, X, Instagram)',
      },
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

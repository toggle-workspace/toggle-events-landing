import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  labels: {
    singular: 'Organization',
    plural: 'Organizations',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'order'],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used as the dropdown value and ?org= query param',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'sector',
      type: 'text',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'situation',
      type: 'textarea',
      required: true,
    },
    {
      name: 'pathway',
      type: 'group',
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'shape',
          type: 'text',
          required: true,
        },
        {
          name: 'why',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'modules',
      type: 'relationship',
      relationTo: 'modules',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'outcomes',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'outcome',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'proof',
      type: 'relationship',
      relationTo: 'case-studies',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Order in the dropdown',
      },
      defaultValue: 0,
    },
  ],
  defaultSort: 'order',
}

import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// ponytail: curated subset of lucide-react icons, add more names here as needed
export const LUCIDE_ICON_OPTIONS = [
  'Rocket',
  'Target',
  'Zap',
  'Users',
  'BarChart',
  'Brain',
  'Code',
  'Megaphone',
  'TrendingUp',
  'ShoppingCart',
  'Layers',
  'Compass',
  'Lightbulb',
  'Puzzle',
  'ShieldCheck',
  'Workflow',
] as const

export const Modules: CollectionConfig = {
  slug: 'modules',
  labels: {
    singular: 'Module',
    plural: 'Modules',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [...LUCIDE_ICON_OPTIONS],
      admin: {
        description: 'Lucide icon name shown with this module',
      },
    },
  ],
}

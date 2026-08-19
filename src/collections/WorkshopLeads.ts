import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

// Leads are written by the workshop form's server action through the Local API,
// which bypasses access control — so nothing here needs to be public.
export const WorkshopLeads: CollectionConfig = {
  slug: 'workshop-leads',
  labels: {
    singular: 'Workshop Lead',
    plural: 'Workshop Leads',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'email', 'need', 'emailed', 'createdAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'whatsapp', type: 'text', required: true },
    { name: 'need', type: 'text' },
    { name: 'spend', type: 'text' },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      admin: { description: 'Agreed to be contacted (PDPA)' },
    },
    {
      name: 'emailed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Notification email reached Resend. Unticked = follow up manually.',
      },
    },
  ],
  defaultSort: '-createdAt',
}

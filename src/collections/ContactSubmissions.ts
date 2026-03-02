import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'email', 'company', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true, // Public can submit
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'First Name',
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Last Name',
        },
      ],
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { readOnly: true, description: 'Captured automatically' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.headers) {
          data.ipAddress =
            req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
        }
        return data
      },
    ],
  },
}

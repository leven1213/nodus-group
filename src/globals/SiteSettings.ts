import type { GlobalConfig } from 'payload'

export const Globals: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'Nodus Group',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '03 9999 7418',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'admin@nodusgroup.com.au',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text', defaultValue: '1/439 Canterbury Road' },
        { name: 'line2', type: 'text', defaultValue: 'Surrey Hills, VIC 3127' },
      ],
    },
    {
      name: 'abn',
      type: 'text',
      defaultValue: 'ABN 63 665 903 506',
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
      ],
    },
  ],
}

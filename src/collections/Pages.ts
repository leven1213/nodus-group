import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    // Homepage fields
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero Headline',
      admin: {
        condition: (data) => data.slug === 'home',
        description: 'Large headline on homepage (e.g. "Spaces built around how you work.")',
      },
    },
    {
      name: 'heroParagraph',
      type: 'textarea',
      label: 'Hero Paragraph',
      admin: {
        condition: (data) => data.slug === 'home',
      },
    },
    {
      name: 'secondaryHeadline',
      type: 'text',
      label: 'Secondary Headline',
      admin: {
        condition: (data) => data.slug === 'home',
      },
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Secondary Section Image',
      admin: {
        condition: (data) => data.slug === 'home',
      },
    },
    {
      name: 'secondaryParagraph',
      type: 'textarea',
      label: 'Secondary Section Paragraph',
      admin: {
        condition: (data) => data.slug === 'home',
      },
    },
    // About page fields
    {
      name: 'aboutHeadline',
      type: 'textarea',
      label: 'About Lead Statement',
      admin: {
        condition: (data) => data.slug === 'about',
        description: 'Large lead text (e.g. "From the first concept...")',
      },
    },
    {
      name: 'aboutImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.slug === 'about',
      },
    },
    {
      name: 'aboutBody',
      type: 'richText',
      label: 'About Body Content',
      admin: {
        condition: (data) => data.slug === 'about',
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

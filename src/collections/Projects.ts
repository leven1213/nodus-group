import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Name',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location / Suburb',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. "co-working-space")',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Project Description',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on Homepage',
      defaultValue: false,
    },
    {
      name: 'featuredOrder',
      type: 'number',
      label: 'Homepage Display Order',
      admin: {
        condition: (data) => data.featured,
      },
    },
    {
      name: 'completedYear',
      type: 'number',
      label: 'Year Completed',
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      label: 'Services Provided',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Construction', value: 'construction' },
        { label: 'Project Management', value: 'project-management' },
        { label: 'Fitout', value: 'fitout' },
      ],
    },
  ],
}

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Media } from './collections/Media'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Globals } from './globals/SiteSettings'

// Temporary debug — add before buildConfig
console.log('S3 CONFIG CHECK:', {
  accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID?.slice(0, 8),
  secretKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY?.slice(0, 8),
  bucket: process.env.SUPABASE_STORAGE_BUCKET,
  endpoint: process.env.SUPABASE_URL,
})

export default buildConfig({
  sharp,
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Nodus Admin',
    },
  },

  collections: [
    Pages,
    Projects,
    Media,
    ContactSubmissions,
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],

  globals: [Globals],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve('./src/payload-types.ts'),
  },

  // PostgreSQL via Supabase
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // Images stored in Supabase Storage (S3-compatible)
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) =>
            `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${filename}`,
        },
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
      config: {
        endpoint: `${process.env.SUPABASE_URL}/storage/v1/s3`,
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        region: 'ap-southeast-2',
        forcePathStyle: true,
      },
    }),
  ],

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB max upload
    },
  },
})

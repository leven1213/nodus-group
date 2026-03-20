import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import styles from './page.module.css'

import HeroEntrance from '@/components/HeroEntrance'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const payload = await getPayload({ config: await config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  const page = pages[0]

  const image = page?.aboutImage && typeof page.aboutImage === 'object' ? page.aboutImage : null

  return (
    <>
      <HeroEntrance />
      <div className="pageHeading">
        <div data-section className="grid">
          <h1 className="heroTitle">About</h1>
        </div>
      </div>

      <div className="divider" />

      <section data-section className="grid">
        <div className={styles.aboutInner}>
          <h2 className={styles.leadStatement}>
            {page?.aboutHeadline ||
              'Up to the final finish, Nodus is detail-obsessed about each project we take on.'}
          </h2>
          <div className={styles.bodyText}>
            {page?.aboutBody ? (
              // If you have rich text content from Payload
              <div dangerouslySetInnerHTML={{ __html: String(page.aboutBody) }} />
            ) : (
              <>
                <p>
                  Great workplaces don’t happen by accident. They’re the result of intentional
                  design and construction by a team that cares about the outcome.
                </p>
                <p>
                  We’re locals. We know Melbourne’s commercial landscape, and what it takes to
                  create spaces that work as hard as the people in them. So if you’re starting fresh
                  or reimagining an existing space, we’re here to make it happen.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right column — image */}
        <div className={styles.imageWrap}>
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || 'Nodus interior'}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
      </section>
    </>
  )
}

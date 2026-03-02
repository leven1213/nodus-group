import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import styles from './page.module.css'

export default async function AboutPage() {
  const payload = await getPayload({ config: await config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  const page = pages[0]

  const image =
    page?.aboutImage && typeof page.aboutImage === 'object'
      ? page.aboutImage
      : null

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>About</h1>

        <div className={styles.divider} />

        <div className={styles.content}>
          {/* Left column */}
          <div className={styles.left}>
            <p className={styles.leadStatement}>
              {page?.aboutHeadline ||
                "From the first concept to the final finish, we're hands-on and detail-obsessed about every project we take on."}
            </p>

            <div className={styles.bodyText}>
              {page?.aboutBody ? (
                // If you have rich text content from Payload
                <div dangerouslySetInnerHTML={{ __html: String(page.aboutBody) }} />
              ) : (
                <>
                  <p>
                    Great workplaces don&apos;t happen by accident. They&apos;re the result of
                    deliberate design, quality construction, and a team that actually cares about the
                    outcome. At Nodus, we bring all three to every fitout we deliver.
                  </p>
                  <p>
                    We&apos;re locals — we know Melbourne&apos;s commercial landscape, its
                    businesses, and what it takes to create spaces that work as hard as the people in
                    them. Whether you&apos;re starting fresh or reimagining an existing space,
                    we&apos;re here to make it happen.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right column — image */}
          <div className={styles.right}>
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
          </div>
        </div>
      </div>
    </div>
  )
}

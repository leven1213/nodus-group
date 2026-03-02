import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  // Fetch homepage content from Payload
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  const page = pages[0]

  // Fetch featured projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'featuredOrder',
    limit: 6,
  })

  // Fetch site settings
  const _siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <>
      {/* ── Hero ── */}
      <section className={`grid ${styles.hero}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            {page?.heroHeadline || 'Spaces built around how you work.'}
          </h1>
          <p className={styles.heroParagraph}>
            {page?.heroParagraph ||
              'Every office tells a story about the business inside it. Nodus Group designs and delivers fitouts built to perform from day one, and built to last.'}
          </p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── About intro ── */}
      <section className={`grid ${styles.about}`}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutLeft}>
            <h2 className={styles.aboutHeadline}>
              {page?.secondaryHeadline ||
                'Born from years of building, Nodus brings the same care and precision to every workplace.'}
            </h2>
          </div>

          <div className={styles.aboutRight}>
            {page?.secondaryImage &&
            typeof page.secondaryImage === 'object' &&
            page.secondaryImage.url ? (
              <div className={styles.aboutImageWrap}>
                <Image
                  src={page.secondaryImage.url}
                  alt={page.secondaryImage.alt || 'Nodus interior'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            ) : (
              <div className={styles.aboutImageWrap}>
                <div className={styles.imagePlaceholder} />
              </div>
            )}
            <p className={styles.aboutParagraph}>
              {page?.secondaryParagraph ||
                'Nodus specialises in office fitouts and commercial interiors designed to enhance performance, foster collaboration, and create workplaces your team is proud to call their own.'}
            </p>

            <Link href="/about" className="btn">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Featured Projects ── */}
      <section className={styles.projects}>
        <div className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>Featured Projects</h2>
          <Link href="/projects" className="btn">
            View All Projects
          </Link>
        </div>

        {projects.length > 0 ? (
          projects.map((project) => {
            const image = typeof project.coverImage === 'object' ? project.coverImage : null

            return (
              <div key={project.id} className={styles.featuredProject}>
                <div className={styles.featuredInfo}>
                  <h3 className={styles.featuredName}>{project.title}</h3>
                  <p className={styles.featuredLocation}>{project.location}</p>
                  <p className={styles.featuredDesc}>
                    {typeof project.description === 'string'
                      ? project.description
                      : 'Nodus specialises in office fitouts and commercial interiors designed to enhance performance and foster collaboration.'}
                  </p>
                </div>

                <div className={styles.featuredImageWrap}>
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                </div>
              </div>
            )
          })
        ) : (
          // Fallback when no projects added yet
          <div className={styles.featuredProject}>
            <div className={styles.featuredInfo}>
              <h3 className={styles.featuredName}>Co-Working Space</h3>
              <p className={styles.featuredLocation}>Collingwood</p>
              <p className={styles.featuredDesc}>
                Add your first project in the Payload admin panel to see it here.
              </p>
            </div>
            <div className={styles.featuredImageWrap}>
              <div className={styles.imagePlaceholder} />
            </div>
          </div>
        )}

        <div className={styles.projectNav}>
          <Link href="/projects" className="btn">
            View All Projects →
          </Link>
        </div>
      </section>
    </>
  )
}

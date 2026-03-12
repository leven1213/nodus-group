import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import HeroEntrance from '@/components/HeroEntrance'
import HeroCursorReveal from '@/components/HeroCursorReveal'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  const page = pages[0]

  const heroImageUrl =
    page?.heroImage && typeof page.heroImage === 'object' ? page.heroImage.url : ''

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'featuredOrder',
    limit: 6,
  })

  const _siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <>
      <HeroEntrance />
      <HeroCursorReveal />

      {/* ── Hero ── */}
      <section
        data-hero
        className={styles.hero}
        style={
          {
            '--hero-image': heroImageUrl ? `url(${heroImageUrl})` : 'none',
          } as React.CSSProperties
        }
      >
        <div data-hero-image className={styles.heroImage} />
        <div className={styles.heroContent}>
          <h1 data-entrance className={styles.heroHeadline}>
            {page?.heroHeadline || 'Spaces built around how you work.'}
          </h1>
          <p data-entrance className={styles.heroParagraph}>
            {page?.heroParagraph ||
              'Every office tells a story about the business inside it. Nodus Group designs and delivers fitouts built to perform from day one, and built to last.'}
          </p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── About intro ── */}
      <section className={`grid ${styles.about}`}>
        <div className={styles.aboutInner}>
          <h2 data-reveal className={styles.aboutHeadline}>
            {page?.secondaryHeadline ||
              'Born from years of building, Nodus brings the same care and precision to every workplace.'}
          </h2>

          <div data-reveal data-reveal-delay="100" className={styles.aboutImageWrap}>
            {page?.secondaryImage &&
            typeof page.secondaryImage === 'object' &&
            page.secondaryImage.url ? (
              <Image
                src={page.secondaryImage.url}
                alt={page.secondaryImage.alt || 'Nodus interior'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
          </div>

          <p data-reveal data-reveal-delay="150" className={styles.aboutParagraph}>
            {page?.secondaryParagraph ||
              'Nodus specialises in office fitouts and commercial interiors designed to enhance performance, foster collaboration, and create workplaces your team is proud to call their own.'}
          </p>

          <div data-reveal data-reveal-delay="200" className={styles.aboutBtnWrap}>
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
          <h2 data-reveal className={styles.projectsTitle}>
            Featured Projects
          </h2>
          <Link data-reveal data-reveal-delay="100" href="/projects" className="btn">
            View All Projects
          </Link>
        </div>

        {projects.length > 0 ? (
          projects.map((project, i) => {
            const image = typeof project.coverImage === 'object' ? project.coverImage : null
            return (
              <div
                key={project.id}
                data-reveal
                data-reveal-delay={String(i * 80)}
                className={styles.featuredProject}
              >
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

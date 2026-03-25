import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import HeroEntrance from '@/components/HeroEntrance'
import HeroCursorReveal from '@/components/HeroCursorReveal'
import ScrollButton from '@/components/ScrollButton'

export const dynamic = 'force-dynamic'

function lexicalToText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => node.children?.map((child: any) => child.text || '').join('') || '')
    .filter(Boolean)
    .join(' ')
}

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
        <div data-section className={styles.heroContent}>
          <h1 data-entrance-headline className={styles.heroHeadline}>
            {page?.heroHeadline || 'Spaces built around how you work.'}
          </h1>
          <p className={styles.heroParagraph}>
            {page?.heroParagraph ||
              'Every office tells a story about the business inside it. Nodus Group designs and delivers fitouts built to perform from day one, and built to last.'}
          </p>
        </div>
        <div data-section className={styles.btnWrap}>
          <ScrollButton />
        </div>
      </section>

      <div className="divider" />

      {/* ── About intro ── */}
      <section data-section id="homeAbout" className={`grid ${styles.about}`}>
        <div className={styles.aboutInner}>
          <h2 className={styles.aboutHeadline}>
            {page?.secondaryHeadline ||
              'Born from years of building, Nodus brings the same care and precision to every workplace.'}
          </h2>

          <div className={styles.aboutImageWrap}>
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

          <p className={styles.aboutParagraph}>
            {page?.secondaryParagraph ||
              'Nodus specialises in office fitouts and commercial interiors designed to enhance performance, foster collaboration, and create workplaces your team is proud to call their own.'}
          </p>

          <div className={styles.btnWrap}>
            <Link href="/about" className="btn">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <div className="divider" />

      <div data-section className={`grid ${styles.projectsHeader}`}>
        <h2 className={styles.projectsTitle}>Featured Project</h2>
        <div className={styles.btnWrap}>
          <Link href="/projects" className="btn">
            View All
          </Link>
        </div>
      </div>

      <div className="divider" />

      <section data-section className={`grid ${styles.projects}`}>
        {projects.length > 0 ? (
          projects.map((project, i) => {
            const image = typeof project.coverImage === 'object' ? project.coverImage : null
            return (
              <div key={project.id} className={styles.featuredProject}>
                <div className={styles.featuredInfo}>
                  <h3 className={styles.featuredName}>{project.title}</h3>
                  <p className="projectLocation">{project.location}</p>
                  <p className={styles.featuredDesc}>
                    {project.description
                      ? lexicalToText(project.description)
                      : 'Nodus specialises in office fitouts and commercial interiors.'}
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
              <h3>Co-Working Space</h3>
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
      </section>
    </>
  )
}

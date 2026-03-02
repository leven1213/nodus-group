import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default async function ProjectsPage() {
  const payload = await getPayload({ config: await config })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: 'title',
    limit: 100,
  })

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>Projects</h1>

        {projects.length > 0 ? (
          <div className={styles.grid}>
            {projects.map((project) => {
              const image =
                typeof project.coverImage === 'object' ? project.coverImage : null

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={styles.projectCard}
                >
                  <div className={styles.imageWrap}>
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt || project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}
                  </div>
                  <div className={styles.projectInfo}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectLocation}>{project.location}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No projects yet. Add your first project in the{' '}
              <a href="/admin/collections/projects">Payload admin panel</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

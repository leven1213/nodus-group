import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroEntrance from '@/components/HeroEntrance'
import ContactForm from './ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayload({ config: await config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
  })
  const page = pages[0]

  const contactImage =
    page?.contactImage && typeof page.contactImage === 'object' ? page.contactImage : null

  return (
    <>
      <HeroEntrance />
      <div className="pageHeading">
        <div data-section className="grid">
          <h1 className="heroTitle">Contact Us</h1>
        </div>
      </div>
      <div className="divider" />
      <ContactForm
        contactImageUrl={contactImage?.url || ''}
        contactImageAlt={contactImage?.alt || ''}
      />
    </>
  )
}

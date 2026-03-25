'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

type Props = {
  contactImageUrl?: string
  contactImageAlt?: string
}

type Errors = {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactForm({ contactImageUrl, contactImageAlt }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const validate = (data: typeof formData): Errors => {
    const errs: Errors = {}
    if (!data.firstName.trim()) errs.firstName = 'First name is required'
    if (!data.lastName.trim()) errs.lastName = 'Last name is required'
    if (!data.email.trim()) {
      errs.email = 'Email is required'
    } else if (!validateEmail(data.email)) {
      errs.email = 'Please enter a valid email'
    }
    if (!data.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...formData, [e.target.name]: e.target.value }
    setFormData(updated)
    // Live validation once field has been touched
    if (touched[e.target.name]) {
      setErrors(validate(updated))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
    setErrors(validate(formData))
  }

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({ firstName: true, lastName: true, email: true, message: true })
    const errs = validate(formData)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' })
        setTouched({})
        setErrors({})

        // Redirect to mailto after short delay so user sees success message
        setTimeout(() => {
          const subject = encodeURIComponent(
            `Enquiry from ${formData.firstName} ${formData.lastName}`,
          )
          const body = encodeURIComponent(
            `Name: ${formData.firstName} ${formData.lastName}\n` +
              `Company: ${formData.company || '—'}\n` +
              `Email: ${formData.email}\n` +
              `Phone: ${formData.phone || '—'}\n\n` +
              `Message:\n${formData.message}`,
          )
          window.location.href = `mailto:hi.leven@outlook.com?subject=${subject}&body=${body}`
        }, 1500)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Form section */}
      <section data-section className={`grid ${styles.formSection}`}>
        <div className={styles.intro}>
          <h2 className={styles.introText}>
            We’re passionate about getting fitouts right. Let’s talk about yours.
          </h2>
        </div>

        <div className={styles.formWrap}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>First Name *</label>
              <input
                className={`${styles.input} ${touched.firstName && errors.firstName ? styles.inputError : ''}`}
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && (
                <span className={styles.fieldError}>{errors.firstName}</span>
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Last Name *</label>
              <input
                className={`${styles.input} ${touched.lastName && errors.lastName ? styles.inputError : ''}`}
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && (
                <span className={styles.fieldError}>{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Company Name</label>
            <input
              className={styles.input}
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email *</label>
            <input
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message *</label>
            <textarea
              className={`${styles.input} ${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
            />
            {touched.message && errors.message && (
              <span className={styles.fieldError}>{errors.message}</span>
            )}
          </div>

          <div className={styles.submitRow}>
            {status === 'success' && (
              <p className={styles.successMsg}>Thanks! Opening your email client…</p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact info section */}
      <section data-section className={`grid ${styles.contactInfo}`}>
        <div className={styles.contactDetails}>
          <div className={styles.contactGroup}>
            <p className={styles.contactLabel}>Reach Us</p>
            <h3>03 9999 7418</h3>
            <h3>admin@nodusgroup.com.au</h3>
          </div>
          <div className={styles.contactGroup}>
            <p className={styles.contactLabel}>Visit Us</p>
            <h3>Nodus Group</h3>
            <h3>1/439 Canterbury Road</h3>
            <h3>Surrey Hills, VIC 3127</h3>
          </div>
        </div>
        <div className={styles.contactImageWrap}>
          {contactImageUrl ? (
            <Image
              src={contactImageUrl}
              alt={contactImageAlt || 'Nodus office'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
      </section>
    </>
  )
}

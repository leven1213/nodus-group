'use client'

//import Image from 'next/image'
import { useState } from 'react'
import styles from './page.module.css'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>Contact Us</h1>

        <div className={styles.formSection}>
          {/* Intro */}
          <div className={styles.intro}>
            <p className={styles.introText}>
              We&apos;re passionate about
              <br />
              getting fitouts right.
            </p>
            <p className={styles.introSub}>Let&apos;s talk about yours.</p>
          </div>

          {/* Form */}
          <div className={styles.formWrap}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>First Name *</label>
                <input
                  className={styles.input}
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last Name *</label>
                <input
                  className={styles.input}
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
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
                className={styles.input}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
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
                className={`${styles.input} ${styles.textarea}`}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className={styles.submitRow}>
              {status === 'success' && (
                <p className={styles.successMsg}>Thanks! We&apos;ll be in touch soon.</p>
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
        </div>

        <div className={styles.divider} />

        {/* Contact info */}
        <div className={styles.contactInfo}>
          <div className={styles.contactDetails}>
            <div className={styles.contactGroup}>
              <p className={styles.contactLabel}>Reach Us</p>
              <p className={styles.contactText}>03 9999 7418</p>
              <p className={styles.contactText}>admin@nodusgroup.com.au</p>
            </div>
            <div className={styles.contactGroup}>
              <p className={styles.contactLabel}>Visit Us</p>
              <p className={styles.contactText}>Nodus Group</p>
              <p className={styles.contactText}>1/439 Canterbury Road</p>
              <p className={styles.contactText}>Surrey Hills, VIC 3127</p>
            </div>
          </div>
          <div className={styles.contactImageWrap}>
            <div className={styles.imagePlaceholder} />
          </div>
        </div>
      </div>
    </div>
  )
}

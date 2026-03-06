'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className={styles.header}>
        <div className={`grid ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logos/Nodus_Logo_Type_Black.svg"
              alt="Nodus Group"
              width={120}
              height={32}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <Link
              href="/projects"
              className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
            >
              About Us
            </Link>
            <Link href="/contact" className="btn">
              Get in Touch
            </Link>

            <button
              className={`${styles.hamburger} ${mounted && menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => mounted && setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              suppressHydrationWarning
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line
                  x1="3"
                  y1="7"
                  x2="21"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={styles.lineTop}
                />
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={styles.lineMid}
                />
                <line
                  x1="3"
                  y1="17"
                  x2="21"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={styles.lineBot}
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${mounted && menuOpen ? styles.overlayOpen : ''}`}
        suppressHydrationWarning
      >
        <div className={styles.overlayInner}>
          <nav className={styles.overlayNav}>
            {[
              { href: '/projects', label: 'Projects' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.overlayLink}
                style={{ transitionDelay: mounted && menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.overlayFooter}>
            <div className={styles.overlayContact}>
              <a href="mailto:admin@nodusgroup.com.au" className={styles.overlayContactLink}>
                admin@nodusgroup.com.au
              </a>
              <a href="tel:0399997418" className={styles.overlayContactLink}>
                03 9999 7418
              </a>
            </div>
            <div className={styles.overlaySocials}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlaySocialLink}
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overlaySocialLink}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

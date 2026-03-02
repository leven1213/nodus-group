import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA bar */}
      <div className={styles.ctaBar}>
        <span className={styles.ctaBarBrand}>Nodus Group</span>
        <Link href="/contact" className={styles.ctaBarLink}>
          Contact →
        </Link>
      </div>

      {/* Main footer */}
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.logoCol}>
            <span className={styles.logoText}>nodus</span>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Sitemap</p>
            <nav className={styles.colLinks}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Socials</p>
            <nav className={styles.colLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </nav>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Contact</p>
            <div className={styles.contactInfo}>
              <p>Nodus Group</p>
              <p>1/439 Canterbury Road</p>
              <p>Surrey Hills, VIC 3127</p>
              <br />
              <p>03 9999 7418</p>
              <p>admin@nodusgroup.com.au</p>
              <br />
              <p>ABN 63 665 903 506</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span>© Nodus Group 2026</span>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  )
}

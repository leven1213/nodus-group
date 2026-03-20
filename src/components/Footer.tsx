import Link from 'next/link'
import Image from 'next/image'
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
            <Link href="/" className={styles.logo}>
              <Image
                src="/logos/Nodus_Logo_Mark_White.svg"
                alt="Nodus Group Logo Mark White"
                width={120}
                height={32}
                priority
              />
            </Link>
          </div>

          <div className={`${styles.col} ${styles.contact}`}>
            <p className={styles.colLabel}>Contact</p>
            <div className={styles.contactInfo}>
              <p>Nodus Group</p>
              <p>1/439 Canterbury Road</p>
              <p>Surrey Hills, VIC 3127</p>
              <br />
              <p>03 9999 7418</p>
              <p>admin@nodusgroup.com.au</p>
              <p>ABN 63 665 903 506</p>
            </div>
          </div>

          <div className={`${styles.col} ${styles.sitemap}`}>
            <p className={styles.colLabel}>Sitemap</p>
            <nav className={styles.colLinks}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          <div className={`${styles.col} ${styles.socials}`}>
            <p className={styles.colLabel}>Socials</p>
            <nav className={styles.colLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span>© Nodus Group 2026</span>
        <Link href="/">Privacy Policy</Link>
      </div>
    </footer>
  )
}

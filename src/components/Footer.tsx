import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA bar */}
      <div className={styles.ctaBar}>
        <span className={styles.ctaBarBrand}>Let&rsquo;s touch base</span>
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
                alt="Nodus Build Logo Mark White"
                width={120}
                height={32}
                priority
              />
            </Link>
          </div>

          <div className={`${styles.col} ${styles.contact}`}>
            <p className={styles.colLabel}>Contact</p>
            <div className={styles.contactInfo}>
              <p>Nodus Build</p>
              <p>1/439 Canterbury Road</p>
              <p>Surrey Hills, VIC 3127</p>

              <br />
              <Link href="tel:0399997418">03 9999 7418</Link>
              <br />
              <Link href="mailto:contact@nodusbuild.com.au">contact@nodusbuild.com.au</Link>
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
        <span>© Nodus Build 2026</span>
        <Link href="/">Privacy Policy</Link>
      </div>
    </footer>
  )
}

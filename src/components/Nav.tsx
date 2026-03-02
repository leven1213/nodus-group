'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()

  return (
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
        </nav>
      </div>
    </header>
  )
}

'use client'

import Image from 'next/image'
import styles from './ScrollButton.module.css'

import HeroEntrance from '@/components/HeroEntrance'

export default function ScrollButton() {
  return (
    <>
      <HeroEntrance />
      <button
        className={styles.heroArrowButton}
        onClick={() => document.getElementById('homeAbout')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <Image
          src="/icons/Nodus-Group_Arrow_Downward.svg"
          alt="Arrow button"
          width={30}
          height={30}
        />
      </button>
    </>
  )
}

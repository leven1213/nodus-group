'use client'
import { useEffect } from 'react'

function splitToWords(el: HTMLElement, delay: number = 0) {
  const words = el.innerText.split(' ')
  el.innerHTML = words
    .map(
      (word) =>
        `<span style="display:inline-block; vertical-align:top; line-height:0.9;">` +
        `<span class="word" style="display:inline-block; transform:translateY(110%); opacity:0;">${word}</span>` +
        `</span>`,
    )
    .join(' ')
  el.querySelectorAll('.word').forEach((w, i) => {
    const word = w as HTMLElement
    setTimeout(
      () => {
        word.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
        word.style.transform = 'translateY(0)'
        word.style.opacity = '1'
      },
      delay + 60 * i,
    )
  })
  return words.length
}

export default function HeroEntrance() {
  useEffect(() => {
    // ── Hero — immediate on load ──
    const headline = document.querySelector('[data-entrance-headline]') as HTMLElement | null
    let wordCount = 0
    if (headline) wordCount = splitToWords(headline, 0)

    const para = document.querySelector('[data-entrance-para]') as HTMLElement | null
    if (para) {
      para.style.opacity = '0'
      para.style.transform = 'translateY(16px)'
      setTimeout(
        () => {
          para.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          para.style.opacity = '1'
          para.style.transform = 'translateY(0)'
        },
        60 * wordCount + 80,
      )
    }

    // ── Auto-detect sections ──
    // Any element with data-section gets its headings word-animated
    // and direct children (p, div, a, img wrappers) fade up
    const sectionEls: HTMLElement[] = []
    const fadeEls: HTMLElement[] = []

    document.querySelectorAll('[data-section]').forEach((section) => {
      // Headings — word by word
      section.querySelectorAll('h1, h2, h3').forEach((el) => {
        const heading = el as HTMLElement
        const words = heading.innerText.split(' ')
        heading.innerHTML = words
          .map(
            (word) =>
              `<span style="display:inline-block; overflow:hidden; vertical-align:bottom;">` +
              `<span class="word" style="display:inline-block; transform:translateY(110%); opacity:0;">${word}</span>` +
              `</span>`,
          )
          .join(' ')
        sectionEls.push(heading)
      })

      // Everything else — fade up
      section.querySelectorAll('p, a.btn, a, button, [data-reveal]').forEach((el) => {
        const element = el as HTMLElement
        element.style.opacity = '0'
        element.style.transform = 'translateY(20px)'
        fadeEls.push(element)
      })
    })

    // ── Intersection Observer ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement

          if (sectionEls.includes(el)) {
            splitToWords(el, 0)
          } else {
            const delay = Number(el.dataset.revealDelay || 0)
            setTimeout(() => {
              el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'

              setTimeout(() => {
                el.style.transition = '' // clears inline style, falls back to CSS
              }, 800)
            }, delay)
          }

          observer.unobserve(el)
        })
      },
      { threshold: 0.15 },
    )

    ;[...sectionEls, ...fadeEls].forEach((el) => observer.observe(el))

    // ── Dividers ──
    const dividerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            dividerObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
    document.querySelectorAll('.divider').forEach((el) => dividerObserver.observe(el))

    return () => {
      observer.disconnect()
      dividerObserver.disconnect()
    }
  }, [])

  return null
}

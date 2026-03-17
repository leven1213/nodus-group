'use client'
import { useEffect } from 'react'

export default function HeroEntrance() {
  useEffect(() => {
    // Navigation underline effect
    const header = document.querySelector('[data-header]') as HTMLElement | null
    if (header) {
      setTimeout(() => {
        header.classList.add('visible')
      }, 100)
    }

    // Split heroHeadline into word spans
    const headline = document.querySelector('[data-entrance-headline]') as HTMLElement | null
    if (headline) {
      const words = headline.innerText.split(' ')
      headline.innerHTML = words
        .map(
          (word) => `<span style="display:inline-block; overflow:hidden; vertical-align:bottom;">
          <span class="word" style="display:inline-block; transform:translateY(110%); opacity:0;">${word}</span>
        </span>`,
        )
        .join(' ')

      const wordEls = headline.querySelectorAll('.word')
      wordEls.forEach((el, i) => {
        const element = el as HTMLElement
        setTimeout(() => {
          element.style.transition =
            'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
          element.style.transform = 'translateY(0)'
          element.style.opacity = '1'
        }, 200 * i)
      })
    }

    // Paragraph fade in after headline
    const para = document.querySelector('[data-entrance-para]') as HTMLElement | null
    if (para) {
      para.style.opacity = '0'
      para.style.transform = 'translateY(16px)'
      const wordCount = headline?.innerText.split(' ').length || 5
      setTimeout(
        () => {
          para.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          para.style.opacity = '1'
          para.style.transform = 'translateY(0)'
        },
        200 * wordCount + 100,
      )
    }

    // Scroll-triggered elements
    const scrollEls = document.querySelectorAll('[data-reveal]')
    scrollEls.forEach((el) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const delay = element.dataset.revealDelay || '0'
            setTimeout(() => {
              element.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
              element.style.opacity = '1'
              element.style.transform = 'translateY(0)'
            }, Number(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    scrollEls.forEach((el) => observer.observe(el))

    // Divider animation
    const dividers = document.querySelectorAll('.divider')
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
    dividers.forEach((el) => dividerObserver.observe(el))

    return () => {
      observer.disconnect()
      dividerObserver.disconnect()
    }
  }, [])

  return null
}

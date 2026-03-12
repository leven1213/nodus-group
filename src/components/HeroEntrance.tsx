'use client'
import { useEffect } from 'react'

export default function HeroEntrance() {
  useEffect(() => {
    // Hero elements animate immediately on load
    const heroEls = document.querySelectorAll('[data-entrance]')
    heroEls.forEach((el, i) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(20px)'
      setTimeout(() => {
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, 80 * i)
    })

    // Scroll-triggered elements animate when they enter the viewport
    const scrollEls = document.querySelectorAll('[data-reveal]')
    scrollEls.forEach((el) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(32px)'
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
            observer.unobserve(entry.target) // only animate once
          }
        })
      },
      { threshold: 0.15 }, // triggers when 15% of element is visible
    )

    scrollEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

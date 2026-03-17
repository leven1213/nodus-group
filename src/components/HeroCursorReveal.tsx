'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function HeroCursorReveal() {
  useEffect(() => {
    const hero = document.querySelector('[data-hero]') as HTMLElement | null
    const heroImage = document.querySelector('[data-hero-image]') as HTMLElement | null
    if (!hero || !heroImage) return

    const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches

    if (!isDesktop) {
      heroImage.style.transition = 'opacity 1.4s ease'
      heroImage.style.opacity = '0'
      setTimeout(() => {
        heroImage.style.opacity = '0.60'
      }, 300)
      return
    }

    const radius = 180
    const feather = 80
    let currentX = -500
    let currentY = -500
    let revealed = false

    const setMask = (x: number, y: number, size: number) => {
      const outer = size + feather
      const mask = `radial-gradient(circle ${size}px at ${x}px ${y}px, black ${size * 0.6}px, transparent ${outer}px)`
      heroImage.style.webkitMaskImage = mask
      heroImage.style.maskImage = mask
      heroImage.style.opacity = '1'
    }

    const animateIn = (x: number, y: number) => {
      if (revealed) return
      revealed = true
      gsap.to(
        { size: 0 },
        {
          size: radius,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate() {
            setMask(x, y, (this as any).targets()[0].size)
          },
        },
      )
    }

    // Start hidden
    setMask(currentX, currentY, 0)

    // Check if cursor is already over the hero on load
    const onInitialMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      currentX = e.clientX - rect.left
      currentY = e.clientY - rect.top
      const isOverHero = hero.contains(document.elementFromPoint(e.clientX, e.clientY))
      if (isOverHero) animateIn(currentX, currentY)
      document.removeEventListener('mousemove', onInitialMove)
    }
    document.addEventListener('mousemove', onInitialMove)

    const onEnter = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      currentX = e.clientX - rect.left
      currentY = e.clientY - rect.top
      animateIn(currentX, currentY)
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      currentX = e.clientX - rect.left
      currentY = e.clientY - rect.top
      if (!revealed) {
        animateIn(currentX, currentY)
      } else {
        setMask(currentX, currentY, radius)
      }
    }

    const onLeave = () => {
      revealed = false
      gsap.to(
        { size: radius },
        {
          size: 0,
          duration: 0.6,
          ease: 'power2.in',
          onUpdate() {
            setMask(currentX, currentY, (this as any).targets()[0].size)
          },
        },
      )
    }

    hero.addEventListener('mouseenter', onEnter as EventListener)
    hero.addEventListener('mousemove', onMove as EventListener)
    hero.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onInitialMove)
      hero.removeEventListener('mouseenter', onEnter as EventListener)
      hero.removeEventListener('mousemove', onMove as EventListener)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return null
}

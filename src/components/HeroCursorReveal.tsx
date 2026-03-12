'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function HeroCursorReveal() {
  useEffect(() => {
    const hero = document.querySelector('[data-hero]') as HTMLElement | null
    const heroImage = document.querySelector('[data-hero-image]') as HTMLElement | null
    if (!hero || !heroImage) return

    const radius = 180 // px — size of reveal
    const feather = 80 // px — how soft the edge is
    let currentX = -500
    let currentY = -500
    let revealed = false

    const setMask = (x: number, y: number, size: number) => {
      const inner = size
      const outer = size + feather
      heroImage.style.webkitMaskImage = `radial-gradient(circle ${inner}px at ${x}px ${y}px, black ${inner * 0.6}px, transparent ${outer}px)`
      heroImage.style.maskImage = `radial-gradient(circle ${inner}px at ${x}px ${y}px, black ${inner * 0.6}px, transparent ${outer}px)`
    }

    // Start hidden
    setMask(currentX, currentY, 0)

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      currentX = e.clientX - rect.left
      currentY = e.clientY - rect.top

      if (!revealed) {
        revealed = true
        gsap.fromTo(
          { size: 0 },
          { size: 0 },
          {
            size: radius,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate() {
              setMask(currentX, currentY, (this as any).targets()[0].size)
            },
          },
        )
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

    hero.addEventListener('mousemove', onMove as EventListener)
    hero.addEventListener('mouseleave', onLeave)

    return () => {
      hero.removeEventListener('mousemove', onMove as EventListener)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return null
}

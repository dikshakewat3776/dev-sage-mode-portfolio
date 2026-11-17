import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'philosophy', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const useActiveSection = () => {
  const [active, setActive] = useState<SectionId | 'hero'>('hero')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id && SECTION_IDS.includes(visible.target.id as SectionId)) {
          setActive(visible.target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))

    const onScrollTop = () => {
      if (window.scrollY < 120) setActive('hero')
    }
    window.addEventListener('scroll', onScrollTop, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScrollTop)
    }
  }, [])

  return active
}
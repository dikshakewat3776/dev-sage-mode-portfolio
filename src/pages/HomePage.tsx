import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { HeroSection } from '../components/sections/HeroSection'
import { PhilosophySection } from '../components/sections/PhilosophySection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import type { SectionId } from '../hooks/useActiveSection'

export const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: SectionId } | null)?.scrollTo
    if (!target) return
    const id = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(id)
  }, [location.state])

  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <PhilosophySection />
      <ContactSection />
    </div>
  )
}
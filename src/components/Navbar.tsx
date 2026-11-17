import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import type { SectionId } from '../hooks/useActiveSection'

const NAV: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'contact', label: 'Contact' },
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const onHome = location.pathname === '/'

  const goTo = (id: SectionId) => {
    setMenuOpen(false)
    if (!onHome) {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    scrollToSection(id)
  }

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Primary">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          {profile.name.split(' ')[0]}
        </Link>

        <div id="primary-navigation" className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link${onHome && active === item.id ? ' active' : ''}`}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>
      {menuOpen ? (
        <button type="button" className="nav-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}
    </header>
  )
}
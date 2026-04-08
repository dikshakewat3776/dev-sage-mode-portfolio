import { NavLink } from 'react-router-dom'
import { usePortfolioStore } from '../store/usePortfolioStore'

export const Navbar = () => {
  const { themeMode, setThemeMode, soundEnabled, setSoundEnabled } = usePortfolioStore()
  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Primary">
        <NavLink to="/" className="brand">
          Diksha Kewat
        </NavLink>
        <div className="nav-links">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/study">Study</NavLink>
        </div>
        <div className="controls">
          <button
            type="button"
            className="btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          >
            {themeMode === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </nav>
    </header>
  )
}


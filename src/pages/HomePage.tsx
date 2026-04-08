import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export const HomePage = () => {
  return (
    <section className="stack home-screen">
      <article className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Data-driven chakra UI</p>
          <h1>{profile.tagline}</h1>
          <p>{profile.bio}</p>
          <div className="row">
            <Link to="/projects" className="btn primary">
              View projects
            </Link>
            <Link to="/study" className="btn">
              Open study vault
            </Link>
          </div>
        </div>
        <aside className="card hero-social">
          <h2>Find me online</h2>
          <p>Follow my latest builds, writeups, and experiments.</p>
          <div className="stack">
            {profile.socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="btn">
                {link.label}
              </a>
            ))}
          </div>
        </aside>
        <div className="hero-orb" aria-hidden="true" />
      </article>
      <article className="card section-muted">
        {/* <p>
          Animation source now runs from the curated jutsu library only. Theme switching loads a module from
          `src/animations` and removes old CSS-based pulses.
        </p> */}
      </article>
    </section>
  )
}


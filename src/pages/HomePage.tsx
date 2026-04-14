import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export const HomePage = () => {
  const bioSections = profile.bio
    .split('\n\n')
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const lines = section.split('\n').map((line) => line.trim())
      const heading = lines[0]
      const points = lines.slice(1).map((line) => line.replace(/^- /, '')).filter(Boolean)
      return { heading, points }
    })

  return (
    <section className="stack home-screen">
      <article className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Data-driven chakra UI</p>
          <h1>{profile.tagline}</h1>
          <p className="hero-intro">Backend-focused builder who likes clean systems, practical debugging, and shipping useful products.</p>
          <div className="row">
            <Link to="/projects" className="btn primary">
              View projects
            </Link>
            <Link to="/study" className="btn">
              Open study vault
            </Link>
          </div>
        </div>
        <article className="card hero-about">
          <h2>About me</h2>
          <div className="bio-sections">
            {bioSections.map((section) => (
              <section key={section.heading} className="bio-block">
                <h3>{section.heading}</h3>
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
        <div className="hero-side">
          <aside className="card hero-social">
            <h2>Find me online</h2>
            <p>Follow my latest builds, writeups, and experiments.</p>
            <div className="hero-social-links">
              {profile.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="btn">
                  {link.label}
                </a>
              ))}
            </div>
          </aside>
          <article className="card hero-resume">
            <h2>Resume</h2>
            <p>Want the full background in one place?</p>
            <a
              href="https://github.com/dikshakewat3776/dev-sage-mode-portfolio/blob/main/Resume_2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn primary"
            >
              Check out resume
            </a>
          </article>
        </div>
      </article>
      {/* <article className="card section-muted"> */}
        {/* <p>
          Animation source now runs from the curated jutsu library only. Theme switching loads a module from
          `src/animations` and removes old CSS-based pulses.
        </p> */}
      {/* </article> */}
    </section>
  )
}


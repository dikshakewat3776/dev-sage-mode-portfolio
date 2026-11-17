import { motion, useReducedMotion } from 'framer-motion'
import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../../data/profile'
import { useRotatingHeadline } from '../../hooks/useRotatingHeadline'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const HeroSection = () => {
  const reduceMotion = useReducedMotion()
  const rotating = useRotatingHeadline(profile.headlinePhrases)
  const linkedIn = profile.socialLinks.find((l) => l.label === 'LinkedIn')
  const github = profile.socialLinks.find((l) => l.label === 'GitHub')

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <motion.div
          className="hero-portrait-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={`Portrait of ${profile.name}`}
              className="hero-portrait"
              width={360}
              height={360}
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="hero-portrait hero-portrait-placeholder" role="img" aria-label="Portrait placeholder">
              <span aria-hidden>DK</span>
              <span className="sr-only">Add profile.jpg to public/ and set photoUrl in profile.ts</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          <p className="eyebrow">7+ years · Fintech & software engineering</p>
          <h1 id="hero-heading">{profile.name}</h1>
          <p className="hero-role">{profile.roleLine}</p>
          <p className="hero-rotating" aria-live="polite">
            <span className="hero-rotating-label">Focus:</span>{' '}
            <motion.span
              key={rotating}
              className="hero-rotating-text"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {rotating}
            </motion.span>
          </p>
          <p className="hero-intro">{profile.intro}</p>

          <div className="hero-actions">
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                className="btn btn-primary"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload aria-hidden />
                Download resume
              </a>
            ) : (
              <span className="btn btn-primary btn-disabled" title="Add resumeUrl in profile.ts">
                <FiDownload aria-hidden />
                Resume (add PDF)
              </span>
            )}
            <button type="button" className="btn btn-secondary" onClick={() => scrollTo('projects')}>
              Explore projects
            </button>
          </div>

          <motion.div
            className="hero-social-row"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {linkedIn ? (
              <a href={linkedIn.href} target="_blank" rel="noreferrer" className="icon-link">
                <FiLinkedin aria-hidden />
                LinkedIn
              </a>
            ) : null}
            {github ? (
              <a href={github.href} target="_blank" rel="noreferrer" className="icon-link">
                <FiGithub aria-hidden />
                GitHub
              </a>
            ) : null}
            <a href={`mailto:${profile.email}`} className="icon-link">
              <FiMail aria-hidden />
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
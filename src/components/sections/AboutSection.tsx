import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'

const renderInlineEmphasis = (text: string): ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export const AboutSection = () => {
  const reduceMotion = useReducedMotion()
  const lead = profile.about[0] ?? ''

  return (
    <section id="about" className="section section-muted-bg" aria-labelledby="about-heading">
      <div className="section-header">
        <h2 id="about-heading">About</h2>
        <p className="section-lead">{lead}</p>
      </div>
      <div className="about-grid">
        {profile.about.slice(1).map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 48)}
            className="about-paragraph"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {renderInlineEmphasis(paragraph)}
          </motion.p>
        ))}
        {profile.aboutFocusAreas?.length ? (
          <motion.div
            className="about-focus"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <p className="about-focus-label">
              <strong>Areas of focus</strong>
            </p>
            <motion.div layout="position" className="chips">
              {profile.aboutFocusAreas.map((area) => (
                <span key={area} className="chip">
                  {area}
                </span>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
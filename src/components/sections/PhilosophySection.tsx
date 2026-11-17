import { motion, useReducedMotion } from 'framer-motion'
import { philosophyPoints } from '../../data/philosophy'
import { recognitionHighlights, recognitionIntro } from '../../data/recognition'

export const PhilosophySection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="philosophy" className="section section-navy" aria-labelledby="philosophy-heading">
      <div className="section-header section-header-light">
        <h2 id="philosophy-heading">Leadership & engineering philosophy</h2>
        <p className="section-lead">How I approach teams, architecture, and delivery.</p>
      </div>
      <motion.div layout="position" className="philosophy-grid">
        {philosophyPoints.map((point, index) => (
          <motion.article
            key={point.title}
            className="philosophy-card"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="recognition-block"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h3 className="recognition-heading">Recognition at a glance</h3>
        <p className="recognition-intro">{recognitionIntro}</p>

        <div className="recognition-stats" role="list" aria-label="Award counts">
          {recognitionHighlights.map((stat) => (
            <div key={stat.label} className="recognition-stat" role="listitem">
              <span className="recognition-stat-value">{stat.value}</span>
              <span className="recognition-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
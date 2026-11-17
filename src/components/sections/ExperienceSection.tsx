import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/experience'

export const ExperienceSection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="section-header">
        <h2 id="experience-heading">Experience</h2>
        <p className="section-lead">Roles across fintech marketplaces and digital lending.</p>
      </div>
      <ol className="timeline">
        {experience.map((role, index) => (
          <motion.li
            key={role.id}
            className="timeline-item"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <motion.div layout="position" className="timeline-card">
              <motion.header className="timeline-card-head" layout="position">
                <div>
                  <h3>{role.role}</h3>
                  <p className="timeline-company">{role.company}</p>
                </div>
                <time className="timeline-period">{role.period}</time>
              </motion.header>
              <p className="timeline-summary">{role.summary}</p>
              <ul className="timeline-highlights">
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {role.technologies?.length ? (
                <div className="chips">
                  {role.technologies.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
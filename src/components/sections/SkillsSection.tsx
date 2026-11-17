import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '../../data/skills'

export const SkillsSection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section-header">
        <h2 id="skills-heading">Technical expertise</h2>
        <p className="section-lead">
          Credit platforms, modernization, observability, and governed AI—grouped for clarity, not logo walls.
        </p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            className="skill-card"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
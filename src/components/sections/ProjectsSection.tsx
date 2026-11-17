import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'
import { projectCategories, projects } from '../../data/projects'
import type { Project, ProjectCategory } from '../../types/content'

export const ProjectsSection = () => {
  const reduceMotion = useReducedMotion()
  const [category, setCategory] = useState<ProjectCategory>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (category === 'all') return projects
    return projects.filter((p) => p.category === category)
  }, [category])

  useEffect(() => {
    if (!selected) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const categoryLabel = (id: Project['category']) =>
    projectCategories.find((c) => c.id === id)?.label ?? id

  return (
    <section id="projects" className="section section-muted-bg" aria-labelledby="projects-heading">
      <div className="section-header">
        <h2 id="projects-heading">Featured work</h2>
        <p className="section-lead">
          Verified production initiatives across marketplaces, gateways, underwriting, AI governance, and observability—plus select open-source tools.
        </p>
      </div>

      <div className="filter-bar" role="tablist" aria-label="Project categories">
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            className={`filter-pill${category === cat.id ? ' active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
          >
            <div className="project-card-top">
              <span className="project-category">{categoryLabel(project.category)}</span>
              {project.internal ? <span className="project-badge">Professional</span> : null}
            </div>
            <h3>{project.title}</h3>
            <p className="project-problem">{project.problem}</p>
            {project.impact ? <p className="project-impact">{project.impact}</p> : null}
            <motion.div layout="position" className="chips">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 ? (
                <span className="chip chip-muted">+{project.stack.length - 4}</span>
              ) : null}
            </motion.div>
            <div className="project-card-actions">
              <button type="button" className="btn btn-text" onClick={() => setSelected(project)}>
                View details
              </button>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  <FiGithub aria-hidden />
                  Code
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      {selected ? (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close project details"
              onClick={() => setSelected(null)}
            >
              <FiX />
            </button>
            <p className="project-category">{categoryLabel(selected.category)}</p>
            <h3 id="project-modal-title">{selected.title}</h3>
            <dl className="detail-list">
              <div>
                <dt>Problem</dt>
                <dd>{selected.problem}</dd>
              </div>
              <div>
                <dt>Solution</dt>
                <dd>{selected.solution}</dd>
              </div>
              <div>
                <dt>My contribution</dt>
                <dd>{selected.contribution}</dd>
              </div>
              {selected.architecture?.length ? (
                <div>
                  <dt>Architecture layers</dt>
                  <dd>
                    <ul className="architecture-list">
                      {selected.architecture.map((layer) => (
                        <li key={layer}>{layer}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {selected.impact ? (
                <div>
                  <dt>Verified impact</dt>
                  <dd>{selected.impact}</dd>
                </div>
              ) : null}
            </dl>
            <div className="chips">
              {selected.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <motion.div layout="position" className="modal-links">
              {selected.githubUrl ? (
                <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <FiGithub aria-hidden />
                  GitHub
                </a>
              ) : null}
              {selected.liveUrl ? (
                <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <FiExternalLink aria-hidden />
                  Live demo
                </a>
              ) : null}
            </motion.div>
            {selected.internal ? (
              <p className="modal-note">Professional / internal initiative—not represented as open source.</p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  )
}
import { projects } from '../data/projects'
import { applyJutsuTheme } from '../animations/jutsuEffects'

export const ProjectsPage = () => {
  return (
    <section className="stack projects-screen">
      <h1>Projects</h1>
      <div className="grid">
        {projects.map((project) => (
          <article key={project.id} className="card project-card">
            <h2>{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <div className="chips">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <div className="row project-actions">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn project-link-btn">
                View GitHub
              </a>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn">
                  Live
                </a>
              ) : null}
              <button
                type="button"
                className="btn primary"
                onClick={() => applyJutsuTheme(project.animationType)}
              >
                Apply jutsu theme
              </button>
            </div>
            <p className="animation-meta">animation_type: {project.animationType}</p>
          </article>
        ))}
      </div>
    </section>
  )
}


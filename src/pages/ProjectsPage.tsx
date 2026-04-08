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
            <p>{project.description}</p>
            <div className="chips">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn project-link">
              GitHub: {project.githubUrl}
            </a>
            <div className="row">
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


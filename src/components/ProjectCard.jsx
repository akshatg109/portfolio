import {
  ArrowUpRight,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard.jsx'
import ProjectArtwork from './ProjectArtwork.jsx'

function ProjectLinks({ project }) {
  if (!project.links?.length) {
    return <p className="project-link-note">No public source or demo linked.</p>
  }

  return (
    <div className="project-links">
      {project.links.map(link => (
        <a
          className={`project-link${link.label === 'Live demo' ? ' project-link--primary' : ''}`}
          href={link.href}
          key={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
        >
          {link.label} <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function ProjectDetails({ project }) {
  return (
    <div className="project-details">
      <div className="project-details__meta">
        <span className="project-number">{project.number} <span aria-hidden="true">/</span> {project.category}</span>
        <div className="project-badges">
          {project.featured && <span className="project-featured">Featured</span>}
          {project.status && <span className="project-status">{project.status}</span>}
          {project.role && <span className="project-role">{project.role}</span>}
        </div>
      </div>
      <h3 className="project-title" id={`project-${project.id}`}>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      {project.highlights?.length > 0 && (
        <ul className="project-highlights" aria-label={`${project.title} documented features`}>
          {project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
        </ul>
      )}
      <ul className="project-tags" aria-label={`${project.title} technologies and focus areas`}>
        {project.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      <ProjectLinks project={project} />
    </div>
  )
}

export default function ProjectCard({ project }) {
  const featured = project.featured

  const handlePointerMove = event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const card = event.currentTarget.closest('.project-card')
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--tilt-x', `${-y * 3}deg`)
    card.style.setProperty('--tilt-y', `${x * 4}deg`)
  }

  const resetTilt = event => {
    const card = event.currentTarget.closest('.project-card')
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <SpotlightCard
      className={`project-card project-card--${project.layout ?? 'compact'}${featured ? ' project-card--featured' : ''}`}
      style={{ '--project-accent': project.accent ?? '#b5a0ff' }}
      spotlightColor={project.accent ?? '#b5a0ff'}
      intensity={featured ? 0.27 : 0.2}
      spotlightSize={featured ? 360 : 260}
      borderGlow={0.52}
      proximity={105}
      smoothing={0.24}
      ambient={false}
      grain={0.015}
      theme="dark"
    >
      <article className="project-card__article" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
        <ProjectArtwork art={project.art} number={project.number} />
        <ProjectDetails project={project} />
      </article>
    </SpotlightCard>
  )
}

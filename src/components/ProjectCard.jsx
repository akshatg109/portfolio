import {
  Activity,
  ArrowUpRight,
  AudioLines,
  FileCheck2,
  ShieldCheck,
  Waves,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard.jsx'

const artwork = {
  evaluation: { Icon: FileCheck2, phrase: 'ANSWER → FEEDBACK', index: 'AI / 01' },
  security: { Icon: ShieldCheck, phrase: 'CONFIGURATION · REMEDIATION', index: 'SECURITY / 02' },
  fitness: { Icon: Activity, phrase: 'PERSONALIZED MOVEMENT', index: 'WELLNESS / 03' },
  water: { Icon: Waves, phrase: 'REPORT · CONFIRM · REVIEW', index: 'COMMUNITY / 04' },
  voice: { Icon: AudioLines, phrase: 'LISTEN · THINK · SPEAK', index: 'VOICE / 05' },
}

function ProjectArtwork({ art }) {
  const item = artwork[art]
  const { Icon } = item

  return (
    <div className={`project-art project-art--${art}`} aria-hidden="true">
      <div className="project-art__grid" />
      <div className="project-art__rings">
        <span className="project-art__ring project-art__ring--one" />
        <span className="project-art__ring project-art__ring--two" />
        <span className="project-art__ring project-art__ring--three" />
      </div>
      <div className="project-art__icon"><Icon size={art === 'water' ? 54 : 46} strokeWidth={1.2} /></div>
      {art === 'water' && <span className="project-art__waterline project-art__waterline--one" />}
      {art === 'water' && <span className="project-art__waterline project-art__waterline--two" />}
      {art === 'voice' && <span className="project-art__voice-wave" />}
      <span className="project-art__index">{item.index}</span>
      <span className="project-art__phrase">{item.phrase}</span>
    </div>
  )
}

function ProjectLinks({ project }) {
  if (!project.links?.length) return null

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
        {project.featured ? (
          <span className="project-featured">Featured project</span>
        ) : project.status ? (
          <span className="project-status">{project.status}</span>
        ) : null}
      </div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-tags" aria-label={`${project.title} technologies and focus areas`}>
        {project.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      <ProjectLinks project={project} />
    </div>
  )
}

export default function ProjectCard({ project }) {
  const featured = project.featured

  return (
    <SpotlightCard
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      spotlightColor="#b9a4ff"
      intensity={featured ? 0.13 : 0.11}
      spotlightSize={featured ? 320 : 250}
      borderGlow={0.38}
      proximity={70}
      smoothing={0.36}
      theme="dark"
    >
      <article className="project-card__article">
        {featured ? (
          <div className="project-card__feature-layout">
            <ProjectDetails project={project} />
            <ProjectArtwork art={project.art} />
          </div>
        ) : (
          <>
            <ProjectArtwork art={project.art} />
            <ProjectDetails project={project} />
          </>
        )}
      </article>
    </SpotlightCard>
  )
}

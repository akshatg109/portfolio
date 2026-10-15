import { ArrowLeft, ArrowUpRight, CircleDot } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export default function ProjectDetails({ project, onClose }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="project-detail"
      style={{ '--planet-accent': project.accent }}
      aria-labelledby="project-detail-title"
      initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="back-to-orbits" type="button" onClick={onClose}>
        <ArrowLeft size={15} aria-hidden="true" /> BACK TO ORBITS
      </button>

      <div className="project-detail__meta">
        <span className="project-detail__number">PROJECT {project.number}</span>
        <span className="project-detail__category"><i aria-hidden="true" />{project.category}</span>
      </div>
      <h1 id="project-detail-title">{project.title}</h1>
      {(project.status || project.role) && (
        <p className="project-detail__status">
          {project.status && <span>{project.status}</span>}
          {project.role && <span>Role: {project.role}</span>}
        </p>
      )}
      <p className="project-detail__description">{project.description}</p>

      {project.highlights?.length > 0 && (
        <ul className="project-detail__highlights" aria-label={`${project.title} project highlights`}>
          {project.highlights.map(highlight => (
            <li key={highlight}><CircleDot size={13} aria-hidden="true" />{highlight}</li>
          ))}
        </ul>
      )}

      <div className="project-detail__technologies">
        <p className="micro-label">TECHNOLOGY SIGNAL</p>
        <ul aria-label={`${project.title} technologies`}>
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </div>

      <div className="project-detail__links">
        {project.links?.map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
        {!project.links?.length && <span>No public source or demo link is available.</span>}
      </div>
    </motion.article>
  )
}

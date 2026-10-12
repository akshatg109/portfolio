import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import ProjectSchool from './ProjectSchool.jsx'

export default function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      <Reveal>
        <SectionHeading
          number="01"
          eyebrow="Selected project case studies"
          title="Selected builds."
          description="Full-stack projects across AI, education, security, health, and community tools."
          titleId="projects-heading"
          aside={<ProjectSchool />}
        />
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal
            className={`project-cell project-cell--${project.layout ?? 'compact'}`}
            key={project.id}
            delay={(index % 3) * 65}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

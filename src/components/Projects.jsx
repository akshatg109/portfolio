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
          number="02"
          eyebrow="Selected project case studies"
          title="Products, built from idea to interface."
          description="A selection of full-stack builds across education, security, wellness, and AI. Each card highlights documented product scope, with public links where available."
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
      <p className="projects-note">
        Visuals are abstract interpretations, not product screenshots. Links appear only where a public source or demo is available.
      </p>
    </section>
  )
}

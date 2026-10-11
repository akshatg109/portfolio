import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Projects() {
  const featured = projects.find(project => project.featured)
  const supporting = projects.filter(project => !project.featured)

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      <Reveal>
        <SectionHeading
          number="02"
          eyebrow="Selected project case studies"
          title="Products, built from idea to interface."
          description="A selection of full-stack builds across education, security, wellness, and AI. Each card highlights documented product scope, with public links where available."
          titleId="projects-heading"
        />
      </Reveal>
      {featured && (
        <Reveal className="featured-project-wrap">
          <ProjectCard project={featured} />
        </Reveal>
      )}
      <div className="project-grid">
        {supporting.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <p className="projects-note">
        Project links are included where a public repository or demo could be verified.
      </p>
    </section>
  )
}

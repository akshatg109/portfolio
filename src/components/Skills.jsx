import { skillGroups } from '../data/skills.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <Reveal>
        <SectionHeading
          number="03"
          eyebrow="Tools of the trade"
          title="What I work with."
          description="A practical toolkit shaped by projects, experiments, and learning as I go."
          titleId="skills-heading"
        />
      </Reveal>
      <div className="skills-list">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 35}>
            <div className="skill-row">
              <h3>{group.title}</h3>
              <ul aria-label={group.title}>
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { achievements } from '../data/achievements.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Achievements() {
  return (
    <section className="section achievements-section" id="achievements" aria-labelledby="achievements-heading">
      <Reveal>
        <SectionHeading
          number="03"
          eyebrow="Milestones & making"
          title="Built with other people."
          description="A few moments that pushed me to think, collaborate, and make under pressure."
          titleId="achievements-heading"
        />
      </Reveal>
      <div className="achievement-list">
        {achievements.map((item, index) => (
          <Reveal key={item.number} delay={index * 65}>
            <article className="achievement-row">
               <span className="achievement-number">
                 <span aria-hidden="true">[</span>{item.number}<span aria-hidden="true">]</span>
               </span>
              <div className="achievement-main">
                <p className="achievement-type">{item.type}</p>
                <h3>{item.name}</h3>
                <p className="achievement-description">{item.description}</p>
              </div>
              <div className="achievement-result"><span>{item.result}</span></div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

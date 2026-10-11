import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <Reveal>
        <SectionHeading
          number="01"
          eyebrow="A little about me"
          title={<>Curious by nature.<br />Builder by choice.</>}
          titleId="about-heading"
        />
      </Reveal>
      <div className="about-layout">
        <Reveal className="about-lede-wrap">
          <p className="about-lede">
            I like the space where <span>useful software</span> meets emerging technology.
          </p>
        </Reveal>
        <Reveal className="about-copy" delay={90}>
          <p>
            I’m a BCA student at Jain University in Bengaluru, focused on full-stack development. I like shaping useful products from the interface through the API and the data behind it.
          </p>
          <p>
            My projects explore practical web applications, AI integrations, and security tooling. I value clear problem-solving, thoughtful implementation, and learning from each build.
          </p>
          <div className="about-education">
            <span className="about-education__rule" aria-hidden="true" />
            <div>
              <span className="micro-label">CURRENTLY STUDYING</span>
              <p>Bachelor of Computer Applications <span>·</span> Jain University</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

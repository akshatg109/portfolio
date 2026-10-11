import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import BlurText from './BlurText.jsx'
import DarkVeil from './DarkVeil.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <DarkVeil
          className="hero-dark-veil"
          color="#8460d8"
          speed={0.14}
          flow={0.3}
          brightness={0.34}
          glow={0.08}
          grain={0.015}
          quality={0.36}
          dpr={1}
          opacity={0.32}
          mouseInteraction={false}
        />
      </div>
      <div className="hero-inner content-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            DEVELOPER · AI BUILDER · LIFELONG LEARNER
          </p>
          <h1 id="hero-title" className="hero-title" aria-label="Building things for the next era.">
            <BlurText
              as="span"
              text="Building things"
              className="hero-title-row"
              delay={45}
              stepDuration={0.22}
              direction="top"
            />
            <BlurText
              as="span"
              text="for the next era."
              className="hero-title-row hero-title-row--accent"
              delay={55}
              stepDuration={0.22}
              direction="top"
            />
          </h1>
          <p className="hero-intro">
            I’m Akshat Gupta, a developer exploring full-stack development and AI. I enjoy turning ideas into useful digital experiences and learning by building.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contact">
              Get in touch <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-meta">
            <span className="hero-meta__location"><MapPin size={14} aria-hidden="true" /> Bengaluru, India</span>
            <span className="hero-meta__divider" aria-hidden="true" />
            <span>BCA · Jain University</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__caption hero-visual__caption--top">
            <span>PERSONAL PORTFOLIO</span>
            <span>01 / 05</span>
          </div>
          <div className="hero-emblem">
            <span className="hero-emblem__orbit hero-emblem__orbit--outer" />
            <span className="hero-emblem__orbit hero-emblem__orbit--inner" />
            <span className="hero-emblem__axis hero-emblem__axis--horizontal" />
            <span className="hero-emblem__axis hero-emblem__axis--vertical" />
            <span className="hero-emblem__mark">AG</span>
            <span className="hero-emblem__spark" />
          </div>
          <div className="hero-visual__caption hero-visual__caption--bottom">
            <span>IDEAS INTO INTERFACES</span>
            <span>BUILD · LEARN · REPEAT</span>
          </div>
        </div>

        <a className="hero-scroll" href="#about">
          <span>Scroll to explore</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

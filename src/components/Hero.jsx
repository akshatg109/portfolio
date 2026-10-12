import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import BlurText from './BlurText.jsx'
import TokyoRainBackground from './TokyoRainBackground.jsx'

const entrance = (delay) => ({ '--entrance-delay': `${delay}ms` })

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <TokyoRainBackground />
        <div className="hero__grid" />
        <div className="hero__glow" />
      </div>

      <div className="content-shell hero__shell">
        <div className="hero__topline hero-enter" style={entrance(40)}>
          <span><i className="hero__status-dot" /> AKSHAT GUPTA / PERSONAL PORTFOLIO</span>
          <span className="hero__edition">BLR — IN <b>·</b> 2026</span>
        </div>

        <div className="hero__main">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow hero-enter" style={entrance(100)}>
              <span>FULL-STACK DEVELOPER</span>
              <span className="hero__eyebrow-divider">/</span>
              <span>AI + CYBERSECURITY</span>
            </p>

            <h1 id="hero-title" className="hero__title" aria-label="Akshat Gupta">
              <span className="hero__name-line">
                <BlurText
                  as="span"
                  text="AKSHAT"
                  className="hero__name"
                  animateBy="chars"
                  direction="bottom"
                  delay={29}
                  stepDuration={0.27}
                  threshold={0.01}
                  animationFrom={{ opacity: 0, y: 84, filter: 'blur(15px)' }}
                  animationTo={[
                    { opacity: 0.55, y: -8, filter: 'blur(3px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)' },
                  ]}
                  easing={t => 1 - Math.pow(1 - t, 3)}
                />
              </span>
              <span className="hero__name-line hero__name-line--accent">
                <BlurText
                  as="span"
                  text="GUPTA"
                  className="hero__name"
                  animateBy="chars"
                  direction="bottom"
                  delay={39}
                  stepDuration={0.29}
                  threshold={0.01}
                  animationFrom={{ opacity: 0, y: 90, filter: 'blur(18px)' }}
                  animationTo={[
                    { opacity: 0.5, y: -9, filter: 'blur(3px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)' },
                  ]}
                  easing={t => 1 - Math.pow(1 - t, 3)}
                />
                <span className="hero__name-period" aria-hidden="true">.</span>
              </span>
            </h1>

            <p className="hero__tagline hero-enter" style={entrance(510)}>
              Build<span>.</span> Learn<span>.</span> Improve<span>.</span> Repeat<span>.</span>
            </p>
            <p className="hero__intro hero-enter" style={entrance(620)}>
              BCA student at Jain University, Bengaluru. I build useful software across the stack, with interests in AI applications and cybersecurity.
            </p>

            <div className="hero__actions hero-enter" style={entrance(735)}>
              <a className="button button-primary" href="#projects">
                Explore the work <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#contact">
                Say hello <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                className="button button-quiet hero__resume"
                href="/resume.pdf"
                download="Akshat-Gupta-Resume.pdf"
                aria-label="Download Akshat Gupta’s résumé as a PDF"
              >
                Résumé <Download size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="hero__meta hero-enter" style={entrance(850)}>
              <span><MapPin size={14} aria-hidden="true" /> Bengaluru, India</span>
              <span className="hero__meta-rule" />
              <span>BCA <b>·</b> Jain University</span>
            </div>
          </div>

        </div>

        <a className="hero__scroll" href="#projects">
          <span>Scroll to explore</span>
          <span className="hero__scroll-line" />
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

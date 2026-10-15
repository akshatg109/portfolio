import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { contact } from '../data/contact.js'

export default function HeroIntro({ onExplore }) {
  return (
    <div className="hero-copy">
      <p className="eyebrow reveal reveal--one">
        FULL-STACK DEVELOPER <span aria-hidden="true">/</span> AI BUILDER <span aria-hidden="true">/</span> CYBERSECURITY ENTHUSIAST
      </p>
      <h1 className="hero-title reveal reveal--two">
        Building beyond<br />the <span>ordinary.</span>
      </h1>
      <p className="hero-intro reveal reveal--three">
        I’m Akshat Gupta, a BCA student at Jain University in Bengaluru. I build full-stack products and practical AI experiences, with a strong interest in defensive cybersecurity.
      </p>

      <div className="hero-actions reveal reveal--four">
        <button className="action-button action-button--primary" type="button" onClick={onExplore}>
          Explore projects <ArrowRight size={16} aria-hidden="true" />
        </button>
        <a className="action-button action-button--quiet" href="/resume.pdf" download="Akshat-Gupta-Resume.pdf">
          Download résumé <Download size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="hero-utility reveal reveal--five">
        <div className="social-links" aria-label="Social and contact links">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
            <Github size={17} aria-hidden="true" />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
            <Linkedin size={17} aria-hidden="true" />
          </a>
          <a href={`mailto:${contact.email}`} aria-label={`Email Akshat at ${contact.email}`}>
            <Mail size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="hero-study reveal reveal--six">
        <span className="hero-study__marker" aria-hidden="true" /> BCA <span aria-hidden="true">·</span> JAIN UNIVERSITY <span aria-hidden="true">·</span> BENGALURU, INDIA
      </p>
    </div>
  )
}

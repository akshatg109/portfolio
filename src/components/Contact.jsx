import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { contact } from '../data/contact.js'
import Reveal from './Reveal.jsx'

export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <Reveal>
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="eyebrow section-eyebrow">
              <span className="eyebrow-index">05</span>
              <span>Open to good ideas</span>
            </p>
            <h2 id="contact-heading">Have something<br /><span>worth building?</span></h2>
            <p className="contact-description">
              I’m open to internship opportunities and collaborations where I can contribute across the stack and keep learning by building.
            </p>
            <a
              className="button button-primary contact-cta"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Akshat Gupta on GitHub (opens in a new tab)"
            >
              Find me on GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="contact-details" aria-label="Contact profiles">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} aria-hidden="true" />
              <span>GitHub</span>
              <span className="contact-detail-value">akshatg109</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            {contact.linkedin ? (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile (opens in a new tab)">
                <Linkedin size={17} aria-hidden="true" />
                <span>LinkedIn</span>
                <span className="contact-detail-value">akshatg109</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <div className="contact-placeholder is-unavailable">
                <Linkedin size={17} aria-hidden="true" />
                <span>LinkedIn</span>
                <span className="contact-detail-value">Profile link to be added</span>
              </div>
            )}
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span>Email</span>
                <span className="contact-detail-value">{contact.email}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <div className="contact-placeholder is-unavailable">
                <Mail size={17} aria-hidden="true" />
                <span>Email</span>
                <span className="contact-detail-value">Address to be added</span>
              </div>
            )}
          </div>
          <span className="contact-watermark" aria-hidden="true">AG</span>
        </div>
      </Reveal>
    </section>
  )
}

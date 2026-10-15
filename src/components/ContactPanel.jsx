import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { contact } from '../data/contact.js'

const destinations = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, note: 'START A CONVERSATION' },
  { label: 'GitHub', value: 'github.com/akshatg109', href: contact.github, Icon: Github, note: 'CODE & PROJECTS', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/akshatg109', href: contact.linkedin, Icon: Linkedin, note: 'CONNECT PROFESSIONALLY', external: true },
]

export default function ContactPanel({ onBack }) {
  return (
    <section className="contact-view content-frame" aria-labelledby="contact-title">
      <div className="view-kicker"><span>03 / OPEN CHANNELS</span><span>BLR · INDIA</span></div>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">HAVE A GOOD PROBLEM?</p>
          <h1 id="contact-title">Let’s build<br /><span>something useful.</span></h1>
          <p>I’m open to internship opportunities and collaborations where I can contribute, learn, and make thoughtful software.</p>
          <a className="action-button action-button--primary contact-resume" href="/resume.pdf" download="Akshat-Gupta-Resume.pdf">
            Download résumé <Download size={15} aria-hidden="true" />
          </a>
        </div>

        <nav className="contact-destinations" aria-label="Contact Akshat">
          {destinations.map(({ label, value, href, Icon, note, external }) => (
            <a
              className="contact-destination"
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
            >
              <span className="contact-destination__icon"><Icon size={18} aria-hidden="true" /></span>
              <span className="contact-destination__body"><small>{note}</small><strong>{value}</strong></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
          <div className="contact-coordinate" aria-hidden="true"><span>DIRECT ROUTES</span>MAIL / CODE / NETWORK</div>
        </nav>
      </div>
      <button className="contact-back" type="button" onClick={onBack}><ArrowDownRight size={14} aria-hidden="true" /> RETURN TO EXPLORE</button>
    </section>
  )
}

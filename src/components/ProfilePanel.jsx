import { GraduationCap } from 'lucide-react'
import { achievements } from '../data/achievements.js'
import SkillConstellation from './SkillConstellation.jsx'

export default function ProfilePanel() {
  return (
    <section className="profile-view content-frame" aria-labelledby="profile-title">
      <div className="view-kicker"><span>02 / PERSONNEL FILE</span><span>AKSHAT GUPTA</span></div>

      <div className="profile-composition">
        <div className="profile-upper">
          <div className="profile-main">
            <p className="eyebrow">CURIOUS ABOUT THE WHOLE STACK</p>
            <h1 id="profile-title">Learn fast.<br /><span>Build thoughtfully.</span></h1>
            <p className="profile-intro">
              BCA student at Jain University, Bengaluru. I work across full-stack development and AI applications, and I’m interested in building safer, more useful software.
            </p>

            <div className="education-line">
              <span className="education-line__icon" aria-hidden="true"><GraduationCap size={19} strokeWidth={1.6} /></span>
              <div>
                <span>STUDYING NOW</span>
                <strong>Bachelor of Computer Applications</strong>
                <small>Jain University · Bengaluru</small>
              </div>
              <span className="education-line__orbit" aria-hidden="true">BCA</span>
            </div>
          </div>

          <SkillConstellation />
        </div>

        <section className="mission-log" aria-labelledby="mission-log-title">
          <div className="mission-log__heading">
            <div><p className="micro-label">MILESTONES / VERIFIED</p><h2 id="mission-log-title">Mission log</h2></div>
            <span>THREE SIGNALS FROM THE FIELD</span>
          </div>
          <ol>
            {achievements.map(item => (
              <li className="mission-entry" key={item.number}>
                <span className="mission-entry__number">{item.number}</span>
                <div className="mission-entry__body">
                  <div className="mission-entry__meta"><span>{item.type}</span><strong>{item.result}</strong></div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Terminal } from 'lucide-react'
import ContactPanel from './components/ContactPanel.jsx'
import HeroIntro from './components/HeroIntro.jsx'
import OrbitScene from './components/OrbitScene.jsx'
import ProfilePanel from './components/ProfilePanel.jsx'
import ProjectDetails from './components/ProjectDetails.jsx'
import TerminalPanel from './components/TerminalPanel.jsx'
import { contact } from './data/contact.js'
import { projects } from './data/projects.js'

const destinations = [
  { id: 'explore', label: 'Explore', number: '01' },
  { id: 'profile', label: 'Profile', number: '02' },
  { id: 'contact', label: 'Contact', number: '03' },
]

function Brand({ onClick }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label="Akshat Gupta. Go to Explore.">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="4" fill="currentColor" />
          <ellipse cx="22" cy="22" rx="17" ry="8.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(-32 22 22)" />
          <circle cx="34.7" cy="13.2" r="2.2" fill="var(--cyan)" />
        </svg>
      </span>
      <span className="brand-copy"><strong>ORBIT</strong><small>AKSHAT GUPTA / PORTFOLIO</small></span>
    </button>
  )
}

function DestinationNav({ activeView, onNavigate }) {
  return (
    <nav className="destination-nav" aria-label="Portfolio destinations">
      {destinations.map(destination => (
        <button
          className={`destination-nav__item${activeView === destination.id ? ' is-active' : ''}`}
          type="button"
          key={destination.id}
          aria-current={activeView === destination.id ? 'page' : undefined}
          onClick={() => onNavigate(destination.id)}
        >
          <span className="destination-nav__number">{destination.number}</span>
          <span>{destination.label}</span>
          <i aria-hidden="true" />
        </button>
      ))}
    </nav>
  )
}

function TopBar({
  activeView,
  onNavigate,
  terminalOpen,
  onToggleTerminal,
  terminalTriggerRef,
}) {
  return (
    <header className="topbar content-frame">
      <Brand onClick={() => onNavigate('explore')} />
      <DestinationNav activeView={activeView} onNavigate={onNavigate} />
      <div className="topbar__utilities">
        <span className="topbar-location">BENGALURU <i aria-hidden="true">/</i> INDIA</span>
        <button
          className={`terminal-launch${terminalOpen ? ' is-open' : ''}`}
          type="button"
          ref={terminalTriggerRef}
          aria-label={terminalOpen ? 'Close developer terminal' : 'Open developer terminal'}
          aria-expanded={terminalOpen}
          onClick={onToggleTerminal}
        >
          <Terminal size={15} aria-hidden="true" /><span>TERMINAL</span><i aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

function MissionStrip() {
  return (
    <footer className="mission-strip content-frame">
      <span className="mission-strip__left"><i aria-hidden="true" /> PERSONAL DEVELOPER UNIVERSE</span>
      <span className="mission-strip__center">4 PROJECTS <b>·</b> 3 MILESTONES</span>
      <a className="mission-strip__right" href={contact.github} target="_blank" rel="noopener noreferrer">
        OPEN SOURCE TRAIL <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </footer>
  )
}

export default function App() {
  const [activeView, setActiveView] = useState('explore')
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProjectId, setHoveredProjectId] = useState(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [focusProjectId, setFocusProjectId] = useState(null)
  const terminalTriggerRef = useRef(null)
  const planetButtonsRef = useRef({})
  const returnTerminalFocusRef = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (terminalOpen || !returnTerminalFocusRef.current) return
    returnTerminalFocusRef.current = false
    terminalTriggerRef.current?.focus({ preventScroll: true })
  }, [terminalOpen])

  const navigateTo = view => {
    setActiveView(view)
    setHoveredProjectId(null)
  }

  const closeTerminal = () => {
    returnTerminalFocusRef.current = true
    setTerminalOpen(false)
  }

  const toggleTerminal = () => {
    if (terminalOpen) {
      closeTerminal()
      return
    }
    returnTerminalFocusRef.current = false
    setTerminalOpen(true)
  }

  const selectProject = project => {
    setActiveView('explore')
    setSelectedProject(project)
    setHoveredProjectId(project.id)
  }

  const openProjectFromTerminal = project => {
    setActiveView('explore')
    setSelectedProject(project)
    setHoveredProjectId(project.id)
    setTerminalOpen(false)
    returnTerminalFocusRef.current = false
    setFocusProjectId(project.id)
  }

  const closeProjectDetails = () => {
    const projectId = selectedProject?.id
    setSelectedProject(null)
    setHoveredProjectId(null)
    window.requestAnimationFrame(() => planetButtonsRef.current[projectId]?.focus({ preventScroll: true }))
  }

  const renderActiveView = () => {
    if (activeView === 'profile') return <ProfilePanel key="profile" />
    if (activeView === 'contact') return <ContactPanel key="contact" onBack={() => navigateTo('explore')} />

    return (
      <section className="explore-view" aria-label="Explore projects">
        <div className="explore-layout content-frame">
          <div className="explore-copy">
            <AnimatePresence mode="wait" initial={false}>
              {selectedProject ? (
                <ProjectDetails key={selectedProject.id} project={selectedProject} onClose={closeProjectDetails} />
              ) : (
                <HeroIntro key="hero-intro" onExplore={() => selectProject(projects[0])} />
              )}
            </AnimatePresence>
          </div>
          <OrbitScene
            projects={projects}
            selectedProjectId={selectedProject?.id}
            hoveredProjectId={hoveredProjectId}
            onHoverProject={setHoveredProjectId}
            onLeaveProject={() => setHoveredProjectId(null)}
            onSelectProject={selectProject}
            focusProjectId={focusProjectId}
            onProjectFocused={() => setFocusProjectId(null)}
            registerPlanetButton={(projectId, node) => {
              if (node) planetButtonsRef.current[projectId] = node
            }}
          />
        </div>
      </section>
    )
  }

  const activeHeading = activeView === 'profile' ? 'profile-title' : activeView === 'contact' ? 'contact-title' : selectedProject ? 'project-detail-title' : 'hero-title'

  return (
    <div className="portfolio-app">
      <div className="space-backdrop" aria-hidden="true"><span /><span /><span /></div>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <TopBar
        activeView={activeView}
        onNavigate={navigateTo}
        terminalOpen={terminalOpen}
        onToggleTerminal={toggleTerminal}
        terminalTriggerRef={terminalTriggerRef}
      />

      <main className="main-shell" id="main-content" tabIndex="-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            className={`active-screen active-screen--${activeView}`}
            id="active-view"
            key={activeView}
            aria-labelledby={activeHeading}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderActiveView()}
          </motion.section>
        </AnimatePresence>
      </main>

      <MissionStrip />

      <AnimatePresence>
        {terminalOpen && (
          <TerminalPanel
            key="orbit-terminal"
            projects={projects}
            onClose={closeTerminal}
            onOpenProject={openProjectFromTerminal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

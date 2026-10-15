import { useEffect, useRef, useState } from 'react'
import AsciiPlanet from './AsciiPlanet.jsx'

const stars = Array.from({ length: 84 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  delay: `${(index % 11) * -0.63}s`,
  size: index % 8 === 0 ? '2px' : '1px',
  layer: index % 3,
}))

const orbitalSpeeds = [39, 54, 68, 82]
const orbitalPhases = [0, -19, -37, -56]
const orbitalAngles = [-21, 24, -13, 17]

export default function OrbitScene({
  projects,
  selectedProjectId,
  hoveredProjectId,
  onHoverProject,
  onLeaveProject,
  onSelectProject,
  registerPlanetButton,
  focusProjectId,
  onProjectFocused,
}) {
  const sceneRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const activeProject = projects.find(project => project.id === (selectedProjectId || hoveredProjectId))

  useEffect(() => {
    if (!sceneRef.current || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.08 })
    observer.observe(sceneRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!focusProjectId || !sceneRef.current) return undefined
    const frame = window.requestAnimationFrame(() => {
      const button = sceneRef.current?.querySelector(`.planet-button[data-project="${focusProjectId}"]`)
      if (!button) return
      button.focus({ preventScroll: true })
      onProjectFocused()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [focusProjectId])

  const moveScene = event => {
    if (event.pointerType !== 'mouse' || !sceneRef.current) return

    const bounds = sceneRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    sceneRef.current.style.setProperty('--pointer-x', x.toFixed(2))
    sceneRef.current.style.setProperty('--pointer-y', y.toFixed(2))
  }

  const resetScene = () => {
    sceneRef.current?.style.setProperty('--pointer-x', '0')
    sceneRef.current?.style.setProperty('--pointer-y', '0')
  }

  return (
    <section className="orbit-panel" aria-label="Interactive project planetary system">
      <div className="orbit-panel__topline">
        <span><i className="signal-dot" aria-hidden="true" /> 04 PROJECT WORLDS</span>
        <span>SELECT A PLANET TO SCAN</span>
      </div>

      <div
        className={`orbit-stage${isVisible ? '' : ' is-offscreen'}${selectedProjectId ? ' has-selection' : ''}`}
        ref={sceneRef}
        onPointerMove={moveScene}
        onPointerLeave={resetScene}
        role="group"
        aria-label="Four orbiting project planets. Select one to view its details."
      >
        {[0, 1, 2].map(layer => (
          <div className={`starfield starfield--${layer + 1}`} aria-hidden="true" key={layer}>
            {stars.filter(star => star.layer === layer).map((star, index) => (
              <i
                className={`star${index % 8 === 0 ? ' star--bright' : ''}`}
                key={`${layer}-${index}`}
                style={{ '--star-x': star.left, '--star-y': star.top, '--star-delay': star.delay, '--star-size': star.size }}
              />
            ))}
          </div>
        ))}
        <div className="nebula nebula--one" aria-hidden="true" />
        <div className="nebula nebula--two" aria-hidden="true" />
        <span className="cosmic-event cosmic-event--one" aria-hidden="true" />
        <span className="cosmic-event cosmic-event--two" aria-hidden="true" />

        <svg className="orbit-system" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          {projects.map((project, index) => (
            <ellipse
              className={`orbit-ring orbit-ring--${index + 1}${activeProject?.id === project.id ? ' is-highlighted' : ''}`}
              key={project.id}
              cx="500"
              cy="500"
              rx={[225, 310, 400, 490][index]}
              ry={[155, 220, 290, 365][index]}
              transform={`rotate(${orbitalAngles[index]} 500 500)`}
              pathLength="1"
              style={{ '--planet-accent': project.accent, '--ring-delay': `${0.2 + index * 0.11}s` }}
            />
          ))}
        </svg>

        <div className={`planet-tracks${selectedProjectId ? ' has-selection' : ''}`}>
          {projects.map((project, index) => (
            <div
              className={`orbit-track orbit-track--${index + 1}${selectedProjectId === project.id ? ' is-selected' : ''}`}
              key={project.id}
              style={{
                '--orbit-duration': `${orbitalSpeeds[index]}s`,
                '--orbit-phase': `${orbitalPhases[index]}s`,
                '--orbit-angle': `${orbitalAngles[index]}deg`,
              }}
            >
              <span className="planet-anchor">
                <button
                  className={`planet-button${selectedProjectId === project.id ? ' is-selected' : ''}`}
                  type="button"
                  style={{ '--planet-accent': project.accent }}
                  data-project={project.id}
                  aria-label={`${project.title}, ${project.category}. View project details.`}
                  aria-pressed={selectedProjectId === project.id}
                  ref={node => registerPlanetButton(project.id, node)}
                  onPointerEnter={() => onHoverProject(project.id)}
                  onPointerLeave={onLeaveProject}
                  onFocus={() => onHoverProject(project.id)}
                  onBlur={onLeaveProject}
                  onClick={() => onSelectProject(project)}
                >
                  <span className="planet-surface" aria-hidden="true" />
                  <span className="planet-tooltip" aria-hidden="true">
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                  </span>
                </button>
              </span>
            </div>
          ))}
        </div>

        <div className="stellar-core" aria-hidden="true">
          <span className="stellar-core__halo" />
          <span className="stellar-core__body" />
        </div>
        <div className="ascii-planet-wrap">
          <AsciiPlanet play={isVisible} />
        </div>

        <div className={`scene-telemetry${selectedProjectId ? ' is-locked' : ''}`} aria-live="polite" aria-atomic="true">
          <span className="scene-telemetry__code" key={selectedProjectId || 'idle'}>
            {selectedProjectId && activeProject ? `SIGNAL LOCK / ${activeProject.number}` : activeProject ? 'ACTIVE SIGNAL /' : 'AWAITING SIGNAL /'}
          </span>
          <span>{activeProject ? activeProject.title : 'AWAITING PLANET SELECTION'}</span>
        </div>
        <div className="scene-coordinate" aria-hidden="true">ORBITAL FIELD <b>01—04</b></div>
      </div>

      <nav className="planet-index" aria-label="Project index">
        {projects.map(project => (
          <button
            className={`planet-index__item${selectedProjectId === project.id ? ' is-active' : ''}`}
            key={project.id}
            type="button"
            style={{ '--planet-accent': project.accent }}
            aria-pressed={selectedProjectId === project.id}
            onFocus={() => onHoverProject(project.id)}
            onBlur={onLeaveProject}
            onPointerEnter={() => onHoverProject(project.id)}
            onPointerLeave={onLeaveProject}
            onClick={() => onSelectProject(project)}
          >
            <span>{project.number}</span>
            <strong>{project.title}</strong>
          </button>
        ))}
      </nav>
    </section>
  )
}

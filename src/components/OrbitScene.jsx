import { useEffect, useRef, useState } from 'react'
import AsciiPlanet from './AsciiPlanet.jsx'

const stars = Array.from({ length: 46 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  delay: `${(index % 9) * -0.7}s`,
  size: index % 7 === 0 ? '2px' : '1px',
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
  const activeProject = projects.find(project => project.id === (hoveredProjectId || selectedProjectId))

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
        className={`orbit-stage${isVisible ? '' : ' is-offscreen'}`}
        ref={sceneRef}
        onPointerMove={moveScene}
        onPointerLeave={resetScene}
        role="group"
        aria-label="Four orbiting project planets. Select one to view its details."
      >
        <div className="starfield" aria-hidden="true">
          {stars.map((star, index) => (
            <i
              className={`star${index % 7 === 0 ? ' star--bright' : ''}`}
              key={index}
              style={{ '--star-x': star.left, '--star-y': star.top, '--star-delay': star.delay, '--star-size': star.size }}
            />
          ))}
        </div>
        <div className="nebula nebula--one" aria-hidden="true" />
        <div className="nebula nebula--two" aria-hidden="true" />

        <div className="orbit-system" aria-hidden="true">
          {projects.map((project, index) => (
            <div
              className={`orbit-ring orbit-ring--${index + 1}${activeProject?.id === project.id ? ' is-highlighted' : ''}`}
              key={project.id}
              style={{ '--planet-accent': project.accent }}
            />
          ))}
        </div>

        <div className="planet-tracks">
          {projects.map((project, index) => (
            <div
              className={`orbit-track orbit-track--${index + 1}`}
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

        <div className="scene-telemetry" aria-live="polite" aria-atomic="true">
          <span className="scene-telemetry__code">ACTIVE SIGNAL /</span>
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

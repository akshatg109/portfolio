import { useState } from 'react'
import { skillGroups } from '../data/skills.js'

const connections = [
  { id: 'programming', path: 'M400 226 C305 132 181 72 44 52' },
  { id: 'frontend', path: 'M400 226 C495 132 619 72 756 52' },
  { id: 'backend', path: 'M400 226 C305 320 181 376 44 402' },
  { id: 'ai', path: 'M400 226 C495 320 619 376 756 402' },
  { id: 'workflow', path: 'M400 226 C400 307 400 377 400 444' },
]

export default function SkillConstellation() {
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [focusedId, setFocusedId] = useState(null)
  const activeId = hoveredId || focusedId || selectedId

  return (
    <div
      className={`skill-constellation${activeId ? ` has-active skill-constellation--${activeId}` : ''}`}
      role="group"
      aria-label="Interactive map of Akshat’s technical skills"
    >
      <svg className="skill-constellation__drawing" viewBox="0 0 800 460" aria-hidden="true">
        <defs>
          <radialGradient id="skill-sphere-fill" cx="34%" cy="24%" r="78%">
            <stop offset="0" stopColor="#d9fbff" stopOpacity=".86" />
            <stop offset=".2" stopColor="#7bdce9" stopOpacity=".42" />
            <stop offset=".64" stopColor="#6674d7" stopOpacity=".17" />
            <stop offset="1" stopColor="#171b45" stopOpacity=".04" />
          </radialGradient>
          <linearGradient id="skill-sphere-meridian" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#b8f7ff" stopOpacity=".72" />
            <stop offset=".5" stopColor="#7bbfe9" stopOpacity=".15" />
            <stop offset="1" stopColor="#ba9fff" stopOpacity=".64" />
          </linearGradient>
          <clipPath id="skill-sphere-clip">
            <circle cx="400" cy="226" r="126" />
          </clipPath>
        </defs>

        <ellipse className="skill-orbit skill-orbit--outer" cx="400" cy="226" rx="222" ry="112" transform="rotate(-24 400 226)" />
        <ellipse className="skill-orbit skill-orbit--inner" cx="400" cy="226" rx="170" ry="191" transform="rotate(31 400 226)" />
        {connections.map(connection => (
          <path
            className={`skill-link skill-link--${connection.id}${activeId === connection.id ? ' is-lit' : ''}`}
            d={connection.path}
            key={connection.id}
          />
        ))}

        <circle className="skill-sphere__atmosphere" cx="400" cy="226" r="157" />
        <circle className="skill-sphere__body" cx="400" cy="226" r="126" fill="url(#skill-sphere-fill)" />
        <g className="skill-sphere__mesh" clipPath="url(#skill-sphere-clip)">
          <ellipse cx="400" cy="226" rx="126" ry="42" />
          <ellipse cx="400" cy="226" rx="126" ry="82" />
          <ellipse cx="400" cy="226" rx="48" ry="126" />
          <ellipse cx="400" cy="226" rx="88" ry="126" />
          <ellipse className="skill-sphere__meridian" cx="400" cy="226" rx="111" ry="126" />
          <path d="M274 226h252M400 100v252" />
        </g>
        <circle className="skill-sphere__rim" cx="400" cy="226" r="126" />
        <circle className="skill-constellation__core" cx="400" cy="226" r="3.5" />
        {connections.map((connection, index) => {
          const points = [
            [44, 52], [756, 52], [44, 402], [756, 402], [400, 444],
          ][index]
          return (
            <circle
              className={`skill-node-point skill-node-point--${connection.id}${activeId === connection.id ? ' is-lit' : ''}`}
              cx={points[0]}
              cy={points[1]}
              key={`${connection.id}-point`}
              r="3"
            />
          )
        })}
      </svg>

      <div className="skill-constellation__nodes">
        {skillGroups.map(group => {
          const active = activeId === group.id
          const selected = selectedId === group.id
          return (
            <button
              className={`skill-node skill-node--${group.id}${active ? ' is-lit' : ''}`}
              key={group.id}
              type="button"
              style={{ '--skill-accent': group.accent }}
              aria-pressed={selected}
              onPointerEnter={() => setHoveredId(group.id)}
              onPointerLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(group.id)}
              onBlur={() => setFocusedId(null)}
              onClick={() => setSelectedId(previous => previous === group.id ? null : group.id)}
            >
              <span className="skill-node__heading">
                <span className="skill-node__index">{group.number}</span>
                <strong>{group.title}</strong>
              </span>
              <span className="skill-node__items">{group.items.join(' · ')}</span>
            </button>
          )
        })}
      </div>

      <p className="skill-constellation__hint">
        {selectedId
          ? `${skillGroups.find(group => group.id === selectedId)?.title} selected · all skills remain visible`
          : 'Focus or select a cluster to trace its signal'}
      </p>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {selectedId ? `${skillGroups.find(group => group.id === selectedId)?.title} selected. All skills remain visible.` : ''}
      </span>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export default function TransmissionPortal({ signalId = 0 }) {
  const portalRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!reduceMotion || !portalRef.current) return
    portalRef.current.style.setProperty('--portal-rotation-x', '0deg')
    portalRef.current.style.setProperty('--portal-rotation-y', '0deg')
  }, [reduceMotion])

  const tiltPortal = event => {
    if (reduceMotion || event.pointerType !== 'mouse' || !portalRef.current) return
    const bounds = portalRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    portalRef.current.style.setProperty('--portal-rotation-x', `${(y * -2.5).toFixed(2)}deg`)
    portalRef.current.style.setProperty('--portal-rotation-y', `${(x * 4).toFixed(2)}deg`)
  }

  const resetPortal = () => {
    portalRef.current?.style.setProperty('--portal-rotation-x', '0deg')
    portalRef.current?.style.setProperty('--portal-rotation-y', '0deg')
  }

  return (
    <div
      className="transmission-portal"
      ref={portalRef}
      onPointerMove={tiltPortal}
      onPointerLeave={resetPortal}
      aria-hidden="true"
    >
      <svg viewBox="0 0 720 390" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="portal-well" cx="46%" cy="42%" r="61%">
            <stop offset="0" stopColor="#9df6ff" stopOpacity=".3" />
            <stop offset=".46" stopColor="#6178e4" stopOpacity=".17" />
            <stop offset="1" stopColor="#111631" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="portal-edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#9af4f6" stopOpacity=".8" />
            <stop offset=".47" stopColor="#9b8bff" stopOpacity=".38" />
            <stop offset="1" stopColor="#79d9ff" stopOpacity=".76" />
          </linearGradient>
          <filter id="portal-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <clipPath id="portal-core-clip"><ellipse cx="360" cy="185" rx="74" ry="109" /></clipPath>
        </defs>

        <ellipse className="portal-field" cx="360" cy="185" rx="184" ry="151" />
        <ellipse className="portal-track portal-track--one" cx="360" cy="185" rx="264" ry="89" transform="rotate(-12 360 185)" />
        <ellipse className="portal-track portal-track--two" cx="360" cy="185" rx="232" ry="137" transform="rotate(31 360 185)" />
        <ellipse className="portal-track portal-track--three" cx="360" cy="185" rx="298" ry="69" transform="rotate(-29 360 185)" />

        <circle className="portal-halo" cx="360" cy="185" r="138" filter="url(#portal-blur)" />
        <ellipse className="portal-rim" cx="360" cy="185" rx="95" ry="132" />
        <ellipse className="portal-rim portal-rim--inner" cx="360" cy="185" rx="76" ry="111" />
        <ellipse className="portal-mouth" cx="360" cy="185" rx="70" ry="105" fill="url(#portal-well)" />
        <g className="portal-grid" clipPath="url(#portal-core-clip)">
          <path d="M270 150h180M270 185h180M270 220h180M300 65v240M330 65v240M360 65v240M390 65v240M420 65v240" />
        </g>
        <path className="portal-signal-arc" d="M276 242c37 75 128 105 194 53" pathLength="1" />
        {signalId > 0 && (
          <circle
            className="portal-transmission"
            key={signalId}
            cx="360"
            cy="185"
            r="73"
            aria-hidden="true"
          />
        )}
        <circle className="portal-beacon portal-beacon--one" cx="143" cy="229" r="3" />
        <circle className="portal-beacon portal-beacon--two" cx="554" cy="107" r="2.5" />
        <circle className="portal-beacon portal-beacon--three" cx="471" cy="306" r="2" />
      </svg>
      <span className="transmission-portal__caption">SIGNAL FIELD / OPEN</span>
    </div>
  )
}

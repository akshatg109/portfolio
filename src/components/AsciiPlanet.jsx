import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as asciiPlanet from 'ascii.rest/pieces/planet'

export default function AsciiPlanet({ play = true }) {
  const [frame, setFrame] = useState(() => asciiPlanet.default(0))
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || !play) {
      setFrame(asciiPlanet.default(0))
      return undefined
    }

    const startedAt = performance.now()
    let interval = null
    const update = () => {
      const elapsed = (performance.now() - startedAt) / 1000
      setFrame(asciiPlanet.default(elapsed))
    }
    const syncVisibility = () => {
      if (document.hidden) {
        if (interval !== null) window.clearInterval(interval)
        interval = null
      } else if (interval === null) {
        update()
        interval = window.setInterval(update, 1000 / 12)
      }
    }

    document.addEventListener('visibilitychange', syncVisibility)
    syncVisibility()

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
      if (interval !== null) window.clearInterval(interval)
    }
  }, [play, reduceMotion])

  return (
    <pre className="ascii-planet" role="img" aria-label="Animated ASCII ringed planet at the centre of the project system">
      {frame}
    </pre>
  )
}

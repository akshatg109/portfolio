import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const element = progressRef.current
    let frame = 0

    const update = () => {
      frame = 0
      const root = document.documentElement
      const range = root.scrollHeight - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0
      element?.style.setProperty('--scroll-progress', progress.toFixed(4))
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
}

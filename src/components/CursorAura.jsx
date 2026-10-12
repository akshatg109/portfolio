import { useEffect, useRef } from 'react'

export default function CursorAura() {
  const auraRef = useRef(null)

  useEffect(() => {
    const element = auraRef.current
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || !pointerQuery.matches || motionQuery.matches) return undefined

    let frame = 0
    let x = 0
    let y = 0

    const onPointerMove = event => {
      if (event.pointerType !== 'mouse') return
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        element.classList.add('is-visible')
      })
    }

    const onPointerLeave = () => element.classList.remove('is-visible')

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
}

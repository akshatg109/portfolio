import { useEffect, useRef } from 'react'
import { Ascii } from 'ascii.rest/react'
import * as flowField from 'ascii.rest/pieces/flow-field'

const FISH = Array.from({ length: 15 }, (_, index) => ({
  phase: index * 2.17,
  speed: 0.2 + (index % 4) * 0.035,
  spreadX: 0.18 + (index % 3) * 0.035,
  spreadY: 0.19 + (index % 4) * 0.025,
  size: 8 + (index % 3),
  color: index % 4 === 0 ? '143, 226, 220' : '188, 166, 255',
  glyph: index % 3 === 0 ? '<><' : '><>',
  x: 0,
  y: 0,
}))

export default function ProjectSchool() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true, desynchronized: true })
    if (!canvas || !context) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const state = {
      width: 1,
      height: 1,
      dpr: 1,
      pointer: { x: 0, y: 0, inside: false },
      reduced: motionQuery.matches,
      visible: false,
      frame: 0,
      lastFrame: 0,
    }

    const wake = () => {
      if (!state.frame && state.visible && !document.hidden && !state.reduced) {
        state.frame = requestAnimationFrame(draw)
      }
    }

    const draw = timestamp => {
      state.frame = 0
      if (!state.visible || document.hidden) return
      if (!state.reduced && timestamp - state.lastFrame < 1000 / 36) {
        state.frame = requestAnimationFrame(draw)
        return
      }

      state.lastFrame = timestamp
      const { width, height, dpr } = state
      const seconds = state.reduced ? 0 : timestamp / 1000
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      context.save()
      context.beginPath()
      context.ellipse(width * 0.5, height * 0.52, width * 0.41, height * 0.39, -0.12, 0, Math.PI * 2)
      context.setLineDash([1, 6])
      context.lineWidth = 0.7
      context.strokeStyle = 'rgba(188, 166, 255, 0.17)'
      context.stroke()
      context.restore()

      FISH.forEach((fish, index) => {
        const orbit = seconds * fish.speed + fish.phase
        const baseX = width * (0.5 + Math.cos(orbit) * fish.spreadX)
        const baseY = height * (0.5 + Math.sin(orbit * 1.23) * fish.spreadY)
        let targetX = baseX
        let targetY = baseY

        if (state.pointer.inside && !state.reduced) {
          const dx = baseX - state.pointer.x
          const dy = baseY - state.pointer.y
          const distance = Math.max(1, Math.hypot(dx, dy))
          const influence = Math.max(0, 1 - distance / Math.min(width * 0.52, 92)) ** 2
          targetX += (dx / distance) * influence * 28
          targetY += (dy / distance) * influence * 21
        }

        if (state.reduced) {
          fish.x = baseX
          fish.y = baseY
        } else {
          fish.x += (targetX - fish.x) * 0.13
          fish.y += (targetY - fish.y) * 0.13
        }

        const x = Math.max(5, Math.min(width - 5, fish.x))
        const y = Math.max(8, Math.min(height - 7, fish.y))
        const vx = -Math.sin(orbit) * fish.spreadX * fish.speed
        const vy = Math.cos(orbit * 1.23) * fish.spreadY * fish.speed * 1.23
        const angle = Math.atan2(vy, vx)
        const opacity = 0.4 + (Math.sin(seconds * 1.4 + index) + 1) * 0.13

        context.save()
        context.translate(x, y)
        context.rotate(angle)
        context.font = `${fish.size}px "DM Mono", "SFMono-Regular", Consolas, monospace`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillStyle = `rgba(${fish.color}, ${opacity})`
        context.fillText(fish.glyph, 0, 0)
        context.fillStyle = `rgba(${fish.color}, ${opacity * 0.32})`
        context.fillText('·', -fish.size * 1.45, 0)
        context.restore()
      })

      if (!state.reduced) state.frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      state.width = Math.max(1, rect.width)
      state.height = Math.max(1, rect.height)
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(state.width * state.dpr)
      canvas.height = Math.round(state.height * state.dpr)
      state.lastFrame = 0
      FISH.forEach(fish => {
        const orbit = fish.phase
        fish.x = state.width * (0.5 + Math.cos(orbit) * fish.spreadX)
        fish.y = state.height * (0.5 + Math.sin(orbit * 1.23) * fish.spreadY)
      })
      if (state.visible && state.reduced) draw(performance.now())
      else wake()
    }

    const onPointerMove = event => {
      if (event.pointerType !== 'mouse' || state.reduced) return
      const rect = canvas.getBoundingClientRect()
      state.pointer.x = event.clientX - rect.left
      state.pointer.y = event.clientY - rect.top
      state.pointer.inside = state.pointer.x >= 0 && state.pointer.y >= 0
        && state.pointer.x <= rect.width && state.pointer.y <= rect.height
      if (state.pointer.inside) wake()
    }

    const onPointerLeave = () => {
      state.pointer.inside = false
      wake()
    }

    const onVisibilityChange = () => {
      if (!document.hidden) wake()
    }

    const onMotionChange = event => {
      state.reduced = event.matches
      if (state.frame) cancelAnimationFrame(state.frame)
      state.frame = 0
      if (state.reduced && state.visible) draw(performance.now())
      else wake()
    }

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null
    const intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
        state.visible = entry.isIntersecting
        if (state.visible && state.reduced) draw(performance.now())
        else if (state.visible) wake()
        else if (state.frame) {
          cancelAnimationFrame(state.frame)
          state.frame = 0
        }
      }, { threshold: 0.01 })
      : null

    resizeObserver?.observe(canvas)
    intersectionObserver?.observe(canvas)
    if (!resizeObserver) window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionQuery.addEventListener?.('change', onMotionChange)
    resize()
    if (!intersectionObserver) {
      state.visible = true
      if (state.reduced) draw(performance.now())
      else wake()
    }

    return () => {
      if (state.frame) cancelAnimationFrame(state.frame)
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionQuery.removeEventListener?.('change', onMotionChange)
    }
  }, [])

  return (
    <figure className="project-school" aria-hidden="true">
      <div className="project-school__frame">
        <Ascii
          piece={flowField}
          options={{ fps: 14 }}
          className="project-school__flow"
          label="Animated ASCII currents flowing across a field"
        />
        <canvas ref={canvasRef} className="project-school__canvas" />
      </div>
      <figcaption>
        <span>ASCII / FLOW + FLOCK</span>
        <span>move <i>+</i></span>
      </figcaption>
    </figure>
  )
}

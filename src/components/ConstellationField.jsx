import { useEffect, useRef } from 'react'

const ANCHORS = [
  [0.11, 0.35], [0.2, 0.2], [0.34, 0.29], [0.45, 0.17], [0.56, 0.38],
  [0.76, 0.28], [0.88, 0.47], [0.72, 0.64], [0.53, 0.76], [0.32, 0.67], [0.18, 0.55],
]

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0],
  [2, 4], [4, 7], [7, 9], [1, 10], [4, 6], [3, 5],
]

function randomGenerator(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function createParticles(width, height) {
  const random = randomGenerator(Math.round(width * 31 + height * 17))
  const anchorNodes = ANCHORS.map(([x, y], index) => ({
    x,
    y,
    phase: index * 0.76,
    drift: index % 2 ? 9 : 13,
    radius: index % 3 === 0 ? 2.3 : 1.5,
    anchor: true,
    cyan: index % 4 === 0,
  }))
  const count = Math.min(54, Math.max(20, Math.round((width * height) / 25000)))
  const dust = Array.from({ length: count }, (_, index) => ({
    x: random(),
    y: random(),
    phase: random() * Math.PI * 2,
    drift: 3 + random() * 8,
    radius: 0.7 + random() * 1.15,
    anchor: false,
    cyan: index % 7 === 0,
  }))
  return [...anchorNodes, ...dust]
}

export default function ConstellationField() {
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
      nodes: [],
      pointer: { x: 0, y: 0, inside: false },
      reduced: motionQuery.matches,
      visible: true,
      frame: 0,
      lastFrame: 0,
    }

    const wake = () => {
      if (!state.frame && state.visible && !document.hidden) {
        state.frame = requestAnimationFrame(draw)
      }
    }

    const draw = timestamp => {
      state.frame = 0
      if (!state.visible || document.hidden) return
      if (!state.reduced && timestamp - state.lastFrame < 1000 / 40) {
        state.frame = requestAnimationFrame(draw)
        return
      }

      state.lastFrame = timestamp
      const { width, height, dpr, nodes } = state
      const seconds = timestamp / 1000
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const points = nodes.map(node => {
        const baseX = node.x * width
        const baseY = node.y * height
        const phase = seconds * (node.anchor ? 0.19 : 0.28) + node.phase
        let x = baseX + Math.sin(phase) * node.drift
        let y = baseY + Math.cos(phase * 0.83) * node.drift * 0.72

        if (state.pointer.inside && !state.reduced) {
          const dx = baseX - state.pointer.x
          const dy = baseY - state.pointer.y
          const distance = Math.max(1, Math.hypot(dx, dy))
          const influence = Math.max(0, 1 - distance / 220) ** 2
          x += (dx / distance) * influence * 20
          y += (dy / distance) * influence * 20
        }
        return { ...node, x, y }
      })

      context.save()
      context.translate(width * 0.62, height * 0.51)
      context.rotate(-0.31)
      context.beginPath()
      context.ellipse(0, 0, width * 0.245, height * 0.35, 0, 0, Math.PI * 2)
      context.setLineDash([2, 10])
      context.lineWidth = 0.7
      context.strokeStyle = 'rgba(179, 156, 255, 0.15)'
      context.stroke()
      context.restore()

      const pulse = state.reduced ? 0.22 : 0.18 + (Math.sin(seconds * 1.3) + 1) * 0.045
      context.lineWidth = 0.8
      EDGES.forEach(([from, to], index) => {
        const start = points[from]
        const end = points[to]
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.strokeStyle = index % 5 === 0
          ? `rgba(131, 224, 219, ${pulse * 0.9})`
          : `rgba(184, 161, 255, ${pulse})`
        context.stroke()
      })

      const maxLink = Math.min(118, width * 0.14)
      for (let i = ANCHORS.length; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i]
          const b = points[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance >= maxLink) continue
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.strokeStyle = `rgba(164, 177, 209, ${(1 - distance / maxLink) * 0.12})`
          context.stroke()
        }
      }

      points.forEach(point => {
        const opacity = point.anchor ? 0.76 : 0.4
        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fillStyle = point.cyan
          ? `rgba(137, 229, 222, ${opacity})`
          : `rgba(216, 204, 255, ${opacity})`
        context.fill()
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
      state.nodes = createParticles(state.width, state.height)
      if (state.reduced) draw(performance.now())
      else wake()
    }

    const onPointerMove = event => {
      if (event.pointerType !== 'mouse' || state.reduced) return
      const rect = canvas.getBoundingClientRect()
      state.pointer.x = event.clientX - rect.left
      state.pointer.y = event.clientY - rect.top
      state.pointer.inside = state.pointer.x >= 0 && state.pointer.y >= 0
        && state.pointer.x <= rect.width && state.pointer.y <= rect.height
      wake()
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
      if (state.reduced) draw(performance.now())
      else wake()
    }

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null
    const intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
        state.visible = entry.isIntersecting
        if (state.visible) wake()
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

  return <canvas ref={canvasRef} className="constellation-field" aria-hidden="true" />
}

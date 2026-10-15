import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const glyphs = ' ·,:;-=+*ox%#@'
const frameInterval = 1000 / 30

function drawPlanet(canvas, time, tilt) {
  const context = canvas.getContext('2d', { alpha: true })
  if (!context) return

  const bounds = canvas.getBoundingClientRect()
  if (!bounds.width || !bounds.height) return

  const width = bounds.width
  const height = bounds.height
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  const pixelWidth = Math.round(width * pixelRatio)
  const pixelHeight = Math.round(height * pixelRatio)

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  context.clearRect(0, 0, width, height)

  const centerX = width * 0.5
  const centerY = height * 0.49
  const radius = Math.min(width * 0.34, height * 0.44)
  const cellWidth = Math.max(5.2, radius * 0.11)
  const cellHeight = cellWidth * 1.04
  const columns = Math.ceil(width / cellWidth)
  const rows = Math.ceil(height / cellHeight)
  const rotation = time * 0.18 + tilt.x * 0.32
  const cosine = Math.cos(rotation)
  const sine = Math.sin(rotation)
  const pitch = tilt.y * 0.18
  const pitchCosine = Math.cos(pitch)
  const pitchSine = Math.sin(pitch)
  const light = { x: -0.48, y: -0.44, z: 0.76 }

  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `${Math.max(6, cellHeight * 0.94)}px ui-monospace, SFMono-Regular, Consolas, monospace`

  for (let row = 0; row < rows; row += 1) {
    const screenY = centerY + (row - (rows - 1) / 2) * cellHeight
    const y = (screenY - centerY) / radius

    for (let column = 0; column < columns; column += 1) {
      const screenX = centerX + (column - (columns - 1) / 2) * cellWidth
      const x = (screenX - centerX) / radius
      const depthSquared = 1 - x * x - y * y
      if (depthSquared <= 0) continue

      const front = Math.sqrt(depthSquared)
      const pitchedY = y * pitchCosine - front * pitchSine
      const pitchedFront = y * pitchSine + front * pitchCosine
      const rotatedX = x * cosine + pitchedFront * sine
      const rotatedZ = -x * sine + pitchedFront * cosine
      const latitude = Math.asin(Math.max(-1, Math.min(1, pitchedY)))
      const longitude = Math.atan2(rotatedX, rotatedZ)
      const surface = 0.74 + 0.26 * Math.sin(longitude * 3.4 + Math.sin(latitude * 5.2))
      const diffuse = Math.max(0, rotatedX * light.x + pitchedY * light.y + rotatedZ * light.z)
      const rim = Math.pow(1 - front, 2.6) * 0.28
      const illumination = Math.min(1, (0.2 + diffuse * 0.76 + rim * 0.72) * surface)

      if (illumination < 0.095) continue

      const glyphIndex = Math.min(glyphs.length - 1, Math.floor(illumination * (glyphs.length - 1)))
      const red = Math.round(126 + illumination * 112)
      const green = Math.round(184 + illumination * 69)
      const blue = Math.round(218 + illumination * 37)
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.48 + illumination * 0.48})`
      context.fillText(glyphs[glyphIndex], screenX, screenY)
    }
  }
}

export default function AsciiPlanet({ play = true }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = canvas?.closest('.orbit-stage')
    if (!canvas) return undefined

    let frame = 0
    let lastDraw = 0
    let pointer = { x: 0, y: 0 }
    let currentTilt = { x: 0, y: 0 }
    const startedAt = performance.now()

    const readPointer = event => {
      if (!stage || event.pointerType !== 'mouse') return
      const bounds = stage.getBoundingClientRect()
      pointer = {
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      }
      if (reduceMotion) drawPlanet(canvas, 0, pointer)
    }

    const resetPointer = () => {
      pointer = { x: 0, y: 0 }
      if (reduceMotion) drawPlanet(canvas, 0, pointer)
    }

    const render = now => {
      frame = 0
      if (now - lastDraw < frameInterval && play && !reduceMotion) {
        frame = window.requestAnimationFrame(render)
        return
      }

      lastDraw = now
      const follow = reduceMotion ? 1 : 0.045
      currentTilt = {
        x: currentTilt.x + (pointer.x - currentTilt.x) * follow,
        y: currentTilt.y + (pointer.y - currentTilt.y) * follow,
      }
      drawPlanet(canvas, reduceMotion ? 0 : (now - startedAt) / 1000, currentTilt)

      if (play && !reduceMotion && !document.hidden) {
        frame = window.requestAnimationFrame(render)
      }
    }

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const syncVisibility = () => {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
      } else if (play && !reduceMotion) {
        requestRender()
      } else {
        drawPlanet(canvas, 0, currentTilt)
      }
    }

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(requestRender)

    resizeObserver?.observe(canvas)
    stage?.addEventListener('pointermove', readPointer, { passive: true })
    stage?.addEventListener('pointerleave', resetPointer, { passive: true })
    document.addEventListener('visibilitychange', syncVisibility)
    syncVisibility()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      stage?.removeEventListener('pointermove', readPointer)
      stage?.removeEventListener('pointerleave', resetPointer)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [play, reduceMotion])

  return (
    <canvas
      className="ascii-planet"
      ref={canvasRef}
      role="img"
      aria-label="A softly rotating ASCII-rendered planet at the centre of the project system"
    />
  )
}

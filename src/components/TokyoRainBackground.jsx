import { useEffect, useRef } from 'react'
import { Ascii } from 'ascii.rest/react'
import * as tokyoRain from 'ascii.rest/pieces/tokyo-rain'

const COLS = tokyoRain.meta.cols
const ROWS = tokyoRain.meta.rows
const MAX_PARTICLES = 420
const MAX_PARTICLES_PER_BURST = 32
const SCATTER_RADIUS = 58
const BACKGROUND = [7, 6, 13]

export default function TokyoRainBackground() {
  const backgroundRef = useRef(null)
  const scatterRef = useRef(null)

  useEffect(() => {
    const background = backgroundRef.current
    const hero = background?.closest('.hero')
    const scene = background?.querySelector('.hero__rain-canvas')
    const scatterCanvas = scatterRef.current
    const context = scatterCanvas?.getContext('2d')
    if (!background || !hero || !scene || !scatterCanvas || !context) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const particles = []
    let texture = null
    let visibleCells = null
    let sourceCellWidth = 0
    let sourceCellHeight = 0
    let logicalWidth = 0
    let logicalHeight = 0
    let pixelRatio = 1
    let animationFrame = 0
    let lastSpawnAt = 0

    const resetPointer = () => {
      background.style.setProperty('--rain-shift-x', '0px')
      background.style.setProperty('--rain-shift-y', '0px')
      background.style.setProperty('--rain-pointer-opacity', '0')
      scene.style.setProperty('--rain-scene-x', '-500px')
      scene.style.setProperty('--rain-scene-y', '-500px')
    }

    const clearParticles = () => {
      particles.length = 0
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = 0
      context.clearRect(0, 0, logicalWidth, logicalHeight)
    }

    const resizeScatter = () => {
      logicalWidth = scene.clientWidth
      logicalHeight = scene.clientHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      scatterCanvas.width = Math.max(1, Math.round(logicalWidth * pixelRatio))
      scatterCanvas.height = Math.max(1, Math.round(logicalHeight * pixelRatio))
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, logicalWidth, logicalHeight)
      texture = null
      visibleCells = null
      sourceCellWidth = 0
      sourceCellHeight = 0
    }

    const prepareTexture = () => {
      if (texture && visibleCells) return true
      if (!scene.width || !scene.height || !logicalWidth || !logicalHeight) return false

      const sourceContext = scene.getContext('2d')
      if (!sourceContext) return false

      const sprite = document.createElement('canvas')
      sprite.width = scene.width
      sprite.height = scene.height
      const spriteContext = sprite.getContext('2d', { willReadFrequently: true })
      if (!spriteContext) return false

      try {
        spriteContext.drawImage(scene, 0, 0)
        const image = spriteContext.getImageData(0, 0, sprite.width, sprite.height)
        const pixels = image.data
        visibleCells = new Uint8Array(COLS * ROWS)
        sourceCellWidth = sprite.width / COLS
        sourceCellHeight = sprite.height / ROWS

        for (let y = 0; y < sprite.height; y++) {
          const row = Math.min(ROWS - 1, Math.floor(y / sourceCellHeight))
          for (let x = 0; x < sprite.width; x++) {
            const offset = (y * sprite.width + x) * 4
            const contrast = Math.max(
              pixels[offset] - BACKGROUND[0],
              pixels[offset + 1] - BACKGROUND[1],
              pixels[offset + 2] - BACKGROUND[2],
            )

            if (contrast < 5) {
              pixels[offset + 3] = 0
              continue
            }

            pixels[offset + 3] = Math.min(255, Math.round(contrast * 7))
            const col = Math.min(COLS - 1, Math.floor(x / sourceCellWidth))
            visibleCells[row * COLS + col] = 1
          }
        }

        spriteContext.putImageData(image, 0, 0)
        texture = sprite
        return true
      } catch {
        visibleCells = null
        texture = null
        return false
      }
    }

    const animate = now => {
      animationFrame = 0
      if (motionQuery.matches || !particles.length) return

      context.clearRect(0, 0, logicalWidth, logicalHeight)
      const delta = Math.min(0.04, Math.max(0, (now - (animate.lastTime || now)) / 1000))
      animate.lastTime = now

      for (let index = particles.length - 1; index >= 0; index--) {
        const particle = particles[index]
        particle.age += delta
        if (particle.age >= particle.life) {
          particles.splice(index, 1)
          continue
        }

        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.vy += 20 * delta
        particle.rotation += particle.spin * delta

        const progress = particle.age / particle.life
        const fadeIn = Math.min(1, particle.age / 0.08)
        context.globalAlpha = fadeIn * (1 - progress) ** 0.7 * particle.opacity
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.drawImage(
          texture,
          particle.sourceX,
          particle.sourceY,
          sourceCellWidth,
          sourceCellHeight,
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height,
        )
        context.restore()
      }

      context.globalAlpha = 1
      if (particles.length) animationFrame = requestAnimationFrame(animate)
      else context.clearRect(0, 0, logicalWidth, logicalHeight)
    }

    const startAnimation = () => {
      if (!animationFrame && particles.length && !motionQuery.matches) {
        animate.lastTime = performance.now()
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const scatterAt = (x, y) => {
      const now = performance.now()
      if (now - lastSpawnAt < 52 || !prepareTexture()) return
      lastSpawnAt = now

      const cellWidth = logicalWidth / COLS
      const cellHeight = logicalHeight / ROWS
      if (!cellWidth || !cellHeight) return

      const centerCol = Math.floor(x / cellWidth)
      const centerRow = Math.floor(y / cellHeight)
      const radiusX = Math.ceil(SCATTER_RADIUS / cellWidth)
      const radiusY = Math.ceil(SCATTER_RADIUS / cellHeight)
      let spawned = 0

      for (let row = Math.max(0, centerRow - radiusY); row <= Math.min(ROWS - 1, centerRow + radiusY); row++) {
        for (let col = Math.max(0, centerCol - radiusX); col <= Math.min(COLS - 1, centerCol + radiusX); col++) {
          if (!visibleCells[row * COLS + col] || Math.random() > 0.34) continue

          const particleX = (col + 0.5) * cellWidth
          const particleY = (row + 0.5) * cellHeight
          const dx = particleX - x
          const dy = particleY - y
          const distance = Math.hypot(dx, dy)
          if (distance > SCATTER_RADIUS || spawned >= MAX_PARTICLES_PER_BURST) continue

          const angle = Math.atan2(dy || Math.random() - 0.5, dx || Math.random() - 0.5)
            + (Math.random() - 0.5) * 0.9
          const speed = 100 + Math.random() * 190
          const sourceX = col * sourceCellWidth
          const sourceY = row * sourceCellHeight

          particles.push({
            x: particleX,
            y: particleY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 12,
            age: 0,
            life: 0.5 + Math.random() * 0.55,
            rotation: (Math.random() - 0.5) * 0.35,
            spin: (Math.random() - 0.5) * 3.4,
            width: cellWidth * (0.8 + Math.random() * 0.65),
            height: cellHeight * (0.8 + Math.random() * 0.65),
            opacity: 0.6 + Math.random() * 0.4,
            sourceX,
            sourceY,
          })
          spawned++
        }
      }

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES)
      }
      startAnimation()
    }

    const onPointerMove = event => {
      if (event.pointerType !== 'mouse' || motionQuery.matches) {
        resetPointer()
        return
      }

      const sceneRect = scene.getBoundingClientRect()
      const heroRect = hero.getBoundingClientRect()
      const insideScene = event.clientX >= sceneRect.left
        && event.clientX <= sceneRect.right
        && event.clientY >= sceneRect.top
        && event.clientY <= sceneRect.bottom

      if (!insideScene || !sceneRect.width || !sceneRect.height) {
        resetPointer()
        return
      }

      const x = event.clientX - heroRect.left
      const y = event.clientY - heroRect.top
      const localX = ((event.clientX - sceneRect.left) / sceneRect.width) * logicalWidth
      const localY = ((event.clientY - sceneRect.top) / sceneRect.height) * logicalHeight
      const horizontal = ((event.clientX - sceneRect.left) / sceneRect.width - 0.5) * 2
      const vertical = ((event.clientY - sceneRect.top) / sceneRect.height - 0.5) * 2

      background.style.setProperty('--rain-shift-x', `${-horizontal * 52}px`)
      background.style.setProperty('--rain-shift-y', `${-vertical * 34}px`)
      background.style.setProperty('--rain-pointer-x', `${(x / heroRect.width) * 100}%`)
      background.style.setProperty('--rain-pointer-y', `${(y / heroRect.height) * 100}%`)
      background.style.setProperty('--rain-pointer-opacity', '1')
      scene.style.setProperty('--rain-scene-x', `${localX}px`)
      scene.style.setProperty('--rain-scene-y', `${localY}px`)
      scatterAt(localX, localY)
    }

    const onMotionChange = event => {
      if (event.matches) {
        resetPointer()
        clearParticles()
      }
    }

    resizeScatter()
    const resizeObserver = new ResizeObserver(resizeScatter)
    resizeObserver.observe(scene)
    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', resetPointer, { passive: true })
    motionQuery.addEventListener?.('change', onMotionChange)

    return () => {
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
      motionQuery.removeEventListener?.('change', onMotionChange)
      resizeObserver.disconnect()
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div ref={backgroundRef} className="hero__rain-background" aria-hidden="true">
      <Ascii
        piece={tokyoRain}
        options={{ fps: 15 }}
        className="hero__rain-canvas"
        label="Tokyo side street at night, glowing in the rain"
      />
      <canvas ref={scatterRef} className="hero__rain-scatter" />
      <span className="hero__rain-cursor" />
    </div>
  )
}

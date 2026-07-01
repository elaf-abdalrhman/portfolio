import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Interactive particle constellation for the hero backdrop.
 * Dots drift slowly, link to nearby neighbors with faint lines, and gently
 * react to the cursor. Performance guards:
 *  - particle count scales with viewport area (capped)
 *  - devicePixelRatio capped at 2
 *  - animation pauses when the hero scrolls out of view or the tab is hidden
 *  - fully disabled under prefers-reduced-motion
 */
export default function Particles() {
  const reduce = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let particles = []
    let running = true
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    const CYAN = [34, 211, 238]
    const VIOLET = [139, 92, 246]
    const LINK_DIST = 130
    const MOUSE_DIST = 170

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    function init() {
      const count = Math.min(80, Math.max(28, Math.floor((width * height) / 15000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
        c: Math.random() > 0.5 ? CYAN : VIOLET,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Gentle cursor attraction
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const md = Math.hypot(mdx, mdy)
        if (md < MOUSE_DIST && md > 0.01) {
          const pull = (1 - md / MOUSE_DIST) * 0.04
          p.vx += (mdx / md) * pull
          p.vy += (mdy / md) * pull
        }

        // Drift + light damping to keep speeds tame
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around edges
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Link to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.5
            ctx.strokeStyle = `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${a})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        // Link to cursor
        if (md < MOUSE_DIST) {
          const a = (1 - md / MOUSE_DIST) * 0.6
          ctx.strokeStyle = `rgba(${VIOLET[0]},${VIOLET[1]},${VIOLET[2]},${a})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // Draw dots on top (with a soft glow)
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.9)`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},0.8)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    function loop() {
      if (running && visible) step()
      raf = requestAnimationFrame(loop)
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onVisibility() {
      running = !document.hidden
    }

    // Pause when the hero leaves the viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    resize()
    loop()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  if (reduce) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}

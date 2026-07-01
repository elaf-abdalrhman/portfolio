import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Site-wide galaxy backdrop on a single fixed canvas:
 *   - a twinkling, multi-depth starfield (white / cyan / violet tints)
 *   - gentle horizontal drift + scroll parallax (far stars move slower)
 *   - occasional shooting stars / meteors with fading tails
 *
 * Calm, "slow/regular" motion by design. Performance guards: star count
 * scales with viewport, dpr capped at 2, pauses when the tab is hidden, and
 * under prefers-reduced-motion it paints a single static starfield (no loop).
 */
export default function Galaxy() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let stars = []
    let meteors = []
    let running = true
    let last = 0
    let nextMeteor = 1200

    const INK = '#0a0a0f'
    const COLORS = [
      [255, 255, 255], // white
      [180, 232, 255], // cyan-ish
      [201, 184, 255], // violet-ish
    ]

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
      if (reduce) drawStatic()
    }

    function initStars() {
      const count = Math.min(230, Math.max(70, Math.floor((w * h) / 8500)))
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() // 0 = far, 1 = near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth * 1.3 + 0.35,
          baseA: depth * 0.5 + 0.25,
          tw: Math.random() * Math.PI * 2,
          tws: Math.random() * 0.6 + 0.25,
          depth,
          drift: (Math.random() * 0.05 + 0.015) * (depth + 0.3),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }
      })
    }

    function spawnMeteor() {
      const fromLeft = Math.random() < 0.5
      const startX = fromLeft
        ? Math.random() * w * 0.4
        : w * 0.6 + Math.random() * w * 0.4
      const startY = Math.random() * h * 0.45
      const speed = Math.random() * 3 + 5
      const angle = Math.PI * (0.16 + Math.random() * 0.1) // shallow downward
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        len: Math.random() * 110 + 90,
        life: 0,
        maxLife: Math.random() * 45 + 55,
      })
    }

    function star(s, scroll) {
      const a = s.baseA * (0.55 + 0.45 * Math.sin(s.tw))
      let yy = (s.y - scroll * s.depth * 0.12) % h
      if (yy < 0) yy += h
      ctx.beginPath()
      ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`
      ctx.arc(s.x, yy, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawStatic() {
      ctx.fillStyle = INK
      ctx.fillRect(0, 0, w, h)
      for (const s of stars) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${s.baseA})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function frame(t) {
      raf = requestAnimationFrame(frame)
      if (!running) return
      if (!last) last = t
      const dt = Math.min(50, t - last)
      last = t

      ctx.fillStyle = INK
      ctx.fillRect(0, 0, w, h)

      const scroll = window.scrollY || 0

      // Stars
      for (const s of stars) {
        s.tw += s.tws * dt * 0.004
        s.x += s.drift * dt * 0.05
        if (s.x > w + 2) s.x = -2
        star(s, scroll)
      }

      // Meteors
      if (t > nextMeteor) {
        spawnMeteor()
        nextMeteor = t + (2600 + Math.random() * 4200)
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.vx
        m.y += m.vy
        m.life++
        const alpha = Math.sin(Math.min(1, m.life / m.maxLife) * Math.PI)
        const mag = Math.hypot(m.vx, m.vy) || 1
        const tx = m.x - (m.vx / mag) * m.len
        const ty = m.y - (m.vy / mag) * m.len
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty)
        grad.addColorStop(0, `rgba(190,240,255,${alpha})`)
        grad.addColorStop(0.4, `rgba(140,180,255,${alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(140,180,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        // bright head
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2)
        ctx.fill()

        if (m.life >= m.maxLife || m.y > h + 160 || m.x < -200 || m.x > w + 200) {
          meteors.splice(i, 1)
        }
      }
    }

    function onVisibility() {
      running = !document.hidden
      if (running) last = 0
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    if (!reduce) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  )
}

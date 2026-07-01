import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic, springy button/link. The element drifts toward the cursor while
 * hovered and springs back on leave. Renders as <a> if `href` is provided,
 * otherwise <button>. Falls back to a plain element under reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'primary', // 'primary' | 'ghost'
  className = '',
  strength = 0.35,
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  function handleMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform'

  const variants = {
    primary:
      'text-ink bg-gradient-to-r from-cyan to-violet hover:shadow-[0_0_30px_-6px_var(--color-cyan)]',
    ghost:
      'text-fg border border-line hover:border-cyan/70 hover:text-cyan bg-white/[0.02]',
  }

  const Tag = href ? motion.a : motion.button
  const tagProps = href ? { href } : { type: 'button' }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...tagProps}
      {...rest}
    >
      {children}
    </Tag>
  )
}

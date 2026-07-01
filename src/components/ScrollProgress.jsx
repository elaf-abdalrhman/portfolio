import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin "XP bar" at the very top of the page that fills as you scroll —
 * a subtle game-like progress cue. Cheap (single transform), and harmless
 * under reduced-motion (it just tracks position without easing).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan via-violet to-cyan shadow-[0_0_12px_var(--color-cyan)]"
    />
  )
}

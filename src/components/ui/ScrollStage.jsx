import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Gentle scroll-linked entrance: each section drifts up, fades in, and eases
 * from slightly distant to full size — like it's settling into place out of
 * the depth of space. Calm and smooth (cheap 2D transforms only), so the
 * galaxy backdrop stays the focal point. Disabled under reduced-motion.
 */
export default function ScrollStage({ children, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1])
  const y = useTransform(scrollYProgress, [0, 1], [55, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.7, 1])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div style={{ scale, y, opacity }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

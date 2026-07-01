import { motion, useReducedMotion } from 'framer-motion'
import Particles from './Particles'

/**
 * Cheap, tasteful hero backdrop:
 *  - two slowly drifting radial "mesh" blobs (cyan + violet)
 *  - a faint perspective grid that pans vertically
 *  - a vignette + top fade so content stays readable
 *
 * All movement is GPU-friendly (transform / background-position) and is
 * fully disabled under prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Faint moving grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--color-cyan) 22%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-violet) 18%, transparent) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 35%, #000 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 35%, #000 30%, transparent 78%)',
          animation: reduce ? 'none' : 'grid-pan 7s linear infinite',
        }}
      />

      {/* Drifting cyan blob */}
      <motion.div
        className="absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-cyan) 35%, transparent), transparent 62%)',
          filter: 'blur(40px)',
        }}
        animate={
          reduce ? undefined : { x: [0, 60, -20, 0], y: [0, 40, 10, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Drifting violet blob */}
      <motion.div
        className="absolute -right-40 top-10 h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-violet) 38%, transparent), transparent 62%)',
          filter: 'blur(48px)',
        }}
        animate={
          reduce ? undefined : { x: [0, -50, 20, 0], y: [0, 30, -20, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Interactive constellation, layered over the galaxy starfield */}
      <Particles />
    </div>
  )
}

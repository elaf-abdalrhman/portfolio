import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/content'

/**
 * Circular profile photo with a slowly rotating cyan→violet neon ring.
 * If the image is missing (not added yet), it gracefully falls back to the
 * person's initials on a gradient so the layout never breaks.
 */
export default function ProfilePhoto({ size = 'h-44 w-44' }) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <div className={`relative ${size} shrink-0`}>
      {/* Glow halo */}
      <div className="absolute inset-[-12%] rounded-full bg-cyan/15 blur-2xl" />

      {/* Rotating gradient ring */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, var(--color-cyan), var(--color-violet), var(--color-cyan))',
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner disc / image */}
      <div className="absolute inset-[3px] overflow-hidden rounded-full bg-ink-2">
        {!failed ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-cyan/20 to-violet/20">
            <span className="font-display text-4xl font-bold text-gradient">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

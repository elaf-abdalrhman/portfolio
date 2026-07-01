import { motion } from 'framer-motion'
import { navLinks } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'

const ids = navLinks.map((l) => l.href.replace('#', ''))

/**
 * Fixed vertical "level select" rail (desktop only). Shows LVL 01..N with a
 * connecting line; the node for the section you're in lights up and scales.
 * Reinforces the game-like progression. Hidden on small screens.
 */
export default function LevelRail() {
  const active = useActiveSection(ids)
  const activeIndex = Math.max(0, ids.indexOf(active))
  const total = navLinks.length

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      {/* Level counter */}
      <p className="mb-4 text-right font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
        LVL{' '}
        <span className="text-cyan">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-faint">/{String(total).padStart(2, '0')}</span>
      </p>

      <ul className="relative flex flex-col items-end gap-5">
        {/* Connecting rail */}
        <span className="absolute right-[5px] top-1 bottom-1 w-px bg-line" />

        {navLinks.map((link, i) => {
          const isActive = i === activeIndex
          const isDone = i < activeIndex
          return (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className="group flex items-center justify-end gap-3"
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Label appears on hover / when active */}
                <span
                  className={`font-display text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-cyan opacity-100'
                      : 'text-muted opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {link.label}
                </span>

                {/* Node */}
                <span className="relative grid h-[11px] w-[11px] place-items-center">
                  {isActive && (
                    <motion.span
                      layoutId="level-glow"
                      className="absolute inset-[-5px] rounded-full bg-cyan/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span
                    className={`relative h-[11px] w-[11px] rounded-full border transition-colors duration-300 ${
                      isActive
                        ? 'border-cyan bg-cyan shadow-[0_0_10px_var(--color-cyan)]'
                        : isDone
                          ? 'border-violet/70 bg-violet/70'
                          : 'border-line bg-ink'
                    }`}
                  />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

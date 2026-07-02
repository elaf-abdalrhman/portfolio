import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mail, Download, Sparkles } from 'lucide-react'
import { profile } from '../data/content'
import AnimatedBackground from './AnimatedBackground'
import ScrambleText from './ui/ScrambleText'
import MagneticButton from './ui/MagneticButton'
import ProfilePhoto from './ui/ProfilePhoto'

export default function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }
  const item = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      <AnimatedBackground />

      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
      <div>
        {/* Availability pill */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to remote · relocation
          </span>
        </motion.div>

        {/* Title eyebrow */}
        <motion.p
          variants={item}
          className="mt-7 flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.25em] text-cyan"
        >
          <Sparkles size={15} />
          {profile.title}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="block text-fg">Elaf</span>
          <span className="block text-gradient">Abd-Alrhman</span>
        </motion.h1>

        {/* Tagline with scramble effect */}
        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          <ScrambleText text={profile.tagline} startDelay={900} />
          {!reduce && (
            <span
              className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-cyan"
              style={{ animation: 'caret-blink 1s step-end infinite' }}
              aria-hidden="true"
            />
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            View Work
            <ArrowDown size={16} />
          </MagneticButton>
          <MagneticButton href={`mailto:${profile.email}`} variant="ghost">
            <Mail size={16} />
            Email Me
          </MagneticButton>
          <MagneticButton
            href={profile.cvUrl}
            variant="ghost"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={16} />
            Download CV
          </MagneticButton>
        </motion.div>
      </div>

        {/* Profile photo */}
        <motion.div variants={item} className="lg:shrink-0">
          <ProfilePhoto size="h-40 w-40 sm:h-52 sm:w-52 lg:h-80 lg:w-80" />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={22} />
        </motion.a>
      )}
    </section>
  )
}

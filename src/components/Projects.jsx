import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/content'
import Section from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'

function ProjectCard({ project }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Pointer-driven 3D tilt
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  })

  function onMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function onLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <RevealItem>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1000 }
        }
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="card group relative flex h-full flex-col rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_40px_-12px_var(--color-violet)]"
      >
        {/* Glow ring on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-cyan/40" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight text-fg">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-cyan">
              {project.subtitle}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted">
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tags */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-violet/5 px-2.5 py-1 text-xs font-medium text-fg/80"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Links — placeholders to fill in (see content.js) */}
        <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
          {/* TODO: set demoUrl in src/data/content.js */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-cyan"
          >
            <ExternalLink size={15} />
            Live demo
          </a>
          {/* TODO: set githubUrl in src/data/content.js */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-cyan"
          >
            <Github size={15} />
            Code
          </a>
          <ArrowUpRight
            size={18}
            className="ml-auto text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
          />
        </div>
      </motion.article>
    </RevealItem>
  )
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" index="03" title="Featured work">
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </RevealGroup>
    </Section>
  )
}

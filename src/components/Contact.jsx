import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight } from 'lucide-react'
import { profile, socials } from '../data/content'
import Reveal from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

export default function Contact() {
  const year = '2026' // update yearly if you like

  return (
    <footer id="contact" className="relative scroll-mt-24 px-5 pt-20 pb-10 sm:px-8 sm:pt-28">
      {/* Top hairline */}
      <div className="mx-auto mb-16 h-px max-w-6xl bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.25em] text-cyan">
            Contact
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl">
            Let's build something
            <span className="block text-gradient">intelligent.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            Open to AI Engineer roles — remote or relocation. The fastest way to
            reach me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary">
              <Mail size={16} />
              {profile.email}
            </MagneticButton>
          </div>
        </Reveal>

        {/* Detail row */}
        <Reveal
          delay={0.1}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="card group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-cyan/40"
          >
            <Mail size={18} className="text-cyan" />
            <span className="truncate text-sm text-fg/85 group-hover:text-cyan">
              {profile.email}
            </span>
          </a>
          <a
            href={`tel:${profile.phoneHref}`}
            className="card group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-cyan/40"
          >
            <Phone size={18} className="text-cyan" />
            <span className="text-sm text-fg/85 group-hover:text-cyan">
              {profile.phone}
            </span>
          </a>
          <div className="card flex items-center gap-3 rounded-xl p-4">
            <MapPin size={18} className="text-cyan" />
            <span className="text-sm text-fg/85">{profile.location}</span>
          </div>
        </Reveal>

        {/* Socials + copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-faint">
            © {year} {profile.name}. Built with React, Tailwind & Framer Motion.
          </p>

          <div className="flex items-center gap-3">
            {/* TODO: set socials.linkedin in src/data/content.js */}
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <Linkedin size={18} />
            </a>
            {/* TODO: set socials.github in src/data/content.js */}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <Github size={18} />
            </a>
            <a
              href="#top"
              className="ml-1 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-cyan"
            >
              Back to top
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Boxes, Languages, Server, ShieldCheck, Sparkles } from 'lucide-react'
import { profile, aboutHighlights } from '../data/content'
import Section from './ui/Section'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import ProfilePhoto from './ui/ProfilePhoto'

// Map content.js icon names -> imported components (keeps the bundle lean).
const ICONS = { Boxes, Languages, Server, ShieldCheck }

export default function About() {
  return (
    <Section id="about" eyebrow="About" index="01" title="Who I am">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Photo + summary */}
        <Reveal>
          <div className="mb-8 flex items-center gap-5">
            <ProfilePhoto size="h-28 w-28 sm:h-32 sm:w-32" />
            <div>
              <p className="font-display text-lg font-semibold text-fg">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-cyan">{profile.title}</p>
              <p className="mt-1 text-xs text-muted">{profile.location}</p>
            </div>
          </div>
          <p className="text-xl leading-relaxed text-fg sm:text-2xl">
            {profile.summary}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            I work where research meets production: turning models into
            reliable services that real users depend on — from Arabic-dialect
            search to on-prem LLMs with hard guardrails.
          </p>
        </Reveal>

        {/* Highlight cards */}
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {aboutHighlights.map((h) => {
            const Icon = ICONS[h.icon] ?? Sparkles
            return (
              <RevealItem
                key={h.title}
                className="card group rounded-2xl p-5 transition-colors duration-300 hover:border-cyan/40"
              >
                <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-cyan transition-colors group-hover:border-cyan/50">
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-base font-semibold text-fg">
                  {h.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {h.body}
                </p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </Section>
  )
}

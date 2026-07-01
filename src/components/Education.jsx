import { GraduationCap } from 'lucide-react'
import { education } from '../data/content'
import Section from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" index="05" title="Background">
      <RevealGroup className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
        {education.map((e) => (
          <RevealItem
            key={e.degree}
            className="card flex items-start gap-4 rounded-2xl p-6 transition-colors duration-300 hover:border-violet/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-violet">
              <GraduationCap size={20} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold leading-snug text-fg">
                {e.degree}
              </h3>
              <p className="mt-1 text-sm text-muted">{e.institution}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-cyan">
                {e.year}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

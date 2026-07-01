import { Briefcase, MapPin, ChevronRight } from 'lucide-react'
import { experience } from '../data/content'
import Section from './ui/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" index="02" title="Where I've shipped">
      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/60 via-violet/40 to-transparent sm:left-[11px]" />

        <div className="space-y-12">
          {experience.map((job) => (
            <div key={`${job.company}-${job.role}`} className="relative pl-10 sm:pl-14">
              {/* Node */}
              <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-ink ring-2 ring-cyan/70 sm:h-6 sm:w-6">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan sm:h-2 sm:w-2" />
              </span>

              <RevealGroup>
                <RevealItem className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold text-fg sm:text-2xl">
                    {job.role}
                  </h3>
                  <span className="text-cyan">·</span>
                  <span className="inline-flex items-center gap-1.5 text-lg font-medium text-cyan">
                    <Briefcase size={16} />
                    {job.company}
                  </span>
                </RevealItem>

                <RevealItem className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span>{job.period}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </RevealItem>

                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b, i) => (
                    <RevealItem
                      as="li"
                      key={i}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <ChevronRight
                        size={18}
                        className="mt-0.5 shrink-0 text-cyan/70"
                      />
                      <span>{b}</span>
                    </RevealItem>
                  ))}
                </ul>
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

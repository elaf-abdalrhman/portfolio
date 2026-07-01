import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Server, LineChart, Globe } from 'lucide-react'
import { skills } from '../data/content'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

const CATEGORY_ICON = {
  'AI & ML': Brain,
  'Backend & Architecture': Server,
  'Data & Analytics': LineChart,
  Languages: Globe,
}

export default function Skills() {
  const reduce = useReducedMotion()

  return (
    <Section id="skills" eyebrow="Skills" index="04" title="What I work with">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, gi) => {
          const Icon = CATEGORY_ICON[group.category] ?? Brain
          return (
            <Reveal
              key={group.category}
              delay={gi * 0.05}
              className="card rounded-2xl p-6"
            >
              <h3 className="mb-5 flex items-center gap-2.5 font-display text-base font-semibold text-fg">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                  <Icon size={17} />
                </span>
                {group.category}
              </h3>

              <motion.ul
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.04 } },
                }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={
                      reduce
                        ? {}
                        : {
                            hidden: { opacity: 0, scale: 0.85, y: 6 },
                            show: { opacity: 1, scale: 1, y: 0 },
                          }
                    }
                    whileHover={
                      reduce
                        ? undefined
                        : { y: -3, borderColor: 'rgba(34,211,238,0.5)' }
                    }
                    className="cursor-default rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-sm font-medium text-fg/85 transition-colors hover:text-cyan"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

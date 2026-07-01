import Reveal from './Reveal'

/**
 * Consistent section shell: id anchor, max width, padding, and an optional
 * numbered/eyebrow header with a gradient hairline.
 */
export default function Section({
  id,
  eyebrow,
  title,
  index,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {(eyebrow || title) && (
        <Reveal className="mb-12 sm:mb-16">
          {eyebrow && (
            <p className="mb-3 flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.25em] text-cyan">
              {index && <span className="text-faint">{index}</span>}
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {title}
            </h2>
          )}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan/50 via-violet/30 to-transparent" />
        </Reveal>
      )}
      {children}
    </section>
  )
}

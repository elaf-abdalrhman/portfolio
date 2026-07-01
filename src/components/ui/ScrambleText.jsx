import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01_AIﻉﻅ'

/**
 * Text-scramble reveal: cycles random glyphs that resolve left-to-right into
 * the final string. Under reduced-motion it renders the final text instantly.
 */
export default function ScrambleText({ text, className = '', startDelay = 0 }) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? text : '')
  const frame = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(text)
      return
    }

    let mounted = true
    const total = text.length
    const settleSpeed = 1.6 // chars resolved per frame-ish

    const tick = () => {
      if (!mounted) return
      const progress = frame.current
      let out = ''
      for (let i = 0; i < total; i++) {
        if (i < progress) {
          out += text[i]
        } else if (text[i] === ' ') {
          out += ' '
        } else {
          out += GLYPHS[Math.floor((frame.current * 7 + i * 13) % GLYPHS.length)]
        }
      }
      setDisplay(out)
      frame.current += settleSpeed
      if (progress < total) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      mounted = false
      clearTimeout(timer)
      cancelAnimationFrame(raf.current)
    }
  }, [text, reduce, startDelay])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

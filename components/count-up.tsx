'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { isCountableValue, parseCountValue } from '@/lib/count-up'

type CountUpProps = {
  value: string
  suffix?: string
  className?: string
}

// Animates the numeric part of a value like "36,300" while preserving separators.
export function CountUp({ value, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  const target = parseCountValue(value)
  const isNumeric = isCountableValue(value)
  // Only group with thousands separators if the source value already uses them.
  const grouped = value.includes(',')

  useEffect(() => {
    if (!inView || !isNumeric) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = Math.round(target * eased)
      setDisplay(grouped ? current.toLocaleString('en-US') : String(current))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [grouped, inView, isNumeric, target])

  return (
    <span ref={ref} className={className}>
      {isNumeric ? display : value}
      {suffix}
    </span>
  )
}

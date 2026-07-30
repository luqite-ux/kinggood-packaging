'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { formatCountValue, parseCountValue } from '@/lib/count-up'

type CountUpStatProps = {
  value: string
  suffix: string
}

export function CountUpStat({ value, suffix }: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const target = parseCountValue(value)
  const [displayValue, setDisplayValue] = useState(reduceMotion ? target : 0)

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(target)
      return
    }

    if (!isInView) return

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplayValue,
    })

    return () => controls.stop()
  }, [isInView, reduceMotion, target])

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{formatCountValue(displayValue)}{suffix}</span>
    </span>
  )
}

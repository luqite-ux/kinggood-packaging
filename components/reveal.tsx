'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useHydratedReducedMotion } from '@/lib/use-hydrated-reduced-motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 24, x = 0, className }: RevealProps) {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

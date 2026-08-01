'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { localizePath, type Locale } from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

type HeroProps = {
  locale?: Locale
  dictionary?: Dictionary
}

export function Hero({ locale = 'en', dictionary = defaultDictionary }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const metrics = [
    { value: 'Since 2010', label: dictionary.hero.metrics.operating },
    { value: '36,300 m²', label: dictionary.hero.metrics.facilityArea },
    { value: '5 Workshops', label: dictionary.hero.metrics.production },
    { value: '3,000+', label: dictionary.hero.metrics.palletsPerDay },
  ]

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label={dictionary.hero.ariaLabel}
    >
      <HeroCarousel labels={dictionary.carousel} />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[50vh] w-[40vw] rounded-full bg-[#e8a020]/10 blur-[140px]"
        animate={reduceMotion ? { opacity: 0.25 } : { opacity: [0.25, 0.45, 0.25] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-36">
        <motion.div
          variants={stagger}
          initial={false}
          animate="show"
          className="lg:col-span-8 xl:col-span-7"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8a020]" aria-hidden />
            {dictionary.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            {dictionary.hero.title}
            <br />
            <span className="text-[#e8a020]">{dictionary.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70 text-pretty"
          >
            {dictionary.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={localizePath('/contact', locale)}
              className="group inline-flex items-center gap-2 rounded bg-[#e8a020] px-6 py-3.5 text-sm font-bold text-[#3a2200] transition-all hover:bg-[#d89018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020]"
            >
              {dictionary.actions.requestQuote}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href={localizePath('/products', locale)}
              className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {dictionary.actions.exploreProducts}
            </Link>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="border-l-2 border-[#e8a020] pl-4">
                <dt className="text-xl font-bold tabular-nums text-white">{metric.value}</dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wide text-white/70">
                  {metric.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6 text-white/70" />
      </motion.div>
    </section>
  )
}

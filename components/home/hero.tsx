'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { company, IMAGES } from '@/lib/site'
import { getHeroBackgroundMotion } from '@/lib/hero-motion'

const METRICS = [
  { value: 'Since 2010', label: 'In Operation' },
  { value: '36,300 m²', label: 'Facility Area' },
  { value: '5 Workshops', label: 'Production' },
  { value: '3,000+', label: 'Pallets / Day' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const backgroundMotion = getHeroBackgroundMotion(Boolean(reduceMotion))

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          initial={backgroundMotion.initial}
          animate={backgroundMotion.animate}
          transition={backgroundMotion.transition}
        >
          <Image
            src={IMAGES.factoryExterior}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        {/* Layered overlays — never applied to text container */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071829]/95 via-[#071829]/80 to-[#071829]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071829]/70 via-transparent to-[#071829]/30" />
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
      </div>

      {/* Restrained ambient glow — right side only */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[50vh] w-[40vw] rounded-full bg-[#e8a020]/10 blur-[140px]"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-36">
        <motion.div
          variants={stagger}
          initial={false}
          animate="show"
          className="lg:col-span-8 xl:col-span-7"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8a020]" aria-hidden />
            {company.legalName}
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Engineered Wood Packaging
            <br />
            <span className="text-[#e8a020]">for Global Logistics</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70 text-pretty"
          >
            KINGGOOD designs and manufactures wooden pallets, heavy-duty wood crates and cable
            reels for industrial transportation, warehousing and export logistics. Solutions can
            be configured around cargo dimensions, load, handling equipment and destination
            requirements.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded bg-[#e8a020] px-6 py-3.5 text-sm font-bold text-[#3a2200] transition-all hover:bg-[#d89018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Metrics bar */}
          <motion.dl
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {METRICS.map((m) => (
              <div key={m.label} className="border-l-2 border-[#e8a020] pl-4">
                <dt className="text-xl font-bold tabular-nums text-white">{m.value}</dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wide text-white/50">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6 text-white/40" />
      </motion.div>
    </section>
  )
}

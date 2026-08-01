'use client'

import Image from 'next/image'
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type FocusEvent } from 'react'
import type { Dictionary } from '@/lib/i18n/types'
import { HERO_SLIDES, nextSlide, previousSlide } from '@/lib/hero-carousel'
import { getHeroCarouselMotion } from '@/lib/hero-motion'

type HeroCarouselProps = {
  labels: Dictionary['carousel']
}

const AUTOPLAY_INTERVAL = 6_000

export function HeroCarousel({ labels }: HeroCarouselProps) {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [isInteractionPaused, setIsInteractionPaused] = useState(false)
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const isPaused = Boolean(reduceMotion) || isManuallyPaused || isInteractionPaused || isDocumentHidden
  const activeSlide = HERO_SLIDES[activeIndex]
  const slideMotion = getHeroCarouselMotion(Boolean(reduceMotion))

  useEffect(() => {
    const updateDocumentVisibility = () => setIsDocumentHidden(document.hidden)

    updateDocumentVisibility()
    document.addEventListener('visibilitychange', updateDocumentVisibility)
    return () => document.removeEventListener('visibilitychange', updateDocumentVisibility)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => nextSlide(index, HERO_SLIDES.length))
    }, AUTOPLAY_INTERVAL)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused])

  function selectSlide(index: number) {
    setActiveIndex(index)
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsInteractionPaused(false)
    }
  }

  const localizedAlt = `${labels.slideLabel} ${activeIndex + 1}`

  return (
    <div
      className="absolute inset-0"
      aria-roledescription="carousel"
      onPointerEnter={() => setIsInteractionPaused(true)}
      onPointerLeave={() => setIsInteractionPaused(false)}
      onFocus={() => setIsInteractionPaused(true)}
      onBlur={handleBlur}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeSlide.src}
          className="absolute inset-0 overflow-hidden bg-[#071829]"
          initial={slideMotion.initial}
          animate={slideMotion.animate}
          exit={slideMotion.exit}
          transition={slideMotion.transition}
        >
          <Image
            fill
            aria-hidden
            alt=""
            className="scale-110 object-cover blur-xl"
            sizes="100vw"
            src={activeSlide.src}
          />
          <Image
            fill
            alt={localizedAlt}
            className="object-contain"
            priority={activeIndex === 0}
            sizes="100vw"
            src={activeSlide.src}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071829]/95 via-[#071829]/75 to-[#071829]/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/70 via-transparent to-[#071829]/30" />
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:bottom-8 sm:right-8">
        <button
          type="button"
          aria-label={labels.previousSlide}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-[#071829]/70 text-white transition-colors hover:bg-[#071829] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020]"
          onClick={() => selectSlide(previousSlide(activeIndex, HERO_SLIDES.length))}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex items-center gap-1.5" role="group" aria-label={labels.slideLabel}>
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`${labels.slideLabel} ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020] ${
                index === activeIndex ? 'w-6 bg-[#e8a020]' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={isManuallyPaused || reduceMotion ? labels.play : labels.pause}
          aria-pressed={isManuallyPaused}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-[#071829]/70 text-white transition-colors hover:bg-[#071829] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={Boolean(reduceMotion)}
          onClick={() => setIsManuallyPaused((paused) => !paused)}
        >
          {isManuallyPaused || reduceMotion ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        </button>
        <button
          type="button"
          aria-label={labels.nextSlide}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-[#071829]/70 text-white transition-colors hover:bg-[#071829] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020]"
          onClick={() => selectSlide(nextSlide(activeIndex, HERO_SLIDES.length))}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}

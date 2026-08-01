import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getHeroBackgroundMotion,
  getHeroCarouselBackgroundMotion,
  getHeroCarouselMotion,
} from '../lib/hero-motion.ts'

test('hero background settles from a larger scale to its natural size', () => {
  assert.deepEqual(getHeroBackgroundMotion(false), {
    initial: { scale: 1.1 },
    animate: { scale: 1 },
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  })
})

test('hero background skips scaling when reduced motion is requested', () => {
  assert.deepEqual(getHeroBackgroundMotion(true), {
    initial: false,
    animate: { scale: 1 },
    transition: { duration: 0 },
  })
})

test('carousel crossfades without scaling the complete-image foreground', () => {
  assert.deepEqual(getHeroCarouselMotion(false), {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  })
})

test('carousel animates only the blurred fill from 1.06 to 1', () => {
  assert.deepEqual(getHeroCarouselBackgroundMotion(false), {
    initial: { scale: 1.06 },
    animate: { scale: 1 },
    transition: { duration: 6, ease: [0.22, 1, 0.36, 1] },
  })
})

test('carousel disables crossfade and scaling with reduced motion', () => {
  assert.deepEqual(getHeroCarouselMotion(true), {
    initial: false,
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0 },
  })
})

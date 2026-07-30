import assert from 'node:assert/strict'
import test from 'node:test'

import { getHeroBackgroundMotion } from '../lib/hero-motion.ts'

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

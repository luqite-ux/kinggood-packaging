import assert from 'node:assert/strict'
import test from 'node:test'

import { HERO_SLIDES, nextSlide, previousSlide } from '../lib/hero-carousel.ts'

test('uses the two approved customer factory images', () => {
  assert.deepEqual(HERO_SLIDES.map((slide) => slide.src), [
    '/factory-exterior.png',
    '/factory-production.png',
  ])
})

test('wraps manual navigation', () => {
  assert.equal(nextSlide(1, 2), 0)
  assert.equal(previousSlide(0, 2), 1)
})

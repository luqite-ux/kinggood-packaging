import assert from 'node:assert/strict'
import test from 'node:test'

import { HERO_SLIDES, formatSlideLabel, nextSlide, previousSlide } from '../lib/hero-carousel.ts'

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

test('formats localized go-to-slide labels without English fallback text', () => {
  assert.equal(formatSlideLabel('Go to slide {slide}', 1), 'Go to slide 2')
  assert.equal(formatSlideLabel('转到第 {slide} 张图片', 0), '转到第 1 张图片')
})

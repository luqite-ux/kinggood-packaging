import assert from 'node:assert/strict'
import test from 'node:test'

import {
  HERO_SLIDES,
  INITIAL_HERO_INTERACTION_STATE,
  formatSlideLabel,
  isHeroInteractionPaused,
  nextSlide,
  previousSlide,
  reduceHeroInteraction,
} from '../lib/hero-carousel.ts'

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

test('CTA focus pauses autoplay independently of pointer hover', () => {
  const focused = reduceHeroInteraction(INITIAL_HERO_INTERACTION_STATE, { type: 'focus-enter' })

  assert.deepEqual(focused, { pointerInside: false, focusWithin: true })
  assert.equal(isHeroInteractionPaused(focused), true)
})

test('interaction pause remains active until both pointer and focus leave the Hero', () => {
  const focusedAndHovered = [
    { type: 'pointer-enter' },
    { type: 'focus-enter' },
  ].reduce(reduceHeroInteraction, INITIAL_HERO_INTERACTION_STATE)
  const pointerLeft = reduceHeroInteraction(focusedAndHovered, { type: 'pointer-leave' })
  const bothLeft = reduceHeroInteraction(pointerLeft, { type: 'focus-leave' })

  assert.deepEqual(pointerLeft, { pointerInside: false, focusWithin: true })
  assert.equal(isHeroInteractionPaused(pointerLeft), true)
  assert.equal(isHeroInteractionPaused(bothLeft), false)
})

import assert from 'node:assert/strict'
import test from 'node:test'

import { formatCountValue, isCountableValue, parseCountValue } from '../lib/count-up.ts'

test('parseCountValue converts formatted metric strings into animation targets', () => {
  assert.equal(parseCountValue('2010'), 2010)
  assert.equal(parseCountValue('36,300'), 36300)
  assert.equal(parseCountValue('3,000'), 3000)
})

test('formatCountValue preserves thousands separators while the number changes', () => {
  assert.equal(formatCountValue(0), '0')
  assert.equal(formatCountValue(2010), '2,010')
  assert.equal(formatCountValue(36300), '36,300')
})

test('isCountableValue returns a stable boolean instead of a match object', () => {
  assert.equal(isCountableValue('36,300'), true)
  assert.equal(isCountableValue('not available'), false)
  assert.equal(typeof isCountableValue('2010'), 'boolean')
})

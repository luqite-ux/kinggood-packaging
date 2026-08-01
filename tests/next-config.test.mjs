import assert from 'node:assert/strict'
import test from 'node:test'

import nextConfig from '../next.config.mjs'

test('does not suppress TypeScript errors during production builds', () => {
  assert.notEqual(nextConfig.typescript?.ignoreBuildErrors, true)
})

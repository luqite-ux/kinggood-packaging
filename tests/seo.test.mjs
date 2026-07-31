import assert from 'node:assert/strict'
import test from 'node:test'

import { absoluteUrl, serializeJsonLd } from '../lib/seo.ts'

test('absoluteUrl resolves public paths against the formal site origin', () => {
  assert.equal(absoluteUrl('/products/example'), 'https://kinggoodpackaging.com/products/example')
})

test('serializeJsonLd escapes opening angle brackets', () => {
  assert.equal(serializeJsonLd({ value: '</script>' }), '{"value":"\\u003c/script>"}')
})

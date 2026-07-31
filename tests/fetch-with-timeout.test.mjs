import assert from 'node:assert/strict'
import test from 'node:test'

import { createTimeoutFetch } from '../lib/fetch-with-timeout.ts'

test('createTimeoutFetch supplies an abort signal to the delegated request', async () => {
  let capturedSignal
  const fakeFetch = async (_input, init) => {
    capturedSignal = init?.signal
    return new Response(null, { status: 204 })
  }

  const timedFetch = createTimeoutFetch(100, fakeFetch)
  await timedFetch('https://example.com')

  assert.ok(capturedSignal instanceof AbortSignal)
  assert.equal(capturedSignal.aborted, false)
})

test('createTimeoutFetch aborts a stalled request after the configured limit', async () => {
  const stalledFetch = async (_input, init) => new Promise((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(init.signal.reason), { once: true })
  })

  const timedFetch = createTimeoutFetch(20, stalledFetch)
  await assert.rejects(() => timedFetch('https://example.com'), { name: 'TimeoutError' })
})

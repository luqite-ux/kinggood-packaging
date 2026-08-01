import assert from 'node:assert/strict'
import test from 'node:test'

import { NextRequest } from 'next/server.js'

const proxyModule = await import('../proxy.ts').catch(() => ({}))

test('redirects an unauthenticated admin request to the public login route', () => {
  assert.equal(typeof proxyModule.proxy, 'function')

  const response = proxyModule.proxy(new NextRequest('https://kinggoodpackaging.com/admin/products'))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), 'https://kinggoodpackaging.com/admin/login')
})

test('allows authenticated admin requests through the proxy', () => {
  assert.equal(typeof proxyModule.proxy, 'function')

  const request = new NextRequest('https://kinggoodpackaging.com/admin/products', {
    headers: { cookie: 'hq_admin_session=verified-session' },
  })
  const response = proxyModule.proxy(request)

  assert.equal(response.headers.get('x-middleware-next'), '1')
  assert.equal(response.headers.get('location'), null)
})

test('keeps login and logout routes public', () => {
  assert.equal(typeof proxyModule.proxy, 'function')

  for (const path of ['/admin/login', '/admin/logout']) {
    const response = proxyModule.proxy(new NextRequest(`https://kinggoodpackaging.com${path}`))
    assert.equal(response.headers.get('x-middleware-next'), '1')
    assert.equal(response.headers.get('location'), null)
  }
})

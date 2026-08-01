import assert from 'node:assert/strict'
import test from 'node:test'

const contactFormModule = await import('../lib/contact-form.ts').catch(() => ({}))

test('normalizes thrown inquiry insert failures into a false result', async () => {
  assert.equal(typeof contactFormModule.submitInquirySafely, 'function')
  const submitted = await contactFormModule.submitInquirySafely(async () => {
    throw new Error('network unavailable')
  })

  assert.equal(submitted, false)
})

test('normalizes returned Supabase errors and preserves successful inserts', async () => {
  assert.equal(await contactFormModule.submitInquirySafely(async () => ({ error: new Error('denied') })), false)
  assert.equal(await contactFormModule.submitInquirySafely(async () => ({ error: null })), true)
})

test('protects synchronous Supabase client acquisition and the later insert', async () => {
  assert.equal(typeof contactFormModule.submitInquiryWithClient, 'function')
  assert.equal(
    await contactFormModule.submitInquiryWithClient(
      () => { throw new Error('invalid runtime configuration') },
      async () => ({ error: null }),
    ),
    false,
  )
  assert.equal(
    await contactFormModule.submitInquiryWithClient(
      () => ({ id: 'client' }),
      async (client) => ({ error: client.id === 'client' ? null : new Error('wrong client') }),
    ),
    true,
  )
})

import assert from 'node:assert/strict'
import test from 'node:test'

test('preserves a successful empty active product set instead of publishing fallback products', async () => {
  const { resolveProductRows } = await import('../lib/products-db.ts')

  assert.equal(typeof resolveProductRows, 'function')
  assert.deepEqual(resolveProductRows([], null), [])
  assert.ok(resolveProductRows(null, { message: 'query failed' }).length > 0)
})

test('maps Supabase updated_at to a product sitemap updatedAt value', async () => {
  const { mapSitemapProductRow } = await import('../lib/products-db.ts')

  assert.equal(typeof mapSitemapProductRow, 'function')
  assert.deepEqual(
    mapSitemapProductRow({
      slug: 'active-product',
      updated_at: '2026-07-31T09:30:00.000Z',
    }),
    {
      slug: 'active-product',
      updatedAt: '2026-07-31T09:30:00.000Z',
    },
  )
})

test('drops null and invalid Supabase product timestamps', async () => {
  const { mapSitemapProductRow } = await import('../lib/products-db.ts')

  assert.deepEqual(
    mapSitemapProductRow({ slug: 'null-timestamp', updated_at: null }),
    { slug: 'null-timestamp', updatedAt: undefined },
  )
  assert.deepEqual(
    mapSitemapProductRow({ slug: 'invalid-timestamp', updated_at: 'not-a-date' }),
    { slug: 'invalid-timestamp', updatedAt: undefined },
  )
})

test('mapped product timestamps reach every localized sitemap entry', async () => {
  const [{ mapSitemapProductRow }, { buildLocalizedSitemapEntries }] = await Promise.all([
    import('../lib/products-db.ts'),
    import('../lib/seo.ts'),
  ])
  const product = mapSitemapProductRow({
    slug: 'active-product',
    updated_at: '2026-07-31T09:30:00.000Z',
  })

  const entries = buildLocalizedSitemapEntries(
    `/products/${product.slug}`,
    product.updatedAt,
  )
  assert.equal(entries.length, 4)
  assert.deepEqual(
    entries.map((entry) => entry.lastModified),
    Array(4).fill('2026-07-31T09:30:00.000Z'),
  )
})

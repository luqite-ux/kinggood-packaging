import assert from 'node:assert/strict'
import test from 'node:test'

const pageDataModule = await import('../lib/home-page-data.ts').catch(() => ({}))
const { loadHomePageData } = pageDataModule

test('loads a serializable English home-page snapshot through the shared locale loader', async () => {
  assert.equal(typeof loadHomePageData, 'function')

  const calls = []
  const dictionary = { locale: 'en', marker: 'english-dictionary' }
  const products = [
    { slug: 'database-only-product', category: 'pallets', name: 'Database product' },
  ]

  const result = await loadHomePageData('en', {
    getDictionary: async (locale) => {
      calls.push(`dictionary:${locale}`)
      return dictionary
    },
    fetchProductsData: async (locale) => {
      calls.push(`products:${locale}`)
      return products
    },
  })

  assert.deepEqual(calls, ['dictionary:en', 'products:en'])
  assert.deepEqual(JSON.parse(JSON.stringify(result)), {
    dictionary: { locale: 'en', marker: 'english-dictionary' },
    products: [
      { slug: 'database-only-product', category: 'pallets', name: 'Database product' },
    ],
  })
})

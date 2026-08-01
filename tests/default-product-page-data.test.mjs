import assert from 'node:assert/strict'
import test from 'node:test'

const pageDataModule = await import('../lib/default-product-page-data.ts').catch(() => ({}))
const { loadDefaultProductPageData } = pageDataModule

test('loads English dictionaries and active products for default product-backed pages', async () => {
  assert.equal(typeof loadDefaultProductPageData, 'function')
  const calls = []
  const dictionary = { marker: 'english-dictionary' }
  const products = [{ slug: 'database-only-product' }]

  const result = await loadDefaultProductPageData({
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
  assert.equal(result.dictionary, dictionary)
  assert.equal(result.products, products)
})

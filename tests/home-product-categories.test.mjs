import assert from 'node:assert/strict'
import test from 'node:test'

const categoryModule = await import('../lib/home-product-categories.ts').catch(() => ({}))
const { buildHomeProductCategories } = categoryModule

test('builds the same serializable product-category list before and after transport', () => {
  assert.equal(typeof buildHomeProductCategories, 'function')

  const categories = [
    { key: 'pallets', name: 'Pallets', description: 'Pallet products' },
    { key: 'crates', name: 'Crates', description: 'Crate products' },
    { key: 'cable-reels', name: 'Cable reels', description: 'Cable reel products' },
  ]
  const products = [
    { slug: 'pallet-b', name: 'Pallet B', category: 'pallets' },
    { slug: 'crate-a', name: 'Crate A', category: 'crates' },
    { slug: 'pallet-a', name: 'Pallet A', category: 'pallets' },
  ]

  const serverSnapshot = buildHomeProductCategories(categories, products)
  const clientSnapshot = JSON.parse(JSON.stringify(serverSnapshot))

  assert.deepEqual(clientSnapshot, [
    {
      key: 'pallets',
      name: 'Pallets',
      description: 'Pallet products',
      image: '/product-iso-pallet.png',
      products: [
        { slug: 'pallet-b', name: 'Pallet B', category: 'pallets' },
        { slug: 'pallet-a', name: 'Pallet A', category: 'pallets' },
      ],
    },
    {
      key: 'crates',
      name: 'Crates',
      description: 'Crate products',
      image: '/product-solid-crate.png',
      products: [{ slug: 'crate-a', name: 'Crate A', category: 'crates' }],
    },
    {
      key: 'cable-reels',
      name: 'Cable reels',
      description: 'Cable reel products',
      image: '/product-cable-reel.jpg',
      products: [],
    },
  ])
  assert.deepEqual(categories, [
    { key: 'pallets', name: 'Pallets', description: 'Pallet products' },
    { key: 'crates', name: 'Crates', description: 'Crate products' },
    { key: 'cable-reels', name: 'Cable reels', description: 'Cable reel products' },
  ])
})

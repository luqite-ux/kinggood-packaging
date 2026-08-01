import type { Product } from './site.ts'
import type { LocalizedCategory } from './i18n/types.ts'

const CATEGORY_IMAGES: Record<LocalizedCategory['key'], string> = {
  pallets: '/product-iso-pallet.png',
  crates: '/product-solid-crate.png',
  'cable-reels': '/product-cable-reel.jpg',
}

export function buildHomeProductCategories(
  categories: readonly LocalizedCategory[],
  products: readonly Product[],
) {
  return categories.map((category) => ({
    ...category,
    image: CATEGORY_IMAGES[category.key],
    products: products.filter((product) => product.category === category.key),
  }))
}

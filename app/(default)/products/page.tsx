import type { Metadata } from 'next'
import { ProductsPageBody } from '@/components/localized/products-page'
import { fetchProductsData } from '@/lib/products-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = localizedMetadata('/products', defaultLocale, {
  title: 'Products',
  description:
    'Wooden pallets, heavy-duty wood crates and cable reels — configured around your cargo, handling equipment and destination requirements.',
  image: '/factory-production.png',
  imageAlt: 'KINGGOOD wooden packaging products',
})

export default async function ProductsPage() {
  const [dictionary, products] = await Promise.all([
    getDictionary(defaultLocale),
    fetchProductsData(),
  ])
  return <ProductsPageBody locale={defaultLocale} dictionary={dictionary} products={products} />
}

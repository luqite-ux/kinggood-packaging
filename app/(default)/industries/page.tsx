import type { Metadata } from 'next'
import { IndustriesPageBody } from '@/components/localized/industries-page'
import { loadDefaultProductPageData } from '@/lib/default-product-page-data'
import { defaultLocale } from '@/lib/i18n/config'
import { localizedMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = localizedMetadata('/industries', defaultLocale, {
  title: 'Industries Served',
  description:
    'KINGGOOD supplies wooden pallets, custom crates and cable reels to machinery, automotive, electrical, electronics and logistics industries worldwide.',
  image: '/factory-production.png',
  imageAlt: 'KINGGOOD Packaging production workshop',
})

export default async function IndustriesPage() {
  const { dictionary, products } = await loadDefaultProductPageData()
  return <IndustriesPageBody locale={defaultLocale} dictionary={dictionary} products={products} />
}

import type { Metadata } from 'next'
import { IndustriesPageBody } from '@/components/localized/industries-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const metadata: Metadata = localizedMetadata('/industries', defaultLocale, {
  title: 'Industries Served',
  description:
    'KINGGOOD supplies wooden pallets, custom crates and cable reels to machinery, automotive, electrical, electronics and logistics industries worldwide.',
  image: '/factory-production.png',
  imageAlt: 'KINGGOOD Packaging production workshop',
})

export default async function IndustriesPage() {
  return (
    <IndustriesPageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
  )
}

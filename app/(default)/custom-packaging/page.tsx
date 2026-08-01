import type { Metadata } from 'next'
import { CustomPackagingPageBody } from '@/components/localized/custom-packaging-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const metadata: Metadata = localizedMetadata('/custom-packaging', defaultLocale, {
  title: 'Custom Packaging',
  description:
    'KINGGOOD designs custom wood packaging around your cargo dimensions, load requirements and destination. Non-standard pallets, crates and cable reels from enquiry to delivery.',
  image: '/factory-warehouse.png',
  imageAlt: 'KINGGOOD finished-goods warehouse',
})

export default async function CustomPackagingPage() {
  return (
    <CustomPackagingPageBody
      locale={defaultLocale}
      dictionary={await getDictionary(defaultLocale)}
    />
  )
}

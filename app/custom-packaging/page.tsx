import type { Metadata } from 'next'
import { CustomPackagingPageBody } from '@/components/localized/custom-packaging-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const metadata: Metadata = {
  title: 'Custom Packaging',
  description:
    'KINGGOOD designs custom wood packaging around your cargo dimensions, load requirements and destination. Non-standard pallets, crates and cable reels from enquiry to delivery.',
  alternates: { canonical: '/custom-packaging' },
  openGraph: { url: '/custom-packaging', type: 'website' },
}

export default async function CustomPackagingPage() {
  return (
    <CustomPackagingPageBody
      locale={defaultLocale}
      dictionary={await getDictionary(defaultLocale)}
    />
  )
}

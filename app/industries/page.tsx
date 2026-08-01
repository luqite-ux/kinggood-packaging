import type { Metadata } from 'next'
import { IndustriesPageBody } from '@/components/localized/industries-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const metadata: Metadata = {
  title: 'Industries Served',
  description:
    'KINGGOOD supplies wooden pallets, custom crates and cable reels to machinery, automotive, electrical, electronics and logistics industries worldwide.',
  alternates: { canonical: '/industries' },
  openGraph: { url: '/industries', type: 'website' },
}

export default async function IndustriesPage() {
  return (
    <IndustriesPageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
  )
}

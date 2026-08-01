import type { Metadata } from 'next'
import { HomePageBody } from '@/components/localized/home-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const metadata: Metadata = localizedMetadata('/', defaultLocale, {
  title: 'KINGGOOD | Engineered Wood Packaging for Global Logistics',
  absoluteTitle: true,
  description:
    'KINGGOOD designs and manufactures wooden pallets, heavy-duty wood crates and cable reels for industrial transportation, warehousing and export logistics.',
  image: '/factory-exterior.png',
  imageAlt: 'KINGGOOD Packaging manufacturing facility',
})

export default async function HomePage() {
  return <HomePageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
}

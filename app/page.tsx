import type { Metadata } from 'next'
import { HomePageBody } from '@/components/localized/home-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const metadata: Metadata = {
  title: 'KINGGOOD | Engineered Wood Packaging for Global Logistics',
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}

export default async function HomePage() {
  return <HomePageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
}

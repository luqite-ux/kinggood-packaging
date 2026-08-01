import type { Metadata } from 'next'
import { AboutPageBody } from '@/components/localized/about-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const metadata: Metadata = localizedMetadata('/about', defaultLocale, {
  title: 'About Us',
  description:
    'KINGGOOD Packaging Materials (Nantong) Co., Ltd. — a full-chain wood packaging manufacturer since 2010 with a 36,300 m² facility and 12 production lines in Nantong, Jiangsu.',
  image: '/factory-exterior.png',
  imageAlt: 'KINGGOOD Packaging manufacturing facility',
})

export default async function AboutPage() {
  return <AboutPageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
}

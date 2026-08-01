import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { AboutPageBody } from '@/components/localized/about-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dictionary = await getDictionary(locale)
  return localizedMetadata('/about', locale, {
    title: dictionary.pages.about.title,
    description: dictionary.pages.about.description,
    image: '/factory-exterior.png',
    imageAlt: dictionary.carousel.imageAlt.factoryExterior,
  })
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/about')

  return <AboutPageBody locale={locale} dictionary={await getDictionary(locale)} />
}

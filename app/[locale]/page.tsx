import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { HomePageBody } from '@/components/localized/home-page'
import { loadHomePageData } from '@/lib/home-page-data'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dictionary = await getDictionary(locale)
  return localizedMetadata('/', locale, {
    title: `KINGGOOD | ${dictionary.hero.title} ${dictionary.hero.titleHighlight}`,
    absoluteTitle: true,
    description: dictionary.hero.description,
    image: '/factory-exterior.png',
    imageAlt: dictionary.carousel.imageAlt.factoryExterior,
  })
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/')

  const { dictionary, products } = await loadHomePageData(locale)
  return <HomePageBody locale={locale} dictionary={dictionary} products={products} />
}

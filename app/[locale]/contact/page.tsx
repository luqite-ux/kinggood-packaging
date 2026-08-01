import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ContactPageBody } from '@/components/localized/contact-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { fetchProductsData } from '@/lib/products-db'
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
  return localizedMetadata('/contact', locale, {
    title: dictionary.pages.contact.title,
    description: dictionary.pages.contact.description,
    image: '/factory-exterior.png',
    imageAlt: dictionary.carousel.imageAlt.factoryExterior,
  })
}

export default async function LocalizedContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/contact')

  const [dictionary, products] = await Promise.all([
    getDictionary(locale),
    fetchProductsData(locale),
  ])
  return <ContactPageBody locale={locale} dictionary={dictionary} products={products} />
}

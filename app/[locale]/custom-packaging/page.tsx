import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { CustomPackagingPageBody } from '@/components/localized/custom-packaging-page'
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
  return localizedMetadata('/custom-packaging', locale, {
    title: dictionary.pages.customPackaging.title,
    description: dictionary.pages.customPackaging.description,
    image: '/factory-warehouse.png',
    imageAlt: dictionary.content.customPackaging.warehouseImageAlt,
  })
}

export default async function LocalizedCustomPackagingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/custom-packaging')

  return (
    <CustomPackagingPageBody locale={locale} dictionary={await getDictionary(locale)} />
  )
}

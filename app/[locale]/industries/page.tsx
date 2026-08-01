import { notFound, permanentRedirect } from 'next/navigation'
import { IndustriesPageBody } from '@/components/localized/industries-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

export default async function LocalizedIndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/industries')

  const [dictionary, products] = await Promise.all([
    getDictionary(locale),
    fetchProductsData(locale),
  ])
  return <IndustriesPageBody locale={locale} dictionary={dictionary} products={products} />
}

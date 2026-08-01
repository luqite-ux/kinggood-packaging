import { notFound, permanentRedirect } from 'next/navigation'
import { ProductsPageBody } from '@/components/localized/products-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

export default async function LocalizedProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/products')

  const [dictionary, products] = await Promise.all([
    getDictionary(locale),
    fetchProductsData(locale),
  ])
  return <ProductsPageBody locale={locale} dictionary={dictionary} products={products} />
}

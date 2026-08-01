import { notFound, permanentRedirect } from 'next/navigation'
import { ProductDetailPageBody } from '@/components/localized/product-detail-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { fetchProductsData, getProductBySlug } from '@/lib/products-db'

export const revalidate = 60
export const dynamicParams = true

export default async function LocalizedProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect(`/products/${encodeURIComponent(slug)}`)

  const product = await getProductBySlug(slug, locale)
  if (!product) notFound()

  const [dictionary, allProducts] = await Promise.all([
    getDictionary(locale),
    fetchProductsData(locale),
  ])
  const related = allProducts
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3)

  return (
    <ProductDetailPageBody
      locale={locale}
      dictionary={dictionary}
      product={product}
      related={related}
    />
  )
}

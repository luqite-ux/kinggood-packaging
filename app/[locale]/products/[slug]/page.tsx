import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ProductDetailPageBody } from '@/components/localized/product-detail-page'
import { company } from '@/lib/site'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { fetchProductsData, getProductBySlug } from '@/lib/products-db'
import { localizedMetadata, localizedStructuredData, serializeJsonLd } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const product = await getProductBySlug(slug, locale)
  if (!product) return { title: (await getDictionary(locale)).errors.notFoundTitle }
  return localizedMetadata(`/products/${product.slug}`, locale, {
    title: product.name,
    description: product.summary.slice(0, 155),
    image: product.image,
    imageAlt: product.name,
  })
}

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

  const structuredData = localizedStructuredData(locale, {
    kind: 'product',
    path: `/products/${product.slug}`,
    name: product.name,
    description: product.summary,
    image: [product.image, ...(product.gallery || [])],
    category: product.categoryLabel,
    sku: product.slug,
    brand: company.brand,
    breadcrumbs: [
      { name: dictionary.navigation.home, path: '/' },
      { name: dictionary.navigation.products, path: '/products' },
      { name: product.name, path: `/products/${product.slug}` },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ProductDetailPageBody
        locale={locale}
        dictionary={dictionary}
        product={product}
        related={related}
      />
    </>
  )
}

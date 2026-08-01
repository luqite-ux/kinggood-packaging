import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailPageBody } from '@/components/localized/product-detail-page'
import { company } from '@/lib/site'
import { fetchProductsData, getProductBySlug } from '@/lib/products-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { absoluteUrl, serializeJsonLd, SITE_URL } from '@/lib/seo'

type Params = { slug: string }

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: product.name,
    description: product.summary.slice(0, 155),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.summary.slice(0, 155),
      type: 'website',
      url: `/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.summary.slice(0, 155),
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [dictionary, allProducts] = await Promise.all([
    getDictionary(defaultLocale),
    fetchProductsData(),
  ])
  const related = allProducts
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3)

  const productUrl = `${SITE_URL}/products/${product.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.name,
        description: product.summary,
        image: [absoluteUrl(product.image), ...(product.gallery || []).map(absoluteUrl)],
        category: product.categoryLabel,
        sku: product.slug,
        brand: { '@type': 'Brand', name: company.brand },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        url: productUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dictionary.navigation.home, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: dictionary.navigation.products, item: `${SITE_URL}/products` },
          { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ProductDetailPageBody
        locale={defaultLocale}
        dictionary={dictionary}
        product={product}
        related={related}
      />
    </>
  )
}

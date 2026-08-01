import type { MetadataRoute } from 'next'
import { fetchActiveProductsForSitemap } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
import { buildLocalizedSitemapEntries } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const staticRoutes = [
  '/',
  '/products',
  '/custom-packaging',
  '/industries',
  '/about',
  '/news',
  '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([
    fetchActiveProductsForSitemap(),
    getPublishedArticles(),
  ])

  return [
    ...staticRoutes.flatMap((path) => buildLocalizedSitemapEntries(path)),
    ...products.flatMap((product) =>
      buildLocalizedSitemapEntries(`/products/${product.slug}`, product.updatedAt),
    ),
    ...articles.flatMap((article) =>
      buildLocalizedSitemapEntries(
        `/news/${article.slug}`,
        article.updatedAt || article.publishedAt,
      ),
    ),
  ]
}

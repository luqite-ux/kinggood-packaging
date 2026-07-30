import type { MetadataRoute } from 'next'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://kinggood-packaging.vercel.app'
  const routes = ['', '/products', '/custom-packaging', '/industries', '/about', '/news', '/contact']
  const products = await fetchProductsData()
  const articles = await getPublishedArticles()
  return [
    ...routes.map(url => ({ url: base + url, lastModified: new Date() })),
    ...products.map(item => ({ url: `${base}/products/${item.slug}`, lastModified: new Date() })),
    ...articles.map(item => ({ url: `${base}/news/${item.slug}`, lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date() })),
  ]
}

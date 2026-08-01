import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsArticlePageBody } from '@/components/localized/news-article-page'
import { getArticleBySlug } from '@/lib/articles-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata, localizedStructuredData, serializeJsonLd } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug)
  if (!article) return { title: 'Article not found' }
  const description = article.excerpt.slice(0, 155)
  const url = `/news/${article.slug}`
  return localizedMetadata(url, defaultLocale, {
    title: article.title,
    description,
    type: 'article',
    image: article.coverImage || undefined,
    imageAlt: article.title,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  })
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()
  const dictionary = await getDictionary(defaultLocale)
  const structuredData = localizedStructuredData(defaultLocale, {
    kind: 'article',
    path: `/news/${article.slug}`,
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    breadcrumbs: [
      { name: dictionary.navigation.home, path: '/' },
      { name: dictionary.navigation.news, path: '/news' },
      { name: article.title, path: `/news/${article.slug}` },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <NewsArticlePageBody locale={defaultLocale} dictionary={dictionary} article={article} />
    </>
  )
}

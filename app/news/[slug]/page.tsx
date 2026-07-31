import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles-db'
import { NewsArticleClient } from './news-article-client'
export const revalidate = 60
export const dynamicParams = true
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug)
  if (!article) return { title: 'Article not found' }
  const description = article.excerpt.slice(0, 155)
  const url = `/news/${article.slug}`
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      url,
      publishedTime: article.publishedAt || undefined,
      images: article.coverImage ? [{ url: article.coverImage, alt: article.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  }
}
export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()
  return <NewsArticleClient article={article} />
}

import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles-db'
import { NewsArticleClient } from './news-article-client'
export const revalidate = 60
export const dynamicParams = true
export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()
  return <NewsArticleClient article={article} />
}

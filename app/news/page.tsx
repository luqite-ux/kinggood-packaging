import type { Metadata } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { NewsPageClient } from './news-page-client'
export const revalidate = 60
export const metadata: Metadata = {
  title: 'News',
  description: 'Company announcements and packaging insights from KINGGOOD.',
  alternates: { canonical: '/news' },
  openGraph: { url: '/news', type: 'website' },
}
export default async function NewsPage() { return <NewsPageClient articles={await getPublishedArticles()} /> }

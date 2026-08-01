import type { Metadata } from 'next'
import { NewsPageBody } from '@/components/localized/news-page'
import { getPublishedArticles } from '@/lib/articles-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  description: 'Company announcements and packaging insights from KINGGOOD.',
  alternates: { canonical: '/news' },
  openGraph: { url: '/news', type: 'website' },
}

export default async function NewsPage() {
  const [dictionary, articles] = await Promise.all([
    getDictionary(defaultLocale),
    getPublishedArticles(),
  ])
  return <NewsPageBody locale={defaultLocale} dictionary={dictionary} articles={articles} />
}

import type { Metadata } from 'next'
import { NewsPageBody } from '@/components/localized/news-page'
import { getPublishedArticles } from '@/lib/articles-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = localizedMetadata('/news', defaultLocale, {
  title: 'News',
  description: 'Company announcements and packaging insights from KINGGOOD.',
  image: '/factory-exterior.png',
  imageAlt: 'KINGGOOD Packaging manufacturing facility',
})

export default async function NewsPage() {
  const [dictionary, articles] = await Promise.all([
    getDictionary(defaultLocale),
    getPublishedArticles(),
  ])
  return <NewsPageBody locale={defaultLocale} dictionary={dictionary} articles={articles} />
}

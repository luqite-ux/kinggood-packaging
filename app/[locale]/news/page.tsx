import { notFound, permanentRedirect } from 'next/navigation'
import { NewsPageBody } from '@/components/localized/news-page'
import { getLocalizedArticle, getPublishedArticles } from '@/lib/articles-db'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const revalidate = 60

export default async function LocalizedNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/news')

  const [dictionary, articles] = await Promise.all([
    getDictionary(locale),
    getPublishedArticles(),
  ])
  return (
    <NewsPageBody
      locale={locale}
      dictionary={dictionary}
      articles={articles.map((article) => getLocalizedArticle(article, locale).article)}
    />
  )
}

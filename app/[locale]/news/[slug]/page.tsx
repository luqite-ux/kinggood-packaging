import { notFound, permanentRedirect } from 'next/navigation'
import { NewsArticlePageBody } from '@/components/localized/news-article-page'
import { getArticleBySlug, getLocalizedArticle } from '@/lib/articles-db'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const revalidate = 60
export const dynamicParams = true

export default async function LocalizedNewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect(`/news/${encodeURIComponent(slug)}`)

  const sourceArticle = await getArticleBySlug(slug)
  if (!sourceArticle) notFound()

  const dictionary = await getDictionary(locale)
  const localized = getLocalizedArticle(sourceArticle, locale)
  return (
    <NewsArticlePageBody
      locale={locale}
      dictionary={dictionary}
      article={localized.article}
      isFallback={localized.isFallback}
    />
  )
}

import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { NewsArticlePageBody } from '@/components/localized/news-article-page'
import { getArticleBySlug, getLocalizedArticle } from '@/lib/articles-db'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { localizedMetadata, localizedStructuredData, serializeJsonLd } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const sourceArticle = await getArticleBySlug(slug)
  if (!sourceArticle) return { title: (await getDictionary(locale)).errors.notFoundTitle }
  const { article } = getLocalizedArticle(sourceArticle, locale)
  return localizedMetadata(`/news/${article.slug}`, locale, {
    title: article.title,
    description: article.excerpt.slice(0, 155),
    type: 'article',
    image: article.coverImage || undefined,
    imageAlt: article.title,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  })
}

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
  const structuredData = localizedStructuredData(locale, {
    kind: 'article',
    path: `/news/${localized.article.slug}`,
    headline: localized.article.title,
    description: localized.article.excerpt,
    image: localized.article.coverImage,
    datePublished: localized.article.publishedAt,
    dateModified: localized.article.updatedAt,
    contentLocale: localized.isFallback ? 'en' : locale,
    breadcrumbs: [
      { name: dictionary.navigation.home, path: '/' },
      { name: dictionary.navigation.news, path: '/news' },
      { name: localized.article.title, path: `/news/${localized.article.slug}` },
    ],
  })
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <NewsArticlePageBody
        locale={locale}
        dictionary={dictionary}
        article={localized.article}
        isFallback={localized.isFallback}
      />
    </>
  )
}

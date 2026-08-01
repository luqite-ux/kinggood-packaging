import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsArticlePageBody } from '@/components/localized/news-article-page'
import { getArticleBySlug } from '@/lib/articles-db'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { absoluteUrl, serializeJsonLd, SITE_URL } from '@/lib/seo'

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
  const dictionary = await getDictionary(defaultLocale)
  const articleUrl = `${SITE_URL}/news/${article.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage ? [absoluteUrl(article.coverImage)] : undefined,
        datePublished: article.publishedAt || undefined,
        dateModified: article.publishedAt || undefined,
        mainEntityOfPage: articleUrl,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dictionary.navigation.home, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: dictionary.navigation.news, item: `${SITE_URL}/news` },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
        ],
      },
    ],
  }

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

import Image from 'next/image'
import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { Article } from '@/lib/articles-db'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type NewsArticlePageBodyProps = {
  locale: Locale
  dictionary: Dictionary
  article: Article
  isFallback?: boolean
}

export function NewsArticlePageBody({
  locale,
  dictionary,
  article,
  isFallback = false,
}: NewsArticlePageBodyProps) {
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <section className="bg-[#071829] px-4 pb-16 pt-32 text-white">
          <div className="mx-auto max-w-4xl">
            <Link
              href={localizePath('/news', locale)}
              className="rounded text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {dictionary.actions.backToNews}
            </Link>
            <h1 className="mt-6 text-4xl font-bold">{article.title}</h1>
            <p className="mt-4 text-lg text-white/70">{article.excerpt}</p>
          </div>
        </section>
        {article.coverImage && (
          <div className="relative mx-auto aspect-[16/7] max-w-5xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}
        {isFallback && (
          <p className="mx-auto mt-10 max-w-3xl rounded border border-[#d8e1eb] bg-[#f0f4f8] px-4 py-3 text-sm text-[#3a5068]">
            {dictionary.errors.englishFallbackNotice}
          </p>
        )}
        <article
          lang={isFallback ? 'en' : locale}
          className="article-prose mx-auto max-w-3xl px-4 py-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { Article } from '@/lib/articles-db'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'
import { IMAGES } from '@/lib/site'

type NewsPageBodyProps = {
  locale: Locale
  dictionary: Dictionary
  articles: Article[]
}

export function NewsPageBody({ locale, dictionary, articles }: NewsPageBodyProps) {
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <PageHero
          eyebrow={dictionary.pages.news.eyebrow}
          title={dictionary.pages.news.title}
          description={dictionary.pages.news.description}
          image={IMAGES.factoryExterior}
          crumbs={[
            { label: dictionary.navigation.home, href: '/' },
            { label: dictionary.navigation.news },
          ]}
          locale={locale}
          dictionary={dictionary}
        />
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {articles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={localizePath(`/news/${article.slug}`, locale)}
                    className="overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4077]"
                  >
                    {article.coverImage && (
                      <div className="relative aspect-video">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#0f1b2d]">{article.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-[#5a7085]">{article.excerpt}</p>
                      <span className="mt-4 inline-block text-sm font-semibold text-[#0d4077]">
                        {dictionary.actions.readMore}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] px-6 py-16 text-center">
                <h2 className="text-2xl font-bold text-[#0f1b2d]">
                  {dictionary.errors.unavailableTitle}
                </h2>
                <p className="mt-3 text-[#5a7085]">
                  {dictionary.errors.unavailableDescription}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}

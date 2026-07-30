import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { news, IMAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'News',
  description:
    'Latest news and updates from KINGGOOD Packaging Materials — product developments, industry insights and company announcements.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsPage() {
  const featured = news[0]
  const rest = news.slice(1)

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="News"
          title="News and updates"
          description="Product developments, industry insights and company announcements from KINGGOOD Packaging."
          image={IMAGES.factoryExterior}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
        />

        {/* ── Featured article ──────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="news-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e8a020]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                Latest article
              </p>
              <h2
                id="news-heading"
                className="sr-only"
              >
                News articles
              </h2>
            </Reveal>

            {featured ? (
            <Reveal delay={0.05} className="mt-8">
              <Link
                href={`/news/${featured.slug}`}
                className="group grid gap-8 overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all hover:border-[#0d4077]/40 hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f4f8] lg:aspect-auto lg:min-h-[340px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:py-12 lg:pr-10">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#5a7085]">
                    <span className="rounded bg-[#edf0f5] px-2 py-0.5 text-[#0d4077]">
                      {featured.category}
                    </span>
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-[#0f1b2d] text-balance group-hover:text-[#0d4077] transition-colors sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#5a7085] line-clamp-3 text-pretty">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077]">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
            ) : (
              <div className="mt-8 rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] px-6 py-16 text-center">
                <h3 className="text-2xl font-bold text-[#0f1b2d]">Updates are coming soon</h3>
                <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#5a7085]">
                  Company announcements and practical packaging insights will be published here.
                  For current product or project information, please contact our team.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded bg-[#0d4077] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260]"
                >
                  Contact KINGGOOD
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}

            {/* ── Article grid ──────────────────────────────────────── */}
            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {rest.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 0.06}>
                    <Link
                      href={`/news/${article.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all hover:border-[#0d4077]/40 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f4f8]">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#5a7085]">
                          <span className="rounded bg-[#edf0f5] px-1.5 py-0.5 text-[#0d4077]">
                            {article.category}
                          </span>
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </div>
                        <h3 className="mt-3 flex-1 text-sm font-bold leading-snug text-[#0f1b2d] text-balance group-hover:text-[#0d4077] transition-colors">
                          {article.title}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0d4077]">
                          Read
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Tags cloud ────────────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-16 lg:py-20" aria-labelledby="topics-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="topics-heading"
                className="text-sm font-bold uppercase tracking-widest text-[#5a7085]"
              >
                Topics covered
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(new Set(news.flatMap((a) => a.tags))).sort().map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#d8e1eb] bg-white px-3 py-1.5 text-xs font-medium text-[#3a5068]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}

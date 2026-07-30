import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { news, company } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const article = news.find((a) => a.slug === slug)
  if (!article) return { title: 'Article not found' }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NewsArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const article = news.find((a) => a.slug === slug)
  if (!article) notFound()

  const otherArticles = news
    .filter((a) => a.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const paragraphs = article.body.split('\n\n').filter(Boolean)

  return (
    <>
      <SiteHeader />
      <main>

        {/* ── Article hero ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#071829] pt-24 text-white lg:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-20" />
          <div className="relative mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/news" className="hover:text-white transition-colors">News</Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">{article.category}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-[#e8a020]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#e8a020]">
                {article.category}
              </span>
              <time dateTime={article.date} className="text-sm text-white/50">
                {formatDate(article.date)}
              </time>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70 text-pretty">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* ── Hero image ────────────────────────────────────────────── */}
        <div className="bg-[#071829]">
          <div className="mx-auto max-w-4xl px-4 pb-0 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl border border-white/10">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Article body ──────────────────────────────────────────── */}
        <section className="bg-white py-14 lg:py-20" aria-label="Article body">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3 lg:items-start">

              {/* Body text */}
              <article className="lg:col-span-2">
                <div className="prose prose-slate max-w-none">
                  {paragraphs.map((para, i) => (
                    <Reveal key={i} delay={i * 0.03}>
                      <p className="mb-5 text-base leading-relaxed text-[#3a5068]">{para}</p>
                    </Reveal>
                  ))}
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <Reveal className="mt-10 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-[#5a7085]" aria-hidden />
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#d8e1eb] px-3 py-1 text-xs font-medium text-[#5a7085]"
                      >
                        {tag}
                      </span>
                    ))}
                  </Reveal>
                )}

                {/* Back link */}
                <Reveal className="mt-12">
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d4077] hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back to all articles
                  </Link>
                </Reveal>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <Reveal delay={0.1}>
                  <div className="sticky top-24 space-y-6">
                    {/* CTA card */}
                    <div className="rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-6">
                      <h3 className="text-sm font-bold text-[#0f1b2d]">
                        Discuss your packaging requirement
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                        Our team is available to answer questions and prepare quotations for
                        any wood packaging project.
                      </p>
                      <Link
                        href="/contact"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#0d4077] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260]"
                      >
                        Contact us
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                      <a
                        href={`tel:${company.phoneRaw}`}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-[#d8e1eb] px-4 py-3 text-sm font-semibold text-[#0d4077] transition-colors hover:border-[#0d4077] hover:bg-white"
                      >
                        {company.phone}
                      </a>
                    </div>

                    {/* Related products link */}
                    <div className="rounded-lg border border-[#d8e1eb] bg-white p-6">
                      <h3 className="text-sm font-bold text-[#0f1b2d]">Browse products</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                        Wooden pallets, custom crates and cable reels for export logistics.
                      </p>
                      <Link
                        href="/products"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline"
                      >
                        View all products
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </section>

        {/* ── More articles ─────────────────────────────────────────── */}
        {otherArticles.length > 0 && (
          <section className="bg-[#f0f4f8] py-16 lg:py-20" aria-labelledby="more-articles">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2
                  id="more-articles"
                  className="text-xl font-bold tracking-tight text-[#0f1b2d] sm:text-2xl"
                >
                  More articles
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {otherArticles.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.07}>
                    <Link
                      href={`/news/${a.slug}`}
                      className="group flex items-start gap-4 rounded-lg border border-[#d8e1eb] bg-white p-4 transition-all hover:border-[#0d4077]/30 hover:shadow-md"
                    >
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-[#f0f4f8]">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a020]">
                          {a.category}
                        </span>
                        <h3 className="mt-1 text-sm font-bold leading-snug text-[#0f1b2d] text-balance">
                          {a.title}
                        </h3>
                        <time dateTime={a.date} className="mt-1 block text-xs text-[#5a7085]">
                          {formatDate(a.date)}
                        </time>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <SiteFooter />
    </>
  )
}

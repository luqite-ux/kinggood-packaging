'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/lib/articles-db'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { IMAGES } from '@/lib/site'
export function NewsPageClient({ articles }: { articles: Article[] }) {
  return <><SiteHeader /><main><PageHero eyebrow="News" title="News and updates" description="Company announcements and practical packaging insights from KINGGOOD." image={IMAGES.factoryExterior} crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
    <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {articles.length ? <div className="grid gap-6 md:grid-cols-3">{articles.map(article => <Link key={article.slug} href={`/news/${article.slug}`} className="overflow-hidden rounded-lg border border-[#d8e1eb] bg-white hover:shadow-lg">
        {article.coverImage && <div className="relative aspect-video"><Image src={article.coverImage} alt={article.title} fill className="object-cover" /></div>}
        <div className="p-6"><h2 className="text-xl font-bold text-[#0f1b2d]">{article.title}</h2><p className="mt-3 text-sm leading-relaxed text-[#5a7085]">{article.excerpt}</p></div>
      </Link>)}</div> : <div className="rounded-lg border bg-[#f0f4f8] px-6 py-16 text-center"><h2 className="text-2xl font-bold text-[#0f1b2d]">Updates are coming soon</h2><p className="mt-3 text-[#5a7085]">For current product or project information, please contact our team.</p></div>}
    </div></section></main><SiteFooter /></>
}

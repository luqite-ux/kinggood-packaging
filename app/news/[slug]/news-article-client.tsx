'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/lib/articles-db'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
export function NewsArticleClient({ article }: { article: Article }) {
  return <><SiteHeader /><main><section className="bg-[#071829] px-4 pb-16 pt-32 text-white"><div className="mx-auto max-w-4xl"><Link href="/news" className="text-white/70">News</Link><h1 className="mt-6 text-4xl font-bold">{article.title}</h1><p className="mt-4 text-lg text-white/70">{article.excerpt}</p></div></section>
    {article.coverImage && <div className="relative mx-auto aspect-[16/7] max-w-5xl"><Image src={article.coverImage} alt={article.title} fill className="object-cover" /></div>}
    <article className="article-prose mx-auto max-w-3xl px-4 py-16" dangerouslySetInnerHTML={{ __html: article.content }} /></main><SiteFooter /></>
}

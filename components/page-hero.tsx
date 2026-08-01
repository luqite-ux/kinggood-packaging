import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { localizeNavigationHref, type Locale } from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  image: string
  crumbs?: Crumb[]
  locale?: Locale
  dictionary?: Dictionary
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs,
  locale = 'en',
  dictionary = defaultDictionary,
}: PageHeroProps) {
  const crumbLabels: Record<string, string> = {
    '/': dictionary.navigation.home,
    '/products': dictionary.navigation.products,
    '/custom-packaging': dictionary.navigation.customPackaging,
    '/industries': dictionary.navigation.industries,
    '/about': dictionary.navigation.about,
    '/news': dictionary.navigation.news,
    '/contact': dictionary.navigation.contact,
  }

  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-[#071829] text-white lg:min-h-[60vh]">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-[#071829]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071829]/90 via-[#071829]/70 to-[#071829]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/85 via-transparent to-[#071829]/45" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20">
        {crumbs && (
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-white/80">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link
                    href={localizeNavigationHref(c.href, locale)}
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {crumbLabels[c.href] || c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-[#f0a51c]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

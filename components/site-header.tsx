'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/i18n/language-switcher'
import { localizePath, type Locale } from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'
import { cn } from '@/lib/utils'
import { company, IMAGES } from '@/lib/site'

type SiteHeaderProps = {
  locale?: Locale
  dictionary?: Dictionary
}

export function SiteHeader({ locale = 'en', dictionary = defaultDictionary }: SiteHeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const localizedNav = [
    { label: dictionary.navigation.home, href: '/' },
    { label: dictionary.navigation.products, href: '/products' },
    { label: dictionary.navigation.customPackaging, href: '/custom-packaging' },
    { label: dictionary.navigation.industries, href: '/industries' },
    { label: dictionary.navigation.about, href: '/about' },
    { label: dictionary.navigation.news, href: '/news' },
    { label: dictionary.navigation.contact, href: '/contact' },
  ]

  const isActive = (href: string) => {
    const localizedHref = localizePath(href, locale)
    return localizedHref === '/' || localizedHref === `/${locale}`
      ? pathname === localizedHref
      : pathname.startsWith(localizedHref)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[#d8e1eb] bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">

        {/* Logo */}
        <Link
          href={localizePath('/', locale)}
          aria-label={`${company.brand} — ${dictionary.navigation.home}`}
          className={cn(
            'flex shrink-0 flex-col items-center',
            scrolled ? 'text-[#0d4077]' : 'text-white',
          )}
        >
          <Image
            src={IMAGES.logo}
            alt={`${company.brand} logo`}
            width={160}
            height={160}
            priority
            className="h-10 w-auto transition-all duration-300 lg:h-11"
          />
          <span className="mt-0.5 whitespace-nowrap text-[7px] font-bold leading-none tracking-[0.22em] lg:text-[8px]">
            KINGGOOD PACKAGING
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label={dictionary.navigation.mainNavigation} className="hidden items-center gap-0.5 xl:flex">
          {localizedNav.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href, locale)}
              className={cn(
                'relative rounded px-3.5 py-2 text-sm font-medium transition-colors',
                scrolled
                  ? isActive(item.href)
                    ? 'text-[#0d4077]'
                    : 'text-[#3a5068] hover:text-[#0d4077]'
                  : isActive(item.href)
                    ? 'text-white'
                    : 'text-white/75 hover:text-white',
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#e8a020]"
                />
              )}
            </Link>
          ))}
          {/* Contact nav link */}
          <Link
            href={localizePath('/contact', locale)}
            className={cn(
              'relative rounded px-3.5 py-2 text-sm font-medium transition-colors',
              scrolled
                ? isActive('/contact')
                  ? 'text-[#0d4077]'
                  : 'text-[#3a5068] hover:text-[#0d4077]'
                : isActive('/contact')
                  ? 'text-white'
                  : 'text-white/75 hover:text-white',
            )}
          >
            {dictionary.navigation.contact}
            {isActive('/contact') && (
              <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#e8a020]" />
            )}
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher
            locale={locale}
            currentPath={pathname}
            className={cn(
              'hidden xl:block',
              scrolled ? 'text-[#0d4077]' : 'text-white',
            )}
          />
          <Link
            href={localizePath('/contact', locale)}
            className={cn(
              'hidden rounded text-sm font-semibold transition-all xl:inline-flex xl:items-center xl:px-5 xl:py-2.5',
              scrolled
                ? 'bg-[#0d4077] text-white hover:bg-[#0b3260]'
                : 'bg-[#e8a020] text-[#3a2200] hover:bg-[#d89018]',
            )}
          >
            {dictionary.navigation.requestQuote}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dictionary.navigation.closeMenu : dictionary.navigation.openMenu}
            aria-expanded={open}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded xl:hidden',
              scrolled ? 'text-[#0f1b2d]' : 'text-white',
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#d8e1eb] bg-white xl:hidden">
          <nav
            aria-label={dictionary.navigation.mobileNavigation}
            className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-4 sm:px-6"
          >
            {localizedNav.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className={cn(
                  'rounded px-3 py-3 text-[15px] font-medium',
                  isActive(item.href)
                    ? 'bg-[#f0f4f8] text-[#0d4077]'
                    : 'text-[#3a5068] hover:bg-[#f0f4f8] hover:text-[#0d4077]',
                )}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher
              locale={locale}
              currentPath={pathname}
              className="mt-3 border-t border-[#d8e1eb] pt-4 text-[#0d4077]"
            />
            <Link
              href={localizePath('/contact', locale)}
              className="mt-3 inline-flex items-center justify-center rounded bg-[#0d4077] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b3260]"
            >
              {dictionary.navigation.requestQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav, company, IMAGES } from '@/lib/site'

export function SiteHeader() {
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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

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
          href="/"
          aria-label={`${company.brand} — Home`}
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
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {nav.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
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
            href="/contact"
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
            Contact
            {isActive('/contact') && (
              <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#e8a020]" />
            )}
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              'hidden rounded text-sm font-semibold transition-all lg:inline-flex lg:items-center lg:px-5 lg:py-2.5',
              scrolled
                ? 'bg-[#0d4077] text-white hover:bg-[#0b3260]'
                : 'bg-[#e8a020] text-[#3a2200] hover:bg-[#d89018]',
            )}
          >
            Request a Quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded lg:hidden',
              scrolled ? 'text-[#0f1b2d]' : 'text-white',
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#d8e1eb] bg-white lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-4 sm:px-6"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded bg-[#0d4077] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b3260]"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

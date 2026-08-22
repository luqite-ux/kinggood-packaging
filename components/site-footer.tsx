import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { localizePath, type Locale } from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'
import { company, IMAGES } from '@/lib/site'

type SiteFooterProps = {
  locale?: Locale
  dictionary?: Dictionary
}

export function SiteFooter({ locale = 'en', dictionary = defaultDictionary }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const footerCompanyName = company.legalName.replace(/[.\s]+$/, '')
  const localizedNav = [
    { label: dictionary.navigation.home, href: '/' },
    { label: dictionary.navigation.products, href: '/products' },
    { label: dictionary.navigation.customPackaging, href: '/custom-packaging' },
    { label: dictionary.navigation.industries, href: '/industries' },
    { label: dictionary.navigation.about, href: '/about' },
    { label: dictionary.navigation.news, href: '/news' },
    { label: dictionary.navigation.contact, href: '/contact' },
  ]

  return (
    <footer className="bg-[#071829] text-[#f0f4f8]">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={localizePath('/', locale)}
              aria-label="Kinggood Packaging home"
              className="inline-flex max-w-full flex-col items-center text-white"
            >
              <Image
                src={IMAGES.logo}
                alt={dictionary.navigation.logoAlt}
                width={160}
                height={160}
                className="h-20 w-auto max-w-full object-contain"
              />
              <span className="mt-1 whitespace-nowrap text-[9px] font-bold leading-none tracking-[0.22em]">
                {dictionary.content.shared.brandLockup}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#f0f4f8]/70">
              {dictionary.footer.description}
            </p>
            {/* Contact quick links */}
            <ul className="mt-6 space-y-3 text-sm text-[#f0f4f8]/70">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="transition-colors hover:text-white focus-visible:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white focus-visible:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <address className="not-italic leading-relaxed">{company.address}</address>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              {dictionary.footer.navigation}
            </h3>
            <ul className="mt-5 space-y-3">
              {localizedNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizePath(item.href, locale)}
                    className="text-sm text-[#f0f4f8]/70 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              {dictionary.footer.products}
            </h3>
            <ul className="mt-5 space-y-3">
              {dictionary.content.shared.footerProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={localizePath(`/products/${p.slug}`, locale)}
                    className="text-sm text-[#f0f4f8]/70 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services / quick links */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              {dictionary.footer.services}
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: dictionary.footer.customPackaging, href: '/custom-packaging' },
                { label: dictionary.footer.industriesServed, href: '/industries' },
                { label: dictionary.navigation.requestQuote, href: '/contact' },
                { label: dictionary.navigation.news, href: '/news' },
                { label: dictionary.navigation.about, href: '/about' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizePath(item.href, locale)}
                    className="text-sm text-[#f0f4f8]/70 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#f0f4f8]/70 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {year} {footerCompanyName}. All rights reserved.</p>
          <p>{dictionary.footer.location}</p>
        </div>
      </div>
    </footer>
  )
}

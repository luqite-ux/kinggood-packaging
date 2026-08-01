'use client'

import Link from 'next/link'
import { buildLanguageSwitcherLinks, type Locale } from '@/lib/i18n/config'

const oneYearInSeconds = 60 * 60 * 24 * 365
const languageLabels: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
  de: 'DE',
  es: 'ES',
}

type LanguageSwitcherProps = {
  locale: Locale
  currentPath: string
  className?: string
}

export function LanguageSwitcher({ locale, currentPath, className = '' }: LanguageSwitcherProps) {
  const links = buildLanguageSwitcherLinks(locale, currentPath)

  const rememberLocale = (nextLocale: Locale) => {
    document.cookie = `kinggood_locale=${nextLocale}; Max-Age=${oneYearInSeconds}; Path=/; SameSite=Lax`
  }

  return (
    <div role="group" aria-label="Language selection" className={className}>
      <ul className="flex items-center gap-1">
        {links.map((link) => (
          <li key={link.locale}>
            <Link
              href={link.href}
              hrefLang={link.locale}
              lang={link.locale}
              aria-current={link.isCurrent ? 'page' : undefined}
              onClick={() => rememberLocale(link.locale)}
              className="inline-flex min-h-8 items-center justify-center rounded px-2 text-xs font-semibold transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020] aria-[current=page]:bg-[#e8a020] aria-[current=page]:text-[#3a2200]"
            >
              {languageLabels[link.locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

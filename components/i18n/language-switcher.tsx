'use client'

import Link from 'next/link'
import {
  buildLanguageSwitcherItems,
  serializeLocaleCookie,
  type Locale,
} from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'

type LanguageSwitcherProps = {
  locale: Locale
  currentPath: string
  dictionary?: Dictionary
  onNavigate?: () => void
  className?: string
}

function rememberLocale(nextLocale: Locale) {
  document.cookie = serializeLocaleCookie(nextLocale)
}

export function LanguageSwitcher({
  locale,
  currentPath,
  dictionary = defaultDictionary,
  onNavigate,
  className = '',
}: LanguageSwitcherProps) {
  const links = buildLanguageSwitcherItems(locale, currentPath, dictionary.languages)

  return (
    <div role="group" aria-label={dictionary.navigation.languageSelection} className={className}>
      <ul className="flex items-center gap-1">
        {links.map((link) => (
          <li key={link.locale}>
            <Link
              href={link.href}
              hrefLang={link.hrefLang}
              lang={link.lang}
              aria-current={link.ariaCurrent}
              aria-label={link.fullName}
              onClick={() => {
                rememberLocale(link.locale)
                onNavigate?.()
              }}
              className="inline-flex min-h-8 items-center justify-center rounded px-2 text-xs font-semibold transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a020] aria-[current=page]:bg-[#e8a020] aria-[current=page]:text-[#3a2200]"
            >
              {link.shortLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

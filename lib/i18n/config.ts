export const locales = ['en', 'zh', 'de', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const siteUrl = 'https://kinggoodpackaging.com'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return locale === defaultLocale
    ? normalized
    : `/${locale}${normalized === '/' ? '' : normalized}`
}

export function getAlternateLanguages(path: string): Record<string, string> {
  const links = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}${localizePath(path, locale)}`]),
  ) as Record<string, string>

  links['x-default'] = links.en
  return links
}

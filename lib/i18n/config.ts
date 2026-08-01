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

export type LanguageSwitcherLink = {
  locale: Locale
  href: string
  isCurrent: boolean
}

function normalizeCurrentPath(currentPath: string): string {
  const pathWithoutQuery = currentPath.split(/[?#]/, 1)[0] || '/'
  const normalized = `/${pathWithoutQuery.replace(/^\/+/, '')}`
  const segments = normalized.split('/')

  if (segments[1] && isLocale(segments[1])) segments.splice(1, 1)

  return segments.join('/') || '/'
}

export function buildLanguageSwitcherLinks(
  currentLocale: Locale,
  currentPath: string,
): LanguageSwitcherLink[] {
  if (!isLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${String(currentLocale)}`)
  }

  const normalizedPath = normalizeCurrentPath(currentPath)

  return locales.map((locale) => ({
    locale,
    href: localizePath(normalizedPath, locale),
    isCurrent: locale === currentLocale,
  }))
}

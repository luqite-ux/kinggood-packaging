import { localizePath, type Locale } from './i18n/config.ts'
import type { Dictionary } from './i18n/types.ts'

type NavigationLabels = Dictionary['navigation']

export function resolveInitialHeaderPath(
  initialPath: string | undefined,
  detectedPath: string | null,
): string {
  return initialPath ?? detectedPath ?? ''
}

export function buildSiteHeaderNavigation(
  locale: Locale,
  navigation: NavigationLabels,
  currentPath: string,
) {
  const items = [
    { label: navigation.home, path: '/' },
    { label: navigation.products, path: '/products' },
    { label: navigation.customPackaging, path: '/custom-packaging' },
    { label: navigation.industries, path: '/industries' },
    { label: navigation.about, path: '/about' },
    { label: navigation.news, path: '/news' },
    { label: navigation.contact, path: '/contact' },
  ]

  return items.map((item) => {
    const href = localizePath(item.path, locale)
    const isRoot = href === '/' || href === `/${locale}`

    return {
      label: item.label,
      href,
      isActive: isRoot ? currentPath === href : currentPath.startsWith(href),
    }
  })
}

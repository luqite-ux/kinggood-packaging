import type { Metadata, MetadataRoute, Viewport } from 'next'
import {
  defaultLocale,
  getAlternateLanguages,
  isLocale,
  locales,
  localizePath,
  siteUrl,
  type Locale,
} from './i18n/config.ts'

export const SITE_URL = siteUrl

export const siteViewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0d4077',
  width: 'device-width',
  initialScale: 1,
}

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  de: 'de_DE',
  es: 'es_ES',
}

const publicStaticPaths = new Set([
  '/',
  '/products',
  '/custom-packaging',
  '/industries',
  '/about',
  '/news',
  '/contact',
])

const safeSlug = '[a-z0-9][a-z0-9._~-]*'
const publicDynamicPath = new RegExp(`^/(?:products|news)/${safeSlug}$`, 'i')

export type LocalizedMetadataInput = {
  title: string
  absoluteTitle?: boolean
  description: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
}

type BreadcrumbInput = {
  name: string
  path: string
}

type OrganizationStructuredDataInput = {
  kind: 'organization'
  name: string
  alternateName?: string
  logo: string
  image: string
  foundingDate?: string
  email?: string
  telephone?: string
  address?: Record<string, unknown>
}

type ProductStructuredDataInput = {
  kind: 'product'
  path: string
  name: string
  description: string
  category: string
  sku: string
  image: string | string[]
  brand?: string
  breadcrumbs: BreadcrumbInput[]
}

type ArticleStructuredDataInput = {
  kind: 'article'
  path: string
  headline: string
  description: string
  image?: string | null
  datePublished?: string | null
  dateModified?: string | null
  contentLocale?: Locale
  breadcrumbs: BreadcrumbInput[]
}

export type LocalizedStructuredDataInput =
  | OrganizationStructuredDataInput
  | ProductStructuredDataInput
  | ArticleStructuredDataInput

export function absoluteUrl(path: string) {
  const url = new URL(path, `${SITE_URL}/`)
  if (url.protocol === 'http:') url.protocol = 'https:'
  if (url.protocol !== 'https:') return new URL('/factory-exterior.png', `${SITE_URL}/`).toString()
  return url.toString()
}

export function localizedMetadata(
  path: string,
  locale: Locale,
  input: LocalizedMetadataInput,
): Metadata {
  const canonical = absoluteUrl(localizePath(path, locale))
  const image = absoluteUrl(input.image || '/factory-exterior.png')
  const type = input.type || 'website'
  const openGraph = {
    title: input.title,
    description: input.description,
    type,
    url: canonical,
    siteName: 'KINGGOOD Packaging',
    locale: openGraphLocales[locale],
    alternateLocale: locales
      .filter((alternateLocale) => alternateLocale !== locale)
      .map((alternateLocale) => openGraphLocales[alternateLocale]),
    images: [{ url: image, alt: input.imageAlt || input.title }],
    ...(type === 'article'
      ? {
          publishedTime: input.publishedTime || undefined,
          modifiedTime: input.modifiedTime || input.publishedTime || undefined,
        }
      : {}),
  } satisfies NonNullable<Metadata['openGraph']>

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical,
      languages: getAlternateLanguages(path),
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
  }
}

export function isIndexablePublicPath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) return false
  if (path.length > 1 && path.endsWith('/')) return false
  const firstSegment = path.split('/')[1]
  if (firstSegment && isLocale(firstSegment)) return false
  return publicStaticPaths.has(path) || publicDynamicPath.test(path)
}

export function expandLocalizedUrls(path: string): string[] {
  if (!isIndexablePublicPath(path)) return []
  return locales.map((locale) => absoluteUrl(localizePath(path, locale)))
}

export function buildLocalizedSitemapEntries(
  path: string,
  lastModified?: string | Date | null,
): MetadataRoute.Sitemap {
  const normalizedLastModified = lastModified || undefined
  return expandLocalizedUrls(path).map((url) => ({
    url,
    lastModified: normalizedLastModified,
  }))
}

export function strictSitemapRecords<T>(data: T[] | null | undefined, error: unknown): T[] {
  return error || !data ? [] : data
}

export function documentLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale
}

function absoluteImages(image: string | string[] | null | undefined): string[] | undefined {
  if (!image) return undefined
  const images = Array.isArray(image) ? image : [image]
  return images.map(absoluteUrl)
}

function localizedBreadcrumbs(locale: Locale, breadcrumbs: BreadcrumbInput[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(localizePath(breadcrumb.path, locale)),
    })),
  }
}

export function localizedStructuredData(locale: Locale, input: LocalizedStructuredDataInput) {
  if (input.kind === 'organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      inLanguage: locale,
      name: input.name,
      alternateName: input.alternateName,
      url: SITE_URL,
      logo: absoluteUrl(input.logo),
      image: absoluteUrl(input.image),
      foundingDate: input.foundingDate,
      email: input.email,
      telephone: input.telephone,
      address: input.address,
    }
  }

  const canonical = absoluteUrl(localizePath(input.path, locale))
  if (input.kind === 'product') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          '@id': `${canonical}#product`,
          inLanguage: locale,
          name: input.name,
          description: input.description,
          image: absoluteImages(input.image),
          category: input.category,
          sku: input.sku,
          brand: { '@type': 'Brand', name: input.brand || 'KINGGOOD' },
          manufacturer: { '@id': `${SITE_URL}/#organization` },
          url: canonical,
        },
        localizedBreadcrumbs(locale, input.breadcrumbs),
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${canonical}#article`,
        inLanguage: input.contentLocale || locale,
        headline: input.headline,
        description: input.description,
        image: absoluteImages(input.image),
        datePublished: input.datePublished || undefined,
        dateModified: input.dateModified || input.datePublished || undefined,
        mainEntityOfPage: canonical,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      localizedBreadcrumbs(locale, input.breadcrumbs),
    ],
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

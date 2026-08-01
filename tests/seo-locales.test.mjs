import assert from 'node:assert/strict'
import test from 'node:test'

import * as seo from '../lib/seo.ts'

function requiredFunction(name) {
  assert.equal(typeof seo[name], 'function', `${name} must be implemented`)
  return seo[name]
}

const metadataInput = {
  title: 'Industriepalette',
  description: 'Technische Holzpalette für industrielle Transporte.',
  image: '/factory-exterior.png',
  imageAlt: 'KINGGOOD Fabrik',
}

test('German metadata uses the formal canonical and reciprocal hreflang URLs', () => {
  const localizedMetadata = requiredFunction('localizedMetadata')
  const metadata = localizedMetadata('/products/example', 'de', metadataInput)

  assert.equal(metadata.alternates.canonical, 'https://kinggoodpackaging.com/de/products/example')
  assert.deepEqual(metadata.alternates.languages, {
    en: 'https://kinggoodpackaging.com/products/example',
    zh: 'https://kinggoodpackaging.com/zh/products/example',
    de: 'https://kinggoodpackaging.com/de/products/example',
    es: 'https://kinggoodpackaging.com/es/products/example',
    'x-default': 'https://kinggoodpackaging.com/products/example',
  })
})

test('localized metadata emits matching Open Graph and Twitter data with an HTTPS image', () => {
  const localizedMetadata = requiredFunction('localizedMetadata')
  const metadata = localizedMetadata('/products/example', 'de', metadataInput)

  assert.equal(metadata.openGraph.url, 'https://kinggoodpackaging.com/de/products/example')
  assert.equal(metadata.openGraph.locale, 'de_DE')
  assert.deepEqual(metadata.openGraph.alternateLocale, ['en_US', 'zh_CN', 'es_ES'])
  assert.deepEqual(metadata.openGraph.images, [{
    url: 'https://kinggoodpackaging.com/factory-exterior.png',
    alt: 'KINGGOOD Fabrik',
  }])
  assert.deepEqual(metadata.twitter, {
    card: 'summary_large_image',
    title: metadataInput.title,
    description: metadataInput.description,
    images: ['https://kinggoodpackaging.com/factory-exterior.png'],
  })
})

test('English metadata stays unprefixed and never creates an /en duplicate', () => {
  const localizedMetadata = requiredFunction('localizedMetadata')
  const metadata = localizedMetadata('/about', 'en', metadataInput)

  assert.equal(metadata.alternates.canonical, 'https://kinggoodpackaging.com/about')
  assert.equal(metadata.openGraph.locale, 'en_US')
  assert.doesNotMatch(metadata.alternates.canonical, /\/en(?:\/|$)/)
})

test('an absolute page title bypasses the shared template without changing social titles', () => {
  const localizedMetadata = requiredFunction('localizedMetadata')
  const metadata = localizedMetadata('/', 'zh', {
    ...metadataInput,
    absoluteTitle: true,
  })

  assert.deepEqual(metadata.title, { absolute: metadataInput.title })
  assert.equal(metadata.openGraph.title, metadataInput.title)
  assert.equal(metadata.twitter.title, metadataInput.title)
})

test('sitemap expansion emits four unique URLs and preserves a supplied modification date', () => {
  const expandLocalizedUrls = requiredFunction('expandLocalizedUrls')
  const buildLocalizedSitemapEntries = requiredFunction('buildLocalizedSitemapEntries')
  const updatedAt = new Date('2026-07-30T08:15:00.000Z')

  assert.deepEqual(expandLocalizedUrls('/about'), [
    'https://kinggoodpackaging.com/about',
    'https://kinggoodpackaging.com/zh/about',
    'https://kinggoodpackaging.com/de/about',
    'https://kinggoodpackaging.com/es/about',
  ])
  const entries = buildLocalizedSitemapEntries('/products/example', updatedAt)
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 4)
  assert.deepEqual(entries.map((entry) => entry.lastModified), [updatedAt, updatedAt, updatedAt, updatedAt])
})

test('sitemap expansion rejects private, duplicate-English, and unsupported locale paths', () => {
  const expandLocalizedUrls = requiredFunction('expandLocalizedUrls')

  for (const path of ['/admin', '/admin/login', '/api/auth/login', '/en', '/en/about', '/fr/about', '//example.com/about']) {
    assert.deepEqual(expandLocalizedUrls(path), [], path)
  }
})

test('strict sitemap records preserve a successful empty active set instead of using fallback data', () => {
  const strictSitemapRecords = requiredFunction('strictSitemapRecords')
  const fallback = [{ slug: 'fallback-product' }]

  assert.deepEqual(strictSitemapRecords([], null, fallback), [])
  assert.deepEqual(strictSitemapRecords(null, new Error('query failed'), fallback), [])
  assert.deepEqual(
    strictSitemapRecords([{ slug: 'active-product' }], null, fallback),
    [{ slug: 'active-product' }],
  )
})

test('document locale is derived from the first supported pathname segment', () => {
  const documentLocaleFromPathname = requiredFunction('documentLocaleFromPathname')

  assert.equal(documentLocaleFromPathname('/zh/products/example'), 'zh')
  assert.equal(documentLocaleFromPathname('/de/about'), 'de')
  assert.equal(documentLocaleFromPathname('/es'), 'es')
  assert.equal(documentLocaleFromPathname('/products/example'), 'en')
  assert.equal(documentLocaleFromPathname('/fr/about'), 'en')
})

test('localized Product structured data uses translated fields and localized breadcrumbs', () => {
  const localizedStructuredData = requiredFunction('localizedStructuredData')
  const value = localizedStructuredData('de', {
    kind: 'product',
    path: '/products/example',
    name: 'Industriepalette',
    description: 'Technische Holzpalette für industrielle Transporte.',
    category: 'Paletten',
    sku: 'example',
    image: '/factory-exterior.png',
    breadcrumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Produkte', path: '/products' },
      { name: 'Industriepalette', path: '/products/example' },
    ],
  })

  const [product, breadcrumbs] = value['@graph']
  assert.equal(product['@type'], 'Product')
  assert.equal(product.name, 'Industriepalette')
  assert.equal(product.description, 'Technische Holzpalette für industrielle Transporte.')
  assert.equal(product.category, 'Paletten')
  assert.equal(product.inLanguage, 'de')
  assert.deepEqual(product.image, ['https://kinggoodpackaging.com/factory-exterior.png'])
  assert.deepEqual(breadcrumbs.itemListElement.map(({ name, item }) => ({ name, item })), [
    { name: 'Startseite', item: 'https://kinggoodpackaging.com/de' },
    { name: 'Produkte', item: 'https://kinggoodpackaging.com/de/products' },
    { name: 'Industriepalette', item: 'https://kinggoodpackaging.com/de/products/example' },
  ])
})

test('localized NewsArticle structured data uses translated fields and actual dates', () => {
  const localizedStructuredData = requiredFunction('localizedStructuredData')
  const value = localizedStructuredData('es', {
    kind: 'article',
    path: '/news/example',
    headline: 'Noticias de embalaje',
    description: 'Información logística para exportadores.',
    image: 'https://images.example.com/article.jpg',
    datePublished: '2026-07-01T00:00:00.000Z',
    dateModified: '2026-07-21T00:00:00.000Z',
    breadcrumbs: [
      { name: 'Inicio', path: '/' },
      { name: 'Noticias', path: '/news' },
      { name: 'Noticias de embalaje', path: '/news/example' },
    ],
  })

  const article = value['@graph'][0]
  assert.equal(article['@type'], 'NewsArticle')
  assert.equal(article.headline, 'Noticias de embalaje')
  assert.equal(article.description, 'Información logística para exportadores.')
  assert.equal(article.inLanguage, 'es')
  assert.equal(article.datePublished, '2026-07-01T00:00:00.000Z')
  assert.equal(article.dateModified, '2026-07-21T00:00:00.000Z')
  assert.equal(article.mainEntityOfPage, 'https://kinggoodpackaging.com/es/news/example')
})

test('Organization structured data preserves the confirmed legal identity', () => {
  const localizedStructuredData = requiredFunction('localizedStructuredData')
  const legalName = 'Kinggood Packaging Materials (Nantong) Co., Ltd.'
  const value = localizedStructuredData('zh', {
    kind: 'organization',
    name: legalName,
    alternateName: 'KINGGOOD Packaging',
    logo: '/kinggood-logo.png',
    image: '/factory-exterior.png',
  })

  assert.equal(value.name, legalName)
  assert.equal(value.alternateName, 'KINGGOOD Packaging')
  assert.equal(value.inLanguage, 'zh')
  assert.equal(value.url, 'https://kinggoodpackaging.com')
  assert.equal(value.logo, 'https://kinggoodpackaging.com/kinggood-logo.png')
})

test('shared viewport preserves the existing browser theme contract', () => {
  assert.deepEqual(seo.siteViewport, {
    colorScheme: 'light',
    themeColor: '#0d4077',
    width: 'device-width',
    initialScale: 1,
  })
})

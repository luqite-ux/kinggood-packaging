import assert from 'node:assert/strict'
import test from 'node:test'
import { buildLanguageSwitcherLinks, isLocale, localizePath, getAlternateLanguages } from '../lib/i18n/config.ts'
import en from '../lib/i18n/dictionaries/en.ts'
import zh from '../lib/i18n/dictionaries/zh.ts'
import de from '../lib/i18n/dictionaries/de.ts'
import es from '../lib/i18n/dictionaries/es.ts'
import * as i18nConfig from '../lib/i18n/config.ts'

test('validates only supported locales', () => {
  assert.equal(isLocale('de'), true)
  assert.equal(isLocale('fr'), false)
})

test('keeps English unprefixed and prefixes other languages', () => {
  assert.equal(localizePath('/products/example', 'en'), '/products/example')
  assert.equal(localizePath('/products/example', 'zh'), '/zh/products/example')
})

test('builds reciprocal language URLs with English x-default', () => {
  const links = getAlternateLanguages('/products/example')
  assert.equal(links.en, 'https://kinggoodpackaging.com/products/example')
  assert.equal(links.zh, 'https://kinggoodpackaging.com/zh/products/example')
  assert.equal(links.de, 'https://kinggoodpackaging.com/de/products/example')
  assert.equal(links.es, 'https://kinggoodpackaging.com/es/products/example')
  assert.equal(links['x-default'], links.en)
})

test('provides complete localized carousel alternatives and metric values', () => {
  for (const dictionary of [en, zh, de, es]) {
    assert.equal(typeof dictionary.carousel.ariaLabel, 'string')
    assert.equal(dictionary.carousel.goToSlide.includes('{slide}'), true)
    assert.equal(typeof dictionary.carousel.imageAlt.factoryExterior, 'string')
    assert.equal(typeof dictionary.carousel.imageAlt.factoryProduction, 'string')
    assert.equal(typeof dictionary.hero.metrics.operating.value, 'string')
    assert.equal(typeof dictionary.hero.metrics.production.value, 'string')
  }
})

test('provides localized contact form validation messages', () => {
  for (const dictionary of [en, zh, de, es]) {
    assert.equal(dictionary.forms.requiredField.includes('{field}'), true)
    assert.equal(typeof dictionary.forms.invalidEmail, 'string')
    assert.notEqual(dictionary.forms.invalidEmail.trim(), '')
  }
})

test('provides a localized English-content fallback notice', () => {
  for (const dictionary of [en, zh, de, es]) {
    assert.equal(typeof dictionary.errors.englishFallbackNotice, 'string')
    assert.notEqual(dictionary.errors.englishFallbackNotice.trim(), '')
  }
})

test('builds language links for the home page with English unprefixed', () => {
  const links = buildLanguageSwitcherLinks('en', '/')

  assert.deepEqual(links.map(({ locale, href }) => [locale, href]), [
    ['en', '/'],
    ['zh', '/zh'],
    ['de', '/de'],
    ['es', '/es'],
  ])
  assert.equal(links.find((link) => link.locale === 'en')?.isCurrent, true)
})

test('preserves a nested product path while switching languages', () => {
  const links = buildLanguageSwitcherLinks('de', '/de/products/eu-standard-solid-wood-pallet')

  assert.deepEqual(links.map(({ locale, href }) => [locale, href]), [
    ['en', '/products/eu-standard-solid-wood-pallet'],
    ['zh', '/zh/products/eu-standard-solid-wood-pallet'],
    ['de', '/de/products/eu-standard-solid-wood-pallet'],
    ['es', '/es/products/eu-standard-solid-wood-pallet'],
  ])
  assert.equal(links.find((link) => link.locale === 'de')?.isCurrent, true)
})

test('removes query and hash fragments before localizing a path', () => {
  const links = buildLanguageSwitcherLinks('zh', '/zh/contact?product=crate#form')

  assert.equal(links.find((link) => link.locale === 'en')?.href, '/contact')
  assert.equal(links.find((link) => link.locale === 'es')?.href, '/es/contact')
})

test('rejects unsupported current locales at runtime', () => {
  assert.throws(
    () => buildLanguageSwitcherLinks('fr', '/products'),
    /Unsupported locale: fr/,
  )
})

test('localizes only safe single-slash public paths', () => {
  assert.equal(typeof i18nConfig.localizeNavigationHref, 'function')
  assert.equal(i18nConfig.localizeNavigationHref('/products', 'zh'), '/zh/products')
  assert.equal(i18nConfig.localizeNavigationHref('//cdn.example.com/image.png', 'zh'), '//cdn.example.com/image.png')
  assert.equal(i18nConfig.localizeNavigationHref('https://example.com', 'zh'), 'https://example.com')
  assert.equal(i18nConfig.localizeNavigationHref('/admin', 'zh'), '/admin')
  assert.equal(i18nConfig.localizeNavigationHref('/admin/products', 'zh'), '/admin/products')
  assert.equal(i18nConfig.localizeNavigationHref('/administer', 'zh'), '/zh/administer')
})

test('builds a complete language-switcher rendering model', () => {
  assert.equal(typeof i18nConfig.buildLanguageSwitcherItems, 'function')
  const labels = {
    en: { shortLabel: 'EN', fullName: 'English' },
    zh: { shortLabel: '中文', fullName: '简体中文' },
    de: { shortLabel: 'DE', fullName: 'Deutsch' },
    es: { shortLabel: 'ES', fullName: 'Español' },
  }
  const items = i18nConfig.buildLanguageSwitcherItems('de', '/de/about', labels)

  assert.deepEqual(items[0], {
    locale: 'en',
    href: '/about',
    hrefLang: 'en',
    lang: 'en',
    shortLabel: 'EN',
    fullName: 'English',
    ariaCurrent: undefined,
  })
  for (const item of items) {
    assert.equal(item.hrefLang, item.locale)
    assert.equal(item.lang, item.locale)
    assert.notEqual(item.fullName.trim(), '')
  }
  assert.deepEqual(
    items.filter((item) => item.ariaCurrent === 'page').map((item) => item.locale),
    ['de'],
  )
  assert.equal(items.find((item) => item.locale === 'de')?.ariaCurrent, 'page')
})

test('serializes the locale preference cookie with the required scope and lifetime', () => {
  assert.equal(typeof i18nConfig.serializeLocaleCookie, 'function')
  assert.equal(
    i18nConfig.serializeLocaleCookie('zh'),
    'kinggood_locale=zh; Max-Age=31536000; Path=/; SameSite=Lax',
  )
  for (const locale of ['en', 'zh', 'de', 'es']) {
    const cookie = i18nConfig.serializeLocaleCookie(locale)
    assert.match(cookie, new RegExp(`^kinggood_locale=${locale};`))
    assert.match(cookie, /Max-Age=31536000/)
    assert.match(cookie, /Path=\//)
    assert.match(cookie, /SameSite=Lax$/)
  }
})

test('provides typed localized static page content and language controls', () => {
  for (const dictionary of [en, zh, de, es]) {
    assert.equal(typeof dictionary.navigation.languageSelection, 'string')
    assert.notEqual(dictionary.navigation.languageSelection.trim(), '')
    for (const locale of ['en', 'zh', 'de', 'es']) {
      assert.equal(typeof dictionary.languages[locale].shortLabel, 'string')
      assert.equal(typeof dictionary.languages[locale].fullName, 'string')
    }
    assert.equal(typeof dictionary.content.home.products.title, 'string')
    assert.equal(typeof dictionary.content.shared.brandLockup, 'string')
    assert.equal(dictionary.content.shared.footerProducts.length, 7)
    assert.equal(typeof dictionary.content.shared.footerProducts[0].name, 'string')
    assert.equal(typeof dictionary.content.products.ctaTitle, 'string')
    assert.equal(typeof dictionary.content.productDetail.overview, 'string')
    assert.equal(typeof dictionary.content.about.storyTitle, 'string')
    assert.equal(typeof dictionary.content.contact.introduction, 'string')
    assert.equal(typeof dictionary.content.customPackaging.introTitle, 'string')
    assert.equal(typeof dictionary.content.industries.introTitle, 'string')
  }

  assert.notEqual(zh.content.home.products.title, en.content.home.products.title)
  assert.notEqual(de.content.about.storyTitle, en.content.about.storyTitle)
  assert.notEqual(es.content.industries.introTitle, en.content.industries.introTitle)
})

test('localized dictionaries contain no prohibited service promises', () => {
  const prohibited = /warrant|guarantee|质保|保修|质量保证|gewähr|garant/iu
  for (const dictionary of [en, zh, de, es]) {
    assert.doesNotMatch(JSON.stringify(dictionary), prohibited)
  }
})

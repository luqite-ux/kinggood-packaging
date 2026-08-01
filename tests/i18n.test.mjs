import assert from 'node:assert/strict'
import test from 'node:test'
import { buildLanguageSwitcherLinks, isLocale, localizePath, getAlternateLanguages } from '../lib/i18n/config.ts'
import en from '../lib/i18n/dictionaries/en.ts'
import zh from '../lib/i18n/dictionaries/zh.ts'
import de from '../lib/i18n/dictionaries/de.ts'
import es from '../lib/i18n/dictionaries/es.ts'

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

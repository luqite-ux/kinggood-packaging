import assert from 'node:assert/strict'
import test from 'node:test'
import englishDictionary from '../lib/i18n/dictionaries/en.ts'

const navigationModule = await import('../lib/site-header-navigation.ts').catch(() => ({}))
const { buildSiteHeaderNavigation, resolveInitialHeaderPath } = navigationModule

test('keeps the root active indicator identical for SSR and the first client render', () => {
  assert.equal(typeof resolveInitialHeaderPath, 'function')
  assert.equal(typeof buildSiteHeaderNavigation, 'function')

  const serverPath = resolveInitialHeaderPath('/', null)
  const clientPath = resolveInitialHeaderPath('/', '/')
  const serverNavigation = buildSiteHeaderNavigation(
    'en',
    englishDictionary.navigation,
    serverPath,
  )
  const clientNavigation = buildSiteHeaderNavigation(
    'en',
    englishDictionary.navigation,
    clientPath,
  )

  assert.equal(serverPath, '/')
  assert.equal(clientPath, '/')
  assert.deepEqual(serverNavigation, clientNavigation)
  assert.deepEqual(
    serverNavigation.map(({ href, isActive }) => ({ href, isActive })),
    [
      { href: '/', isActive: true },
      { href: '/products', isActive: false },
      { href: '/custom-packaging', isActive: false },
      { href: '/industries', isActive: false },
      { href: '/about', isActive: false },
      { href: '/news', isActive: false },
      { href: '/contact', isActive: false },
    ],
  )
})

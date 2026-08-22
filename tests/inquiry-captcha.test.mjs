import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import test from 'node:test'

const root = fileURLToPath(new URL('..', import.meta.url))
const read = (relativePath) => readFileSync(path.join(root, relativePath), 'utf8')
process.env.NODE_ENV = 'test'
const {
  issueCaptchaChallenge,
  verifyCaptchaSubmission,
} = await import(pathToFileURL(path.join(root, 'lib/inquiry-captcha.ts')).href)

const secret = 'test-secret-'.repeat(4)
const tenantId = '11111111-1111-4111-8111-111111111111'
const siteScope = 'customer-site-test'
const formScope = 'captcha_11111111111111111111111111111111'

function memoryStore() {
  const current = new Map()
  return {
    async issue(record) {
      current.set(record.formScopeHash, { ...record, consumed: false })
    },
    async consume(record) {
      const saved = current.get(record.formScopeHash)
      if (
        !saved ||
        saved.consumed ||
        !record.tokenHash ||
        saved.tenantId !== record.tenantId ||
        saved.siteScopeHash !== record.siteScopeHash ||
        saved.challengeHash !== record.challengeHash ||
        saved.tokenHash !== record.tokenHash ||
        saved.expiresAt <= (record.now ?? Date.now())
      ) return false
      saved.consumed = true
      return true
    },
  }
}

async function issue(store, scope = formScope, now = 1_000) {
  return issueCaptchaChallenge({ secret, tenantId, siteScope, scope, store, now })
}

test('signed CAPTCHA is atomically single-use and scoped to this tenant/site/form', async () => {
  const store = memoryStore()
  const challenge = await issue(store)
  assert.ok(challenge.testAnswer)
  const input = {
    secret,
    tenantId,
    siteScope,
    scope: formScope,
    token: challenge.token,
    answer: challenge.testAnswer,
    store,
    now: 1_001,
  }
  assert.deepEqual(await verifyCaptchaSubmission(input), { ok: true })
  assert.deepEqual(await verifyCaptchaSubmission(input), { ok: false, code: 'invalid' })
  assert.deepEqual(
    await verifyCaptchaSubmission({ ...input, siteScope: 'another-site' }),
    { ok: false, code: 'invalid' },
  )
})

test('an incorrect answer consumes the challenge and blocks a later replay with the right answer', async () => {
  const store = memoryStore()
  const challenge = await issue(store)
  const wrong = {
    secret,
    tenantId,
    siteScope,
    scope: formScope,
    token: challenge.token,
    answer: 'ZZZZ',
    store,
    now: 1_001,
  }
  assert.deepEqual(await verifyCaptchaSubmission(wrong), { ok: false, code: 'invalid' })
  assert.deepEqual(
    await verifyCaptchaSubmission({ ...wrong, answer: challenge.testAnswer }),
    { ok: false, code: 'invalid' },
  )
})

test('refresh replaces only the current form scope challenge', async () => {
  const store = memoryStore()
  const first = await issue(store)
  const second = await issue(store, formScope, 1_010)
  assert.deepEqual(
    await verifyCaptchaSubmission({
      secret, tenantId, siteScope, scope: formScope, token: first.token,
      answer: first.testAnswer, store, now: 1_011,
    }),
    { ok: false, code: 'invalid' },
  )
  assert.deepEqual(
    await verifyCaptchaSubmission({
      secret, tenantId, siteScope, scope: formScope, token: second.token,
      answer: second.testAnswer, store, now: 1_011,
    }),
    { ok: true },
  )
})

test('runtime uses the hardened Supabase store and never cookie-only CAPTCHA state', () => {
  const core = read('lib/inquiry-captcha.ts')
  const issueRoute = read('app/api/captcha/route.ts')
  assert.match(core, /issue_inquiry_captcha_challenge/)
  assert.match(core, /consume_inquiry_captcha_challenge/)
  assert.match(core, /SUPABASE_SERVICE_ROLE_KEY/)
  assert.match(core, /CAPTCHA_SITE_SCOPE/)
  assert.match(issueRoute, /issueCaptchaChallenge/)
  assert.match(issueRoute, /createSupabaseCaptchaContextFromEnv/)
  assert.doesNotMatch(core + issueRoute, /cookies\(|Set-Cookie|captcha_cookie/i)
})

test('every real inquiry form has per-instance scope, refresh, and all CAPTCHA fields', () => {
  for (const relativePath of ["components/contact-form.tsx"]) {
    const source = read(relativePath)
    assert.match(source, /InquiryCaptchaField/, relativePath)
    assert.match(source, /captchaToken/, relativePath)
    assert.match(source, /captchaAnswer/, relativePath)
    assert.match(source, /captchaScope/, relativePath)
    assert.match(source, /captchaRefreshKey/, relativePath)
  }
  const field = read('components/inquiry-captcha-field.tsx')
  assert.match(field, /createInquiryCaptchaScope/)
  assert.match(field, /\/api\/captcha\?scope=/)
  assert.match(field, /换一张/)
})

test('server atomically verifies before every inquiries insert and env stays server-only', () => {
  const route = read("app/api/inquiries/route.ts")
  const verifyIndex = route.indexOf('verifyCaptchaSubmission(')
  const insertIndex = route.search(/from\s*\(\s*['"]inquiries['"]\s*\)[\s\S]{0,500}?\.insert\s*\(/)
  assert.ok(verifyIndex >= 0, 'missing hardened verification')
  assert.ok(insertIndex > verifyIndex, 'inquiry insert is not guarded before persistence')
  assert.match(route, /captchaScope/)
  assert.match(route, /if\s*\(\s*!captchaResult\.ok\s*\)/)
  const env = read('.env.example')
  assert.match(env, /^CAPTCHA_SECRET=/m)
  assert.match(env, /^CAPTCHA_SITE_SCOPE=/m)
  assert.match(env, /^SUPABASE_SERVICE_ROLE_KEY=/m)
  assert.doesNotMatch(env, /^NEXT_PUBLIC_(?:CAPTCHA_SECRET|CAPTCHA_SITE_SCOPE|SUPABASE_SERVICE_ROLE_KEY)=/m)
})

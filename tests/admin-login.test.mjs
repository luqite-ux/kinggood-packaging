import assert from 'node:assert/strict'
import test from 'node:test'

import bcrypt from 'bcryptjs'

const adminLoginModule = await import('../lib/admin-login.ts').catch(() => ({}))

const {
  ADMIN_LOGIN_ACTION,
  authenticateTenantAdmin,
  createAdminLoginHandler,
  getAdminLoginFormProps,
} = adminLoginModule

function createSupabaseFixture({ users, sessionError = null }) {
  const sessions = []
  let adminQueryCount = 0

  return {
    sessions,
    get adminQueryCount() {
      return adminQueryCount
    },
    client: {
      from(table) {
        if (table === 'admin_users') {
          const filters = {}
          return {
            select() {
              return this
            },
            eq(column, value) {
              filters[column] = value
              return this
            },
            async maybeSingle() {
              adminQueryCount += 1
              return {
                data: users.find((user) =>
                  Object.entries(filters).every(([column, value]) => user[column] === value),
                ) || null,
                error: null,
              }
            },
          }
        }

        if (table === 'admin_user_sessions') {
          return {
            async insert(session) {
              sessions.push(session)
              return { error: sessionError }
            },
          }
        }

        throw new Error(`Unexpected table: ${table}`)
      },
    },
  }
}

test('keeps the customer login form on the same origin when an admin upstream exists', () => {
  assert.equal(typeof getAdminLoginFormProps, 'function')
  const previousAdminUrl = process.env.NEXT_PUBLIC_ADMIN_URL
  process.env.NEXT_PUBLIC_ADMIN_URL = 'https://admin.globle-trade.com'

  const formProps = getAdminLoginFormProps()
  const destination = new URL(formProps.action, 'https://kinggoodpackaging.com/admin/login')

  if (previousAdminUrl === undefined) delete process.env.NEXT_PUBLIC_ADMIN_URL
  else process.env.NEXT_PUBLIC_ADMIN_URL = previousAdminUrl

  assert.equal(ADMIN_LOGIN_ACTION, '/api/auth/login')
  assert.deepEqual(formProps, { action: '/api/auth/login', method: 'post' })
  assert.equal(destination.origin, 'https://kinggoodpackaging.com')
})

test('rejects another tenant admin even when the email and password are valid', async () => {
  assert.equal(typeof authenticateTenantAdmin, 'function')
  const password = 'correct-password'
  const fixture = createSupabaseFixture({
    users: [{
      id: 'other-admin',
      tenant_id: 'tenant-other',
      email: 'admin@example.com',
      password_hash: await bcrypt.hash(password, 4),
      is_active: true,
    }],
  })

  const result = await authenticateTenantAdmin({
    supabase: fixture.client,
    tenantId: 'tenant-kinggood',
    email: 'admin@example.com',
    password,
  })

  assert.deepEqual(result, { ok: false, reason: 'invalid-credentials' })
  assert.equal(fixture.sessions.length, 0)
})

test('does not query administrators until the tenant is configured', async () => {
  assert.equal(typeof authenticateTenantAdmin, 'function')
  const fixture = createSupabaseFixture({ users: [] })

  const result = await authenticateTenantAdmin({
    supabase: fixture.client,
    tenantId: '',
    email: 'admin@example.com',
    password: 'irrelevant',
  })

  assert.deepEqual(result, { ok: false, reason: 'missing-tenant' })
  assert.equal(fixture.adminQueryCount, 0)
})

test('withholds session credentials when persistence fails', async () => {
  assert.equal(typeof authenticateTenantAdmin, 'function')
  const password = 'correct-password'
  const fixture = createSupabaseFixture({
    users: [{
      id: 'kinggood-admin',
      tenant_id: 'tenant-kinggood',
      email: 'admin@example.com',
      password_hash: await bcrypt.hash(password, 4),
      is_active: true,
    }],
    sessionError: { message: 'insert denied' },
  })

  const result = await authenticateTenantAdmin({
    supabase: fixture.client,
    tenantId: 'tenant-kinggood',
    email: 'admin@example.com',
    password,
  })

  assert.deepEqual(result, { ok: false, reason: 'session-persistence-failed' })
  assert.equal('token' in result, false)
})

test('redirects without cookies when the session insert returns a Supabase error', async () => {
  assert.equal(typeof createAdminLoginHandler, 'function')
  const password = 'correct-password'
  const fixture = createSupabaseFixture({
    users: [{
      id: 'kinggood-admin',
      tenant_id: 'tenant-kinggood',
      email: 'admin@example.com',
      password_hash: await bcrypt.hash(password, 4),
      is_active: true,
    }],
    sessionError: { message: 'insert denied' },
  })
  const handler = createAdminLoginHandler({
    getSupabase: () => fixture.client,
    getTenantId: () => 'tenant-kinggood',
  })
  const request = new Request('https://kinggoodpackaging.com/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email: 'admin@example.com', password }),
  })

  const response = await handler(request)
  const location = new URL(response.headers.get('location'))

  assert.equal(response.status, 303)
  assert.equal(location.origin, 'https://kinggoodpackaging.com')
  assert.equal(location.pathname, '/admin/login')
  assert.equal(location.searchParams.get('error'), 'Unable to sign in')
  assert.equal(response.headers.get('set-cookie'), null)
})

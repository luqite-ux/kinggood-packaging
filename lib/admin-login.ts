import crypto from 'node:crypto'
import type { SupabaseClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server.js'
import { SESSION_COOKIE, TENANT_COOKIE } from './admin-session.ts'

export const ADMIN_LOGIN_ACTION = '/api/auth/login'

export function getAdminLoginFormProps() {
  return {
    action: ADMIN_LOGIN_ACTION,
    method: 'post' as const,
  }
}

type AdminSupabaseClient = Pick<SupabaseClient, 'from'>

type AdminUser = {
  id: string
  tenant_id: string
  password_hash: string
  is_active: boolean
}

type AdminLoginFailure = {
  ok: false
  reason: 'missing-tenant' | 'invalid-credentials' | 'session-persistence-failed'
}

type AdminLoginSuccess = {
  ok: true
  token: string
  tenantId: string
  expires: Date
}

export type AdminLoginResult = AdminLoginFailure | AdminLoginSuccess

type AuthenticateTenantAdminInput = {
  supabase: AdminSupabaseClient
  tenantId: string
  email: string
  password: string
}

export async function authenticateTenantAdmin({
  supabase,
  tenantId,
  email,
  password,
}: AuthenticateTenantAdminInput): Promise<AdminLoginResult> {
  const normalizedTenantId = tenantId.trim()
  if (!normalizedTenantId) return { ok: false, reason: 'missing-tenant' }

  const { data, error } = await supabase
    .from('admin_users')
    .select('id,tenant_id,password_hash,is_active')
    .eq('email', email)
    .eq('tenant_id', normalizedTenantId)
    .maybeSingle()
  const user = data as AdminUser | null

  if (
    error
    || !user?.is_active
    || user.tenant_id !== normalizedTenantId
    || typeof user.password_hash !== 'string'
    || !(await bcrypt.compare(password, user.password_hash))
  ) {
    return { ok: false, reason: 'invalid-credentials' }
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 86_400_000)
  const { error: sessionError } = await supabase.from('admin_user_sessions').insert({
    admin_user_id: user.id,
    token,
    expires_at: expires.toISOString(),
  })

  if (sessionError) {
    return { ok: false, reason: 'session-persistence-failed' }
  }

  return { ok: true, token, tenantId: normalizedTenantId, expires }
}

type AdminLoginHandlerDependencies = {
  getSupabase: () => AdminSupabaseClient
  getTenantId: () => string | undefined
}

function redirectToLogin(request: Request, message: string) {
  const url = new URL('/admin/login', request.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url, 303)
}

export function createAdminLoginHandler({
  getSupabase,
  getTenantId,
}: AdminLoginHandlerDependencies) {
  return async function handleAdminLogin(request: Request) {
    const tenantId = getTenantId()?.trim()
    if (!tenantId) return redirectToLogin(request, 'Missing tenant configuration')

    const form = await request.formData()
    const email = String(form.get('email') || '').trim().toLowerCase()
    const password = String(form.get('password') || '')

    let result: AdminLoginResult
    try {
      result = await authenticateTenantAdmin({
        supabase: getSupabase(),
        tenantId,
        email,
        password,
      })
    } catch {
      return redirectToLogin(request, 'Unable to sign in')
    }

    if (!result.ok) {
      const message = result.reason === 'invalid-credentials'
        ? 'Invalid email or password'
        : result.reason === 'missing-tenant'
          ? 'Missing tenant configuration'
          : 'Unable to sign in'
      return redirectToLogin(request, message)
    }

    const response = NextResponse.redirect(new URL('/admin', request.url), 303)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax' as const,
      path: '/',
      expires: result.expires,
    }
    response.cookies.set(SESSION_COOKIE, result.token, cookieOptions)
    response.cookies.set(TENANT_COOKIE, result.tenantId, cookieOptions)
    return response
  }
}

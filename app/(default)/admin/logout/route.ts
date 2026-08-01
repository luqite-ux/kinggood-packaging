import { NextResponse } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'
export function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  response.cookies.delete(SESSION_COOKIE); response.cookies.delete(TENANT_COOKIE)
  return response
}

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  const captchaSecret = process.env.CAPTCHA_SECRET?.trim()
  if (!url || !serviceRoleKey || !tenantId || !captchaSecret) {
    return NextResponse.json({ error: 'The enquiry service is not configured.' }, { status: 503 })
  }

  const body = await request.json()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  if (!name || !emailPattern.test(email) || !message) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  let captchaResult
  try {
    const { tenantId: captchaTenantId, siteScope, store } = createSupabaseCaptchaContextFromEnv()
    captchaResult = await verifyCaptchaSubmission({
      secret: captchaSecret,
      tenantId: captchaTenantId,
      siteScope,
      store,
      scope: String(body.captchaScope || ''),
      token: String(body.captchaToken || ''),
      answer: String(body.captchaAnswer || ''),
    })
  } catch {
    return NextResponse.json({ error: 'The verification service is temporarily unavailable.' }, { status: 503 })
  }
  if (!captchaResult.ok) {
    return NextResponse.json({ error: 'The verification code is invalid or expired. Please try again.' }, { status: 400 })
  }

  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } })
  const { error } = await supabase.from('inquiries').insert({
    tenant_id: tenantId,
    name,
    email,
    company: String(body.company || '').trim() || null,
    subject: String(body.subject || 'Website enquiry').trim(),
    message,
    status: 'unread',
  })
  if (error) {
    return NextResponse.json({ error: 'Unable to submit your enquiry. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true }, { status: 201 })
}

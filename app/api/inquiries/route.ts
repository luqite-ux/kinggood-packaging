import { NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/server'
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!body || !tenantId || !String(body.name || '').trim() || !String(body.email || '').includes('@') || !String(body.message || '').trim()) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
  }
  const { error } = await getAdminSupabase().from('inquiries').insert({
    tenant_id: tenantId, name: String(body.name).trim(), email: String(body.email).trim(),
    company: String(body.company || '').trim(), subject: String(body.subject || 'Website enquiry').trim(),
    message: String(body.message).trim(),
  })
  if (error) return NextResponse.json({ error: 'Unable to save enquiry.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

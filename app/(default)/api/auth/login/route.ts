import { createAdminLoginHandler } from '@/lib/admin-login'
import { getAdminSupabase } from '@/lib/supabase/server'

const handleAdminLogin = createAdminLoginHandler({
  getSupabase: getAdminSupabase,
  getTenantId: () => process.env.NEXT_PUBLIC_TENANT_ID,
})

export async function POST(request: Request) {
  return handleAdminLogin(request)
}

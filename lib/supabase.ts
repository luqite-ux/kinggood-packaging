import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createTimeoutFetch } from './fetch-with-timeout.ts'

let client: SupabaseClient | null | undefined
const supabaseFetch = createTimeoutFetch(8_000)

export function getSupabaseClient() {
  if (client !== undefined) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  client = url && key
    ? createClient(url, key, {
        auth: { persistSession: false },
        global: { fetch: supabaseFetch },
      })
    : null
  return client
}

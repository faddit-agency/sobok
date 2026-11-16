import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

export function getSupabaseBrowser(): SupabaseClient | null {
  if (!url || !anon) return null
  if (!client) client = createClient(url, anon)
  return client
}

export function isSupabaseAuthConfigured() {
  return Boolean(url && anon)
}

export async function checkAdminAccess(session: Session | null): Promise<{
  ok: boolean
  reason?: string
  email?: string
}> {
  if (!session?.user) return { ok: false, reason: "not_signed_in" }
  const sb = getSupabaseBrowser()
  if (!sb) return { ok: false, reason: "supabase_not_configured" }

  const { data, error } = await sb
    .from("admin_memberships")
    .select("id, status, role")
    .eq("user_id", session.user.id)
    .eq("status", "active")
    .maybeSingle()

  if (error) return { ok: false, reason: error.message, email: session.user.email }
  if (!data) return { ok: false, reason: "not_admin", email: session.user.email }
  return { ok: true, email: session.user.email }
}

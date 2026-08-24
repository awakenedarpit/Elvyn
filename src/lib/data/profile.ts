import { createClient } from '@/lib/supabase/server'

export type Profile = {
  id: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, avatar_url, created_at, updated_at')
    .eq('id', userData.user.id)
    .maybeSingle()

  if (error) {
    throw new Error(`Unable to load profile: ${error.message}`)
  }

  return data as Profile | null
}

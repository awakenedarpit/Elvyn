import { createClient } from '@/lib/supabase/server'

export type Goal = {
  id: string
  user_id: string
  title: string
  description: string | null
  status: 'planned' | 'active' | 'completed' | 'archived'
  target_date: string | null
  created_at: string
  updated_at: string
}

export async function getCurrentUserGoals(): Promise<Goal[]> {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) return []

  const { data, error } = await supabase
    .from('goals')
    .select('id, user_id, title, description, status, target_date, created_at, updated_at')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Unable to load goals: ${error.message}`)
  return (data ?? []) as Goal[]
}

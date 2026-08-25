import { createClient, withFutureJwtRetry } from '@/lib/supabase/server'

export type Note = {
  id: string
  user_id: string
  title: string | null
  content: string
  created_at: string
  updated_at: string
}

export async function getCurrentUserNotes(): Promise<Note[]> {
  const supabase = await createClient()
  const { data, error } = await withFutureJwtRetry(() =>
    supabase
      .from('notes')
      .select('id, user_id, title, content, created_at, updated_at')
      .order('updated_at', { ascending: false }),
  )

  if (error) {
    throw new Error(`Unable to load notes: ${error.message}`)
  }

  return (data ?? []) as Note[]
}

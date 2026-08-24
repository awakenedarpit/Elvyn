'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createNote(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim() || null
  const content = String(formData.get('content') ?? '').trim()
  if (!content) throw new Error('Content is required.')
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('You must be signed in.')
  const { error: insertError } = await supabase.from('notes').insert({ user_id: data.user.id, title, content })
  if (insertError) throw new Error(`Unable to create note: ${insertError.message}`)
  revalidatePath('/dashboard/notes')
  revalidatePath('/dashboard')
}

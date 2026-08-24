'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTask(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  if (!title) throw new Error('Title is required.')
  const description = String(formData.get('description') ?? '').trim() || null
  const priority = String(formData.get('priority') ?? 'medium')
  if (!['low', 'medium', 'high'].includes(priority)) throw new Error('Invalid priority.')
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('You must be signed in.')
  const { error: insertError } = await supabase.from('tasks').insert({ user_id: data.user.id, title, description, priority, status: 'todo' })
  if (insertError) throw new Error(`Unable to create task: ${insertError.message}`)
  revalidatePath('/dashboard/tasks')
  revalidatePath('/dashboard')
}

export async function updateTaskStatus(formData: FormData) {
  const id = String(formData.get('id') ?? '').trim()
  const status = String(formData.get('status') ?? '')
  if (!id || !['todo', 'in_progress', 'completed', 'cancelled'].includes(status)) throw new Error('Invalid task update.')
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('You must be signed in.')
  const completed_at = status === 'completed' ? new Date().toISOString() : null
  const { error: updateError } = await supabase.from('tasks').update({ status, completed_at }).eq('id', id).eq('user_id', data.user.id)
  if (updateError) throw new Error(`Unable to update task: ${updateError.message}`)
  revalidatePath('/dashboard/tasks')
  revalidatePath('/dashboard')
}

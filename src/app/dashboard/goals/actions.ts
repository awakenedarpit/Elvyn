'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function requireText(value: FormDataEntryValue | null, field: string) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (!text) throw new Error(`${field} is required`)
  return text
}

async function getUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('You must be signed in.')
  return { supabase, user: data.user }
}

export async function createGoal(formData: FormData) {
  const title = requireText(formData.get('title'), 'Title')
  const description = String(formData.get('description') ?? '').trim() || null
  const targetDate = String(formData.get('target_date') ?? '').trim() || null
  const { supabase, user } = await getUser()

  const { error } = await supabase.from('goals').insert({ user_id: user.id, title, description, target_date: targetDate, status: 'planned' })
  if (error) throw new Error(`Unable to create goal: ${error.message}`)
  revalidatePath('/dashboard/goals')
  revalidatePath('/dashboard')
}

export async function updateGoal(formData: FormData) {
  const id = requireText(formData.get('id'), 'Goal')
  const title = requireText(formData.get('title'), 'Title')
  const description = String(formData.get('description') ?? '').trim() || null
  const targetDate = String(formData.get('target_date') ?? '').trim() || null
  const status = String(formData.get('status') ?? 'planned')
  if (!['planned', 'active', 'completed', 'archived'].includes(status)) throw new Error('Invalid goal status.')
  const { supabase, user } = await getUser()

  const { error } = await supabase.from('goals').update({ title, description, target_date: targetDate, status }).eq('id', id).eq('user_id', user.id)
  if (error) throw new Error(`Unable to update goal: ${error.message}`)
  revalidatePath('/dashboard/goals')
  revalidatePath('/dashboard')
}

export async function deleteGoal(formData: FormData) {
  const id = requireText(formData.get('id'), 'Goal')
  const { supabase, user } = await getUser()
  const { error } = await supabase.from('goals').delete().eq('id', id).eq('user_id', user.id)
  if (error) throw new Error(`Unable to delete goal: ${error.message}`)
  revalidatePath('/dashboard/goals')
  revalidatePath('/dashboard')
}

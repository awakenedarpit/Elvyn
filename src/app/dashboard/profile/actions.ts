'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const displayName = String(formData.get('display_name') ?? '').trim()
  const avatarUrl = String(formData.get('avatar_url') ?? '').trim()

  if (displayName.length > 80) {
    throw new Error('Display name must be 80 characters or fewer.')
  }

  if (avatarUrl.length > 500) {
    throw new Error('Avatar URL must be 500 characters or fewer.')
  }

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName || null,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userData.user.id)

  if (error) {
    throw new Error(`Unable to update profile: ${error.message}`)
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/profile')
  redirect('/dashboard/profile?saved=1')
}

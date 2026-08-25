import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const displayName = String(formData.get('display_name') ?? '').trim()
  const avatarUrl = String(formData.get('avatar_url') ?? '').trim()

  if (displayName.length > 80 || avatarUrl.length > 500) {
    return NextResponse.redirect(new URL('/dashboard/profile?error=invalid', request.url), 303)
  }

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return NextResponse.redirect(new URL('/login', request.url), 303)
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
    return NextResponse.redirect(new URL('/dashboard/profile?error=save', request.url), 303)
  }

  return NextResponse.redirect(new URL('/dashboard/profile?saved=1', request.url), 303)
}

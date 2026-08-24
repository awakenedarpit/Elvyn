import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getCurrentProfile } from '@/lib/data/profile'
import { createClient } from '@/lib/supabase/server'
import { updateProfile } from './actions'

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) redirect('/login')
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  const params = await searchParams

  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-2xl"><Link className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white" href="/dashboard">← Dashboard</Link><div className="mt-8"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Profile</h1><p className="mt-3 text-sm text-black/60 dark:text-white/60">Keep the profile information associated with your Elvyn account up to date.</p></div>{params.saved === '1' && <p className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300" role="status">Profile saved successfully.</p>}<form action={updateProfile} className="mt-8 grid gap-5 rounded-2xl border border-black/10 p-6 dark:border-white/10"><label className="grid gap-2 text-sm font-medium">Email<Input value={data.user.email ?? ''} readOnly disabled /></label><label className="grid gap-2 text-sm font-medium">Display name<Input name="display_name" defaultValue={profile.display_name ?? ''} maxLength={80} autoComplete="name" /></label><label className="grid gap-2 text-sm font-medium">Avatar URL<Input name="avatar_url" type="url" defaultValue={profile.avatar_url ?? ''} maxLength={500} placeholder="https://…" autoComplete="url" /></label><div><Button type="submit">Save profile</Button></div></form></section></main>
}

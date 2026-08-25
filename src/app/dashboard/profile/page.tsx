import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getCurrentProfile } from '@/lib/data/profile'
import { createClient } from '@/lib/supabase/server'

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) redirect('/login')
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  const params = await searchParams

  return <main id="main-content" className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-2xl elvyn-enter"><Link className="inline-flex min-h-11 items-center text-sm text-black/50 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:text-white/50 dark:hover:text-white" href="/dashboard">← Dashboard</Link><div className="mt-6"><p className="text-sm font-semibold tracking-[0.18em] text-[#6357dc] dark:text-[#a29cff]">ELVYN</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Profile</h1><p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">Keep the profile information associated with your Elvyn account up to date.</p></div>{params.saved === '1' && <p className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300" role="status">Profile saved successfully.</p>}{params.error && <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300" role="alert">Unable to save your profile. Please check the fields and try again.</p>}<form action="/api/profile" method="post" className="elvyn-card mt-8 grid gap-5 rounded-2xl p-6"><label className="grid gap-2 text-sm font-medium">Email<Input value={data.user.email ?? ''} readOnly disabled /></label><label className="grid gap-2 text-sm font-medium">Display name<Input name="display_name" defaultValue={profile.display_name ?? ''} maxLength={80} autoComplete="name" /></label><label className="grid gap-2 text-sm font-medium">Avatar URL<Input name="avatar_url" type="url" defaultValue={profile.avatar_url ?? ''} maxLength={500} placeholder="https://…" autoComplete="url" /></label><div><Button type="submit">Save profile</Button></div></form></section></main>
}

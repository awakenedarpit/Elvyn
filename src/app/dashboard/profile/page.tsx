import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentProfile } from '@/lib/data/profile'
import { createClient } from '@/lib/supabase/server'
import { updateProfile } from './actions'

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    redirect('/login')
  }

  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/login')
  }

  const params = await searchParams

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-2xl">
        <Link className="text-sm text-black/60 hover:underline dark:text-white/60" href="/dashboard">
          ← Back to dashboard
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Profile</h1>
          <p className="mt-3 text-sm text-black/60 dark:text-white/60">
            Keep the profile information associated with your Elvyn account up to date.
          </p>
        </div>

        {params.saved === '1' && (
          <p className="mt-6 rounded-xl border border-black/10 px-4 py-3 text-sm dark:border-white/10" role="status">
            Profile saved successfully.
          </p>
        )}

        <form action={updateProfile} className="mt-8 space-y-6 rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <label className="block text-sm font-medium">
            Email
            <input
              className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
              value={data.user.email ?? ''}
              readOnly
              disabled
            />
            <span className="mt-2 block text-xs text-black/45 dark:text-white/45">
              Email is managed by Supabase Auth.
            </span>
          </label>

          <label className="block text-sm font-medium">
            Display name
            <input
              className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
              name="display_name"
              defaultValue={profile.display_name ?? ''}
              maxLength={80}
              autoComplete="name"
            />
          </label>

          <label className="block text-sm font-medium">
            Avatar URL
            <input
              className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
              name="avatar_url"
              type="url"
              defaultValue={profile.avatar_url ?? ''}
              maxLength={500}
              placeholder="https://…"
              autoComplete="url"
            />
          </label>

          <button
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            type="submit"
          >
            Save profile
          </button>
        </form>
      </section>
    </main>
  )
}

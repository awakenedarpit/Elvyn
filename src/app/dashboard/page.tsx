import { redirect } from 'next/navigation'

import { getCurrentProfile } from '@/lib/data/profile'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'
import { ProfileSummary } from './ProfileSummary'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    redirect('/login')
  }

  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your workspace</h1>
            <p className="mt-3 text-black/60 dark:text-white/60">
              Your authenticated Elvyn workspace.
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ProfileSummary profile={profile} email={data.user.email ?? 'No email available'} />

          <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
              Workspace
            </p>
            <h2 className="mt-2 text-xl font-semibold">Ready for your data</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Goals, tasks, and notes will be connected here in the next implementation phase.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

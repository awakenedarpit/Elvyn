import { redirect } from 'next/navigation'

import { getCurrentUserGoals } from '@/lib/data/goals'
import { getCurrentProfile } from '@/lib/data/profile'
import { getCurrentUserTasks } from '@/lib/data/tasks'
import { getCurrentUserNotes } from '@/lib/data/notes'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './LogoutButton'
import { ProfileSummary } from './ProfileSummary'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    redirect('/login')
  }

  const [profile, goals, tasks, notes] = await Promise.all([
    getCurrentProfile(),
    getCurrentUserGoals(),
    getCurrentUserTasks(),
    getCurrentUserNotes(),
  ])

  if (!profile) {
    redirect('/login')
  }

  const activeGoals = goals.filter((goal) => goal.status === 'active').length
  const openTasks = tasks.filter((task) => task.status === 'todo' || task.status === 'in_progress').length

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
            <h2 className="mt-2 text-xl font-semibold">Your current data</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                <p className="text-2xl font-semibold">{activeGoals}</p>
                <p className="mt-1 text-xs text-black/55 dark:text-white/55">Active goals</p>
              </div>
              <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                <p className="text-2xl font-semibold">{openTasks}</p>
                <p className="mt-1 text-xs text-black/55 dark:text-white/55">Open tasks</p>
              </div>
              <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                <p className="text-2xl font-semibold">{notes.length}</p>
                <p className="mt-1 text-xs text-black/55 dark:text-white/55">Notes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

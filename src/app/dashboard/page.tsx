import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCurrentUserGoals } from '@/lib/data/goals'
import { getCurrentProfile } from '@/lib/data/profile'
import { getCurrentUserTasks } from '@/lib/data/tasks'
import { getCurrentUserNotes } from '@/lib/data/notes'
import { createClient } from '@/lib/supabase/server'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { SectionCard } from '@/components/ui/SectionCard'
import { LogoutButton } from './LogoutButton'
import { ProfileSummary } from './ProfileSummary'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) redirect('/login')

  const [profile, goals, tasks, notes] = await Promise.all([
    getCurrentProfile(), getCurrentUserGoals(), getCurrentUserTasks(), getCurrentUserNotes(),
  ])
  if (!profile) redirect('/login')

  const activeGoals = goals.filter((goal) => goal.status === 'active').length
  const openTasks = tasks.filter((task) => task.status === 'todo' || task.status === 'in_progress').length

  return (
    <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-black/10 pb-6 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between">
          <div><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Your workspace</h1><p className="mt-2 text-sm text-black/60 dark:text-white/60">A calm place for focused work.</p></div>
          <LogoutButton />
        </header>

        <div className="py-4"><DashboardNav /></div>

        <div className="grid gap-5 md:grid-cols-2">
          <SectionCard><ProfileSummary profile={profile} email={data.user.email ?? 'No email available'} /><div className="mt-4"><Link href="/dashboard/profile" className="inline-flex min-h-11 items-center text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:focus-visible:ring-white/50">Edit profile →</Link></div></SectionCard>
          <SectionCard><p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45 dark:text-white/45">Workspace</p><h2 className="mt-2 text-xl font-semibold">Your current data</h2><div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3"><Stat label="Active goals" value={activeGoals} /><Stat label="Open tasks" value={openTasks} /><Stat label="Notes" value={notes.length} /></div></SectionCard>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <SectionCard><div className="flex items-center justify-between"><h2 className="font-semibold">Goals</h2><Link href="/dashboard/goals" className="inline-flex min-h-11 items-center text-xs font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:focus-visible:ring-white/50">View all →</Link></div>{goals.length === 0 ? <p className="mt-5 text-sm text-black/55 dark:text-white/55">No goals yet.</p> : <div className="mt-4 space-y-3">{goals.slice(0, 3).map((goal) => <div key={goal.id} className="flex items-center justify-between gap-3 rounded-xl bg-black/[0.03] p-3 dark:bg-white/[0.04]"><span className="truncate text-sm">{goal.title}</span><span className="shrink-0 text-xs capitalize text-black/50 dark:text-white/50">{goal.status}</span></div>)}</div>}</SectionCard>
          <SectionCard><div className="flex items-center justify-between"><h2 className="font-semibold">Tasks</h2><Link href="/dashboard/tasks" className="inline-flex min-h-11 items-center text-xs font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:focus-visible:ring-white/50">View all →</Link></div>{tasks.length === 0 ? <p className="mt-5 text-sm text-black/55 dark:text-white/55">No tasks yet.</p> : <div className="mt-4 space-y-3">{tasks.slice(0, 3).map((task) => <div key={task.id} className="flex items-center justify-between gap-3 rounded-xl bg-black/[0.03] p-3 dark:bg-white/[0.04]"><span className="truncate text-sm">{task.title}</span><span className="shrink-0 text-xs capitalize text-black/50 dark:text-white/50">{task.status.replace('_', ' ')}</span></div>)}</div>}</SectionCard>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl bg-black/5 p-3 sm:p-4 dark:bg-white/5"><p className="text-xl font-semibold sm:text-2xl">{value}</p><p className="mt-1 text-[11px] leading-tight text-black/55 dark:text-white/55 sm:text-xs">{label}</p></div>
}

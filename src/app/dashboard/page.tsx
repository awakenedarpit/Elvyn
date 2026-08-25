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
    <main id="main-content" className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl elvyn-enter">
        <header className="flex flex-col gap-6 rounded-[24px] border border-black/[.07] bg-white/55 p-5 shadow-[0_16px_50px_rgba(24,24,27,.045)] backdrop-blur sm:flex-row sm:items-start sm:justify-between sm:p-6 dark:border-white/[.08] dark:bg-white/[.025] dark:shadow-[0_18px_55px_rgba(0,0,0,.16)]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[#6357dc] dark:text-[#a29cff]">ELVYN</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Your workspace</h1>
            <p className="mt-2 text-sm text-black/55 dark:text-white/55">A calm place for focused work.</p>
          </div>
          <LogoutButton />
        </header>

        <div className="py-4"><DashboardNav /></div>

        <div className="grid gap-5 md:grid-cols-2">
          <SectionCard><ProfileSummary profile={profile} email={data.user.email ?? 'No email available'} /></SectionCard>
          <SectionCard><p className="text-xs font-medium uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Workspace</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Your current data</h2><div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3"><Stat label="Active goals" value={activeGoals} /><Stat label="Open tasks" value={openTasks} /><Stat label="Notes" value={notes.length} /></div></SectionCard>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <SectionCard><div className="flex items-center justify-between"><h2 className="font-semibold tracking-tight">Goals</h2><Link href="/dashboard/goals" className="inline-flex min-h-11 items-center text-xs font-medium text-[#6357dc] transition hover:-translate-y-px hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:text-[#a29cff]">View all →</Link></div>{goals.length === 0 ? <p className="mt-5 text-sm text-black/55 dark:text-white/55">No goals yet. Add one when you’re ready.</p> : <div className="mt-4 space-y-3">{goals.slice(0, 3).map((goal) => <div key={goal.id} className="elvyn-card flex items-center justify-between gap-3 rounded-xl p-3"><span className="truncate text-sm">{goal.title}</span><span className="shrink-0 rounded-full bg-[#f0edff] px-2.5 py-1 text-[11px] font-medium capitalize text-[#6357dc] dark:bg-[#1b1930] dark:text-[#a29cff]">{goal.status}</span></div>)}</div>}</SectionCard>
          <SectionCard><div className="flex items-center justify-between"><h2 className="font-semibold tracking-tight">Tasks</h2><Link href="/dashboard/tasks" className="inline-flex min-h-11 items-center text-xs font-medium text-[#6357dc] transition hover:-translate-y-px hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:text-[#a29cff]">View all →</Link></div>{tasks.length === 0 ? <p className="mt-5 text-sm text-black/55 dark:text-white/55">No tasks yet. Add one when you’re ready.</p> : <div className="mt-4 space-y-3">{tasks.slice(0, 3).map((task) => <div key={task.id} className="elvyn-card flex items-center justify-between gap-3 rounded-xl p-3"><span className="truncate text-sm">{task.title}</span><span className="shrink-0 rounded-full bg-black/[.045] px-2.5 py-1 text-[11px] font-medium capitalize text-black/55 dark:bg-white/[.06] dark:text-white/55">{task.status.replace('_', ' ')}</span></div>)}</div>}</SectionCard>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-black/[.05] bg-black/[.025] p-3 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#6d5dfb]/15 hover:bg-[#f0edff]/70 sm:p-4 dark:border-white/[.07] dark:bg-white/[.035] dark:hover:border-[#8b84ff]/15 dark:hover:bg-[#1b1930]/80"><p className="text-xl font-semibold tracking-tight sm:text-2xl">{value}</p><p className="mt-1 text-[11px] leading-tight text-black/50 sm:text-xs dark:text-white/50">{label}</p></div>
}

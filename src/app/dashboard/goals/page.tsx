import Link from 'next/link'

import { getCurrentUserGoals } from '@/lib/data/goals'
import { GoalForm } from './GoalForm'
import { deleteGoal } from './actions'

export default async function GoalsPage() {
  const goals = await getCurrentUserGoals()

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link>
        <div className="mt-8 flex items-end justify-between gap-6">
          <div><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Goals</h1><p className="mt-3 text-black/60 dark:text-white/60">Keep your objectives visible and organized.</p></div>
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/10">{goals.length} {goals.length === 1 ? 'goal' : 'goals'}</span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div className="grid gap-4">
            {goals.length === 0 ? <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15"><h2 className="text-lg font-semibold">No goals yet</h2><p className="mt-2 text-sm text-black/60 dark:text-white/60">Create your first goal to get started.</p></div> : goals.map((goal) => (
              <article key={goal.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
                <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{goal.title}</h2>{goal.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{goal.description}</p>}</div><span className="rounded-full border border-black/10 px-3 py-1 text-xs capitalize dark:border-white/10">{goal.status}</span></div>
                {goal.target_date && <p className="mt-4 text-xs text-black/50 dark:text-white/50">Target: {goal.target_date}</p>}
                <form action={deleteGoal} className="mt-4"><input type="hidden" name="id" value={goal.id} /><button className="text-xs text-red-600 hover:underline" type="submit">Delete</button></form>
              </article>
            ))}
          </div>
          <GoalForm />
        </div>
      </section>
    </main>
  )
}

import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionCard } from '@/components/ui/SectionCard'
import { getCurrentUserGoals } from '@/lib/data/goals'
import { GoalForm } from './GoalForm'
import { deleteGoal } from './actions'

export default async function GoalsPage() {
  const goals = await getCurrentUserGoals()
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link><div className="mt-8 flex items-end justify-between gap-6"><div><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Goals</h1><p className="mt-3 text-sm text-black/60 dark:text-white/60">Keep your objectives visible and organized.</p></div><Badge>{goals.length} {goals.length === 1 ? 'goal' : 'goals'}</Badge></div><div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"><div className="grid gap-4">{goals.length === 0 ? <EmptyState title="No goals yet" description="Create your first goal to get started." /> : goals.map((goal) => <SectionCard key={goal.id}><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{goal.title}</h2>{goal.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{goal.description}</p>}</div><Badge tone={goal.status === 'completed' ? 'success' : goal.status === 'active' ? 'warning' : 'neutral'}>{goal.status}</Badge></div>{goal.target_date && <p className="mt-4 text-xs text-black/50 dark:text-white/50">Target: {goal.target_date}</p>}<form action={deleteGoal} className="mt-4"><input type="hidden" name="id" value={goal.id} /><button className="text-xs text-red-600 hover:underline" type="submit">Delete</button></form></SectionCard>)}</div><GoalForm /></div></section></main>
}

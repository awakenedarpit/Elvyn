import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionCard } from '@/components/ui/SectionCard'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { getCurrentUserGoals } from '@/lib/data/goals'
import { GoalForm } from './GoalForm'
import { deleteGoal } from './actions'

export default async function GoalsPage() {
  const goals = await getCurrentUserGoals()
  return <main id="main-content" className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-6xl elvyn-enter"><header><p className="text-sm font-semibold tracking-[0.18em] text-[#6357dc] dark:text-[#a29cff]">ELVYN</p><div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Goals</h1><p className="mt-2 text-sm text-black/55 dark:text-white/55">Keep your objectives visible and organized.</p></div><Badge>{goals.length} {goals.length === 1 ? 'goal' : 'goals'}</Badge></div></header><div className="py-5"><DashboardNav /></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"><div className="grid gap-4">{goals.length === 0 ? <EmptyState title="No goals yet" description="Create your first goal to get started." /> : goals.map((goal) => <SectionCard key={goal.id}><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold tracking-tight">{goal.title}</h2>{goal.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{goal.description}</p>}</div><Badge tone={goal.status === 'completed' ? 'success' : goal.status === 'active' ? 'warning' : 'neutral'}>{goal.status}</Badge></div>{goal.target_date && <p className="mt-4 text-xs text-black/50 dark:text-white/50">Target: {goal.target_date}</p>}<form action={deleteGoal} className="mt-4"><input type="hidden" name="id" value={goal.id} /><button className="min-h-10 rounded-lg px-2 text-xs text-red-600 transition hover:bg-red-500/10 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40" type="submit">Delete</button></form></SectionCard>)}</div><GoalForm /></div></section></main>
}

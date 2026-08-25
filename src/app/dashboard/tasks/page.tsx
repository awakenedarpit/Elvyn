import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionCard } from '@/components/ui/SectionCard'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { getCurrentUserTasks } from '@/lib/data/tasks'
import { TaskForm } from './TaskForm'
import { updateTaskStatus } from './actions'

const nextStatus = { todo: 'in_progress', in_progress: 'completed', completed: 'todo', cancelled: 'todo' } as const

export default async function TasksPage() {
  const tasks = await getCurrentUserTasks()
  return <main id="main-content" className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-6xl elvyn-enter"><header><p className="text-sm font-semibold tracking-[0.18em] text-[#6357dc] dark:text-[#a29cff]">ELVYN</p><div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Tasks</h1><p className="mt-2 text-sm text-black/55 dark:text-white/55">Turn your goals into actionable work.</p></div><Badge>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</Badge></div></header><div className="py-5"><DashboardNav /></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"><div className="grid gap-4">{tasks.length === 0 ? <EmptyState title="No tasks yet" description="Create your first task to get started." /> : tasks.map((task) => <SectionCard key={task.id}><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold tracking-tight">{task.title}</h2>{task.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{task.description}</p>}</div><Badge tone={task.status === 'completed' ? 'success' : task.priority === 'high' ? 'warning' : 'neutral'}>{task.status.replace('_', ' ')}</Badge></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-black/50 dark:text-white/50">Priority: {task.priority}</p><form action={updateTaskStatus}><input type="hidden" name="id" value={task.id} /><input type="hidden" name="status" value={nextStatus[task.status]} /><button type="submit" className="min-h-10 rounded-lg border border-black/10 px-3 text-xs font-medium transition hover:-translate-y-px hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 dark:border-white/10 dark:hover:bg-white/5 dark:focus-visible:ring-[#8b84ff]/60">{task.status === 'completed' ? 'Reopen' : task.status === 'todo' ? 'Start' : 'Complete'}</button></form></div></SectionCard>)}</div><TaskForm /></div></section></main>
}

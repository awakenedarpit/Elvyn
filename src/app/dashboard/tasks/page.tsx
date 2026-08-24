import Link from 'next/link'

import { getCurrentUserTasks } from '@/lib/data/tasks'
import { TaskForm } from './TaskForm'
import { updateTaskStatus } from './actions'

const nextStatus = {
  todo: 'in_progress',
  in_progress: 'completed',
  completed: 'todo',
  cancelled: 'todo',
} as const

export default async function TasksPage() {
  const tasks = await getCurrentUserTasks()

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link>
        <div className="mt-8"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Tasks</h1><p className="mt-3 text-black/60 dark:text-white/60">Turn your goals into actionable work.</p></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div className="grid gap-4">
            {tasks.length === 0 ? <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15"><h2 className="text-lg font-semibold">No tasks yet</h2><p className="mt-2 text-sm text-black/60 dark:text-white/60">Create your first task to get started.</p></div> : tasks.map((task) => (
              <article key={task.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
                <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{task.title}</h2>{task.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{task.description}</p>}</div><span className="rounded-full border border-black/10 px-3 py-1 text-xs capitalize dark:border-white/10">{task.status.replace('_', ' ')}</span></div>
                <div className="mt-4 flex items-center justify-between gap-4"><p className="text-xs text-black/50 dark:text-white/50">Priority: {task.priority}</p><form action={updateTaskStatus}><input type="hidden" name="id" value={task.id} /><input type="hidden" name="status" value={nextStatus[task.status]} /><button type="submit" className="rounded-lg border border-black/10 px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">{task.status === 'completed' ? 'Reopen' : task.status === 'todo' ? 'Start' : 'Complete'}</button></form></div>
              </article>
            ))}
          </div>
          <TaskForm />
        </div>
      </section>
    </main>
  )
}

import Link from 'next/link'

import { getCurrentUserTasks } from '@/lib/data/tasks'

export default async function TasksPage() {
  const tasks = await getCurrentUserTasks()
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link>
        <div className="mt-8"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Tasks</h1><p className="mt-3 text-black/60 dark:text-white/60">Turn your goals into actionable work.</p></div>
        <div className="mt-10 grid gap-4">
          {tasks.length === 0 ? <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15"><h2 className="text-lg font-semibold">No tasks yet</h2><p className="mt-2 text-sm text-black/60 dark:text-white/60">Tasks will appear here when you create them.</p></div> : tasks.map((task) => <article key={task.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10"><div className="flex items-start justify-between gap-4"><h2 className="font-semibold">{task.title}</h2><span className="rounded-full border border-black/10 px-3 py-1 text-xs capitalize dark:border-white/10">{task.status.replace('_', ' ')}</span></div>{task.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{task.description}</p>}<p className="mt-4 text-xs text-black/50 dark:text-white/50">Priority: {task.priority}</p></article>)}
        </div>
      </section>
    </main>
  )
}

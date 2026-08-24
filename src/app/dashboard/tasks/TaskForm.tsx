'use client'

import { useFormStatus } from 'react-dom'
import { createTask } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending} className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black">{pending ? 'Creating…' : 'Create task'}</button>
}

export function TaskForm() {
  return <form action={createTask} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10"><h2 className="font-semibold">Create a task</h2><input name="title" required placeholder="Task title" className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" /><textarea name="description" placeholder="Description (optional)" rows={3} className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" /><select name="priority" defaultValue="medium" className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10"><option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option></select><SubmitButton /></form>
}

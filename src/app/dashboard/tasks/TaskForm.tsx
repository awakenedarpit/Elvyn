'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { createTask } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? 'Creating…' : 'Create task'}</Button>
}

export function TaskForm() {
  return <form action={createTask} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10"><h2 className="font-semibold">Create a task</h2><Input name="title" required placeholder="Task title" aria-label="Task title" /><Textarea name="description" placeholder="Description (optional)" rows={3} aria-label="Task description" /><select name="priority" defaultValue="medium" aria-label="Task priority" className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 dark:border-white/10 dark:focus:border-white/30 dark:focus:ring-white/5"><option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option></select><SubmitButton /></form>
}

'use client'

import { useFormStatus } from 'react-dom'
import { createGoal } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending} className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black">{pending ? 'Creating…' : 'Create goal'}</button>
}

export function GoalForm() {
  return (
    <form action={createGoal} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <h2 className="font-semibold">Create a goal</h2>
      <input name="title" required placeholder="Goal title" className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" />
      <textarea name="description" placeholder="Description (optional)" rows={3} className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" />
      <input name="target_date" type="date" className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" />
      <SubmitButton />
    </form>
  )
}

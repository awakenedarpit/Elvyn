'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { createGoal } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? 'Creating…' : 'Create goal'}</Button>
}

export function GoalForm() {
  return (
    <form action={createGoal} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10">
      <h2 className="font-semibold">Create a goal</h2>
      <Input name="title" required placeholder="Goal title" aria-label="Goal title" />
      <Textarea name="description" placeholder="Description (optional)" rows={3} aria-label="Goal description" />
      <Input name="target_date" type="date" aria-label="Goal target date" />
      <SubmitButton />
    </form>
  )
}

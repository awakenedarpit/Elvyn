'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { createNote } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save note'}</Button>
}

export function NoteForm() {
  return <form action={createNote} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10"><h2 className="font-semibold">New note</h2><Input name="title" placeholder="Title (optional)" aria-label="Note title" /><Textarea name="content" required placeholder="Write a note…" rows={7} aria-label="Note content" /><SubmitButton /></form>
}

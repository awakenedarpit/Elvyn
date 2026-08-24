'use client'

import { useFormStatus } from 'react-dom'
import { createNote } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending} className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black">{pending ? 'Saving…' : 'Save note'}</button>
}

export function NoteForm() {
  return <form action={createNote} className="grid gap-3 rounded-2xl border border-black/10 p-5 dark:border-white/10"><h2 className="font-semibold">New note</h2><input name="title" placeholder="Title (optional)" className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" /><textarea name="content" required placeholder="Write a note…" rows={7} className="rounded-xl border border-black/10 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" /><SubmitButton /></form>
}

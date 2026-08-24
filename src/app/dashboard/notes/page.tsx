import Link from 'next/link'

import { getCurrentUserNotes } from '@/lib/data/notes'

export default async function NotesPage() {
  const notes = await getCurrentUserNotes()

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link>
        <div className="mt-8"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Notes</h1><p className="mt-3 text-black/60 dark:text-white/60">Keep thoughts and context close to your work.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {notes.length === 0 ? <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15 md:col-span-2"><h2 className="text-lg font-semibold">No notes yet</h2><p className="mt-2 text-sm text-black/60 dark:text-white/60">Your notes will appear here.</p></div> : notes.map((note) => <article key={note.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10"><h2 className="font-semibold">{note.title || 'Untitled note'}</h2><p className="mt-2 whitespace-pre-wrap text-sm text-black/60 dark:text-white/60">{note.content}</p></article>)}
        </div>
      </section>
    </main>
  )
}

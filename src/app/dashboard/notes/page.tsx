import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionCard } from '@/components/ui/SectionCard'
import { getCurrentUserNotes } from '@/lib/data/notes'
import { NoteForm } from './NoteForm'

export default async function NotesPage() {
  const notes = await getCurrentUserNotes()
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">← Dashboard</Link><div className="mt-8 flex items-end justify-between gap-6"><div><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Notes</h1><p className="mt-3 text-sm text-black/60 dark:text-white/60">Keep thoughts and context close to your work.</p></div><Badge>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</Badge></div><div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"><div className="grid gap-4">{notes.length === 0 ? <EmptyState title="No notes yet" description="Create your first note to get started." /> : notes.map((note) => <SectionCard key={note.id}><h2 className="font-semibold">{note.title || 'Untitled note'}</h2><p className="mt-2 whitespace-pre-wrap text-sm text-black/60 dark:text-white/60">{note.content}</p></SectionCard>)}</div><NoteForm /></div></section></main>
}

import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionCard } from '@/components/ui/SectionCard'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { getCurrentUserNotes } from '@/lib/data/notes'
import { NoteForm } from './NoteForm'

export default async function NotesPage() {
  const notes = await getCurrentUserNotes()
  return <main id="main-content" className="min-h-screen px-5 py-8 sm:px-6 sm:py-12"><section className="mx-auto max-w-6xl elvyn-enter"><header><p className="text-sm font-semibold tracking-[0.18em] text-[#6357dc] dark:text-[#a29cff]">ELVYN</p><div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Notes</h1><p className="mt-2 text-sm text-black/55 dark:text-white/55">Keep thoughts and context close to your work.</p></div><Badge>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</Badge></div></header><div className="py-5"><DashboardNav /></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"><div className="grid gap-4">{notes.length === 0 ? <EmptyState title="No notes yet" description="Create your first note to get started." /> : notes.map((note) => <SectionCard key={note.id}><h2 className="font-semibold tracking-tight">{note.title || 'Untitled note'}</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/60 dark:text-white/60">{note.content}</p></SectionCard>)}</div><NoteForm /></div></section></main>
}

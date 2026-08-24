import Link from 'next/link'

export default function Home() {
  return <main className="min-h-screen px-5 py-10 sm:px-6 sm:py-16"><section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center"><div className="max-w-3xl"><p className="text-sm font-semibold tracking-[0.2em] text-black/45 uppercase dark:text-white/45">Elvyn</p><h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">A calmer way to organize focused work.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-black/60 dark:text-white/60 sm:text-lg">Bring goals, tasks, notes, and your personal workspace together without unnecessary noise.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black">Sign in</Link><Link href="/signup" className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-2.5 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">Create account</Link></div></div><div className="mt-16 grid gap-3 sm:grid-cols-3"><Feature title="Goals" text="Keep priorities visible." /><Feature title="Tasks" text="Turn plans into action." /><Feature title="Notes" text="Keep useful context close." /></div></section></main>
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]"><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-black/55 dark:text-white/55">{text}</p></div>
}

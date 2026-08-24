import Link from 'next/link'

const linkClass = 'inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-black'

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">Elvyn</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">A calmer way to organize focused work.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-black/60 dark:text-white/60 sm:text-lg">Bring goals, tasks, notes, and your personal workspace together without unnecessary noise.</p>
          <nav aria-label="Account actions" className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className={`${linkClass} bg-black text-white dark:bg-white dark:text-black`}>Sign in</Link>
            <Link href="/signup" className={`${linkClass} border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5`}>Create account</Link>
          </nav>
        </div>
        <div className="mt-16 grid gap-3 sm:grid-cols-3" aria-label="Elvyn features">
          <Feature title="Goals" text="Keep priorities visible." />
          <Feature title="Tasks" text="Turn plans into action." />
          <Feature title="Notes" text="Keep useful context close." />
        </div>
      </section>
    </main>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return <article className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]"><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-black/55 dark:text-white/55">{text}</p></article>
}

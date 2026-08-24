import Link from 'next/link'

const linkClass = 'inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff]/60 focus-visible:ring-offset-2 dark:focus-visible:ring-[#8b84ff]/70 dark:focus-visible:ring-offset-[#0b0d16]'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <div className="max-w-3xl elvyn-enter">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#635bff] dark:text-[#8b84ff]">Elvyn</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">A calmer way to organize focused work.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-black/60 dark:text-white/60 sm:text-lg">Bring goals, tasks, notes, and your personal workspace together without unnecessary noise.</p>
          <nav aria-label="Account actions" className="mt-8 flex flex-wrap gap-3 elvyn-enter elvyn-enter-delay-1">
            <Link href="/login" className={`${linkClass} bg-[#635bff] text-white shadow-lg shadow-[#635bff]/20 hover:bg-[#554df0] dark:bg-[#8b84ff] dark:text-[#0b0d16]`}>Sign in</Link>
            <Link href="/signup" className={`${linkClass} border border-black/10 bg-white/60 hover:border-[#635bff]/30 hover:bg-[#ecebff] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]`}>Create account</Link>
          </nav>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3 elvyn-enter elvyn-enter-delay-2" aria-label="Elvyn features">
          <Feature title="Goals" text="Keep priorities visible." />
          <Feature title="Tasks" text="Turn plans into action." />
          <Feature title="Notes" text="Keep useful context close." />
        </div>
      </section>
    </main>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return <article className="elvyn-card rounded-2xl p-5"><div className="mb-4 h-2 w-10 rounded-full bg-[#635bff]/70 dark:bg-[#8b84ff]/70" /><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-black/55 dark:text-white/55">{text}</p></article>
}

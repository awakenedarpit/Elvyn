import Link from 'next/link'

const linkClass = 'inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-[#8b84ff]/60 dark:focus-visible:ring-offset-[#0c0d12]'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <div className="max-w-3xl elvyn-enter">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6d5dfb]/15 bg-white/70 px-3 py-1.5 text-xs font-medium text-black/55 shadow-sm backdrop-blur dark:border-[#8b84ff]/20 dark:bg-white/[0.05] dark:text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6d5dfb] shadow-[0_0_10px_rgba(109,93,251,.45)] dark:bg-[#8b84ff]" aria-hidden="true" />
            A quieter workspace for focused days
          </div>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-[#6357dc] dark:text-[#a29cff]">Elvyn</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">A calmer way to organize focused work.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-black/58 dark:text-white/60 sm:text-lg">Bring goals, tasks, notes, and your personal workspace together without unnecessary noise.</p>
          <nav aria-label="Account actions" className="mt-8 flex flex-wrap gap-3 elvyn-enter elvyn-enter-delay-1">
            <Link href="/login" className={`${linkClass} bg-[#6d5dfb] text-white shadow-[0_10px_30px_rgba(109,93,251,.18)] hover:bg-[#6252ec] dark:bg-[#8b84ff] dark:text-[#0c0d12]`}>Sign in</Link>
            <Link href="/signup" className={`${linkClass} border border-black/[.09] bg-white/55 hover:border-[#6d5dfb]/20 hover:bg-[#f0edff] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]`}>Create account</Link>
          </nav>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3 elvyn-enter elvyn-enter-delay-2" aria-label="Elvyn features">
          <Feature number="01" title="Goals" text="Keep priorities visible." />
          <Feature number="02" title="Tasks" text="Turn plans into action." />
          <Feature number="03" title="Notes" text="Keep useful context close." />
        </div>
      </section>
    </main>
  )
}

function Feature({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="elvyn-card group rounded-[20px] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.16em] text-black/35 dark:text-white/35">{number}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#6d5dfb]/70 transition-transform duration-300 group-hover:scale-150 dark:bg-[#8b84ff]/70" aria-hidden="true" />
      </div>
      <h2 className="mt-7 font-semibold tracking-[-0.01em]">{title}</h2>
      <p className="mt-1.5 text-sm leading-6 text-black/50 dark:text-white/50">{text}</p>
    </article>
  )
}

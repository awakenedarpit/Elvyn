import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">Elvyn</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">404</h1>
        <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">That page doesn’t exist or may have moved.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-black">Back to home</Link>
      </section>
    </main>
  )
}

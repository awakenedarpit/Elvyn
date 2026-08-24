'use client'

import { useEffect } from 'react'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the error boundary side-effect free while allowing observability to be added later.
  }, [])

  return (
    <main role="alert" className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">Elvyn</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">The page could not finish loading. Try again, and if the problem continues, refresh the app.</p>
        <button type="button" onClick={() => reset()} className="mt-7 min-h-11 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:bg-white dark:text-black dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-black">Try again</button>
      </section>
    </main>
  )
}

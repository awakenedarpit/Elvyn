export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="min-h-screen px-5 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="rounded-2xl border border-black/10 bg-white/70 px-5 py-4 text-sm text-black/60 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
          Loading Elvyn…
        </div>
      </div>
    </main>
  )
}

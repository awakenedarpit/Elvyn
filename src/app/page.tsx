export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase">
          Elvyn
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
          Your calm workspace for focused work.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
          The application foundation is ready. Productivity, planning, learning,
          and focus features will be built phase by phase.
        </p>
        <div className="mt-8 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 shadow-sm">
          Foundation · Phase 1
        </div>
      </section>
    </main>
  );
}

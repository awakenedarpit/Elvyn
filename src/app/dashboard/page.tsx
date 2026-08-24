import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your workspace</h1>
        <p className="mt-3 text-black/60 dark:text-white/60">
          You are signed in as {data.user.email}.
        </p>

        <div className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">Dashboard foundation</h2>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Core workspace features will be added in later implementation phases.
          </p>
        </div>
      </section>
    </main>
  )
}

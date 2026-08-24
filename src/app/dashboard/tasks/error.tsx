'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function TasksError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Tasks error', error) }, [error])
  return <main className="min-h-screen px-5 py-16 sm:px-6"><section className="mx-auto max-w-xl rounded-2xl border border-black/10 p-8 text-center dark:border-white/10"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-3 text-2xl font-semibold">Tasks are unavailable</h1><p className="mt-2 text-sm text-black/55 dark:text-white/55">We could not load your tasks. Try again.</p><Button className="mt-6" onClick={reset}>Try again</Button></section></main>
}

'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { FormMessage } from '@/components/ui/FormMessage'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      setError('Unable to sign in with those credentials.')
      setLoading(false)
      return
    }
    window.location.assign('/dashboard')
  }

  return <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6 sm:py-16"><section className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black sm:p-8"><div className="mb-8"><p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back</h1><p className="mt-2 text-sm text-black/60 dark:text-white/60">Sign in to continue to your workspace.</p></div><form className="grid gap-5" onSubmit={handleSubmit}><label className="grid gap-2 text-sm font-medium">Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><label className="grid gap-2 text-sm font-medium">Password<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <FormMessage>{error}</FormMessage>}<Button type="submit" disabled={loading} className="w-full">{loading ? 'Signing in…' : 'Sign in'}</Button></form><p className="mt-6 text-center text-sm text-black/60 dark:text-white/60">New to Elvyn? <Link className="font-medium text-black underline-offset-4 hover:underline dark:text-white" href="/signup">Create an account</Link></p></section></main>
}

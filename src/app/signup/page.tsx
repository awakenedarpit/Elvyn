'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      window.location.assign('/dashboard')
      return
    }

    setMessage('Account created. Check your email to confirm your address before signing in.')
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-black">
        <div className="mb-8">
          <p className="text-sm font-medium text-black/50 dark:text-white/50">Elvyn</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Start building your personal workspace.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            Email
            <input
              className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none transition focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="block text-sm font-medium">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none transition focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-xl border border-black/10 px-4 py-3 text-sm dark:border-white/10">
              {message}
            </p>
          )}

          <button
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60 dark:text-white/60">
          Already have an account?{' '}
          <Link className="font-medium text-black underline-offset-4 hover:underline dark:text-white" href="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}

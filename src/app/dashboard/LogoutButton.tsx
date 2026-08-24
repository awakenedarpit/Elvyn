'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-busy={loading}
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5 dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-black"
    >
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  )
}

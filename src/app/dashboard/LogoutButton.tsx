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
      className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
    >
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  )
}

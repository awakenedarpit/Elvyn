import Link from 'next/link'

import type { Profile } from '@/lib/data/profile'

type ProfileSummaryProps = {
  profile: Profile
  email: string
}

export function ProfileSummary({ profile, email }: ProfileSummaryProps) {
  const name = profile.display_name?.trim() || 'Elvyn user'

  return (
    <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
        Profile
      </p>
      <h2 className="mt-2 text-xl font-semibold">{name}</h2>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">{email}</p>
      <Link
        className="mt-5 inline-block text-sm font-medium underline-offset-4 hover:underline"
        href="/dashboard/profile"
      >
        Edit profile →
      </Link>
    </div>
  )
}

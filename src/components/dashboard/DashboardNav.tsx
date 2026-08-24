import Link from 'next/link'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/goals', label: 'Goals' },
  { href: '/dashboard/tasks', label: 'Tasks' },
  { href: '/dashboard/notes', label: 'Notes' },
  { href: '/dashboard/profile', label: 'Profile' },
]

export function DashboardNav() {
  return (
    <nav aria-label="Workspace navigation" className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-black/60 transition hover:bg-black/5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-black">
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

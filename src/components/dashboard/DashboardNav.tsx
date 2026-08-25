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
    <nav aria-label="Workspace navigation" className="flex flex-wrap items-center gap-1 rounded-2xl border border-black/[.06] bg-white/[.35] p-1 backdrop-blur dark:border-white/[.07] dark:bg-white/[.018]">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-2 text-sm text-black/55 transition-[background-color,color,box-shadow,transform] duration-200 hover:-translate-y-px hover:bg-white/80 hover:text-black hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:text-white/55 dark:hover:bg-white/[.07] dark:hover:text-white dark:hover:shadow-none dark:focus-visible:ring-[#8b84ff]/60 dark:focus-visible:ring-offset-[#0c0d12]">
          <span className="h-1.5 w-1.5 rounded-full bg-black/15 transition-transform duration-200 group-hover:scale-125 dark:bg-white/15" aria-hidden="true" />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

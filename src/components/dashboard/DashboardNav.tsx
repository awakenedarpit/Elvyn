'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/goals', label: 'Goals' },
  { href: '/dashboard/tasks', label: 'Tasks' },
  { href: '/dashboard/notes', label: 'Notes' },
  { href: '/dashboard/profile', label: 'Profile' },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Workspace navigation" className="flex flex-wrap items-center gap-1 rounded-2xl border border-black/[.06] bg-white/[.35] p-1 backdrop-blur dark:border-white/[.07] dark:bg-white/[.018]">
      {links.map((link) => {
        const active = link.href === '/dashboard' ? pathname === link.href : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={`group inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-[#8b84ff]/60 dark:focus-visible:ring-offset-[#0c0d12] ${active ? 'bg-white/90 font-medium text-black shadow-sm dark:bg-white/[.08] dark:text-white dark:shadow-none' : 'text-black/55 hover:-translate-y-px hover:bg-white/70 hover:text-black dark:text-white/55 dark:hover:bg-white/[.06] dark:hover:text-white'}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${active ? 'scale-110 bg-[#6d5dfb] shadow-[0_0_10px_rgba(109,93,251,.45)] dark:bg-[#a29cff]' : 'bg-black/15 group-hover:scale-125 dark:bg-white/15'}`} aria-hidden="true" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

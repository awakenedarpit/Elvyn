import type { ReactNode } from 'react'

type EmptyStateProps = { title: string; description: string; action?: ReactNode }

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <div className="rounded-2xl border border-dashed border-black/15 px-6 py-10 text-center dark:border-white/15"><h2 className="text-lg font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm text-black/55 dark:text-white/55">{description}</p>{action && <div className="mt-5">{action}</div>}</div>
}

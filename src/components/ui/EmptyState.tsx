import type { HTMLAttributes, ReactNode } from 'react'

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action, className = '', ...props }: EmptyStateProps) {
  return <div {...props} className={`rounded-[20px] border border-dashed border-black/[.09] bg-black/[.012] px-6 py-12 text-center dark:border-white/[.09] dark:bg-white/[.012] ${className}`}><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#6d5dfb]/15 bg-[#f0edff] text-[#6357dc] dark:border-[#8b84ff]/15 dark:bg-[#1b1930] dark:text-[#a29cff]" aria-hidden="true">+</div><h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/50 dark:text-white/50">{description}</p>{action && <div className="mt-5">{action}</div>}</div>
}

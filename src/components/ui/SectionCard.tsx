import type { HTMLAttributes, ReactNode } from 'react'

type SectionCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export function SectionCard({ children, className = '', ...props }: SectionCardProps) {
  return <section {...props} className={`rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] ${className}`}>{children}</section>
}

import type { ReactNode } from 'react'

type SectionCardProps = {
  children: ReactNode
  className?: string
}

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return <section className={`rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] ${className}`}>{children}</section>
}

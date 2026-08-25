import type { HTMLAttributes, ReactNode } from 'react'

type SectionCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export function SectionCard({ children, className = '', ...props }: SectionCardProps) {
  return <section {...props} className={`elvyn-card rounded-[20px] border border-black/[.07] bg-white/[.58] p-5 shadow-[0_14px_44px_rgba(24,24,27,.045)] backdrop-blur-xl dark:border-white/[.08] dark:bg-white/[.028] dark:shadow-[0_18px_50px_rgba(0,0,0,.18)] ${className}`}>{children}</section>
}

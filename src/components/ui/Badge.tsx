import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning'
}

const tones = {
  neutral: 'border-black/[.07] bg-black/[.025] text-black/55 dark:border-white/[.08] dark:bg-white/[.045] dark:text-white/60',
  success: 'border-emerald-500/15 bg-emerald-500/[.08] text-emerald-700 dark:text-emerald-300',
  warning: 'border-amber-500/15 bg-amber-500/[.08] text-amber-700 dark:text-amber-300',
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-[-0.01em] ${tones[tone]}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" aria-hidden="true" />{children}</span>
}

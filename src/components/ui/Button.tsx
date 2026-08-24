import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const classes = 'inline-flex items-center justify-center rounded-xl border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white dark:text-black'

export function Button({ children, href, type = 'button', disabled, className = '' }: ButtonProps) {
  const merged = `${classes} ${className}`
  if (href) return <Link href={href} className={merged}>{children}</Link>
  return <button type={type} disabled={disabled} className={merged}>{children}</button>
}

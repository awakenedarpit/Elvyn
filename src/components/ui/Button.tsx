import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; href?: string }

const classes = 'inline-flex min-h-11 items-center justify-center rounded-xl border border-[#6d5dfb]/20 bg-[#6d5dfb] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(109,93,251,.14)] transition hover:-translate-y-px hover:bg-[#6252ec] hover:shadow-[0_10px_28px_rgba(109,93,251,.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5dfb]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#8b84ff]/20 dark:bg-[#8b84ff] dark:text-[#0c0d12] dark:hover:bg-[#9b95ff] dark:focus-visible:ring-[#8b84ff]/60 dark:focus-visible:ring-offset-[#0c0d12]'

export function Button({ children, href, className = '', type = 'button', ...props }: ButtonProps) {
  const merged = `${classes} ${className}`
  if (href) return <Link href={href} className={merged}>{children}</Link>
  return <button {...props} type={type} className={merged}>{children}</button>
}

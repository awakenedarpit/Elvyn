import type { InputHTMLAttributes } from 'react'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`min-h-11 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-black/35 focus-visible:border-black/30 focus-visible:ring-2 focus-visible:ring-black/10 dark:border-white/10 dark:placeholder:text-white/35 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10 ${className}`} />
}

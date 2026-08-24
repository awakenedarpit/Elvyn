import type { TextareaHTMLAttributes } from 'react'

export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/5 dark:border-white/10 dark:placeholder:text-white/35 dark:focus:border-white/30 dark:focus:ring-white/5 ${className}`} />
}

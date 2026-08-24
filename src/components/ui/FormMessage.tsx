type FormMessageProps = { children: string; tone?: 'error' | 'success' }

export function FormMessage({ children, tone = 'error' }: FormMessageProps) {
  const classes = tone === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300'
  return <p className={`rounded-xl border px-4 py-3 text-sm ${classes}`} role="alert">{children}</p>
}

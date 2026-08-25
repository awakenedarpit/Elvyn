import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const FUTURE_JWT_MESSAGE = 'jwt issued at future'

export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase public environment variables.')
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Server Components cannot always write cookies. Middleware handles
          // session refresh when this occurs outside a writable request context.
        }
      },
    },
  })
}

/**
 * Supabase Auth and PostgREST can briefly disagree about the current time in
 * development, causing a freshly issued access token to be rejected as being
 * from the future. Retry that specific transient condition once after a short
 * delay; all other database errors are returned unchanged.
 */
export async function withFutureJwtRetry<T, E extends { message: string } | null>(
  operation: () => Promise<{ data: T; error: E }>,
) {
  let result = await operation()

  if (result.error?.message.toLowerCase().includes(FUTURE_JWT_MESSAGE)) {
    await new Promise((resolve) => setTimeout(resolve, 2500))
    result = await operation()
  }

  return result
}

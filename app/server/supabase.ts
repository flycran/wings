import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { LoaderFunctionArgs } from 'react-router'
import type { Database } from 'types/supabase'
import config from '~/config'

export const supabaseSSR = (request: LoaderFunctionArgs['request']) => {
  const headers = new Headers()

  return createServerClient<Database>(config.supabase.url, config.supabase.key, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '') as {
          name: string
          value: string
        }[]
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
        )
      },
    },
  })
}

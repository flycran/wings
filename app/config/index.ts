import { env } from 'node:process'

const platforms = {
  juejin_id: env.PLATFORM_JUEJIN_ID,
  github_username: env.PLATFORM_GITHUB_USERNAME,
}

const config = {
  platforms,
  supabase: {
    url: env.SUPABASE_URL,
    key: env.SUPABASE_KEY,
  },
}

export default config as DeepReadonly<typeof config>

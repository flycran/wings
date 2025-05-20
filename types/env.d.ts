declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        // 稀土掘金ID
        readonly PLATFORM_JUEJIN_ID: string
        // Github username
        readonly PLATFORM_GITHUB_USERNAME: string
        // Supabase URL
        readonly SUPABASE_URL: string
        // Supabase KEY
        readonly SUPABASE_KEY: string
      }
    }
  }
}

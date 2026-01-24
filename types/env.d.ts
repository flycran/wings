declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        // 稀土掘金ID
        readonly PLATFORM_JUEJIN_ID: string
        // Github username
        readonly PLATFORM_GITHUB_USERNAME: string
        // URL
        readonly SUPABASE_URL: string
        // KEY
        readonly SUPABASE_KEY: string
        // Application ID
        readonly ALGOLIA_ID: string
        // Search API Key
        readonly ALGOLIA_SEARCH_KEY: string
        // Write API Key
        readonly ALGOLIA_WRITE_KEY: string
      }
    }
  }
}

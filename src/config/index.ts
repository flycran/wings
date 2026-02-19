const platforms = {
  juejin_id: process.env.PLATFORM_JUEJIN_ID,
  github_username: process.env.PLATFORM_GITHUB_USERNAME,
}

const config = {
  platforms,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  algolia: {
    id: process.env.ALGOLIA_ID,
    key: process.env.ALGOLIA_SEARCH_KEY,
    riteKey: process.env.ALGOLIA_WRITE_KEY,
    agentId: process.env.ALGOLIA_AGENT_ID,
  },
}

export default config as DeepReadonly<typeof config>

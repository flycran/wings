const webConfig = {
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  algolia: {
    id: process.env.ALGOLIA_ID,
    key: process.env.ALGOLIA_SEARCH_KEY,
    agentId: process.env.ALGOLIA_AGENT_ID,
  },
}

export default webConfig

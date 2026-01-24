const webConfig = {
  supabase: {
    url: import.meta.env.SUPABASE_URL,
    key: import.meta.env.SUPABASE_KEY,
  },
  algolia: {
    id: import.meta.env.ALGOLIA_ID,
    key: import.meta.env.ALGOLIA_SEARCH_KEY,
  },
}

export default webConfig

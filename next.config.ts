import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    ALGOLIA_ID: process.env.ALGOLIA_ID,
    ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
    ALGOLIA_AGENT_ID: process.env.ALGOLIA_AGENT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thaka.bing.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
    ],
  },
}

export default nextConfig

import createMDX from '@next/mdx'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'api.hn',
      },
    ],
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)

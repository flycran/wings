import createMDX from '@next/mdx'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  logging: {
    fetches: {
      hmrRefreshes: false,
    },
  },
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)

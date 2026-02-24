import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 启用 Turbopack 并配置优化选项
  turbopack: {
    // 启用持久化缓存加速启动
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  // 优化图片处理
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 配置 webpack 别名（与 Turbopack 共享）
  webpack: (config, { dev }) => {
    // 开发环境优化
    if (dev) {
      // 启用快速刷新
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    }
    return config
  },
  // 环境变量
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    ALGOLIA_ID: process.env.ALGOLIA_ID,
    ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
    ALGOLIA_AGENT_ID: process.env.ALGOLIA_AGENT_ID,
  },
  // 实验性功能：优化编译速度
  experimental: {
    // 启用并行构建
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    // 启用服务器组件外部包优化
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig

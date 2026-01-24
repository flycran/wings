import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import EnvironmentPlugin from 'vite-plugin-environment'
import tsconfigPaths from 'vite-tsconfig-paths'
import envPlugin from './plugins/env'

export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    netlifyReactRouter(),
    devtoolsJson(),
    // 前端需要访问的环境变量需要在此声明
    EnvironmentPlugin(['SUPABASE_URL', 'SUPABASE_KEY', 'ALGOLIA_ID', 'ALGOLIA_SEARCH_KEY', 'ALGOLIA_AGENT_ID'], {
      defineOn: 'import.meta.env',
    }),
    envPlugin({
      typesFile: './types/env.d.ts',
    }),
  ],
  ssr: {
    // 强制在 SSR bundle 中包含这些依赖
    noExternal: ['react-syntax-highlighter'],
  },
})

import { vitePlugin as remix } from '@remix-run/dev'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
    }),
  ],
})

import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import EnvTypes from 'vite-plugin-env-types'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [reactRouter(), tsconfigPaths(), EnvTypes({
    dts: 'env.d.ts'
  })],
})

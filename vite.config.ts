import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 8000,
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'app'),
  //   },
  // },
  plugins: [reactRouter(), tsconfigPaths()],
})

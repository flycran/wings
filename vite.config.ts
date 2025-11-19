import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import EnvironmentPlugin from 'vite-plugin-environment'
import tsconfigPaths from 'vite-tsconfig-paths'
import envPlugin from './plugins/env'
import netlifyReactRouter from "@netlify/vite-plugin-react-router"

export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    netlifyReactRouter(),
    devtoolsJson(),
    EnvironmentPlugin(['SUPABASE_URL', 'SUPABASE_KEY'], {
      defineOn: 'import.meta.env',
    }),
    envPlugin({
      typesFile: './types/env.d.ts',
    }),
  ],
})

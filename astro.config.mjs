// @ts-check

import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [codeInspectorPlugin({ bundler: 'vite' })],
  },
  devToolbar: {
    enabled: false,
  },
})

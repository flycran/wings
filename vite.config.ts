/// <reference types="vitest/config" />
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import { reactRouter } from '@react-router/dev/vite'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import EnvironmentPlugin from 'vite-plugin-environment'
import tsconfigPaths from 'vite-tsconfig-paths'
import envPlugin from './plugins/env'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

const isStorybook = process.env.STORYBOOK === 'true'

export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    !isStorybook && reactRouter(),
    tsconfigPaths(),
    !isStorybook && netlifyReactRouter(),
    devtoolsJson(),
    // 前端需要访问的环境变量需要在此声明
    EnvironmentPlugin([ 'SUPABASE_URL', 'SUPABASE_KEY', 'ALGOLIA_ID', 'ALGOLIA_SEARCH_KEY',
      'ALGOLIA_AGENT_ID' ], {
      defineOn: 'import.meta.env',
    }), envPlugin({
      typesFile: './types/env.d.ts',
    }) ],
  ssr: {
    // 强制在 SSR bundle 中包含这些依赖
    noExternal: [ 'react-syntax-highlighter' ],
  },
  test: {
    projects: [ {
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook'),
        }) ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [ {
            browser: 'chromium',
          } ],
        },
        setupFiles: [ '.storybook/vitest.setup.ts' ],
      },
    } ],
  },
})
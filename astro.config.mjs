// @ts-check

import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'astro/config'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import projectInlangSettings from './project.inlang/settings.json'

const defaultLocale = projectInlangSettings.baseLocale
const locales = Object.fromEntries(projectInlangSettings.locales.map((e) => [e, e]))

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://flycran.xyz',
  trailingSlash: 'never',
  devToolbar: {
    enabled: false,
  },
  i18n: {
    locales: projectInlangSettings.locales,
    defaultLocale,
  },
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
  ],
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
        injectTo: fileURLToPath(new URL('./src/scripts/code-inspector.ts', import.meta.url)),
      }),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        emitTsDeclarations: true,
        trailingSlash: 'never',
        strategy: ['url', 'globalVariable', 'baseLocale'],
      }),
    ],
  },
})

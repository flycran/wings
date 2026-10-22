// @ts-check

import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
import { codeInspectorPlugin } from 'code-inspector-plugin'

const defaultLocale = 'zh'
const locales = {
  zh: 'zh',
  en: 'en',
}

export default defineConfig({
  site: 'https://flycran.xyz',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  vite: {
    plugins: [codeInspectorPlugin({ bundler: 'vite' })],
  },
  devToolbar: {
    enabled: false,
  },
})

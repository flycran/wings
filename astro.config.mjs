// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { codeInspectorPlugin } from 'code-inspector-plugin';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [codeInspectorPlugin({ bundler: 'vite' })],
  },
  devToolbar: {
    enabled: false,
  },
});

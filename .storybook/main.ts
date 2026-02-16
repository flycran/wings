import type { StorybookConfig } from '@storybook/react-vite'

// 传递给vite.config.ts
process.env.STORYBOOK = 'true'

const config: StorybookConfig = {
  'stories': [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  'addons': [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  'framework': '@storybook/react-vite',
}
export default config
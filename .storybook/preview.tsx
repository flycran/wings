import '~/globals.css'
import type { Preview } from '@storybook/react-vite'
import ClientProviders from '~/app/components/ClientProviders'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        // 👇 Default options
        dark: { name: 'Dark', value: '#1f2020' },
        light: { name: 'Light', value: '#fdfcf8' },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story, { globals }) => {
      return (
        <div className="bg-back text-fore dark:bg-back-dark dark:text-fore-dark dark:scrollbar-dark">
          <ClientProviders initialTheme={globals.backgrounds?.value || 'light'}>
            <Story />
          </ClientProviders>
        </div>
      )
    },
  ],
}

export default preview

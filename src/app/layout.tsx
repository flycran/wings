import { QueryClientProvider } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import '../globals.css'
import 'swiper/css'
import '~/assets/font.css'
import { ReactNode } from 'react'
import ClientProviders from '~/app/components/ClientProviders'
import DialogProvider from '~/components/ui/DialogProvider/DialogProvider'
import { queryClient } from '~/query'
import { ThemeMode } from '~/store/system'

export const metadata: Metadata = {
  title: 'Wings | 插上梦想的翅膀',
  description: 'Wings Blog是Flycran设计、开发的个人博客网站，主要记录项目，文章、生活、随笔等。',
  icons: '/favicon.svg',
}

async function getInitialTheme(): Promise<ThemeMode> {
  const cookieStore = await cookies()
  const theme = cookieStore.get('THEME_MODE')?.value
  return (theme as ThemeMode) || 'system'
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialTheme = await getInitialTheme()

  return (
    <html
      lang="zh"
      data-theme={initialTheme}
      className="bg-back text-fore dark:bg-back-dark dark:text-fore-dark dark:scrollbar-dark"
      suppressHydrationWarning
    >
      <body>
        <DialogProvider>
          <ClientProviders initialTheme={initialTheme}>{children}</ClientProviders>
        </DialogProvider>
      </body>
    </html>
  )
}

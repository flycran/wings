import Sidebar from '@/app/components/Sidebar'
import { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import { ReactNode } from 'react'
import 'swiper/css'
import './globals.css'
import '@/assets/font.css'

export const metadata: Metadata = {
  title: 'Wings | 插上梦想的翅膀',
  description: 'Wings Blog是Flycran设计、开发的个人博客网站，主要记录项目，文章、生活、随笔等。',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const themeMode = cookieStore.get('THEME_MODE')
  const theme = themeMode ? themeMode.value : 'system'

  return (
    <html
      lang="zh"
      data-theme={theme}
      className="bg-back-light text-zinc-900 dark:bg-back-dark dark:text-zinc-50"
    >
      <body>
        <NextTopLoader color="var(--color-crane-blue)" />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}

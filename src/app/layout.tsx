import Sidebar from '@/app/components/Sidebar'
import '@/assets/fonts/AlimamaFangYuanTi/index.css'
import type { Metadata } from 'next'
import 'swiper/css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wings | 装上梦想的翅膀',
  description: 'Wings Blog是Flycran设计、开发的个人博客网站，主要记录项目，文章、生活、随笔等。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <body>
        <Sidebar />
        <div className="relative m-auto w-6xl">{children}</div>
      </body>
    </html>
  )
}

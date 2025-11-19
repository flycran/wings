import cookies from 'cookie'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './globals.css'
import 'swiper/css'
import '~/assets/font.css'
import Topbar from '~/components/Topbar'
import DialogProvider from '~/components/ui/DialogProvider/DialogProvider'
import { themeAtom, ThemeMode } from '~/store/system'
import { Route } from './+types/root'

export async function loader({ request }: { request: Request }) {
  const cookie = cookies.parse(request.headers.get('Cookie') ?? '')
  const theme = (cookie.THEME_MODE || 'system') as ThemeMode

  return { theme }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const [theme, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    setTheme(loaderData.theme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return useMemo(
    () => (
      <html
        lang="zh"
        data-theme={loaderData.theme}
        className="bg-back text-fore dark:bg-back-dark dark:text-fore-dark dark:scrollbar-dark"
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Wings | 插上梦想的翅膀</title>
          <meta
            name="description"
            content="Wings Blog是Flycran设计、开发的个人博客网站，主要记录项目，文章、生活、随笔等。"
          />
          <link rel="icon" href="/public/favicon.svg" />
          <Meta />
          <Links />
        </head>
        <body>
          <DialogProvider>
            <Topbar />
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </DialogProvider>
        </body>
      </html>
    ),
    []
  )
}

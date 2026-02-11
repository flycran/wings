import { createTheme, ThemeProvider } from '@mui/material'
import 'react-toastify/ReactToastify.css'
import { QueryClientProvider } from '@tanstack/react-query'
import cookies from 'cookie'
import { useAtom } from 'jotai'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './globals.css'
import 'swiper/css'
import '~/assets/font.css'
import { ToastContainer } from 'react-toastify/unstyled'
import Topbar from '~/components/Topbar'
import DialogProvider from '~/components/ui/DialogProvider/DialogProvider'
import { toastOptions } from '~/config/toast'
import { queryClient } from '~/query'
import { Theme, themeAtom, ThemeMode } from '~/store/system'
import { Route } from './+types/root'

export async function loader({ request }: { request: Request }) {
  const cookie = cookies.parse(request.headers.get('Cookie') ?? '')
  const theme = (cookie.THEME_MODE || 'system') as ThemeMode

  return { theme }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const [theme, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    if (import.meta.env.DEV) window.__TANSTACK_QUERY_CLIENT__ = queryClient
  }, [])

  const [absoluteTheme, setAbsoluteTheme] = useState<Theme>(
    loaderData.theme === 'system' ? 'light' : loaderData.theme
  )

  useLayoutEffect(() => {
    setTheme(loaderData.theme)
  }, [])

  useLayoutEffect(() => {
    setAbsoluteTheme(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme
    )
  }, [theme])

  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: absoluteTheme,
        primary: {
          main: '#00abff',
        },
        secondary: {
          main: '#3d5afe',
        },
      },
    })
  }, [absoluteTheme])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
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
        <ThemeProvider theme={muiTheme}>
          <DialogProvider>
            <QueryClientProvider client={queryClient}>
              <Topbar />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </QueryClientProvider>
          </DialogProvider>
        </ThemeProvider>
        <ToastContainer {...toastOptions} theme={absoluteTheme} />
      </body>
    </html>
  )
}

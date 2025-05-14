import cookies from 'cookie'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import './globals.css'
import 'swiper/css'
import '~/assets/font.css'
import Sidebar from '~/components/Sidebar'

export async function loader({ request }: { request: Request }) {
  const cookie = cookies.parse(request.headers.get('Cookie') ?? '')
  const theme = cookie.THEME_MODE || 'system'

  return { theme }
}

export const metadata = {
  title: 'Wings | 插上梦想的翅膀',
  description: 'Wings Blog是Flycran设计、开发的个人博客网站，主要记录项目，文章、生活、随笔等。',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>()

  return (
    <html
      lang="zh"
      data-theme={theme}
      className="bg-back-light text-zinc-900 dark:bg-back-dark dark:text-zinc-50"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        <Sidebar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

import Sidebar from '@/components/Sidebar'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import './globals.css'
import 'swiper/css'
import '@/assets/font.css'
import cookies from 'cookie'

export async function loader({ request }: { request: Request }) {
  const cookie = cookies.parse(request.headers.get('Cookie') ?? '')
  const theme = cookie.THEME_MODE || 'system'

  return { theme }
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

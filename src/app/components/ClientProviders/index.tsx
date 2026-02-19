'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify/unstyled'
import 'react-toastify/ReactToastify.css'
import Topbar from '~/components/Topbar'
import { toastOptions } from '~/config/toast'
import { queryClient } from '~/query'
import { Theme, themeAtom, ThemeMode } from '~/store/system'

interface ClientProvidersProps {
  children: ReactNode
  initialTheme: ThemeMode
}

export default function ClientProviders({ children, initialTheme }: ClientProvidersProps) {
  const [theme, setTheme] = useAtom(themeAtom)

  // For debug
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.__TANSTACK_QUERY_CLIENT__ = queryClient
    }
  }, [])

  const [absoluteTheme, setAbsoluteTheme] = useState<Theme>(
    initialTheme === 'system' ? 'light' : initialTheme
  )

  useEffect(() => {
    setTheme(initialTheme)
  }, [initialTheme, setTheme])

  useEffect(() => {
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
    <ThemeProvider theme={muiTheme}>
      <QueryClientProvider client={queryClient}>
        <Topbar />
        {children}
        <ToastContainer {...toastOptions} theme={absoluteTheme} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

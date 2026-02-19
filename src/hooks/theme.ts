import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Theme, themeAtom } from '~/store/system'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light')
  const [t] = useAtom(themeAtom)

  useEffect(() => {
    if (t === 'system') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(darkMode ? 'dark' : 'light')
    } else {
      setTheme(t)
    }
  }, [t])

  return theme
}

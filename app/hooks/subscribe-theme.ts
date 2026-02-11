import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { themeAtom, ThemeMode } from '~/store/system'

// 订阅主题
export const useSubscribeTheme = (onBeforeThemeChange?: (theme: ThemeMode) => unknown) => {
  const [theme, setTheme] = useAtom(themeAtom)
  const channelRef = useRef<BroadcastChannel>(null)
  useEffect(() => {
    channelRef.current = new BroadcastChannel('theme')
    channelRef.current.onmessage = (event) => {
      if (event.data !== theme) {
        const res = onBeforeThemeChange?.(event.data)
        if (res !== false) {
          setTheme(event.data)
        }
      }
    }
    return () => {
      channelRef.current?.close()
    }
  }, [theme, onBeforeThemeChange])
  useEffect(() => {
    channelRef.current?.postMessage(theme)
  }, [theme])
}

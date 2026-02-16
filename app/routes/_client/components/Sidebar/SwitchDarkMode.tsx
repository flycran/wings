import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import MotionDiv from '~/components/motion/MotionDiv'
import { useSubscribeTheme } from '~/hooks/subscribe-theme'
import { useTheme } from '~/hooks/theme'
import LightBulb from '~/routes/_client/components/Sidebar/LightBulb'
import { Theme, themeAtom } from '~/store/system'

// 切换深色模式
export default function Switchdarkmode() {
  const [_, setTheme] = useAtom(themeAtom)
  const theme = useTheme()
  const [isDark, setIsDark] = useState(false)

  const lightBulbRef = useRef<SVGSVGElement>(null)
  // 视图过渡动画
  const viewTransition = (theme: Theme) => {
    const transition = document.startViewTransition(() => {
      Cookies.set('THEME_MODE', theme)
      setTheme(theme)
    })

    transition.ready.then(() => {
      const rect = lightBulbRef.current!.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      // 计算视口对角线长度除以2得到最小动画半径
      const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
      if (theme === 'dark') {
        document.documentElement.animate(
          {
            clipPath: [`circle(${diagonal}px at 50% 50%)`, `circle(1rem at ${x}px ${y}px)`],
            zIndex: [1, 1],
          },
          {
            duration: 600,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-old(root)',
          }
        )
      } else {
        document.documentElement.animate(
          {
            clipPath: [`circle(1.2rem at ${x}px ${y}px)`, `circle(${diagonal}px at 50% 50%)`],
          },
          {
            duration: 600,
            easing: 'ease-in',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      }
    })
  }

  // 延迟isDark的初始化，避免水和错误
  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [])

  useSubscribeTheme((newTheme) => {
    const absoluteTheme =
      newTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : newTheme
    setIsDark(absoluteTheme === 'dark')
  })

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setIsDark(newTheme === 'dark')
    // * 等待灯泡下拉动画结束，避免灯泡闪动
    setTimeout(() => {
      viewTransition(newTheme)
    }, 150)
  }

  return (
    <MotionDiv
      className="-z-1 relative w-0 md:left-11"
      whileTap={{
        y: 15,
      }}
      onClick={handleClick}
    >
      <div className="-top-5 -translate-x-1/2 absolute left-1/2 h-25 border-gray-300 border-l-1" />
      <LightBulb
        ref={lightBulbRef}
        darkMode={isDark}
        className="-translate-x-1/2 absolute top-20 left-1/2 h-10 w-10 rotate-180 cursor-pointer"
      />
    </MotionDiv>
  )
}

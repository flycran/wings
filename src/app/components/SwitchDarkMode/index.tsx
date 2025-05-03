'use client'
import LightBulb from '@/app/components/Sidebar/LightBulb'
import MotionDiv from '@/components/motion/MotionDiv'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'

// 切换深色模式
export default function Switchdarkmode() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const local = Cookies.get('THEME_MODE')
    if (local) {
      setDarkMode(local === 'dark')
    } else {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(darkMode)
    }
  }, [])
  // 应用深色模式
  const applyTheme = (darkMode: boolean) => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }

  const lightBulbRef = useRef<SVGSVGElement>(null)
  // 视图过渡动画
  const viewTransition = (darkMode: boolean) => {
    const transition = document.startViewTransition(() => {
      applyTheme(darkMode)
    })

    transition.ready.then(() => {
      const rect = lightBulbRef.current!.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      // 计算视口对角线长度除以2得到最小动画半径
      const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
      if (darkMode) {
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

  const handleClick = () => {
    const newDarkMode = !darkMode
    Cookies.set('THEME_MODE', newDarkMode ? 'dark' : 'light')
    setDarkMode(newDarkMode)
    // * 等待灯泡下拉动画结束，避免灯泡闪动
    setTimeout(
      () => {
        viewTransition(newDarkMode)
      },
      newDarkMode ? 200 : 100
    )
  }

  return (
    <MotionDiv
      className="relative -z-1 w-22"
      whileTap={{
        y: 15,
      }}
      onClick={handleClick}
    >
      <div className="absolute -top-5 left-1/2 h-25 -translate-x-1/2 border-l-1 border-gray-300" />
      <LightBulb
        ref={lightBulbRef}
        darkMode={darkMode}
        className="absolute top-20 left-1/2 h-10 w-10 -translate-x-1/2 rotate-180 cursor-pointer"
      />
    </MotionDiv>
  )
}

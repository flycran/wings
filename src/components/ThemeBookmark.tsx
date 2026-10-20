import { useRef, type MouseEvent } from 'react'
import { motion } from 'motion/react'

type Theme = 'light' | 'dark'

export default function ThemeBookmark() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  const applyTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('wings-theme', next)
    } catch {
      /* ignore */
    }
  }

  const beginTransition = (next: Theme) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const origin = tagRef.current ?? buttonRef.current

    if (!document.startViewTransition || reduced || !origin) {
      applyTheme(next)
      return
    }

    const transition = document.startViewTransition(() => applyTheme(next))

    transition.ready.then(() => {
      const currentOrigin = tagRef.current ?? buttonRef.current
      if (!currentOrigin) return

      const rect = currentOrigin.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const diagonal = Math.hypot(window.innerWidth, window.innerHeight) / 2

      if (next === 'dark') {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${diagonal}px at 50% 50%)`,
              `circle(1rem at ${x}px ${y}px)`,
            ],
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
            clipPath: [
              `circle(1.2rem at ${x}px ${y}px)`,
              `circle(${diagonal}px at 50% 50%)`,
            ],
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

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduced || event.detail === 0) {
      beginTransition(next)
      return
    }

    // The bookmark spring keeps moving after visualDuration; wait for it to settle
    // before the view transition freezes the page. Measured settle time: ~670ms.
    const delay = next === 'dark' ? 700 : 150
    window.setTimeout(() => beginTransition(next), delay)
  }

  return (
    <motion.button
      ref={buttonRef}
      className="p-theme-hanger"
      type="button"
      data-theme-bookmark
      aria-label="拉下夜页书签，切换深色模式"
      onClick={toggle}
      whileTap={{ y: 14 }}
      transition={{ type: 'spring', visualDuration: 0.15 }}
    >
      <span className="p-theme-cord" aria-hidden="true" />
      <span ref={tagRef} className="p-theme-tag-wrap">
        <span className="p-night-tag" aria-hidden="true">
          <span className="p-night-tag-text">夜页</span>
        </span>
      </span>
    </motion.button>
  )
}

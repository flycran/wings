import { useRef } from 'react'
import { motion } from 'motion/react'

export default function ThemeBookmark() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = () => {
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('wings-theme', next)
      } catch {
        /* ignore */
      }
    }

    const origin = tagRef.current ?? buttonRef.current
    if (!document.startViewTransition || reduced || !origin) {
      apply()
      return
    }

    const rect = origin.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(window.innerWidth, window.innerHeight)
    const transition = document.startViewTransition(apply)

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 560,
          easing: 'cubic-bezier(.22,.61,.36,1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <motion.button
      ref={buttonRef}
      className="p-theme-hanger"
      type="button"
      data-theme-bookmark
      aria-label="拉下夜页书签，切换深色模式"
      onClick={toggle}
      whileTap={{ y: 12 }}
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

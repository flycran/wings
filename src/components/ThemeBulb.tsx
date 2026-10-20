import { useRef } from 'react'
import { motion } from 'motion/react'

export default function ThemeBulb() {
  const buttonRef = useRef<HTMLButtonElement>(null)

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

    if (!document.startViewTransition || reduced || !buttonRef.current) {
      apply()
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
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
    <button
      ref={buttonRef}
      className="p-bulb"
      type="button"
      data-theme-bulb
      aria-label="拉一下灯绳，切换深色模式"
      onClick={toggle}
    >
      <span className="p-bulb-cord" aria-hidden="true" />
      <motion.span
        className="p-bulb-lamp"
        whileTap={{ y: 16 }}
        transition={{ type: 'spring', visualDuration: 0.15 }}
      >
        <span className="p-bulb-glass" aria-hidden="true">
          <span className="p-bulb-filament" />
        </span>
        <span className="p-bulb-base" aria-hidden="true" />
        <span className="p-bulb-label">夜航</span>
      </motion.span>
    </button>
  )
}

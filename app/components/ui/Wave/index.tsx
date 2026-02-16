import { MouseEventHandler, ReactNode, useCallback, useMemo } from 'react'
import styles from './index.module.css'

export interface WaveRenderProps {
  onClick: MouseEventHandler<HTMLElement>
}

export interface WaveProps {
  children: (props: WaveRenderProps) => ReactNode
  color?: string
  duration?: number
}

export default function Wave({ children, color }: WaveProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const div = document.createElement('div')
      div.classList.add(styles.waveFocus)
      div.style.cssText = `--wave-color: ${color ?? 'inherit'};`
      div.className = styles.wave

      e.currentTarget.appendChild(div)

      div
        .animate(
          [
            {
              boxShadow: '0 0 0 0 rgb(from var(--wave-color) r g b / 40%)',
            },
            {
              boxShadow: '0 0 0 .6em rgb(from var(--wave-color) r g b / 0%)',
            },
          ],
          {
            duration: 500,
            easing: 'ease-out',
          }
        )
        .addEventListener('finish', () => {
          div.remove()
        })
    },
    [color]
  )

  return useMemo(() => children({ onClick: handleClick }), [children, handleClick])
}

import { cloneElement, ReactElement, Ref, useEffect, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import styles from './index.module.css'

export interface WaveProps {
  children: ReactElement<{
    ref: Ref<HTMLElement>
    onClick: (...args: unknown[]) => void
  }>
  color?: string
  duration?: number
}

export default function Wave({ children, color }: WaveProps) {
  const buttonRef = useRef<HTMLElement>(null)

  const createAnimateElement = () => {
    const div = document.createElement('div')
    div.style = `--wave-color: ${color ?? 'inherit'};`
    div.className = styles.wave

    buttonRef.current!.appendChild(div)

    return div
  }

  useEffect(() => {
    const div = createAnimateElement()
    div.classList.add(styles.waveFocus)
    return () => div.remove()
  }, [])

  const handleClick = (...args: unknown[]) => {
    const div = createAnimateElement()

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
    return children.props.onClick?.(...args)
  }

  return cloneElement(children, {
    ref: mergeRefs([buttonRef, children.props.ref]),
    onClick: handleClick,
  })
}

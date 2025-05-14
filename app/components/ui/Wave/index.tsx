import { cloneElement, ReactElement, Ref, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

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

  const handleClick = (...args: unknown[]) => {
    const div = document.createElement('div')
    div.style = `
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      --wave-color: ${color ?? 'inherit'};
      border-radius: inherit;
      z-index: -1;
      pointer-events: none;`

    buttonRef.current!.appendChild(div)

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

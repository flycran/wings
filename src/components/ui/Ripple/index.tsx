import React, { cloneElement, ReactElement, Ref, useEffect, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

export interface RippleProps {
  children: ReactElement<{
    ref: Ref<HTMLElement>
    onMouseDown: (event: React.MouseEvent) => void
    onMouseUp: (event: React.MouseEvent) => void
  }>
  color?: string
  duration?: number
}

const baseStyle = `
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export default function Ripple({ children, color }: RippleProps) {
  const buttonRef = useRef<HTMLElement>(null)
  const rcRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = document.createElement('div')
    div.style = `
      ${baseStyle}
      overflow: hidden;
      --ripple-color: ${color ?? 'inherit'};
      -z-index: 0;
      border-radius: inherit;
      pointer-events: none;
    `
    rcRef.current = div
    buttonRef.current!.prepend(div)

    return () => {
      rcRef.current!.remove()
    }
  })

  const handleDown = (event: React.MouseEvent) => {
    const div = document.createElement('div')
    const { width, height, x, y } = rcRef.current!.getBoundingClientRect()
    const left = event.clientX - x
    const top = event.clientY - y
    const right = width - left
    const bottom = height - top

    const size = Math.max(
      Math.sqrt(left ** 2 + top ** 2) * 2,
      Math.sqrt(left ** 2 + bottom ** 2) * 2,
      Math.sqrt(right ** 2 + bottom ** 2) * 2,
      Math.sqrt(right ** 2 + top ** 2) * 2
    )

    div.style = `
      ${baseStyle}
      border-radius: 100vw;
      width: ${size}px;
      height: ${size}px;
      left: ${left - size / 2}px;
      top: ${top - size / 2}px;
      opacity: 0.3;
      background-color: var(--ripple-color)`
    let enterFinish = false
    let leave = false

    rcRef.current!.appendChild(div)

    div
      .animate(
        [
          {
            transform: 'scale(0)',
          },
          {
            transform: 'scale(1)',
          },
        ],
        {
          duration: 300,
          easing: 'ease-in-out',
        }
      )
      .addEventListener('finish', () => {
        enterFinish = true
        if (leave) {
          leaveAnimate()
        }
      })

    event.target.addEventListener(
      'mouseup',
      () => {
        leave = true
        if (enterFinish) {
          leaveAnimate()
        }
      },
      {
        once: true,
      }
    )

    const leaveAnimate = () => {
      div
        .animate(
          [
            {
              opacity: 0.3,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 200,
          }
        )
        .addEventListener('finish', () => {
          div.remove()
        })
    }

    return children.props.onMouseDown?.(event)
  }

  return cloneElement(children, {
    ref: mergeRefs([buttonRef, children.props.ref]),
    onMouseDown: handleDown,
  })
}

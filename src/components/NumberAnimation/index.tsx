'use client'
import clsx from 'clsx'
import { AnimationPlaybackControlsWithThen } from 'motion'
import { animate, motion } from 'motion/react'
import { ReactNode, useEffect, useRef, useState } from 'react'

export interface NumberScrollProps {
  value?: number | string
  className?: string
}

export function NumberScroll({ value = 0, className }: NumberScrollProps) {
  const v = String(value).split('')

  return (
    <span
      className={clsx(
        'inline-block overflow-hidden h-[1.5em] box-content mask-number-scroll',
        className
      )}
    >
      {v.map((e, i) => (
        <SingleNumber key={i} value={e} />
      ))}
    </span>
  )
}

export interface SingleNumberProps {
  value: string
}

function SingleNumber({ value }: SingleNumberProps) {
  const nodes: ReactNode[] = []
  const v = +value

  for (let i = 0; i < 10; i++) {
    nodes.push(
      <span className="h-[1.5em] leading-[1.5em] shrink-0" key={i}>
        {i}
      </span>
    )
  }

  if (Number.isNaN(v)) {
    return <span className="inline-flex flex-col h-[1.5em]">{value}</span>
  }

  return (
    <motion.span
      transition={{
        type: 'tween',
        ease: 'easeOut',
      }}
      animate={{
        y: `-${v}00%`,
      }}
      className="inline-flex items-center flex-col h-[1.5em]"
    >
      {nodes}
    </motion.span>
  )
}

export interface NumberAnimationProps extends NumberScrollProps {
  value?: number
  format?: (value: number) => number | string
  initial?: number
  delay?: number
}

export default function NumberAnimation({
  value: newValue = 0,
  format,
  initial,
  delay,
  ...rest
}: NumberAnimationProps) {
  const [value, setValue] = useState(initial ?? 0)
  const animateRef = useRef<AnimationPlaybackControlsWithThen>(null)

  useEffect(() => {
    if (animateRef.current) {
      animateRef.current.stop()
    }
    if (delay && value !== newValue) {
      animateRef.current = animate(
        { number: value },
        { number: newValue },
        {
          onUpdate(last) {
            setValue(last as unknown as number)
          },
          onComplete() {
            animateRef.current = null
          },
          duration: delay,
        }
      )
    } else {
      setValue(newValue)
    }
    return () => {
      if (animateRef.current) {
        animateRef.current.stop()
      }
    }
  }, [newValue])

  return <NumberScroll {...rest} value={format ? format(value) : value} />
}

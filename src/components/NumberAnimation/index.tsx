'use client'
import clsx from 'clsx'
import { animate, AnimationPlaybackControlsWithThen, motion, Transition } from 'motion/react'
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'

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

  const appValue = format ? format(value) : delay ? Math.round(value) : value

  return <NumberScroll {...rest} value={appValue} />
}

export interface NumberScrollProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number | string
  className?: string
  transition?: Transition
}

export function NumberScroll({ value = 0, className, transition, ...rest }: NumberScrollProps) {
  const v = String(value).split('')

  return (
    <span
      {...rest}
      className={clsx(
        'inline-block overflow-hidden h-[1.5em] px-[.2em] box-content mask-number-scroll',
        className
      )}
    >
      {v.map((e, i) => (
        <SingleNumber key={i} value={e} transition={transition} />
      ))}
    </span>
  )
}

export interface SingleNumberProps {
  value: string
  transition?: Transition
}

function SingleNumber({ value, transition }: SingleNumberProps) {
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
      transition={
        transition ?? {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        }
      }
      animate={{
        y: `-${v}00%`,
      }}
      className="inline-flex items-center flex-col h-[1.5em]"
    >
      {nodes}
    </motion.span>
  )
}

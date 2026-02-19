'use client'
import clsx from 'clsx'
import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import MotionDiv from '~/components/motion/MotionDiv'
import { useLockScroll } from '~/hooks/lockScroll'

export interface MaskProps extends HTMLAttributes<HTMLDialogElement> {
  children?: ReactNode
  modal?: boolean
  onClickMask?: (e: React.MouseEvent) => void
  onCancel?: (e: React.SyntheticEvent<HTMLDialogElement, Event>) => void
  className?: string
}

export default function Dialog({
  children,
  modal = true,
  onClickMask,
  onCancel,
  className,
  ...rest
}: MaskProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (modal) {
      modalRef.current!.show()
    }

    return () => {
      if (modal) {
        modalRef.current?.close()
      }
    }
  }, [])
  useLockScroll()
  return (
    <dialog
      {...rest}
      ref={modalRef}
      className={clsx(
        'fixed bg-transparent z-1000 top-0 left-0 w-full h-full max-w-none max-h-none backdrop:hidden  flex justify-center items-center overflow-hidden text-inherit',
        className
      )}
      onCancel={onCancel}
    >
      <MotionDiv
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="bg-black/20 absolute backdrop-blur-xs -z-1 top-0 left-0 w-full h-full"
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0.12,
        }}
        onClick={(e) => {
          onClickMask?.(e)
        }}
      />
      {children}
    </dialog>
  )
}

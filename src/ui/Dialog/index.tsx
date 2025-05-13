'use client'
import MotionDiv from '@/components/motion/MotionDiv'
import { useLockScroll } from '@/hooks/lockScroll'
import { ReactNode, useEffect, useRef } from 'react'

export interface MaskProps {
  children?: ReactNode
  modal?: boolean
}

export default function Dialog({ children, modal }: MaskProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (modal) {
      modalRef.current!.showModal()
    }

    return () => {
      if (modal) {
        modalRef.current!.close()
      }
    }
  }, [])
  useLockScroll()
  return (
    <>
      <dialog
        open
        ref={modalRef}
        className="fixed bg-transparent z-1000 top-0 left-0 w-full h-full backdrop:hidden  flex justify-center items-center overflow-hidden"
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
          className="bg-black/50 absolute backdrop-blur-xs -z-1 top-0 left-0 w-full h-full"
          transition={{
            type: 'tween',
            ease: 'linear',
          }}
        />
        {children}
      </dialog>
    </>
  )
}

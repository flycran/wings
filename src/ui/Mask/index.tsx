'use client'
import MotionDiv from '@/components/motion/MotionDiv'
import { PortalBody } from '@/components/PortalBody'
import { AnimatePresence } from 'motion/react'
import { ReactNode, useEffect } from 'react'

export interface MaskProps {
  children?: ReactNode
  open?: boolean
  exitIndependently?: boolean
}

export default function Mask({ children, open, exitIndependently }: MaskProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <PortalBody>
      <AnimatePresence>
        {open && (
          <div className="fixed z-1000 top-0 left-0 w-full h-full">
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
              className="absolute w-full h-full top-0 left-0 bg-black/60 flex justify-center items-center overflow-hidden"
            >
              {!exitIndependently && children}
            </MotionDiv>
            {exitIndependently && (
              <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center overflow-hidden">
                {children}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </PortalBody>
  )
}

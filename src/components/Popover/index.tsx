'use client'
import MotionDiv, { MotionDivProps } from '@/components/motion/MotionDiv'
import { PortalBody } from '@/components/PortalBody'
import { useDelay } from '@/hooks/time'
import { offset, Placement, shift, useFloating } from '@floating-ui/react'
import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import { cloneElement, HTMLAttributes, ReactElement, ReactNode, Ref, useState } from 'react'

export interface PopoverProps extends MotionDivProps {
  children: ReactElement<
    {
      ref?: Ref<HTMLElement>
    } & Pick<HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'>
  >
  placement?: Placement
  delay?: number
  panel?: ReactNode
}

export default function Popover({ children, placement, delay, className, panel, ...rest }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      shift({
        padding: 8,
      }),
    ],
  })

  const [startEnter, cancelEnter] = useDelay(() => {
    setOpen(true)
  }, delay)

  const [startLeave, cancelLeave] = useDelay(() => {
    setOpen(false)
  }, 150)

  const mouseEnter = () => {
    startEnter()
    cancelLeave()
  }

  const mouseLeave = () => {
    startLeave()
    cancelEnter()
  }

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        onMouseEnter: mouseEnter,
        onMouseLeave: mouseLeave,
      })}
      <PortalBody>
        <AnimatePresence>
          {open && (
            <div
              className="z-10"
              ref={refs.setFloating}
              style={floatingStyles}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <MotionDiv
                initial={{
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                }}
                {...rest}
                className={clsx(
                  'overflow-hidden rounded-xl bg-zinc-100 shadow dark:bg-zinc-800 dark:shadow-white/10',
                  className
                )}
              >
                {panel}
              </MotionDiv>
            </div>
          )}
        </AnimatePresence>
      </PortalBody>
    </>
  )
}

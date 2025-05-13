'use client'
import MotionDiv, { MotionDivProps } from '@/components/motion/MotionDiv'
import { usePopover } from '@/hooks/popover'
import { FloatingPortal, Placement } from '@floating-ui/react'
import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import { cloneElement, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'

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

export default function Popover({
  children,
  placement,
  delay,
  className,
  panel,
  ...rest
}: PopoverProps) {
  const { open, refs, floatingStyles, enter, leave } = usePopover({
    placement,
    delay,
  })

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        onMouseEnter: enter,
        onMouseLeave: leave,
      })}
      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <div
              className="z-10"
              ref={refs.setFloating}
              style={floatingStyles}
              onMouseEnter={enter}
              onMouseLeave={leave}
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
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  )
}

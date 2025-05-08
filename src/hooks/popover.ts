import { useDelayOpen } from '@/hooks/delayOpen'
import { relatively, Relatively } from '@/utils/floating'
import {
  autoUpdate,
  offset,
  OffsetOptions,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react'

export interface PopoverOptions {
  placement?: Placement
  delay?: number
  leaveDelay?: number
  offset?: OffsetOptions
  relatively?: Relatively
  transform?: boolean
}

export type ReferenceProps = ReturnType<typeof usePopover>['referenceProps']
export type FloatingProps = ReturnType<typeof usePopover>['floatingProps']

export const usePopover = ({
  placement,
  delay,
  leaveDelay,
  offset: offsetOptions = 8,
  relatively: relativelyOptions,
  transform,
}: PopoverOptions) => {
  const { open, setOpen, enter, leave } = useDelayOpen(delay, leaveDelay)
  const { refs, floatingStyles, context, update } = useFloating({
    transform,
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetOptions),
      shift({
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const style = relativelyOptions
    ? relatively(relativelyOptions, context, transform)
    : floatingStyles

  return {
    open,
    setOpen,
    refs,
    floatingStyles: style,
    enter,
    leave,
    update,
    referenceProps: {
      ref: refs.setReference,
      onMouseEnter: enter,
      onMouseLeave: leave,
    },
    floatingProps: {
      ref: refs.setFloating,
      onMouseEnter: enter,
      onMouseLeave: leave,
      style,
    },
  }
}

import {
  autoUpdate,
  offset,
  OffsetOptions,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react'
import { useDelayActive } from '~/hooks/delayOpen'
import { relatively, Relatively } from '~/utils/floating'

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
  const { active, setActive, enter, leave } = useDelayActive(delay, leaveDelay)
  const { refs, floatingStyles, context, update } = useFloating({
    transform,
    placement,
    open: active,
    onOpenChange: setActive,
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
    open: active,
    setOpen: setActive,
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

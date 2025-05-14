import { useState } from 'react'
import { useDelay } from '~/hooks/time'

export const useDelayOpen = (enterDelay = 0, leaveDelay = 100) => {
  const [open, setOpen] = useState(false)

  const [startEnter, cancelEnter] = useDelay(() => {
    setOpen(true)
  }, enterDelay)

  const [startLeave, cancelLeave] = useDelay(() => {
    setOpen(false)
  }, leaveDelay ?? 100)

  const enter = () => {
    startEnter()
    cancelLeave()
  }

  const leave = () => {
    startLeave()
    cancelEnter()
  }

  return { open, setOpen, enter, leave }
}

import { useState } from 'react'
import { useDelay } from '~/hooks/time'

export const useDelayActive = (enterDelay = 0, leaveDelay = 100) => {
  const [active, setActive] = useState(false)

  const [startEnter, cancelEnter] = useDelay(() => {
    setActive(true)
  }, enterDelay)

  const [startLeave, cancelLeave] = useDelay(() => {
    setActive(false)
  }, leaveDelay ?? 100)

  const enter = () => {
    startEnter()
    cancelLeave()
  }

  const leave = () => {
    startLeave()
    cancelEnter()
  }

  return { active, setActive, enter, leave }
}

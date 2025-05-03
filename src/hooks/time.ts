import { useEffect, useRef } from 'react'

export const useDelay = <T extends unknown[]>(call: (...args: T) => unknown, delay: number = 0) => {
  const timer = useRef<NodeJS.Timeout>(null)
  const call_ = useRef(call)

  useEffect(() => {
    call_.current = call
  }, [call])

  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }

  const start = (...args: T) => {
    cancel()
    timer.current = setTimeout(() => {
      cancel()
      call_.current(...args)
    }, delay)
  }

  return [start, cancel]
}

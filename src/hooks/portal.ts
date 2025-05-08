import { Key, ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const usePortal = (
  children: ReactNode,
  container: () => Element | DocumentFragment,
  key?: Key | null
) => {
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  return mounted && createPortal(children, container(), key)
}

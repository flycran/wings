import { Key, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const usePortal = (children: ReactNode, container: () => Element | DocumentFragment, key?: Key | null) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted && createPortal(children, container(), key)
}

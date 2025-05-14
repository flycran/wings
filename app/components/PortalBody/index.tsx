import { Key, ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalBodyProps {
  children: ReactNode
  key?: Key | null
}

export function PortalBody({ children, key }: PortalBodyProps) {
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  return mounted && createPortal(children, document.body, key)
}

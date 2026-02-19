'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'

export default function ArticleSilde({ children }: { children: ReactNode }) {
  const [sildeHeight, setSildeHeight] = useState(0)
  const sildeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      setSildeHeight(sildeRef.current?.offsetHeight ?? 0)
    })
    observer.observe(sildeRef.current!)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={sildeRef}
      className="sticky py-4 md:w-70"
      style={{
        top: `min(calc(100% - ${sildeHeight}px), 0px)`,
      }}
    >
      {children}
    </div>
  )
}

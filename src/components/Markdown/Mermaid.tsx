'use client'
import mermaid from 'mermaid'
import { HTMLAttributes, useEffect, useRef } from 'react'

export interface MermaidProps extends HTMLAttributes<HTMLElement> {
  children?: string
}

export default function Mermaid({ children, ...rest }: MermaidProps) {
  const codeRef = useRef<HTMLElement>(null)
  useEffect(() => {
    mermaid.initialize({
      theme: 'default',
    })
    mermaid.run({
      nodes: [codeRef.current!],
    })
  }, [])
  return (
    <code {...rest} ref={codeRef}>
      {children}
    </code>
  )
}

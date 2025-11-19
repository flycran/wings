import mermaid from 'mermaid'
import { HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'

export interface MermaidProps extends HTMLAttributes<HTMLElement> {
  children?: string
}

export default function Mermaid({ children, ...rest }: MermaidProps) {
  const codeRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    mermaid.initialize({
      theme: 'default',
      startOnLoad: false,
    })
    mermaid.run({
      nodes: [codeRef.current!],
    })
    return () => {
      if (codeRef.current) codeRef.current.innerHTML = ''
    }
  }, [children])
  return (
    <code {...rest} ref={codeRef}>
      {children}
    </code>
  )
}

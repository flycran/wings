'use client'
import mermaid from 'mermaid'
import { HTMLAttributes, useId, useLayoutEffect, useState } from 'react'

export interface MermaidProps extends HTMLAttributes<HTMLElement> {
  children?: string
}

export default function Mermaid({ children, ...rest }: MermaidProps) {
  const [svg, setSvg] = useState('')
  const id = useId()
  useLayoutEffect(() => {
    if (children) {
      try {
        mermaid.initialize({
          theme: 'default',
          startOnLoad: false,
        })
        mermaid.render(id, children).then((res) => setSvg(res.svg))
      } catch (error) {
        console.error(error)
      }
    }
    return () => {
      setSvg('')
    }
  }, [children])
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: 必要的html渲染
    <code {...rest} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}

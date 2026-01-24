import { ElementContent, RootContent } from 'hast'
import { createElement, HTMLAttributes, memo, ReactNode } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Mermaid from '~/components/ui/Markdown/Mermaid'

export type Components = { [x: string]: (props: HTMLAttributes<HTMLElement>) => ReactNode }

const Code = (props: HTMLAttributes<HTMLElement>) => {
  const { children, className, style, ...rest } = props
  if (className) {
    const match = /language-(\w+)/.exec(className || '')

    if (match) {
      const lang = match[1]
      const text = String(children).replace(/\n$/, '')

      if (lang === 'mermaid') {
        return <Mermaid className="flex justify-center p-4">{text}</Mermaid>
      }

      return (
        <div className="hljs atom-light dark:atom-dark">
          <SyntaxHighlighter showLineNumbers useInlineStyles={false} PreTag="div" language={lang}>
            {text}
          </SyntaxHighlighter>
        </div>
      )
    }
  }
  return (
    <code {...rest} {...{ style }} className={className}>
      {children}
    </code>
  )
}

export const defaultComponents: Components = {
  code: memo(Code),
}

export const treeNodeMap = (
  nodes: RootContent[],
  components: Components = defaultComponents
): ReactNode => {
  const process = (node: RootContent, index?: number) => {
    if (node.type === 'element') {
      const { tagName, children, properties } = node
      const className = properties?.className as string[] | undefined
      const getKey = () => {
        if (index === undefined) return undefined
        return `${tagName}-${index}`
      }
      return createElement(components[tagName] || tagName, {
        ...properties,
        className: className?.join(' '),
        key: getKey(),
        // biome-ignore lint/correctness/noChildrenProp: createElement只支持通过props传递
        children: children.length ? treeNodeMap(children, components) : undefined,
      })
    }
    if (node.type === 'text') return node.value
  }
  if (nodes.length === 1) {
    return process(nodes[0])
  }
  const rns: ReactNode[] = []
  for (let i = 0; i < nodes.length; i++) {
    const element = process(nodes[i], i)

    if (element) {
      rns.push(element)
    }
  }

  return rns
}

export interface TreeNodeProps {
  nodeTagName: string
  children: ElementContent[]
  components: Components
  [x: string]: unknown
}

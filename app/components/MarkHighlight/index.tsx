import { createElement, ReactNode } from 'react'

export interface MarkHighlightProps {
  text?: string
  query?: string
}

export default function MarkHighlight({ text, query = '' }: MarkHighlightProps) {
  if (!text) return null

  const rgx = new RegExp(query, 'gi')

  const matchs = text.matchAll(rgx)

  const nodes: ReactNode[] = []

  let lastIndex = 0

  for (const matchResult of matchs) {
    const matchIndex = matchResult.index!
    const matchText = matchResult[0]

    // 添加匹配前的普通文本
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex))
    }

    // 添加高亮的 mark 元素
    nodes.push(
      <mark className="text-crane-red bg-transparent">{ matchText }</mark>
    )

    lastIndex = matchIndex + matchText.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return createElement('span', null, ...nodes)
}

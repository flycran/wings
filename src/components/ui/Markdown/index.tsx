import clsx from 'clsx'
import type { Root } from 'hast'
import { createElement, Fragment, HTMLAttributes } from 'react'
import { treeNodeMap } from '~/components/ui/utils/markdown'

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  tree: Root
}

export default function Markdown({ tree, className, ...rest }: MarkdownProps) {
  const nodes = treeNodeMap(tree.children)

  const rootNode = createElement(Fragment, null, ...nodes)

  return (
    <div {...rest} className={clsx('prose dark:prose-invert max-w-none', className)}>
      {rootNode}
    </div>
  )
}

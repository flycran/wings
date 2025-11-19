import clsx from 'clsx'
import type { Root } from 'hast'
import { HTMLAttributes } from 'react'
import { treeNodeMap } from '~/components/ui/utils/markdown'

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  tree: Root
}

export default function Markdown({ tree, className, ...rest }: MarkdownProps) {
  return (
    <div {...rest} className={clsx('prose dark:prose-invert max-w-none', className)}>
      {treeNodeMap(tree.children)}
    </div>
  )
}

import { NodeViewContent, NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react'
import Mermaid from '~/components/ui/Markdown/Mermaid'

export default function MermaidCodeBlockView(props: ReactNodeViewProps) {
  if (props.node.attrs.language !== 'mermaid')
    return (
      <NodeViewWrapper as="pre" className="atom-light dark:atom-dark">
        <code>
          <NodeViewContent />
        </code>
      </NodeViewWrapper>
    )

  console.log(props.node.textContent)

  return (
    <NodeViewWrapper className="flex flex-col">
      <pre>
        <Mermaid className="flex justify-center p-4">{props.node.textContent}</Mermaid>
        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
        <NodeViewContent />
      </pre>
    </NodeViewWrapper>
  )
}

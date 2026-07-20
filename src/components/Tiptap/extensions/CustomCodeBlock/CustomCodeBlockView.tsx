import { NodeViewContent, NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Mermaid from '~/components/ui/Markdown/Mermaid'

export default function CustomCodeBlockView({ node }: ReactNodeViewProps) {
  const lang = node.attrs.language
  const text = node.textContent

  if (lang === 'mermaid') {
    return (
      <NodeViewWrapper className="">
        <pre>
          <Mermaid>{text}</Mermaid>
        </pre>
        <pre>
          <code>
            <NodeViewContent />
          </code>
        </pre>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="hljs atom-light dark:atom-dark">
      <pre>
        <SyntaxHighlighter showLineNumbers useInlineStyles={false} PreTag="div" language={lang}>
          {text}
        </SyntaxHighlighter>
      </pre>
    </NodeViewWrapper>
  )
}

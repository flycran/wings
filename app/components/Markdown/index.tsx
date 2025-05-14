import Mermaid from '~/components/Markdown/Mermaid'
import { ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import slug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export interface MarkdownProps extends ComponentProps<typeof ReactMarkdown> {}

export default function Markdown({ children, ...rest }: MarkdownProps) {
  return (
    <>
      <ReactMarkdown
        {...rest}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[slug]}
        components={{
          code(props) {
            const { children, className, node, ref, style, ...rest } = props
            if (className) {
              const match = /language-(\w+)/.exec(className || '')

              if (match) {
                const lang = match[1]
                const text = String(children).replace(/\n$/, '')

                if (lang === 'mermaid') {
                  return <Mermaid className="mermaid flex justify-center p-4">{text}</Mermaid>
                }

                return (
                  <div className="hljs atom-light dark:atom-dark">
                    <SyntaxHighlighter
                      showLineNumbers
                      useInlineStyles={false}
                      {...rest}
                      PreTag="div"
                      language={lang}
                    >
                      {text}
                    </SyntaxHighlighter>
                  </div>
                )
              }
            }
            return (
              <code {...rest} {...{ style, ref }} className={className}>
                {children}
              </code>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </>
  )
}

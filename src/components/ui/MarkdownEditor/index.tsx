import clsx from 'clsx'
import { useMemo } from 'react'
import slug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import Markdown from '~/components/ui/Markdown'
import Editor, { EditorProps } from '~/components/ui/MarkdownEditor/components/Editor'

export interface MarkdownEditorProps extends Pick<EditorProps, 'content' | 'onChangeContent'> {
  className?: string
}

export default function MarkdownEditor({
  className,
  content,
  onChangeContent,
}: MarkdownEditorProps) {
  const tree = useMemo(() => {
    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(slug)
    const root = processor.parse(content)
    return processor.runSync(root, content)
  }, [content])

  return (
    <div className={clsx('grid grid-cols-2', className)}>
      <div className="max-h-full overflow-y-auto">
        <Editor content={content} onChangeContent={onChangeContent} className="p-2" />
      </div>
      <div className="max-h-full overflow-y-auto p-4">
        <Markdown tree={tree} />
      </div>
    </div>
  )
}

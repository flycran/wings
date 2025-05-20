import clsx from 'clsx'
import { MdEditor, ToolbarNames } from 'md-editor-rt'
import { useTheme } from '~/hooks/theme'

const toolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'catalog',
  'preview',
  'fullscreen',
]

export interface MarkdownEditorProps {
  value?: string
  onChange?: (value: string) => void
  onSave?: (value: string) => void
  className?: string
}

export default function MarkdownEditor({
                                         value = '',
                                         className,
                                         ...rest
                                       }: MarkdownEditorProps) {
  const theme = useTheme()

  return (
    <MdEditor
      { ...rest }
      theme={ theme }
      value={ value }
      codeStyleReverse={ false }
      className={ clsx('md-editor dark:md-editor-dark', className) }
      language="zh_CN"
      toolbars={ toolbars }
      footers={ [] }
      autoFocus
      placeholder="在这里开始创作"
    />
  )
}

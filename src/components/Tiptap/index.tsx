'use client'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { TextAlign } from '@tiptap/extension-text-align'
import { Markdown } from '@tiptap/markdown'
import { Editor, EditorContent, EditorContext, EditorEvents, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './index.css'
import clsx from 'clsx'
import { Ref, useEffect, useImperativeHandle } from 'react'
import Toolbar from '~/components/Tiptap/components/Toolbar'
import { CustomCodeBlock } from '~/components/Tiptap/extensions/CustomCodeBlock'

export type TiptapRef = Editor | null

export interface TiptapProps {
  value?: string
  onChange?: (e: EditorEvents['update']) => void
  placeholder?: string
  className?: string
  onSave?: () => void
  ref?: Ref<TiptapRef>
}

export default function Tiptap({
  value,
  onChange,
  ref,
  className,
  onSave,
  placeholder,
}: TiptapProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CustomCodeBlock,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Markdown.configure({
        markedOptions: {
          gfm: true,
        },
      }),
    ],
    content: value,
    contentType: 'markdown',
    onUpdate: onChange,
  })

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value || '', {
        contentType: 'markdown',
      })
    }
  }, [value, editor])

  useImperativeHandle<TiptapRef, TiptapRef>(ref, () => editor)

  if (!editor) return null
  return (
    <EditorContext value={{ editor }}>
      <div className={clsx('flex flex-col pb-14.25 md:pb-0', className)}>
        <Toolbar onSave={onSave} />
        <div className="border-t border-zinc-100 dark:border-zinc-700" />
        <div className="h-0 w-full flex-1 overflow-auto">
          <EditorContent
            className="m-auto w-full lg:w-2xl xl:w-4xl 2xl:w-6xl prose dark:prose-invert max-w-none"
            placeholder={placeholder}
            editor={editor}
          />
        </div>
        {/*<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>*/}
        {/*<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>*/}
      </div>
    </EditorContext>
  )
}

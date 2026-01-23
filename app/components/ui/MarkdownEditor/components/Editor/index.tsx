import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { Compartment, EditorState } from '@codemirror/state'
import './markdown.css'
import {
  drawSelection,
  EditorView,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
} from '@codemirror/view'
import clsx from 'clsx'
import { HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'
import { compatibleHljsHighlighter } from '~/components/ui/MarkdownEditor/utils/compatibleHljsHighlighter'

export interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  content?: string
  onChangeContent?: (content: string) => void
}

export default function Editor({ className, content = '', onChangeContent, ...rest }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<EditorView>(null)
  const listenerCompartmentRef = useRef(new Compartment())

  useLayoutEffect(() => {
    const listenerCompartment = listenerCompartmentRef.current
    editorRef.current = new EditorView({
      doc: content,
      extensions: [
        history(),
        drawSelection(),
        rectangularSelection(),
        highlightSpecialChars(),
        syntaxHighlighting(compatibleHljsHighlighter),
        markdown({
          codeLanguages: languages,
          base: markdownLanguage,
        }),
        EditorView.lineWrapping,
        EditorState.allowMultipleSelections.of(true),
        keymap.of(defaultKeymap),
        keymap.of(historyKeymap),
        listenerCompartment.of([]),
      ],
      parent: containerRef.current!,
    })
  }, [])

  useEffect(() => {
    if (!editorRef.current || !onChangeContent) return
    const listenerCompartment = listenerCompartmentRef.current
    const editor = editorRef.current

    const effect = listenerCompartment.reconfigure(
      EditorView.updateListener.of((update) => {
        console.log(update)
        if (update.docChanged) onChangeContent(editor.state.doc.toString())
      })
    )

    editorRef.current.dispatch({ effects: effect })

    return () => {
      editorRef.current?.dispatch({
        effects: listenerCompartment.reconfigure([]),
      })
    }
  }, [onChangeContent])
  return <div {...rest} ref={containerRef} className={clsx('atom-light text-sm', className)} />
}

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'

import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import ts from 'highlight.js/lib/languages/typescript'
import { createLowlight } from 'lowlight'

const lowlight = createLowlight()

import MermaidCodeBlockView from './MermaidCodeBlockView'

// 注册语言
lowlight.register('javascript', js)
lowlight.register('typescript', ts)
lowlight.register('json', json)

export const CustomCodeBlock  = CodeBlockLowlight.configure({
  lowlight,
}).extend({
  addNodeView() {
    return ReactNodeViewRenderer(MermaidCodeBlockView)
  },
})

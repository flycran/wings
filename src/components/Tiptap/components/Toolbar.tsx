import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded'
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded'
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded'
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded'
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded'
import RedoRoundedIcon from '@mui/icons-material/RedoRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded'
import TitleRoundedIcon from '@mui/icons-material/TitleRounded'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import {
  ButtonGroup,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { EditorContext, useEditorState } from '@tiptap/react'
import { useBoolean } from 'ahooks'
import { useContext, useRef } from 'react'

type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface ToolbarProps {
  onSave?: () => void
}

export default function Toolbar({ onSave }: ToolbarProps) {
  return (
    <div className="w-full bg-back dark:bg-back-dark text-center border-t border-zinc-100 dark:border-zinc-700 fixed bottom-0 left-0 z-10 overflow-auto md:static">
      <div className="inline-flex shrink-0 gap-4 p-2">
        <History />
        <Divider flexItem orientation="vertical" />
        <Heading />
        <Divider flexItem orientation="vertical" />
        <Format />
        <Divider flexItem orientation="vertical" />
        <List />
        <Divider flexItem orientation="vertical" />
        <Block />
        <Divider flexItem orientation="vertical" />
        <IconButton onClick={onSave}>
          <SaveRoundedIcon />
        </IconButton>
      </div>
    </div>
  )
}

function History() {
  const { editor } = useContext(EditorContext)

  const history = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      return {
        undo: editor.can().undo(),
        redo: editor.can().redo(),
      }
    },
  })

  return (
    <ButtonGroup size="small">
      <IconButton
        value="undo"
        disabled={!history?.undo}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        <UndoRoundedIcon />
      </IconButton>
      <IconButton
        value="redo"
        disabled={!history?.redo}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        <RedoRoundedIcon />
      </IconButton>
    </ButtonGroup>
  )
}

function Heading() {
  const { editor } = useContext(EditorContext)

  const headingAnchorRef = useRef<HTMLButtonElement>(null)

  const heading = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null

      for (let level = 1; level <= 6; level++) {
        if (editor.isActive('heading', { level })) return level
      }

      return null
    },
  })

  const [openHeading, openHeadingActions] = useBoolean()

  return (
    <>
      <ToggleButton
        selected={!!heading}
        ref={headingAnchorRef}
        value="heading"
        size="small"
        onClick={() => openHeadingActions.toggle()}
        sx={{
          border: 0,
        }}
      >
        <TitleRoundedIcon />
        <ArrowDropDownRoundedIcon />
      </ToggleButton>
      <Popover
        anchorEl={headingAnchorRef.current}
        open={openHeading}
        onClose={openHeadingActions.setFalse}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList autoFocusItem>
          {([1, 2, 3, 4, 5, 6] as Level[]).map((item) => (
            <MenuItem
              key={item}
              selected={heading === item}
              onClick={() => editor?.chain().focus().toggleHeading({ level: item }).run()}
            >
              Heading {item}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  )
}

function Format() {
  const { editor } = useContext(EditorContext)

  const formats = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return []

      const formats = []

      if (editor.isActive('bold')) formats.push('bold')
      if (editor.isActive('italic')) formats.push('italic')
      if (editor.isActive('underline')) formats.push('underline')
      if (editor.isActive('strike')) formats.push('strike')
      if (editor.isActive('code')) formats.push('code')

      return formats
    },
  })

  return (
    <ToggleButtonGroup value={formats} size="small">
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FormatBoldRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="italic"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="underline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlinedRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="strike"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <StrikethroughSRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="code"
        onClick={() => editor?.chain().focus().toggleCode().run()}
      >
        <CodeRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

// biome-ignore lint/correctness/noUnusedVariables: 待支持
function TextAlignment() {
  const { editor } = useContext(EditorContext)

  const alignment = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null

      if (editor.isActive({ textAlign: 'left' })) return 'left'
      if (editor.isActive({ textAlign: 'center' })) return 'center'
      if (editor.isActive({ textAlign: 'right' })) return 'right'
      if (editor.isActive({ textAlign: 'justify' })) return 'justify'

      return null
    },
  })

  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      onChange={(_, value) => {
        editor?.chain().focus().setTextAlign(value).run()
      }}
      exclusive
    >
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="left"
      >
        <FormatAlignLeftRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="center"
      >
        <FormatAlignCenterRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="right"
      >
        <FormatAlignRightRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="justify"
      >
        <FormatAlignJustifyRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

function List() {
  const { editor } = useContext(EditorContext)

  const list = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      if (editor.isActive('bulletList')) return 'bulletList'
      if (editor.isActive('orderedList')) return 'orderedList'
      return null
    },
  })

  return (
    <ToggleButtonGroup
      size="small"
      value={list}
      onChange={(_, value) => {
        switch (value) {
          case 'bulletList':
            editor?.chain().focus().toggleBulletList().run()
            break
          case 'orderedList':
            editor?.chain().focus().toggleOrderedList().run()
            break
          default:
            break
        }
      }}
      exclusive
    >
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="bulletList"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <FormatListBulletedRoundedIcon />
      </ToggleButton>
      <ToggleButton
        sx={{
          border: 0,
        }}
        value="orderedList"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumberedRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

const languageList = [
  'javascript',
  'typescript',
  'python',
  'java',
  'c',
  'c++',
  'c#',
  'go',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'scala',
  'rust',
  'perl',
  'html',
  'css',
]

function Block() {
  const { editor } = useContext(EditorContext)

  const block = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      if (editor.isActive('codeBlock')) return 'codeBlock'
      if (editor.isActive('blockquote')) return 'blockquote'

      return null
    },
  })

  const [openCodeBlock, openCodeBlockActions] = useBoolean()
  const codeBlockAnchorRef = useRef<HTMLButtonElement>(null)

  const handleCodeBlock = () => {
    if (block === 'codeBlock') {
      editor?.chain().focus().toggleCodeBlock().run()
    } else {
      openCodeBlockActions.setTrue()
    }
  }

  const handleCodeBlockLanguage = (lang: string) => {
    openCodeBlockActions.setFalse()
    editor?.chain().focus().setCodeBlock({ language: lang }).run()
  }

  return (
    <>
      <ToggleButtonGroup size="small" value={block} exclusive>
        <ToggleButton
          ref={codeBlockAnchorRef}
          sx={{
            border: 0,
          }}
          value="codeBlock"
          onClick={handleCodeBlock}
        >
          <DataObjectRoundedIcon />
        </ToggleButton>
        <ToggleButton
          sx={{ border: 0 }}
          value="blockquote"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <FormatQuoteRoundedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Popover
        anchorEl={codeBlockAnchorRef.current}
        open={openCodeBlock}
        onClose={openCodeBlockActions.setFalse}
      >
        <MenuList className="max-h-80">
          {languageList.map((lang) => (
            <MenuItem key={lang} onClick={() => handleCodeBlockLanguage(lang)}>
              {lang}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  )
}

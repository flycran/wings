import fs from 'node:fs/promises'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'

SyntaxHighlighter.registerLanguage('typescript', typescript)

export default async function WebWinCode() {
  const code = await fs.readFile('plugins/env.ts', 'utf-8')

  return (
    <div className="hljs max-w-full max-h-full atom-light dark:atom-dark p-2">
      <SyntaxHighlighter useInlineStyles={false} PreTag="div" language="typescript">
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

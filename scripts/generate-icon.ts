import { DOMParser, XMLSerializer } from '@xmldom/xmldom'
import fs from 'node:fs/promises'
import path from 'node:path'
// 为平台图标生成 React 组件
// 将 SVG 文件内容转换为 React 组件
function svgToReactComponent(svgContent: string, componentName: string) {
  const parser = new DOMParser()
  const serializer = new XMLSerializer()

  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
  const svgElement = svgDoc.documentElement!

  const nodes = svgDoc.getElementsByTagName('title')

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].parentElement?.removeChild(nodes[i])
  }

  const children = Array.from(svgElement.childNodes)

  const serializedChildren = children
    .map((child) => {
      if (child.nodeType === 1) {
        return serializer.serializeToString(child)
      }
      return ''
    })
    .join('\n')

  return `import clsx from 'clsx'
import { HTMLAttributes } from 'react'

export interface ${componentName}Props extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function ${componentName}({ className, size, ...rest }: ${componentName}Props) {
  return (
    <svg
      {...rest}
      className={clsx('h-[1em] w-[1em] fill-current', className)}
      style={{
        fontSize: typeof size === 'number' ? \`\${size}px\` : size,
      }}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${serializedChildren}
    </svg>
  )
}
`
}

// 扫描目录并处理每个 SVG 文件
async function processSvgFiles() {
  const inputDir = path.join(__dirname, '../icons')
  const outputDir = path.join(__dirname, '../app/icons')

  try {
    const files = await fs.readdir(inputDir)

    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const filePath = path.join(inputDir, file)
        const fileName: string = path.basename(file, '.svg')
        const componentName = fileName
          .split(/[-_]/)
          .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join('')

        const outputFilePath = path.join(outputDir, `${componentName}.tsx`)

        const svgContent = await fs.readFile(filePath, 'utf8')

        const reactComponentCode = svgToReactComponent(svgContent, componentName)

        await fs.writeFile(outputFilePath, reactComponentCode)

        console.log(`Generated React component for ${file}`)
      }
    }
  } catch (err) {
    console.error('Error processing SVG files:', err)
  }
}

processSvgFiles()

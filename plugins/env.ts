import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import * as process from 'node:process'
import type { Plugin } from 'vite'

// 从.env文件生成 process.env 类型声明
export default function envTypesPlugin({
  env = '.env',
  typesFile = 'env.d.ts',
  exampleFile = '.env.example',
}: {
  env?: string
  typesFile?: string
  exampleFile?: string
}): Plugin {
  const envPath = resolve(env)
  function generateEnv() {
    try {
      const envFile = fs.readFileSync(envPath).toString()

      const envs: { key: string; comments?: string }[] = []
      const envLines = envFile.split(/\n+/)

      for (let i = 0; i < envLines.length; i++) {
        const line = envLines[i].trim()
        if (line !== envLines[i]) {
          envLines[i] = line
        }
        if (!line) continue
        if (line.startsWith('#')) continue
        const match = line.match(/^([a-zA-Z0-9-_]*)\w*=?\w*(.*?)\w*(#.*)?$/)
        if (!match) continue
        const [_a, key, _v, comments0] = match
        let comments = ''
        if (comments0) {
          comments = comments0.slice(1).trim()
        } else if (i > 0) {
          const pre = envLines[i - 1]
          if (pre.startsWith('#')) {
            comments = pre.slice(1).trim()
          }
        }
        envs.push({
          key,
          comments,
        })
      }

      const types = envs
        .map(({ key, comments }) => `${comments ? `// ${comments}\n` : ''}readonly ${key}: string;`)
        .join('\n')
      const typesContent = `declare module 'process'{global{namespace NodeJS {interface ProcessEnv{${types}}}}}`
      fs.writeFileSync(resolve(typesFile), typesContent)
      execSync(`bunx biome format --write ${typesFile}`, { stdio: 'inherit' })
      const exampleContent = envFile.replace(/^(\s*[A-Za-z_]\w*\s*=\s*).*?(?=\s*(#|$))/gm, '$1')
      fs.writeFileSync(resolve(exampleFile), exampleContent)
    } catch (e) {
      console.error(e)
    }
  }
  return {
    name: 'vite-plugin-env',
    configureServer(server) {
      if (process.env.NODE_ENV !== 'development') return
      generateEnv()
      server.watcher.on('change', (path) => {
        if (path === envPath) {
          generateEnv()
        }
      })
    },
  }
}

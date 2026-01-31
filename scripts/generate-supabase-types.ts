import dotenv from 'dotenv'
import { execSync } from 'node:child_process'
import * as process from 'node:process'

dotenv.config()

const url = process.env.SUPABASE_URL

const match = url.match(/^(https|http):\/\/([a-z]+?)\./)

if (match) {
  const command = `bun x supabase gen types typescript --project-id ${match[2]} > ./types/supabase.ts`
  console.log(`run: ${command}`)
  execSync(command, {
    stdio: 'inherit'
  })
  console.log('已完成')
}

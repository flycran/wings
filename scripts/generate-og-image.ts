import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const width = 1200
const height = 630

const outputs = [
  { lang: 'zh', file: 'public/og-image.png' },
  { lang: 'en', file: 'public/og-image-en.png' },
]

const template = pathToFileURL(resolve(root, 'scripts/og-image.html')).toString()

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })

for (const { lang, file } of outputs) {
  const target = resolve(root, file)
  await mkdir(dirname(target), { recursive: true })
  await page.goto(`${template}?lang=${lang}`)
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await page.screenshot({ path: target, clip: { x: 0, y: 0, width, height } })
  console.log(`og:image ${file}`)
}

await browser.close()

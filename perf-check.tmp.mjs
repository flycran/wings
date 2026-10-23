import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(process.argv[2] ?? 'http://localhost:8888/', { waitUntil: 'load' })
await page.waitForTimeout(3000)

const metrics = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0]
  const paints = performance.getEntriesByType('paint')
  const fcp = paints.find((p) => p.name === 'first-contentful-paint')?.startTime
  return new Promise((resolve) => {
    let lcp = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      lcp = entries[entries.length - 1]?.startTime ?? 0
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    setTimeout(() => {
      const resources = performance
        .getEntriesByType('resource')
        .map((r) => ({
          name: r.name.replace(location.origin, '').split('/').pop().slice(0, 50),
          start: Math.round(r.startTime),
          dur: Math.round(r.duration),
          kb: Math.round(r.transferSize / 1024),
        }))
        .sort((a, b) => b.start + b.dur - (a.start + a.dur))
        .slice(0, 12)
      resolve({
        ttfb: Math.round(nav.responseStart),
        domInteractive: Math.round(nav.domInteractive),
        dcl: Math.round(nav.domContentLoadedEventEnd),
        load: Math.round(nav.loadEventEnd),
        fcp: fcp && Math.round(fcp),
        lcp: Math.round(lcp),
        slowestResources: resources,
      })
    }, 500)
  })
})

console.log(JSON.stringify(metrics, null, 2))
await browser.close()

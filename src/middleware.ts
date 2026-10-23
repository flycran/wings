import { defineMiddleware } from 'astro:middleware'
import { assertIsLocale, baseLocale, setLocale } from '@/paraglide/runtime'

// 静态构建时 middleware 在每个页面预渲染前执行；
// locale 由 Astro i18n 依据 URL 解析（默认语言无前缀 → baseLocale）。
export const onRequest = defineMiddleware((context, next) => {
  setLocale(assertIsLocale(context.currentLocale ?? baseLocale))
  return next()
})

import { deLocalizeHref, type Locale, localizeHref } from '@/paraglide/runtime'

/**
 * 本地化当前url
 * @param locale 语言
 * @param url  当前url，必须传入`Astro.url` 因为utils里面无法直接获取这个变量
 * @returns
 */
export function localizeCurrentHref(locale: Locale, url: URL) {
  return localizeHref(deLocalizeHref(url.toString().replace(/(\/index)?\.html$/, '')), {
    locale,
  })
}

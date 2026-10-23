import { useEffect, useState } from 'react'
import { m } from '@/paraglide/messages'
import type { Locale } from '@/paraglide/runtime'
import styles from './LangHint.module.css'

// 简体中文地区的时区，其余时区一律按英文处理
const zhTimezones = new Set([
  'Asia/Shanghai',
  'Asia/Chongqing',
  'Asia/Harbin',
  'Asia/Urumqi',
  'Asia/Hong_Kong',
  'Asia/Macau',
  'Asia/Taipei',
])

const DISMISS_KEY = 'wings-lang-hint'

interface Props {
  pageLocale: Locale
  targetHref: string
}

function detectSuggestedLocale(): Locale | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!timezone) return null
    return zhTimezones.has(timezone) ? 'zh' : 'en'
  } catch {
    return null
  }
}

function isDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    // 无法读写会话存储时视为已关闭，避免每次刷新都打扰
    return true
  }
}

export default function LangHint({ pageLocale, targetHref }: Props) {
  const [suggested, setSuggested] = useState<Locale | null>(null)
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)

  // 时区只在浏览器存在，挂载后再检测；SSR 输出为空
  useEffect(() => {
    const suggested = detectSuggestedLocale()
    if (suggested && suggested !== pageLocale && !isDismissed()) {
      setSuggested(suggested)
    }
  }, [pageLocale])

  if (!suggested || gone) return null

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
    setHiding(true)
    window.setTimeout(() => setGone(true), 400)
  }

  return (
    <div className={`${styles.hint}${hiding ? ` ${styles.isHiding}` : ''}`} role="status">
      <a className={styles.switch} href={targetHref} onClick={dismiss}>
        {m.langHintSwitchTo({}, { locale: suggested })}
      </a>
      <button
        type="button"
        className={styles.close}
        aria-label={m.langHintDismiss({}, { locale: suggested })}
        onClick={dismiss}
      >
        ×
      </button>
    </div>
  )
}

import { useState } from 'react'
import SmartUnit from 'smart-unit'
import { m } from '@/paraglide/messages'
import shared from '../demo.module.css'
import styles from './SmartUnitDemo.module.css'

type Locale = 'en' | 'zh'

const units = {
  en: new SmartUnit(['', 'K', 'M', 'B', 'T'], { baseDigit: 1000 }),
  zh: new SmartUnit(['', '万', '亿', '万亿'], { baseDigit: 10000 }),
}

export default function SmartUnitDemo() {
  const [value, setValue] = useState('1234567')
  const [locale, setLocale] = useState<Locale>('en')

  const numeric = Number(value.replace(/,/g, ''))
  const safeValue = Number.isFinite(numeric) && numeric > 0 ? numeric : 0
  const { numStr, unit } = units[locale].getUnit(safeValue, '0-2')

  return (
    <div className={shared.demo}>
      <div className={shared.head}>
        <span>LIVE / smart-unit</span>
      </div>
      <label className={styles.label} htmlFor="unit-input">
        {m.demoSmartUnitInputLabel()}
      </label>
      <input
        id="unit-input"
        className={styles.input}
        value={value}
        inputMode="decimal"
        onChange={(event) => setValue(event.target.value)}
      />
      <div className={styles.output}>
        <span>{numStr}</span>
        <span>{unit}</span>
      </div>
      <div className={styles.meta}>
        <span>{m.demoSmartUnitAutoUnit()}</span>
        <div className={styles.locales}>
          <button
            className={locale === 'en' ? 'is-active' : undefined}
            type="button"
            aria-pressed={locale === 'en'}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button
            className={locale === 'zh' ? 'is-active' : undefined}
            type="button"
            aria-pressed={locale === 'zh'}
            onClick={() => setLocale('zh')}
          >
            中文
          </button>
        </div>
      </div>
    </div>
  )
}

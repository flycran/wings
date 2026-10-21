import { useState } from 'react'
import SmartUnit from 'smart-unit'

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
    <div className="p-demo p-demo--unit">
      <div className="p-demo-head">
        <span>LIVE / smart-unit</span>
      </div>
      <label htmlFor="unit-input">输入一个数字</label>
      <input
        id="unit-input"
        value={value}
        inputMode="decimal"
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="p-unit-output">
        <span>{numStr}</span>
        <span>{unit}</span>
      </div>
      <div className="p-unit-meta">
        <span>自动选择单位</span>
        <div className="p-unit-locale">
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

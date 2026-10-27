import { useMemo, useState } from 'react'
import SmartUnit from 'smart-unit'
import { m } from '@/paraglide/messages'
import shared from '../demo.module.css'
import styles from './SmartUnitDemo.module.css'

type PresetId = 'size' | 'length' | 'time' | 'count'
type Selection = PresetId | 'custom'

interface UnitDraft {
  id: number
  name: string
  /** 到下一个单位的比例；最后一个单位不使用 */
  ratio: string
}

let nextDraftId = 0

function createDraft(name: string, ratio = ''): UnitDraft {
  return { id: nextDraftId++, name, ratio }
}

const presets: Record<PresetId, { units: (string | number)[] }> = {
  size: { units: ['B', 1024, 'KB', 1024, 'MB', 1024, 'GB'] },
  length: { units: ['mm', 10, 'cm', 100, 'm', 1000, 'km'] },
  time: { units: ['ms', 1000, 's', 60, 'm', 60, 'h'] },
  count: { units: ['个', 10000, '万', 10000, '亿'] },
}

const presetOrder: PresetId[] = ['size', 'length', 'time', 'count']

const presetLabels: Record<PresetId, () => string> = {
  size: m.demoSmartUnitPresetSize,
  length: m.demoSmartUnitPresetLength,
  time: m.demoSmartUnitPresetTime,
  count: m.demoSmartUnitPresetCount,
}

const maxUnits = 8

function toDrafts(units: (string | number)[]): UnitDraft[] {
  const drafts: UnitDraft[] = []
  for (const item of units) {
    if (typeof item === 'string') drafts.push(createDraft(item))
    else drafts[drafts.length - 1].ratio = String(item)
  }
  return drafts
}

function toUnits(drafts: UnitDraft[]): (string | number)[] {
  const units: (string | number)[] = []
  drafts.forEach((draft, index) => {
    units.push(draft.name)
    if (index < drafts.length - 1) {
      const ratio = Number(draft.ratio)
      units.push(Number.isFinite(ratio) && ratio > 0 ? ratio : 1)
    }
  })
  return units
}

export default function SmartUnitDemo() {
  const [value, setValue] = useState('1234567')
  const [selection, setSelection] = useState<Selection>('size')
  const [drafts, setDrafts] = useState<UnitDraft[]>(() => toDrafts(presets.size.units))

  const units = useMemo(() => toUnits(drafts), [drafts])
  const unit = useMemo(() => new SmartUnit<string>(units), [units])

  const numeric = Number(value.replace(/,/g, ''))
  const safeValue = Number.isFinite(numeric) && numeric > 0 ? numeric : 0
  const { numStr, unit: unitName } = unit.getUnit(safeValue, '0-2')
  const baseName = drafts[0]?.name ?? ''

  const selectPreset = (id: Selection) => {
    setSelection(id)
    if (id !== 'custom') setDrafts(toDrafts(presets[id].units))
  }

  const updateDraft = (index: number, patch: Partial<UnitDraft>) => {
    setDrafts((prev) => prev.map((draft, i) => (i === index ? { ...draft, ...patch } : draft)))
  }

  const addUnit = () => {
    setDrafts((prev) => {
      if (prev.length >= maxUnits) return prev
      const lastRatio = [...prev].reverse().find((draft) => draft.ratio !== '')?.ratio ?? '1000'
      const next = prev.map((draft, index) =>
        index === prev.length - 1 ? { ...draft, ratio: draft.ratio || lastRatio } : draft
      )
      return [...next, createDraft('')]
    })
  }

  const removeUnit = (index: number) => {
    setDrafts((prev) => {
      if (prev.length <= 1) return prev
      const next = prev.map((draft) => ({ ...draft }))

      if (index === next.length - 1) {
        next.splice(index, 1)
        next[next.length - 1].ratio = ''
        return next
      }

      const removed = next[index]
      next.splice(index, 1)
      if (index > 0) {
        // 删掉中间的单位时，把它前后的比例相乘，保留原来的换算关系
        const ratio = Number(next[index - 1].ratio) * Number(removed.ratio)
        if (Number.isFinite(ratio) && ratio > 0) next[index - 1].ratio = String(ratio)
      }
      return next
    })
  }

  const chipClass = (active: boolean) => `${styles.chip}${active ? ` ${styles.chipActive}` : ''}`

  return (
    <div className={shared.demo}>
      <div className={shared.head}>
        <span>LIVE / smart-unit</span>
        <span className={styles.badge}>{m.demoSmartUnitAnyUnit()}</span>
      </div>

      <label className={styles.label} htmlFor="unit-input">
        {m.demoSmartUnitInputLabel()}
      </label>
      <div className={styles.valueField}>
        <input
          id="unit-input"
          className={styles.input}
          value={value}
          inputMode="decimal"
          aria-describedby="unit-input-base"
          onChange={(event) => setValue(event.target.value)}
        />
        <span id="unit-input-base" className={styles.baseUnit}>
          {baseName || '—'}
        </span>
      </div>

      <div className={styles.output} aria-live="polite" aria-atomic="true">
        <span>{numStr}</span>
        <span>{unitName}</span>
      </div>

      <div className={styles.meta}>
        <span>{m.demoSmartUnitAutoUnit()}</span>
      </div>

      <fieldset className={styles.toolbar}>
        <legend className="sr-only">{m.demoSmartUnitTemplates()}</legend>
        {presetOrder.map((id) => (
          <button
            key={id}
            className={chipClass(selection === id)}
            type="button"
            aria-pressed={selection === id}
            onClick={() => selectPreset(id)}
          >
            {presetLabels[id]()}
          </button>
        ))}
        <button
          className={chipClass(selection === 'custom')}
          type="button"
          aria-pressed={selection === 'custom'}
          onClick={() => selectPreset('custom')}
        >
          {m.demoSmartUnitPresetCustom()}
        </button>
      </fieldset>

      <code className={styles.code}>
        <span className={styles.codeFn}>new SmartUnit</span>
        <span className={styles.codePunct}>(</span>
        <span className={styles.codePunct}>[</span>
        {units.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 配置片段按位置展示，不参与重排
          <span key={index}>
            {index > 0 && <span className={styles.codePunct}>, </span>}
            {typeof item === 'string' ? (
              <span className={styles.codeString}>{`'${item}'`}</span>
            ) : (
              <span className={styles.codeNumber}>{item}</span>
            )}
          </span>
        ))}
        <span className={styles.codePunct}>])</span>
      </code>

      {selection === 'custom' && (
        <div className={styles.editor}>
          <div className={styles.editorHead}>
            <span>{m.demoSmartUnitEditor()}</span>
            <span className={styles.editorHint}>{m.demoSmartUnitEditorHint()}</span>
          </div>

          {drafts.map((draft, index) => (
            <div className={styles.unitRow} key={draft.id}>
              <input
                className={styles.nameInput}
                value={draft.name}
                placeholder={m.demoSmartUnitNamePlaceholder()}
                aria-label={m.demoSmartUnitNameAria()}
                onChange={(event) => updateDraft(index, { name: event.target.value })}
              />
              {index < drafts.length - 1 ? (
                <label className={styles.ratioField}>
                  <span className={styles.ratioX} aria-hidden="true">
                    ×
                  </span>
                  <input
                    className={styles.ratioInput}
                    value={draft.ratio}
                    placeholder="1"
                    inputMode="decimal"
                    aria-label={m.demoSmartUnitRatioAria()}
                    onChange={(event) => updateDraft(index, { ratio: event.target.value })}
                  />
                </label>
              ) : (
                <span className={styles.ratioSpacer} aria-hidden="true" />
              )}
              <button
                className={styles.remove}
                type="button"
                aria-label={`${m.demoSmartUnitRemoveUnit()} ${draft.name || index + 1}`}
                disabled={drafts.length === 1}
                onClick={() => removeUnit(index)}
              >
                −
              </button>
            </div>
          ))}

          <button
            className={styles.addUnit}
            type="button"
            disabled={drafts.length >= maxUnits}
            onClick={addUnit}
          >
            + {m.demoSmartUnitAddUnit()}
          </button>
        </div>
      )}
    </div>
  )
}

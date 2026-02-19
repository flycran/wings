// 预设颜色
export type Color = 'primary' | 'success' | 'warning' | 'danger' | 'text'

export const presetColors: Color[] = ['primary', 'success', 'warning', 'danger', 'text']

export const getPresetColor = (color?: Color | string) => {
  switch (color) {
    case 'primary':
      return 'var(--color-primary)'
    case 'success':
      return 'var(--color-success)'
    case 'warning':
      return 'var(--color-warning)'
    case 'danger':
      return 'var(--color-danger)'
    case 'text':
      return 'var(--color-fore)'
  }
  return color
}
// 变体
export type Variants = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text'

export const variants: Variants[] = ['solid', 'outlined', 'dashed', 'filled', 'text']

export const getVariants = (variants: Variants = 'solid') => {
  switch (variants) {
    case 'solid':
      return 'vt-solid'
    case 'outlined':
      return 'vt-outlined'
    case 'dashed':
      return 'vt-dashed'
    case 'filled':
      return 'vt-filled'
    case 'text':
      return 'vt-text'
  }
}
// 尺寸
export type Size = 'large' | 'default' | 'small' | 'responsive'

export const sizes: Size[] = ['small', 'default', 'large']

export const getSize = (size: Size = 'default') => {
  switch (size) {
    case 'large':
      return 'size-large'
    case 'default':
      return 'size-default'
    case 'small':
      return 'size-small'
    case 'responsive':
      return 'size-responsive'
  }
}
// 形状
export type Shape = 'default' | 'circle' | 'round'

export const shapes: Shape[] = ['default', 'circle', 'round']

export const getShape = (shape: Shape = 'default') => {
  switch (shape) {
    case 'default':
      return 'shape-default'
    case 'circle':
      return 'shape-circle'
    case 'round':
      return 'shape-round'
  }
}

export const cva = <T extends { [x: string]: string }>(
  clas: { [K in keyof T]: { [L in T[K]]: string } },
  apply: T
) => {
  const cs: string[] = []
  for (const clasKey in clas) {
    for (const vKey in clas[clasKey]) {
      const p = apply[clasKey] as string
      if (vKey === p) {
        cs.push(clas[clasKey][vKey])
        break
      }
    }
  }
  return cs.join(' ')
}

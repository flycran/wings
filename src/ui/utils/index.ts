// 预设颜色
export type Color = 'primary' | 'success' | 'warning' | 'danger'

export const presetColors: Color[] = ['primary', 'success', 'warning', 'danger']

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
export type Size = 'large' | 'default' | 'small'

export const sizes: Size[] = ['small', 'default', 'large']

export const getSize = (size: Size = 'default') => {
  switch (size) {
    case 'large':
      return 'size-large'
    case 'default':
      return 'size-default'
    case 'small':
      return 'size-small'
  }
}

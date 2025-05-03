import AutoUnit from 'auto-unit'

export const countUnit = new AutoUnit(['', 'k', 'M', 'G', 'T'], {
  baseDigit: 1000,
  decimal: '-2',
})

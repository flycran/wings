import { create } from 'storybook/theming'

/**
 * Wings 项目浅色主题
 * 配色与项目 globals.css 保持一致
 */
export const lightTheme = create({
  base: 'light',

  // 品牌标识
  brandTitle: 'Wings Design System',
  brandUrl: '/',
  brandImage: '/favicon.svg',
  brandTarget: '_self',

  // 主色调 - 使用项目 crane 系列颜色
  colorPrimary: '#00abff', // crane-blue
  colorSecondary: '#ffb22f', // crane-orange

  // UI 颜色 - 与项目背景/文字色保持一致
  appBg: '#fdfcf8', // back
  appContentBg: '#fdfcf8', // back
  appPreviewBg: '#fdfcf8', // back
  appBorderColor: '#e4e4e7', // zinc-200
  appBorderRadius: 8,

  // 字体颜色
  textColor: '#29292b', // fore
  textInverseColor: '#eeeeef', // fore-dark
  textMutedColor: '#71717a', // zinc-500

  // 工具栏
  barTextColor: '#29292b', // fore
  barSelectedColor: '#00abff', // crane-blue
  barHoverColor: '#21d486', // crane-green
  barBg: '#f3f2f1', // popover

  // 输入控件
  inputBg: '#ffffff',
  inputBorder: '#d4d4d8', // zinc-300
  inputTextColor: '#29292b', // fore
  inputBorderRadius: 6,
})

/**
 * Wings 项目深色主题
 * 配色与项目 globals.css dark 模式保持一致
 */
export const darkTheme = create({
  base: 'dark',

  // 品牌标识
  brandTitle: 'Wings Design System',
  brandUrl: '/',
  brandImage: '/favicon.svg',
  brandTarget: '_self',

  // 主色调 - 使用项目 crane 系列颜色（深色模式下保持鲜艳）
  colorPrimary: '#00abff', // crane-blue
  colorSecondary: '#ffb22f', // crane-orange

  // UI 颜色 - 与项目深色背景/文字色保持一致
  appBg: '#1f2020', // back-dark
  appContentBg: '#1f2020', // back-dark
  appPreviewBg: '#1f2020', // back-dark
  appBorderColor: '#3f3f46', // zinc-700
  appBorderRadius: 8,

  // 字体颜色
  textColor: '#eeeeef', // fore-dark
  textInverseColor: '#29292b', // fore
  textMutedColor: '#a1a1aa', // zinc-400

  // 工具栏
  barTextColor: '#eeeeef', // fore-dark
  barSelectedColor: '#00abff', // crane-blue
  barHoverColor: '#21d486', // crane-green
  barBg: '#232222', // popover-dark

  // 输入控件
  inputBg: '#27272a', // zinc-800
  inputBorder: '#52525b', // zinc-600
  inputTextColor: '#eeeeef', // fore-dark
  inputBorderRadius: 6,
})

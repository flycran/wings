import { atom } from 'jotai'

export type ThemeMode = 'light' | 'dark' | 'system'

export type Theme = Exclude<ThemeMode, 'system'>

export const themeAtom = atom<ThemeMode>('system')

// 打开登录弹窗
export const openLoginAtom = atom<boolean>(false)

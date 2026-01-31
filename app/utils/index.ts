import { CSSProperties } from 'react'
import { resolvePath } from 'react-router'

/**
 * 将数组按照指定大小拆分为多个块的生成器
 * @param arr 待拆分的数组
 * @param n 每个块的大小
 */
export function* chunkGenerator<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

/**
 * 将对象转换为 React CSSProperties 中的自定义变量格式
 * 会将 camelCase 转换为 --kebab-case
 * @param vars 包含 CSS 变量名和值的对象
 * @returns 格式化后的 CSSProperties 对象
 */
export const customVar = (vars: { [k: string]: string | number | undefined }) => {
  return Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [
      `--${k.replace(/[A-Z]/g, (a) => `-${a.toLowerCase()}`)}`,
      v,
    ])
  ) as CSSProperties
}

export type FlattenNode<T> = Omit<T, 'children'>

/**
 * 递归扁平化树形结构
 * @param tree 树形数据数组
 * @returns 扁平化后的节点数组（不包含 children 属性）
 */
export const flattening = <T extends { children?: T[] }>(tree: T[]): FlattenNode<T>[] => {
  const result: T[] = []

  function traverse(nodes: T[]) {
    for (const node of nodes) {
      const { children, ...rest } = node
      result.push(rest as T)

      if (children) {
        traverse(children)
      }
    }
  }

  traverse(tree)
  return result
}

/**
 * 从对象中排除指定的键
 * @param obj 目标对象
 * @param keys 要排除的键列表
 * @returns 排除指定键后的新对象
 */
export function omitKeys<T extends object>(obj: T): T
export function omitKeys<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K>
export function omitKeys<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

/**
 * 获取相对于当前页面位置的绝对 URL
 * @param to 目标路径或相对路径
 * @returns 完整的绝对 URL 字符串
 */
export const getAbsoluteUrl = (to: string) => {
  const url = new URL(window.location.href)
  const path = resolvePath(to)
  url.pathname = path.pathname
  url.search = path.search
  url.hash = path.hash
  return url.toString()
}

/**
 * 获取图片URL
 * @param fileName 文件名
 * @returns 文章封面图片的 URL
 */
export const getImageUrl = (fileName: string) => {
  return `${import.meta.env.SUPABASE_URL}/storage/v1/object/public/${fileName}`
}

import { CSSProperties } from 'react'

export function* chunkGenerator<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

export const customVar = (vars: { [k: string]: string | number | undefined }) => {
  return Object.fromEntries(
    Object.entries(vars).map(([k, v]) => [
      `--${k.replace(/[A-Z]/g, (a) => `-${a.toLowerCase()}`)}`,
      v,
    ])
  ) as CSSProperties
}

export type FlattenNode<T> = Omit<T, 'children'>

export const flattening = <T extends { children?: T[] }>(tree: T[]): FlattenNode<T>[] => {
  const result: T[] = []

  function traverse(nodes: T[]) {
    for (const node of nodes) {
      const { children, ...rest } = node
      result.push(rest as T)

      if (node.children) {
        traverse(node.children)
      }
    }
  }

  traverse(tree)
  return result
}

export function omitKeys<T extends object>(obj: T): T
export function omitKeys<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K>
export function omitKeys<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

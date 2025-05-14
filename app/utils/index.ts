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

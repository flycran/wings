import { nanoid } from 'nanoid'
import { useMemo } from 'react'

export const useKey = () => {
  return useMemo(() => nanoid(6), [])
}

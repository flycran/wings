import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export type useSearchResult<R> = [R, (p?: R) => void]

/**
 * 同步查询参数
 * @param key 参数名
 */
export function useSearch(key: string): useSearchResult<string | undefined>
/**
 * 同步查询参数
 * @param key 参数名
 * @param initialValue 初始值
 */
export function useSearch(key: string, initialValue: string): useSearchResult<string>
export function useSearch(key: string, initialValue?: string) {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const value = query.get(key) || undefined
    setSearch(value === undefined ? initialValue : value)
  }, [location])

  return [
    search,
    (p: string | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(location.search)
      p === undefined ? query.delete(key) : query.set(key, p.toString())
      navigate(`?${query}`, { replace: true })
    },
  ]
}

/**
 * 同步查询参数
 * @param key 参数名
 */
export function useSearchNumber(key: string): useSearchResult<number | undefined>
/**
 * 同步查询参数
 * @param key 参数名
 * @param initialValue 初始值
 */
export function useSearchNumber(key: string, initialValue: number): useSearchResult<number>
export function useSearchNumber(key: string, initialValue?: number) {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const value = query.get(key) || undefined
    setSearch(value === undefined ? initialValue : Number(value))
  }, [location])

  return [
    search,
    (p: number | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(location.search)
      p === undefined ? query.delete(key) : query.set(key, p.toString())
      navigate(`?${query}`, { replace: true })
    },
  ]
}

/**
 * 同步查询参数
 * @param key 参数名
 */
export function useSearchBoolean(key: string): useSearchResult<boolean | undefined>
/**
 * 同步查询参数
 * @param key 参数名
 * @param initialValue 初始值
 */
export function useSearchBoolean(key: string, initialValue: boolean): useSearchResult<boolean>
export function useSearchBoolean(key: string, initialValue?: boolean) {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const value = query.has(key)
    setSearch(value === undefined ? initialValue : value)
  }, [location])

  return [
    search,
    (p: boolean | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(location.search)
      p ? query.delete(key) : query.set(key, 'true')
      navigate(`?${query}`, { replace: true })
    },
  ]
}

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const value = searchParams.get(key) || undefined
    setSearch(value === undefined ? initialValue : value)
  }, [searchParams, key, initialValue])

  return [
    search,
    (p: string | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(searchParams.toString())
      p === undefined ? query.delete(key) : query.set(key, p.toString())
      router.replace(`?${query.toString()}`)
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const value = searchParams.get(key) || undefined
    setSearch(value === undefined ? initialValue : Number(value))
  }, [searchParams, key, initialValue])

  return [
    search,
    (p: number | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(searchParams.toString())
      p === undefined ? query.delete(key) : query.set(key, p.toString())
      router.replace(`?${query.toString()}`)
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const value = searchParams.has(key)
    setSearch(value === undefined ? initialValue : value)
  }, [searchParams, key, initialValue])

  return [
    search,
    (p: boolean | undefined) => {
      setSearch(p)
      const query = new URLSearchParams(searchParams.toString())
      p ? query.delete(key) : query.set(key, 'true')
      router.replace(`?${query.toString()}`)
    },
  ]
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}

import { useEffect } from 'react'

interface LockScrollOptions {
  element?: HTMLElement | null
  locked?: boolean
}

export function useLockScroll({ element = document.body, locked = true }: LockScrollOptions = {}) {
  useEffect(() => {
    if (!element || !locked) return

    // 1. 计算滚动条宽度（仅需一次）
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // 2. 记录原始样式（用于恢复）
    const originalOverflow = element.style.overflow
    const originalPaddingRight = element.style.paddingRight

    // 3. 应用锁定样式
    element.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      element.style.paddingRight = `${scrollbarWidth}px`
    }

    // 4. 清理函数
    return () => {
      element.style.overflow = originalOverflow
      element.style.paddingRight = originalPaddingRight
    }
  }, [element, locked])
}

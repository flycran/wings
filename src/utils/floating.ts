import { FloatingContext } from '@floating-ui/react'
import { CSSProperties } from 'react'

type ReX = 'left' | 'right'
type ReY = 'top' | 'bottom'

export type Relatively = `${ReX}-${ReY}`
// 获取最近的定位元素
const getPositioningParent = (element: HTMLElement) => {
  let curele: Element | null = element
  while (curele) {
    if (curele instanceof HTMLElement) {
      curele = curele.offsetParent
      if (!curele) break
    } else {
      break
    }
    // 这些元素可能影响判断，使用getComputedStyle再此确认是否定位
    if (/^TABLE|TD|TH|BODY$/.test(curele.tagName)) {
      const position = window.getComputedStyle(curele).position
      if (position !== 'static') {
        return curele
      }
    }
  }
  return document.documentElement
}

type FloatingStyles = Pick<
  CSSProperties,
  'left' | 'right' | 'top' | 'bottom' | 'transform' | 'transformOrigin' | 'position'
>
// 更改定位的方向
export const relatively = (option: Relatively, context: FloatingContext, transform = true) => {
  const [rx, ry] = option.split('-')
  const {
    x,
    y,
    elements: { floating },
    floatingStyles,
  } = context
  if (!floating) return floatingStyles
  const fele =
    floatingStyles.position === 'fixed' ? document.documentElement : getPositioningParent(floating)
  if (transform) {
    const style: FloatingStyles = {
      position: floatingStyles.position,
    }
    const translate: { x: number; y: number } = { x: 0, y: 0 }
    if (rx === 'left') {
      style.left = 0
      translate.x = x
    } else if (rx === 'right') {
      style.right = 0
      translate.x = -(fele.clientWidth - x - floating.clientWidth)
    }
    if (ry === 'top') {
      style.top = 0
      translate.y = y
    } else if (ry === 'bottom') {
      style.bottom = 0
      console.log(y, fele.clientHeight, floating.clientHeight)
      translate.y = -(fele.clientHeight - y - floating.clientHeight)
    }

    return {
      ...style,
      transform: `translate(${translate.x}px,${translate.y}px)`,
      // transformOrigin: `${rx} ${ry}`,
    }
  }
  const style: FloatingStyles = {
    position: floatingStyles.position,
  }
  if (rx === 'left') {
    style.left = floatingStyles.left
  } else if (rx === 'right') {
    style.right = `${fele.scrollWidth - x}px`
  }
  if (ry === 'top') {
    style.top = floatingStyles.top
  } else if (ry === 'bottom') {
    style.bottom = `${fele.scrollHeight - y}px`
  }

  return {
    ...style,
  }
}

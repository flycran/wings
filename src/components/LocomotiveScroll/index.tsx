import type Locomotive from 'locomotive-scroll'
import { useEffect } from 'react'

export default function LocomotiveScroll() {
  useEffect(() => {
    let scroll: Locomotive
    ;(async () => {
      const { default: Locomotive } = await import('locomotive-scroll')
      scroll = new Locomotive({
        smooth: true,
        lerp: 0.2,
      })
    })()
    return () => {
      scroll.destroy()
    }
  }, [])
  return null
}

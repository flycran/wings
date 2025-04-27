'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

export default function GsapDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '200%',
      },
    })

    gsap.from('.a1', {
      clipPath: 'inset(100% 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: `.a1`,
        scrub: true,
        start: 'top top',
        end: '+=100%',
        markers: true
      },
    })
    gsap.from('.a2', {
      clipPath: 'inset(100% 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: `.a2`,
        scrub: true,
        start: '100% top',
        end: '+=100%',
        markers: true
      },
    })
  })
  return (
    <div>
      <div className="h-100" />
      <div ref={containerRef} className="relative h-screen">
        <div className="absolute h-screen top-0 w-1/3">
          <div className="absolute top-0 h-full w-full bg-emerald-400"></div>
          <div className="a1 absolute top-0 h-full w-full bg-amber-400"></div>
          <div className="a2 absolute top-0 h-full w-full bg-fuchsia-400"></div>
        </div>
      </div>
      <div className="h-100" />
      {/*参照元素*/}
      <div className="absolute h-screen top-100 right-0 w-1/3">
        <div className="h-full w-full bg-emerald-400"></div>
        <div className="h-full w-full bg-amber-400"></div>
        <div className="h-full w-full bg-fuchsia-400"></div>
      </div>
    </div>
  )
}

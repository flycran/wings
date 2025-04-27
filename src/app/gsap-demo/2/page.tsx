'use client'
import p1 from '@/assets/iqooneo7-color-img1-md.png'
import p2 from '@/assets/iqooneo7-color-img2-md.png'
import p3 from '@/assets/iqooneo7-color-img3-md.png'
import { useGSAP } from '@gsap/react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

export default function Home() {
  const mate = [
    {
      src: p1,
      color: '#ffeee8',
    },
    {
      src: p2,
      color: '#effbfc',
    },
    {
      src: p3,
      color: '#dae1e7',
    },
  ]

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

    gsap.from('.s1', {
      x: 200,
      scale: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: '-400px top',
        end: 'top top',
        markers: true,
        scrub: true,
      },
    })

    mate.slice(1).forEach((_, i) => {
      const start = `${i * 100}% top`,
        end = `+=100%`

      gsap.from(`.p${i + 1}`, {
        clipPath: 'inset(100% 0 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: `.p${i + 1}`,
          scrub: true,
          start,
          end,
        },
      })

      gsap.from(`.b${i + 1}`, {
        clipPath: 'inset(100% 0 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: `.b${i + 1}`,
          scrub: true,
          start,
          end,
        },
      })
    })
  })

  return (
    <div className="relative">
      <div className="h-100" />
      <div ref={containerRef} className="relative h-screen w-full">
        <div className="absolute top-0 h-screen w-1/2">
          {mate.map((e, i) => (
            <div className="absolute top-0 h-screen w-full" key={i}>
              <div className={classNames('h-screen w-full', `b${i}`)} style={{ backgroundColor: e.color }}></div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 h-screen w-80 -translate-x-1/2">
          {mate.map((e, i) => (
            <div key={i} className={classNames(`p${i} absolute top-0 flex h-screen w-full items-center`)}>
              <div>
                <Image className="s1" src={e.src} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-100" />
    </div>
  )
}

'use client'
import { GridViewData, HomeData } from '@/server/home'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import NoData from '../../../components/NoData'

interface PaginationProps {
  index: number
  list: GridViewData[]
  onChange?: (index: number) => void
  enableAutoplay?: boolean
  autoplayDelay: number
  size?: number
  lineWidth?: number
}

const Pagination = ({
  index,
  list,
  onChange,
  enableAutoplay,
  autoplayDelay,
  size = 24,
  lineWidth = 2,
}: PaginationProps) => {
  const centerDot = size / 2
  const ringRadius = (size - lineWidth) / 2
  /*
   * 初始化完成
   * DOM挂载后再更新stroke-dashoffset让transition生效，否则首次渲染时stroke-dashoffset没有过渡动画
   */
  const [inited, setInited] = useState(false)

  useEffect(() => {
    setInited(true)
  }, [])

  return (
    <div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-1 flex h-10 min-w-10 gap-2 rounded-full bg-gray-800/50 p-2">
      {list.map(({ color }, i) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          key={i}
          className="aspect-square w-7 cursor-pointer text-crane-orange"
          onClick={() => onChange?.(i)}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            color: color,
          }}
        >
          <circle
            cx={centerDot}
            cy={centerDot}
            fill="currentColor"
            r={size / 4}
            className="duration-200"
            style={{
              fill: i === index ? 'currentColor' : 'white',
            }}
          />
          <circle
            className="-rotate-90 origin-center fill-none stroke-2 ease-linear"
            strokeLinecap="round"
            stroke="currentColor"
            style={{
              strokeDasharray: `calc(${ringRadius}px * 2 * 3.14) calc(${ringRadius}px * 2 * 3.14)`,
              transitionProperty: 'stroke-dashoffset',
              transitionDuration: index === i && enableAutoplay ? `${autoplayDelay}ms` : '',
              strokeDashoffset:
                inited && index === i && enableAutoplay
                  ? '0px'
                  : `calc(${ringRadius}px * 2 * 3.14)`,
            }}
            cx={centerDot}
            cy={centerDot}
            r={ringRadius}
          />
        </svg>
      ))}
    </div>
  )
}

const SwiperView = ({ carousels }: { carousels: GridViewData[] }) => {
  const swiperRef = useRef<SwiperRef>(null)
  const [realIndex, setRealIndex] = useState(0)
  const [enableAutoplay, setEnableAutoplay] = useState(true)
  const autoplayDelay = 5000

  return (
    <div
      className="overflow-hidden rounded-xl bg-skeleton shadow"
      style={{
        gridArea: '1 / 2 / 3 / 3',
      }}
    >
      <div
        className="h-full w-full"
        onMouseEnter={() => {
          swiperRef.current?.swiper.autoplay.stop()
          setEnableAutoplay(false)
        }}
        onMouseLeave={() => {
          swiperRef.current?.swiper.autoplay.start()
          setEnableAutoplay(true)
        }}
      >
        <Swiper
          ref={swiperRef}
          className="relative h-full w-full"
          loop={carousels.length > 1}
          autoplay={
            carousels.length > 1 && {
              delay: autoplayDelay,
              waitForTransition: false,
            }
          }
          speed={800}
          touchRatio={0.8}
          modules={[Autoplay]}
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
          onAutoplayPause={() => setEnableAutoplay(false)}
          onAutoplayResume={() => setEnableAutoplay(true)}
        >
          {carousels.length ? (
            carousels.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item.href} className="relative inline-block h-full w-full bg-skeleton">
                  <Image fill src={item.cover} alt={item.title} className="object-cover" />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <NoData />
            </SwiperSlide>
          )}
          {carousels.length > 1 && (
            <Pagination
              index={realIndex}
              list={carousels}
              enableAutoplay={enableAutoplay}
              autoplayDelay={autoplayDelay}
              onChange={(index) => swiperRef.current?.swiper.slideToLoop(index)}
            />
          )}
        </Swiper>
      </div>
    </div>
  )
}

const FixedView = ({ fixeds }: { fixeds: GridViewData[] }) => {
  return (
    <>
      <div
        className="overflow-hidden rounded-xl bg-skeleton shadow"
        style={{
          gridArea: '1 / 1 / 2 / 2',
        }}
      >
        {fixeds[0] ? (
          <Link href={fixeds[0].href} className="relative inline-block h-full w-full">
            <Image src={fixeds[0].cover} alt={fixeds[0].title} fill className="object-cover" />
          </Link>
        ) : (
          <NoData />
        )}
      </div>
      <div
        className="overflow-hidden rounded-xl bg-skeleton shadow"
        style={{
          gridArea: '2 / 1 / 3 / 2',
        }}
      >
        {fixeds[1] ? (
          <Link href={fixeds[0].href} className="relative inline-block h-full w-full">
            <Image src={fixeds[1].cover} alt={fixeds[1].title} fill className="object-cover" />
          </Link>
        ) : (
          <NoData />
        )}
      </div>
    </>
  )
}

export default function HomeGridShow({ data }: { data: Pick<HomeData, 'carousels' | 'fixeds'> }) {
  return (
    <div className="grid aspect-[10/4] grid-cols-[2fr_5fr] grid-rows-2 gap-3">
      <SwiperView carousels={data.carousels} />
      <FixedView fixeds={data.fixeds} />
    </div>
  )
}

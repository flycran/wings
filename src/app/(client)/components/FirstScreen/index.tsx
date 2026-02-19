'use client'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { ReactNode, useEffect, useRef } from 'react'
import { Platform, PlatformMate } from '~/app/(client)/components/Platform'
import Description from '~/components/Description'
import MotionDiv from '~/components/motion/MotionDiv'
import NumberAnimation from '~/components/NumberAnimation'
import Bilibili from '~/icons/Bilibili'
import Csdn from '~/icons/Csdn'
import Github from '~/icons/Github'
import Juejin from '~/icons/Juejin'
import WebWin from './WebWin'
import HomeCrane from '../HomeCrane'
import HomeTitle from '../HomeTitle'
import WheelNext from '../WheelNext'
import { HomeData } from '~/server/home'
import { countUnit } from '~/utils/unit'

export default function FirstScreen({
  data,
}: {
  data: Pick<HomeData, 'platforms' | 'visitCount'>
}) {
  const {
    platforms: { juejin, github },
  } = data

  const platformList: PlatformMate[] = [
    {
      key: 'juejin',
      name: juejin?.username,
      href: juejin?.href,
      icon: <Juejin />,
      description: juejin && (
        <Description
          items={[
            {
              label: '粉丝',
              value: countUnit.format(juejin.followerCount),
            },
            {
              label: '点赞数',
              value: countUnit.format(juejin.diggCount),
            },
            {
              label: '查看数',
              value: countUnit.format(juejin.viewCount),
            },
            {
              label: '文章数',
              value: juejin.articleCount,
            },
          ]}
        />
      ),
    },
    {
      key: 'github',
      name: github?.name,
      href: github?.href,
      icon: <Github />,
      description: github && (
        <Description
          items={[
            {
              label: '粉丝',
              value: countUnit.format(github.followers),
            },
            {
              label: '关注',
              value: countUnit.format(github.following),
            },
            {
              label: '代码段',
              value: github.gists,
            },
            {
              label: '仓库',
              value: github.repos,
            },
          ]}
        />
      ),
    },
    {
      key: 'csdn',
      name: '',
      href: '',
      icon: <Csdn />,
    },
    {
      key: 'bilibili',
      name: '',
      href: '',
      icon: <Bilibili />,
    },
  ]

  return (
    <>
      <div className="-z-2 absolute top-0 left-0 h-screen w-full">
        {/* 背景圆形图案 */}
        <MotionConfig
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6,
          }}
        >
          <MotionDiv
            initial={{
              opacity: 0,
              x: -100,
              y: 80,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            className="absolute right-30/100 top-50/100 rounded-full bg-crane-green/5 dark:bg-crane-blue/5 w-60 md:w-100 aspect-square"
          />
          <MotionDiv
            initial={{
              opacity: 0,
              x: 100,
              y: -80,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            className="absolute right-10/100 top-20/100 rounded-full bg-crane-blue/8 dark:bg-crane-orange/5 w-80 md:w-150 aspect-square"
          />
        </MotionConfig>
      </div>
      <div className="relative flex md:min-h-screen pt-32 md:pt-0 gap-4 flex-col justify-evenly">
        {/* 标题 */}
        <HomeTitle />
        <div className="flex md:justify-between justify-center">
          <WebWin className="lg:-translate-x-30 lg:-translate-y-20 lg:w-110 md:w-90" />
          <HomeCrane className="w-80 lg:w-120" />
        </div>
        <MotionDiv
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            delay: 0.2,
          }}
          className="md:mb-8 left-0 flex"
        >
          <div
            className="grid grid-cols-4 grid-rows-2 gap-3"
            style={{
              gridTemplateAreas: `"big big juejin github"\n"big big csdn bilibili"`,
            }}
          >
            <div
              style={{
                gridArea: 'big',
              }}
              className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            >
              <div className="font-bold text-2xl text-crane-blue">
                <NumberAnimation
                  value={data.visitCount}
                  delay={2}
                  format={(v) => countUnit.format(v, '-1')}
                />
              </div>
              <div className="h-1" />
              <div className="text-sm ">总访问量</div>
            </div>
            {platformList.map((platform) => (
              <Platform key={platform.key} platform={platform} />
            ))}
          </div>
        </MotionDiv>
        <WheelNext />
      </div>
    </>
  )
}

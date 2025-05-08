'use client'
import { Platform } from '@/app/components/FirstScreen/Platform'
import HomeCrane from '@/app/components/HomeCrane'
import HomeTitle from '@/app/components/HomeTitle'
import WheelNext from '@/app/components/WheelNext'
import Description from '@/components/Description'
import MotionDiv from '@/components/motion/MotionDiv'
import NumberAnimation from '@/components/NumberAnimation'
import Bilibili from '@/icons/Bilibili'
import Csdn from '@/icons/Csdn'
import Github from '@/icons/Github'
import Juejin from '@/icons/Juejin'
import { HomeData } from '@/server/home'
import { countUnit } from '@/utils/unit'
import { ReactNode } from 'react'

export interface PlatformMate {
  key: string
  name: string | undefined
  href: string | undefined
  icon: ReactNode
  description?: ReactNode
}

export default function FirstScreen({
  data,
}: { data: Pick<HomeData, 'platforms' | 'visitCount'> }) {
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
      <div className="-z-2 absolute top-0 left-0 h-screen w-full overflow-hidden">
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
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6,
          }}
          className="absolute right-30/100 top-50/100 rounded-full bg-crane-green/5 dark:bg-crane-blue/5 w-100 aspect-square"
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
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6,
          }}
          className="absolute right-10/100 top-20/100 rounded-full bg-crane-blue/8 dark:bg-crane-orange/5 w-150 aspect-square"
        />
      </div>
      <div className="relative flex min-h-screen flex-col justify-evenly">
        <HomeTitle />
        <div className="flex justify-between">
          <div />
          <HomeCrane />
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
          className="absolute bottom-8 left-4"
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
                  delay={3}
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

import { AnimatePresence, MotionConfig } from 'motion/react'
import { ReactNode } from 'react'
import { GoLink } from 'react-icons/go'
import { Link } from 'react-router'
import Description from '~/components/Description'
import MotionDiv from '~/components/motion/MotionDiv'
import NumberAnimation from '~/components/NumberAnimation'
import { useDelayActive } from '~/hooks/delayOpen'
import Bilibili from '~/icons/Bilibili'
import Csdn from '~/icons/Csdn'
import Github from '~/icons/Github'
import Juejin from '~/icons/Juejin'
import WebWin from '~/routes/_client._index/components/FirstScreen/WebWin'
import HomeCrane from '~/routes/_client._index/components/HomeCrane'
import HomeTitle from '~/routes/_client._index/components/HomeTitle'
import WheelNext from '~/routes/_client._index/components/WheelNext'
import { HomeData } from '~/server/home'
import { countUnit } from '~/utils/unit'

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
            className="absolute right-10/100 top-20/100 rounded-full bg-crane-blue/8 dark:bg-crane-orange/5 w-150 aspect-square"
          />
        </MotionConfig>
      </div>
      <div className="relative flex min-h-screen flex-col justify-evenly">
        <HomeTitle />
        <div className="flex justify-between">
          <div />
          <HomeCrane />
          <WebWin />
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
          className="absolute bottom-8 left-0"
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

export interface PlatformProps {
  platform: PlatformMate
}

// 社交平台
export function Platform({ platform }: PlatformProps) {
  const { active, enter, leave } = useDelayActive(500)
  const icon = (
    <div className="cursor-pointer inline-flex text-2xl aspect-square w-10 items-center justify-center">
      {platform.icon}
    </div>
  )

  return (
    <div
      className="relative aspect-square w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
      style={{
        gridArea: platform.key,
      }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {platform.href ? (
        <Link target="_blank" to={platform.href}>
          {icon}
        </Link>
      ) : (
        <div className="inline-flex h-full w-full items-center justify-center">{icon}</div>
      )}
      <AnimatePresence>
        {active && (
          <MotionDiv
            initial={{
              width: '2.5rem',
              height: '2.5rem',
              boxShadow: 'none',
            }}
            animate={{
              width: 'auto',
              height: 'auto',
              boxShadow: '',
            }}
            exit={{
              width: '2.5rem',
              height: '2.5rem',
              boxShadow: 'none',
            }}
            className="absolute bottom-0 left-0 bg-zinc-100 z-10 dark:bg-zinc-800 shadow-card rounded-2xl flex items-end overflow-hidden"
          >
            <div className="shrink-0 min-w-max">
              {platform.description && <div className="p-2 pb-0">{platform.description}</div>}
              <div className="flex mr-4 items-center">
                {icon}
                <div className="text-center flex-1">
                  {platform.href ? (
                    <Link
                      target="_blank"
                      className="inline-flex items-center font-bold hover:underline"
                      to={platform.href}
                    >
                      {platform.name}
                      <GoLink />
                    </Link>
                  ) : (
                    <div className="text-sm">暂时没有数据</div>
                  )}
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

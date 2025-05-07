import HomeCrane from '@/app/components/HomeCrane'
import HomeGridShow from '@/app/components/HomeGridShow'
import HomeTitle from '@/app/components/HomeTitle'
import WheelNext from '@/app/components/WheelNext'
import Description from '@/components/Description'
import ExteLink from '@/components/ExteLink'
import Popover from '@/components/Popover'
import Bilibili from '@/icons/Bilibili'
import Csdn from '@/icons/Csdn'
import Github from '@/icons/Github'
import Juejin from '@/icons/Juejin'
import { getHomeData } from '@/server/home'
import { countUnit } from '@/utils/unit'
import Link from 'next/link'

export default async function Home() {
  const homeData = await getHomeData()

  const {
    platforms: { juejin, github },
  } = homeData

  const platformList = [
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
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
      <div className="-z-2 absolute top-0 left-0 h-screen w-full overflow-hidden">
        <div className="absolute right-30/100 top-50/100 rounded-full bg-crane-green/5 dark:bg-crane-blue/5 w-100 aspect-square" />
        <div className="absolute right-10/100 top-20/100 rounded-full bg-crane-blue/5 dark:bg-crane-orange/5 w-150 aspect-square" />
      </div>
      <div className="relative flex min-h-screen flex-col justify-evenly">
        <HomeTitle />
        <div className="flex justify-between">
          <div />
          <HomeCrane />
        </div>

        <div className="absolute bottom-8 left-4">
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
              className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 shadow-card dark:bg-zinc-800"
            >
              <div className="font-bold text-2xl text-crane-blue">{countUnit.format(homeData.visitCount, '-1')}</div>
              <div className="h-1" />
              <div className="text-sm ">总访问量</div>
            </div>
            {platformList.map((platform) => (
              <Popover
                key={platform.key}
                placement="top-start"
                panel={
                  <div className="w-60 p-4">
                    {platform.href ? (
                      <>
                        <div className="pb-2 text-center font-bold">
                          <ExteLink href={platform.href}>{platform.name}</ExteLink>
                        </div>
                        {platform.description}
                      </>
                    ) : (
                      <div className="text-sm">暂时没有数据</div>
                    )}
                  </div>
                }
                delay={500}
              >
                <div
                  className="aspect-square w-10 rounded-2xl bg-zinc-100 text-2xl shadow-card dark:bg-zinc-800"
                  style={{
                    gridArea: platform.key,
                  }}
                >
                  {platform.href ? (
                    <Link
                      className="inline-flex h-full w-full items-center justify-center"
                      target="_blank"
                      href={platform.href}
                    >
                      {platform.icon}
                    </Link>
                  ) : (
                    <div className="inline-flex h-full w-full items-center justify-center">{platform.icon}</div>
                  )}
                </div>
              </Popover>
            ))}
          </div>
        </div>
        <WheelNext />
      </div>
      <div className="py-4">
        <HomeGridShow data={homeData} />
      </div>
    </div>
  )
}

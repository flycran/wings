import HomeCrane from '@/app/components/HomeCrane'
import HomeGridShow from '@/app/components/HomeGridShow'
import HomeTitle from '@/app/components/HomeTitle'
import WheelNext from '@/app/components/WheelNext'
import Description from '@/components/Description'
import ExteLink from '@/components/ExteLink'
import Popover from '@/components/Popover'
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

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
      <div className="relative flex min-h-screen flex-col justify-evenly">
        <HomeTitle />
        <div className="flex justify-between">
          <div className="flex flex-col justify-end">
            {/*<div className="flex h-30 w-40 flex-col justify-between rounded-xl bg-white p-5 shadow-md dark:bg-neutral-800">*/}
            {/*  <div className="text-crane-blue text-4xl font-bold">9578</div>*/}
            {/*  <div className="text-lg text-gray-600 dark:text-zinc-200">总访问量</div>*/}
            {/*</div>*/}
            <div>
              <div className="flex gap-3">
                {juejin && (
                  <Popover
                    placement="top-start"
                    panel={
                      <div className="w-60 p-4">
                        <div className="pb-2 text-center font-bold">
                          <ExteLink href={juejin.href}>{juejin.username}</ExteLink>
                        </div>
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
                      </div>
                    }
                    delay={500}
                  >
                    <Link
                      className="flex aspect-square h-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                      target="_blank"
                      href={juejin?.href}
                    >
                      <Juejin className="text-2xl" />
                    </Link>
                  </Popover>
                )}
                {github && (
                  <Popover
                    placement="top-start"
                    delay={500}
                    panel={
                      <div className="w-60 p-4">
                        <div className="pb-2 text-center font-bold">{github.name}</div>
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
                      </div>
                    }
                  >
                    <Link
                      className="flex aspect-square h-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                      target="_blank"
                      href={github?.href}
                    >
                      <Github className="text-2xl" />
                    </Link>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <HomeCrane />
        </div>
        <WheelNext />
      </div>
      <div className="py-4">
        <HomeGridShow data={homeData} />
      </div>
    </div>
  )
}

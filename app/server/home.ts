import config from '@/config'

export interface HomeData {
  carousels: GridViewData[]
  fixeds: GridViewData[]
  platforms: {
    juejin: {
      href: string
      username: string
      description: string
      // 粉丝
      followerCount: number
      // 访问量
      viewCount: number
      // 点赞数
      diggCount: number
      // 文章数
      articleCount: number
    } | null
    github: {
      href: string
      name: string
      // 粉丝
      followers: number
      // 关注
      following: number
      // 仓库
      repos: number
      // 码片段
      gists: number
    } | null
  }
  visitCount: number
}

export interface GridViewData {
  title: string
  cover: string
  href: string
  color?: string
}

const getPlatformInfo = {
  async juejin() {
    const [res, res2] = await Promise.all([
      fetch(`https://api.juejin.cn/user_api/v1/user/get?user_id=${config.platforms.juejin_id}`),
      fetch('https://api.juejin.cn/content_api/v1/article/query_list', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          user_id: config.platforms.juejin_id,
          cursor: '0',
          sort_type: 2,
        }),
      }),
    ])
    if (res.status !== 200) {
      console.error(res)
      return null
    }
    if (res2.status !== 200) {
      console.error(res2)
      return null
    }
    const body = await res.json()
    const body2 = await res2.json()
    return {
      href: `https://juejin.cn/user/${config.platforms.juejin_id}`,
      username: body.data.user_name,
      description: body.data.description,
      followerCount: body.data.follower_count,
      viewCount: body.data.got_view_count,
      diggCount: body.data.got_digg_count,
      articleCount: body2.count,
    }
  },
  async github() {
    const res = await fetch(`https://api.github.com/users/${config.platforms.github_username}`)
    if (res.status !== 200) {
      console.error(res)
      return null
    }
    const body = await res.json()
    return {
      href: `https://github.com/${config.platforms.github_username}`,
      name: body.name,
      followers: body.followers,
      following: body.following,
      repos: body.public_repos,
      gists: body.public_gists,
    }
  },
}

export const getHomeData = async (): Promise<HomeData> => {
  const [juejin, github] = await Promise.all([
    getPlatformInfo.juejin().catch(() => null),
    getPlatformInfo.github().catch(() => null),
  ])

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

  const carousels = Array(random(1, 10))
    .fill(null)
    .map((_) => ({
      title: 'Flycran',
      cover: `https://picsum.photos/800/600?random=${random(0, 10000)}`,
      href: '/',
      color: `hsl(${random(0, 360)},${random(50, 100)}%,${random(30, 70)}%)`,
    }))

  return {
    carousels,
    fixeds: [
      {
        title: 'Flycran',
        cover: `https://picsum.photos/800/600?random=${random(0, 10000)}`,
        href: '/',
      },
      {
        title: 'Flycran2',
        cover: `https://picsum.photos/800/600?random=${random(0, 10000)}`,
        href: '/',
      },
    ],
    platforms: {
      juejin,
      github,
    },
    visitCount: 8169001,
  }
}

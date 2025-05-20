import axios, { Axios } from 'axios'
import config from '~/config'

const extRequest = new Axios({
  ...axios.defaults,
  headers: undefined,
  timeout: 5 * 1000,
})

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
      extRequest.get('https://api.juejin.cn/user_api/v1/user/get', {
        params: {
          user_id: config.platforms.juejin_id,
        },
      }),
      extRequest.post('https://api.juejin.cn/content_api/v1/article/query_list', {
        user_id: config.platforms.juejin_id,
        cursor: '0',
        sort_type: 2,
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
    const body = await res.data
    const body2 = await res2.data
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
    const res = await extRequest.get(
      `https://api.github.com/users/${config.platforms.github_username}`
    )
    if (res.status !== 200) {
      console.error(res)
      return null
    }
    const body = await res.data
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
    getPlatformInfo.juejin().catch((e) => {
      console.error(String(e))
      return null
    }),
    getPlatformInfo.github().catch((e) => {
      console.error(String(e))
      return null
    }),
  ])

  const url = 'https://t.alcy.cc/moez'

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

  const carousels = Array(random(3, 10))
    .fill(null)
    .map((_) => ({
      title: 'Flycran',
      cover: `${url}?random=${random(0, 10000)}`,
      href: '/',
      color: `hsl(${random(0, 360)},${random(50, 100)}%,${random(30, 70)}%)`,
    }))

  return {
    carousels,
    fixeds: [
      {
        title: 'Flycran',
        cover: `${url}?random=${random(0, 10000)}`,
        href: '/',
      },
      {
        title: 'Flycran2',
        cover: `${url}?random=${random(0, 10000)}`,
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

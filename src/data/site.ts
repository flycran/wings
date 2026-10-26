import { m } from '@/paraglide/messages'
import type { Project, ProjectEntry, ProjectMeta, WingsProject } from '@/types/site'

/** 项目结构数据；subtitle/summary/role 等文案在 messages，按 projects$<index>* 取 */
const projectMetas: ProjectMeta[] = [
  {
    id: 'smart-unit',
    index: '01',
    title: 'smart-unit',
    year: '2025',
    stack: ['TypeScript', 'Rollup', 'i18n'],
    accent: 'green',
    category: 'OPEN SOURCE',
    href: 'https://github.com/flycran/smart-unit',
    docs: 'https://flycran.github.io/smart-unit/en/',
  },
  {
    id: 'github-gravity',
    index: '02',
    title: 'github-gravity',
    year: '2025',
    stack: ['TypeScript', 'GitHub Actions', 'SVG'],
    accent: 'blue',
    category: 'CREATIVE',
    href: 'https://github.com/flycran/github-gravity',
  },
  {
    id: 'rtk-to-endpoints',
    index: '03',
    title: 'rtk-to-endpoints',
    year: '2025',
    stack: ['TypeScript', 'LSP', 'VS Code'],
    accent: 'orange',
    category: 'DEVELOPER TOOL',
    href: 'https://github.com/flycran/rtk-to-endpoints',
  },
]

const wingsMeta = { id: 'wings' as const, index: '04' }

const profileBase = {
  name: 'FLYCRAN',
  cn: '飞鹤',
  email: 'flycran@163.com',
}

const platformBase = [
  {
    id: 'juejin',
    handle: 'Flycran',
    href: 'https://juejin.cn/user/1737682330585838',
    accent: 'orange',
  },
  {
    id: 'github',
    handle: '@flycran',
    href: 'https://github.com/flycran',
    accent: 'blue',
  },
]

/** 结构化数据（JSON-LD）引用的对外档案链接 */
export const profileSameAs = platformBase.map((platform) => platform.href)

export const profileName = profileBase.name

const colophonYear = '2026'

/** 组装完整站点数据供渲染使用；所有文案在渲染时从 messages 解析，避免模块顶层固化 locale */
export function getSite() {
  const projectCopy = [
    { subtitle: m.projects$0Subtitle(), summary: m.projects$0Summary(), role: m.projects$0Role() },
    { subtitle: m.projects$1Subtitle(), summary: m.projects$1Summary(), role: m.projects$1Role() },
    { subtitle: m.projects$2Subtitle(), summary: m.projects$2Summary(), role: m.projects$2Role() },
  ]

  const projects: ProjectEntry[] = [
    ...projectMetas.map((meta, index): Project => ({ ...meta, ...projectCopy[index] })),
    {
      ...wingsMeta,
      title: m.projects$3Title(),
      description: m.projects$3Description(),
      linkLabel: m.projects$3LinkLabel(),
    },
  ]

  return {
    profile: {
      ...profileBase,
      role: m.profileRole(),
      focus: m.profileFocus(),
      kicker: m.profileKicker(),
      headline: [m.homeHeadlineLine1, m.homeHeadlineLine2],
      intro: m.profileIntro(),
      availability: m.profileAvailability(),
      location: m.profileLocation(),
      links: [
        { label: m.profileLink$0(), href: 'https://github.com/flycran' },
        { label: m.profileLink$1(), href: 'https://juejin.cn/user/1737682330585838' },
      ],
    },
    projects,
    principles: [m.principles$0(), m.principles$1(), m.principles$2(), m.principles$3()],
    now: [
      { label: m.now$0Label(), value: m.now$0Value() },
      { label: m.now$1Label(), value: m.now$1Value() },
      { label: m.now$2Label(), value: m.now$2Value() },
    ],
    platforms: [
      { ...platformBase[0], name: m.platforms$0Name(), description: m.platforms$0Description() },
      { ...platformBase[1], name: m.platforms$1Name(), description: m.platforms$1Description() },
    ],
    colophon: { note: m.colophonNote(), builtWith: m.colophonBuiltWith(), year: colophonYear },
  }
}

export const isWingsProject = (entry: ProjectEntry): entry is WingsProject => entry.id === 'wings'

export { writing, writingSyncedAt } from './writing'

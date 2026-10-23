import type { Locale } from '@/paraglide/runtime'
import { type HeadlineLine, type HeadlineSegment, siteContent } from './siteContent'

export type Accent = 'blue' | 'orange' | 'green' | 'red'
export type { HeadlineLine, HeadlineSegment }

export type ProjectDemo = 'unit' | 'gravity' | 'ide'

/** 项目卡片；subtitle/summary/role 等文案来自 siteContent，按 locale 组装 */
export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  summary: string
  role: string
  year: string
  stack: string[]
  accent: Accent
  category: string
  href: string
  homepage?: string
  docs?: string
  demo: ProjectDemo
}

export interface WingsProject {
  id: 'wings'
  index: string
  title: string
  description: string
  linkLabel: string
  href?: string
}

export type ProjectEntry = Project | WingsProject

export const isWingsProject = (entry: ProjectEntry): entry is WingsProject => entry.id === 'wings'

interface ProjectMeta {
  id: 'smart-unit' | 'github-gravity' | 'rtk-to-endpoints'
  index: string
  title: string
  year: string
  stack: string[]
  accent: Accent
  category: string
  href: string
  homepage?: string
  docs?: string
  demo: ProjectDemo
}

/** 语言无关的项目结构数据；文案在 siteContent.projects */
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
    demo: 'unit',
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
    demo: 'gravity',
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
    demo: 'ide',
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
    id: 'juejin' as const,
    handle: 'Flycran',
    href: 'https://juejin.cn/user/1737682330585838',
    accent: 'orange' as Accent,
  },
  {
    id: 'github' as const,
    handle: '@flycran',
    href: 'https://github.com/flycran',
    accent: 'blue' as Accent,
  },
]

const colophonYear = '2026'

/** 按语言组装完整站点数据，供页面渲染直接使用 */
export function getSite(locale: Locale) {
  const content = siteContent[locale]

  const projects: ProjectEntry[] = [
    ...projectMetas.map((meta): Project => ({ ...meta, ...content.projects[meta.id] })),
    { ...wingsMeta, ...content.wings },
  ]

  return {
    profile: { ...profileBase, ...content.profile },
    projects,
    principles: content.principles,
    now: content.now,
    platforms: platformBase.map((platform) => ({
      ...platform,
      ...content.platforms[platform.id],
    })),
    colophon: { ...content.colophon, year: colophonYear },
  }
}

export { writing, writingSyncedAt } from './writing'

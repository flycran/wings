export type Accent = 'blue' | 'orange' | 'green' | 'red'

export const profile = {
  name: 'FLYCRAN',
  cn: '飞鹤',
  role: '前端架构工程师',
  focus: 'Developer Experience & 前端基础设施',
  kicker: 'FRONTEND ARCHITECT · DX & INFRA',
  headline: ['把重复劳动变成工具，', '把复杂系统变成体验。'],
  intro:
    '我是 Flycran。做过 TypeScript Language Service 插件、Vite 插件、CLI 和几个有人用的小工具；喜欢把团队里反复出现的问题，变成一次性的解决方案。',
  availability: '开放全职 / 远程机会',
  location: '浙江 · 中国',
  email: 'flycran@163.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/flycran' },
    { label: '掘金', href: 'https://juejin.cn/user/1737682330585838' },
  ],
}

export type ProjectDemo = 'unit' | 'gravity' | 'ide'

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

export const projects: ProjectEntry[] = [
  {
    id: 'smart-unit',
    index: '01',
    title: 'smart-unit',
    subtitle: '会自己选单位的格式化库',
    summary: '把 1234567 变成 1.23M，把单位展示从一堆 if/else 变成一个 API。',
    role: '作者 / 设计 & 实现',
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
    subtitle: '会下落的贡献图',
    summary: '把 GitHub 贡献图变成物理动画，文字作为碰撞体，输出一张可嵌入 README 的 SVG。',
    role: '作者 / 创意 & 实现',
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
    subtitle: '从 hook 直接跳到 endpoint',
    summary: '让 RTK Query 的 hook 可以跳转到 endpoint 定义，hover 时显示 URL 和 HTTP method。',
    role: '作者 / LSP & 扩展',
    year: '2025',
    stack: ['TypeScript', 'LSP', 'VS Code'],
    accent: 'orange',
    category: 'DEVELOPER TOOL',
    href: 'https://github.com/flycran/rtk-to-endpoints',
    demo: 'ide',
  },
  {
    id: 'wings',
    index: '04',
    title: 'Wings / 本站',
    description:
      'Astro 静态站、零数据库、纸感设计系统。这个页面本身也是案例：书签导航、纸鹤动效、可打印简历。',
    linkLabel: '本站即案例',
  },
]

export const principles = [
  '工具应该让下一步更清楚。',
  '文档是产品的一部分。',
  '先正确，再优雅；先测量，再优化。',
  '动效要么解释结构，要么提供反馈，否则删掉。',
]

export const now = [
  { label: '正在做', value: 'Wings v2 · 个人主页重构' },
  { label: '正在学', value: 'Rust 与 WASM 工具链' },
  { label: '正在读', value: '《The Design of Everyday Things》' },
]

export const platforms = [
  {
    id: 'juejin',
    name: '掘金',
    handle: 'Flycran',
    description: '长文、工程实践、踩坑记录。',
    href: 'https://juejin.cn/user/1737682330585838',
    accent: 'orange',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@flycran',
    description: '开源项目、源码、实验。',
    href: 'https://github.com/flycran',
    accent: 'blue',
  },
]

export { writing, writingSyncedAt } from './writing'

export const colophon = {
  note: 'Designed & built by FLYCRAN',
  builtWith: 'Astro / 原生 CSS / 少量 TS',
  year: '2026',
}

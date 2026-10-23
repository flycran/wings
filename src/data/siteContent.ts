import type { Locale } from '@/paraglide/runtime'
import type { Accent } from './site'

/** headline 的一个片段；带 accent 的片段渲染为高亮词 */
export interface HeadlineSegment {
  text: string
  accent?: Accent
}

export type HeadlineLine = HeadlineSegment[]

/**
 * 随语言变化的站点文案。语言无关的结构数据
 * （id、链接、技术栈、年份等）留在 site.ts。
 */
export interface SiteContent {
  profile: {
    role: string
    focus: string
    kicker: string
    headline: HeadlineLine[]
    intro: string
    availability: string
    location: string
    links: { label: string; href: string }[]
  }
  projects: Record<
    'smart-unit' | 'github-gravity' | 'rtk-to-endpoints',
    { subtitle: string; summary: string; role: string }
  >
  wings: { title: string; description: string; linkLabel: string }
  principles: string[]
  now: { label: string; value: string }[]
  platforms: Record<'juejin' | 'github', { name: string; description: string }>
  colophon: { note: string; builtWith: string }
}

const zh: SiteContent = {
  profile: {
    role: '前端架构工程师',
    focus: 'Developer Experience & 前端基础设施',
    kicker: 'FRONTEND ARCHITECT · DX & INFRA',
    headline: [
      [{ text: '把重复劳动变成' }, { text: '工具', accent: 'blue' }, { text: '，' }],
      [{ text: '把复杂系统变成' }, { text: '体验', accent: 'orange' }, { text: '。' }],
    ],
    intro:
      '我是 Flycran。做过 TypeScript Language Service 插件、Vite 插件、CLI 和几个有人用的小工具；喜欢把团队里反复出现的问题，变成一次性的解决方案。',
    availability: '开放全职 / 远程机会',
    location: '浙江 · 中国',
    links: [
      { label: 'GitHub', href: 'https://github.com/flycran' },
      { label: '掘金', href: 'https://juejin.cn/user/1737682330585838' },
    ],
  },
  projects: {
    'smart-unit': {
      subtitle: '会自己选单位的格式化库',
      summary: '把 1234567 变成 1.23M，把单位展示从一堆 if/else 变成一个 API。',
      role: '作者 / 设计 & 实现',
    },
    'github-gravity': {
      subtitle: '会下落的贡献图',
      summary: '把 GitHub 贡献图变成物理动画，文字作为碰撞体，输出一张可嵌入 README 的 SVG。',
      role: '作者 / 创意 & 实现',
    },
    'rtk-to-endpoints': {
      subtitle: '从 hook 直接跳到 endpoint',
      summary: '让 RTK Query 的 hook 可以跳转到 endpoint 定义，hover 时显示 URL 和 HTTP method。',
      role: '作者 / LSP & 扩展',
    },
  },
  wings: {
    title: 'Wings / 本站',
    description:
      'Astro 静态站、零数据库、纸感设计系统。这个页面本身也是案例：书签导航、纸鹤动效、可打印简历。',
    linkLabel: '本站即案例',
  },
  principles: [
    '工具应该让下一步更清楚。',
    '文档是产品的一部分。',
    '先正确，再优雅；先测量，再优化。',
    '动效要么解释结构，要么提供反馈，否则删掉。',
  ],
  now: [
    { label: '正在做', value: 'Wings v2 · 个人主页重构' },
    { label: '正在学', value: 'Rust 与 WASM 工具链' },
    { label: '正在读', value: '《The Design of Everyday Things》' },
  ],
  platforms: {
    juejin: { name: '掘金', description: '长文、工程实践、踩坑记录。' },
    github: { name: 'GitHub', description: '开源项目、源码、实验。' },
  },
  colophon: {
    note: 'Designed & built by FLYCRAN',
    builtWith: 'Astro / 原生 CSS / 少量 TS',
  },
}

const en: SiteContent = {
  profile: {
    role: 'Frontend Architect',
    focus: 'Developer Experience & Frontend Infrastructure',
    kicker: 'FRONTEND ARCHITECT · DX & INFRA',
    headline: [
      [{ text: 'Turning repetitive work into ' }, { text: 'tools', accent: 'blue' }, { text: ',' }],
      [
        { text: 'turning complex systems into ' },
        { text: 'experiences', accent: 'orange' },
        { text: '.' },
      ],
    ],
    intro:
      "I'm Flycran. I've built TypeScript language-service plugins, Vite plugins, CLIs and a few small tools people actually use; I like turning problems teams run into again and again into one-time solutions.",
    availability: 'Open to full-time / remote',
    location: 'Zhejiang, China',
    links: [
      { label: 'GitHub', href: 'https://github.com/flycran' },
      { label: 'Juejin', href: 'https://juejin.cn/user/1737682330585838' },
    ],
  },
  projects: {
    'smart-unit': {
      subtitle: 'A formatter that picks its own units',
      summary: 'Turns 1234567 into 1.23M — unit display goes from a pile of if/else to one API.',
      role: 'Author / design & implementation',
    },
    'github-gravity': {
      subtitle: 'A contribution graph that falls',
      summary:
        'Turns the GitHub contribution graph into a physics animation with text as colliders, outputting an SVG you can embed in a README.',
      role: 'Author / idea & implementation',
    },
    'rtk-to-endpoints': {
      subtitle: 'Jump straight from hook to endpoint',
      summary:
        'Lets RTK Query hooks jump to their endpoint definitions, showing the URL and HTTP method on hover.',
      role: 'Author / LSP & extension',
    },
  },
  wings: {
    title: 'Wings / this site',
    description:
      'An Astro static site, zero database, paper-craft design system. This page is its own case study: bookmark navigation, paper-crane motion, printable résumé.',
    linkLabel: 'This site is the demo',
  },
  principles: [
    'Tools should make the next step clearer.',
    'Documentation is part of the product.',
    'Correct first, then elegant; measure first, then optimize.',
    'Motion either explains structure or gives feedback — otherwise cut it.',
  ],
  now: [
    { label: 'Building', value: 'Wings v2 · personal site rebuild' },
    { label: 'Learning', value: 'Rust & the WASM toolchain' },
    { label: 'Reading', value: 'The Design of Everyday Things' },
  ],
  platforms: {
    juejin: {
      name: 'Juejin',
      description: 'Long-form posts, engineering practice, hard-won lessons.',
    },
    github: { name: 'GitHub', description: 'Open source, source code, experiments.' },
  },
  colophon: {
    note: 'Designed & built by FLYCRAN',
    builtWith: 'Astro / vanilla CSS / a bit of TS',
  },
}

export const siteContent: Record<Locale, SiteContent> = { zh, en }

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
  location: '深圳 · 中国',
  email: 'hello@flycran.xyz',
  links: [
    { label: 'GitHub', href: 'https://github.com/flycran', handle: '@flycran' },
    { label: '掘金', href: 'https://juejin.cn', handle: 'Flycran' },
  ],
}

export const projects = [
  {
    id: 'smart-unit',
    index: '01',
    title: 'smart-unit',
    subtitle: '会自己选单位的格式化库',
    summary: '把 1234567 变成 1.23M，把单位展示从一堆 if/else 变成一个 API。',
    role: '作者 / 设计 & 实现',
    year: '2025',
    stack: ['TypeScript', 'Rollup', 'i18n'],
    accent: 'green' as Accent,
    outcome: '12 个单位 · 3 种语言 · 0 依赖',
    href: 'https://github.com/flycran/smart-unit',
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
    accent: 'blue' as Accent,
    outcome: '1 个 Action · 8 个配置项 · 纯 SVG',
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
    accent: 'orange' as Accent,
    outcome: '3 种 hook 模式 · 2 层 import',
    href: 'https://github.com/flycran/rtk-to-endpoints',
    demo: 'ide',
  },
]

export const capabilities = [
  {
    index: '01',
    title: '架构与基建',
    en: 'ARCHITECTURE',
    body: '把重复的决策收敛成约束：类型、构建、发布、目录边界。让团队少做选择，多做产品。',
    evidence: ['smart-unit / API 设计', 'Wings / 静态架构', 'Vite 插件 / 环境类型'],
  },
  {
    index: '02',
    title: '工具与 DX',
    en: 'DEVELOPER EXPERIENCE',
    body: '编辑器、CLI、代码生成、AST/类型驱动。把反馈时间从“等 CI”缩短到“敲下回车”。',
    evidence: ['rtk-to-endpoints / LSP', 'CLI 生成器', 'Biome / 代码规范'],
  },
  {
    index: '03',
    title: '界面与叙事',
    en: 'INTERFACE & STORY',
    body: '复杂概念的可视化、动效和文档。工具不仅要能跑，还要让人愿意用、看得懂。',
    evidence: ['github-gravity / 可视化', 'Wings / 设计系统', '组件文档'],
  },
]

export const principles = [
  '工具应该减少思考成本，而不是增加步骤。',
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
    href: 'https://juejin.cn',
    accent: 'orange' as Accent,
    mark: '掘',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@flycran',
    description: '开源项目、源码、实验。',
    href: 'https://github.com/flycran',
    accent: 'blue' as Accent,
    mark: 'GH',
  },
]

export const writing = [
  {
    title: '为什么我把 Vite 插件的类型生成重写了一遍',
    platform: '掘金',
    date: '2026.03',
    tag: 'DX',
  },
  {
    title: '从 RTK Query 跳到 endpoint：一个 Language Service 插件的实现',
    platform: '掘金',
    date: '2025.12',
    tag: 'TypeScript',
  },
  {
    title: '把贡献图做成物理动画：SVG + Rapier 的取舍',
    platform: '掘金',
    date: '2025.09',
    tag: 'Creative Coding',
  },
  {
    title: '一个个人主页需要数据库吗？',
    platform: '掘金',
    date: '2025.06',
    tag: 'Architecture',
  },
]

export const colophon = {
  note: '示例数据 · 等待替换为真实内容',
  builtWith: 'Astro / 原生 CSS / 少量 TS',
  year: '2026',
}

export const codeTabs = [
  {
    id: 'profile',
    label: 'profile.ts',
    code: `export const flycran = {
  role: '前端架构工程师',
  focus: ['DX', '前端基础设施'],
  stack: ['TypeScript', 'React', 'Astro', 'Vite', 'Bun'],
  openTo: '全职 / 远程',
} as const`,
  },
  {
    id: 'now',
    label: 'now.ts',
    code: `export const now = {
  building: 'Wings v2',
  learning: 'Rust + WASM',
  reading: 'The Design of Everyday Things',
  listening: 'lo-fi & 雨声',
}`,
  },
  {
    id: 'principles',
    label: 'principles.ts',
    code: `export const principles = [
  '工具应该减少思考成本',
  '文档是产品的一部分',
  '先正确，再优雅',
  '动效必须有用',
] as const`,
  },
]

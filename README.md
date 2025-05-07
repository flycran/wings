# Wings blog | 插上翅膀去飞翔

Wings是一个由Flycran开发的博客网站

## 入门指南

### 运行环境

- Node.js v20 及以上
- pnpm v8.0.0 及以上

### 本地运行

```bash
pnpm run dev:next
```

## 技术栈

- `TypeScript` 为项目主要编程语言
- `Biome` 为格式化和风格检查提供支持
- `Next`、`React` 为前端提供框架基础
- `mdx-js` 提供 `markdown` 解析
- `tailwindcss` 用于编写样式
- `floating-ui` 支持悬浮元素
- `auto-unit` 支持动态单位
- `motion` 提供弹性动画
- `swiper` 提供轮播图
- `nextjs-toploader` 提供导航加载条

## 贡献/二次开发

### script

scripts下储存了一些独立的脚本，是一些不是必须但有点用的小功能。

- `generate-icon.ts`: 从svg文件生成React Icon组件

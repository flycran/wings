# Wings / FLYCRAN

FLYCRAN 的个人主页：前端架构、Developer Experience 与前端基础设施。

当前为“纸上飞行”视觉稿，页面内容仍是示例数据，等待替换为真实项目、简历和文章链接。

## 开发

```bash
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

生产构建：

```bash
bun run build
bun run preview
```

质量检查：

```bash
bun run typecheck   # astro check，全量类型检查
bun run lint        # Biome lint，规则使用 recommended
bun run check       # 类型检查 + biome check --fix（会改动文件）
```

Biome 固定为 `2.5.15`，配置由 `biome init` 生成，未改动推荐规则。

### 源码定位

已接入 `code-inspector-plugin`。开发模式下按住 `Option + Shift`（macOS）或 `Alt + Shift`（Windows/Linux）并点击页面元素，会打开编辑器对应源码位置。

配置在 `astro.config.mjs` 的 `vite.plugins`，仅在开发模式生效；如果编辑器没有被自动识别，可以在插件参数里指定 `editor`。

## 部署

已添加 `netlify.toml`：使用 `bun run build` 构建，发布目录为 `dist`，并将旧站的 `/article`、`/project`、`/admin` 等路由重定向到当前页面锚点。

## 页面

- `/`：首页（单页叙事：首屏、作品、关于、技术写作、联系）

## 结构

```text
src/
├── pages/index.astro          # 首页
├── layouts/Layout.astro       # HTML 壳、字体、主题初始化
├── components/
│   ├── Crane.tsx              # 纸鹤（React + Motion）
│   ├── Crane.module.css
│   ├── ThemeBookmark.tsx      # 夜页书签（React + Motion）
│   ├── CodeTabs.astro         # profile.ts / now.ts / principles.ts
│   ├── ProjectCard.astro      # 项目卡（服务端渲染介绍内容）
│   ├── ProjectDemo.astro      # demo 注册与懒加载
│   ├── SmartUnitDemo.tsx      # smart-unit 真实包 demo
│   ├── GravityDemo.tsx        # 贡献图动画 demo
│   └── RtkEndpointsDemo.tsx   # RTK Query 跳转 demo
├── data/site.ts               # 示例资料、项目、平台、文章
└── styles/
    ├── base.css               # reset、toast、reveal
    └── paper.css              # 纸上飞行视觉系统
```

## 技术

- Astro 静态输出，默认零框架运行时。
- 项目介绍、标题、摘要、标签和链接由 Astro 服务端渲染，保证 SEO。
- 项目演示区是 React 岛，使用 `client:visible` 懒加载；smart-unit demo 直接使用真实包。
- 纸鹤、夜页书签使用 React + `motion`；其余交互为原生 TypeScript：代码 tab、导航高亮、滚动 reveal、WebView 倾斜。
- 代码高亮使用 Shiki 在构建时生成，代码内容维护在 `src/data/profileCode.ts`。
- 字体自托管：Noto Serif SC / Noto Sans SC / JetBrains Mono / Space Grotesk。
- 无数据库、无后台、无 Supabase。

## 待办

- 替换 `src/data/site.ts` 中的示例信息。
- 补齐真实项目案例、简历 PDF、文章链接和联系方式。
- 统一响应式细节。
- 多语言切换与时区自动识别（最后一轮）。

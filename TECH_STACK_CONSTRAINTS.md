# Wings 项目技术栈约束文档

> **重要提示**: 本文档旨在约束开发者在解决已有技术方案的问题时，必须使用项目中现有的库和工具，保持技术栈的一致性和可维护性。

## 目录

- [核心框架](#核心框架)
- [状态管理](#状态管理)
- [UI 组件库](#ui-组件库)
- [样式方案](#样式方案)
- [表单处理](#表单处理)
- [数据请求](#数据请求)
- [动画库](#动画库)
- [Markdown 处理](#markdown-处理)
- [代码编辑器](#代码编辑器)
- [搜索功能](#搜索功能)
- [数据库与认证](#数据库与认证)
- [工具库](#工具库)
- [开发规范](#开发规范)

---

## 核心框架

### React Router v7
- **用途**: 路由管理、SSR、数据加载
- **版本**: ^7.x
- **相关包**:
  - `react-router`: ^7.13.0
  - `@react-router/dev`: ^7.9.6
  - `@react-router/node`: ^7.9.6
  - `@react-router/serve`: ^7.9.6
  - `@react-router/fs-routes`: ^7.9.6

**约束**:
- ✅ 使用 `react-router` 的 `loader` 和 `action` 处理数据加载
- ✅ 使用文件系统路由 (`@react-router/fs-routes`)
- ✅ SSR 相关功能必须使用 `@react-router/node`
- ❌ 禁止引入其他路由库（如 `react-router-dom` 旧版本、`@tanstack/router` 等）

**示例**:
```typescript
// ✅ 正确: 使用 react-router loader
import { LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  // 数据加载逻辑
}
```

---

## 状态管理

### Jotai
- **用途**: 全局状态管理、原子化状态
- **版本**: ^2.12.4
- **现有实现**: 
  - `app/store/user.ts` - 用户状态
  - `app/store/system.ts` - 系统状态（主题等）

**约束**:
- ✅ 全局状态统一使用 Jotai 的 `atom`
- ✅ 使用 `useAtom` hook 访问和修改状态
- ❌ 禁止引入 Redux、Zustand、MobX 等其他状态管理库
- ❌ 禁止使用 Context API 替代全局状态（局部状态除外）

**示例**:
```typescript
// ✅ 正确: 使用 Jotai atom
import { atom } from 'jotai'
import { useAtom } from 'jotai'

export const userAtom = atom<User | null>(null)

// 组件中使用
const [user, setUser] = useAtom(userAtom)
```

---

## UI 组件库

### Material-UI (MUI)
- **用途**: 基础 UI 组件、图标
- **版本**: 
  - `@mui/material`: ^7.3.7
  - `@mui/icons-material`: ^7.1.0
  - `@emotion/react`: ^11.14.0
  - `@emotion/styled`: ^11.14.0

**约束**:
- ✅ 需要复杂组件时优先使用 MUI 组件（如 Dialog、Menu、Tooltip 等）
- ✅ 图标统一使用 `@mui/icons-material`
- ✅ MUI 主题配置通过 Emotion 处理
- ❌ 禁止引入 Ant Design、Chakra UI、Mantine 等其他 UI 库
- ❌ 禁止使用其他图标库（如 `lucide-react`、`heroicons` 等）

**示例**:
```typescript
// ✅ 正确: 使用 MUI 图标
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

// ❌ 错误: 引入其他图标库
// import { Trash } from 'lucide-react'
```

### React Icons
- **用途**: 特殊图标（如社交媒体图标）
- **版本**: ^5.5.0
- **现有实现**: `app/icons/` 目录

**约束**:
- ✅ 仅用于 MUI 不提供的特殊图标
- ✅ 自定义图标组件应放在 `app/icons/` 目录

---

## 样式方案

### Tailwind CSS v4
- **用途**: 原子化 CSS、响应式设计
- **版本**: ^4.1.6
- **相关包**:
  - `@tailwindcss/postcss`: ^4.1.6
  - `@tailwindcss/typography`: ^0.5.16

**约束**:
- ✅ 样式优先使用 Tailwind CSS 工具类
- ✅ 长文本排版使用 `@tailwindcss/typography`
- ✅ 使用 Tailwind 的响应式前缀（sm:、md:、lg: 等）
- ❌ 禁止引入其他 CSS 框架（如 Bootstrap、Bulma 等）
- ❌ 避免大量内联样式或 CSS-in-JS（MUI 组件除外）

**工具库**:
- **clsx** (^2.1.1): 条件类名拼接
- **auto-unit** (^3.0.5): 单位自动转换

**示例**:
```typescript
// ✅ 正确: 使用 clsx 和 Tailwind
import clsx from 'clsx'

<div className={clsx(
  'flex items-center justify-center',
  isActive && 'bg-blue-500',
  'hover:shadow-lg'
)} />
```

---

## 表单处理

### React Hook Form
- **用途**: 表单状态管理、表单验证
- **版本**: ^7.71.1
- **相关包**:
  - `@hookform/resolvers`: ^5.2.2
  - `zod`: ^4.3.6

**现有实现**:
- `app/components/ui/Form/index.tsx` - Form 组件封装
- `app/components/ui/hooks/form.ts` - 自定义表单 hooks

**约束**:
- ✅ 所有表单必须使用 React Hook Form
- ✅ 表单验证统一使用 Zod schema
- ✅ 使用项目封装的 `Form` 和 `FormItem` 组件
- ❌ 禁止使用 Formik、React Final Form 等其他表单库
- ❌ 禁止手动管理表单状态（useState）

**示例**:
```typescript
// ✅ 正确: 使用 React Hook Form + Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, '名称必填'),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

---

## 数据请求

### TanStack Query (React Query)
- **用途**: 服务端状态管理、数据缓存、请求优化
- **版本**: ^5.90.20
- **现有实现**: `app/query/index.ts`

**约束**:
- ✅ 客户端数据请求优先使用 TanStack Query
- ✅ 使用 `useQuery`、`useMutation` 等 hooks
- ✅ 全局 QueryClient 已在 `app/query/index.ts` 配置
- ❌ 避免在组件中直接使用 `fetch` 或 `axios`（除非特殊场景）
- ❌ 禁止引入 SWR、Apollo Client 等其他数据请求库

### Axios
- **用途**: HTTP 请求客户端
- **版本**: ^1.13.2

**约束**:
- ✅ 需要自定义请求拦截器时使用 Axios
- ✅ 配合 TanStack Query 使用

---

## 动画库

### Motion (Framer Motion)
- **用途**: 组件动画、过渡效果
- **版本**: ^12.11.0
- **现有实现**: 
  - `app/components/motion/MotionDiv.tsx`
  - `app/components/motion/MotionButton.tsx`
  - `app/components/motion/MotionSpan.tsx`

**约束**:
- ✅ 所有动画效果统一使用 Motion
- ✅ 使用项目封装的 Motion 组件（MotionDiv、MotionButton 等）
- ✅ 遵循项目现有动画风格和参数
- ❌ 禁止引入 React Spring、GSAP、Anime.js 等其他动画库
- ❌ 禁止使用纯 CSS 动画实现复杂交互（简单 hover 除外）

**示例**:
```typescript
// ✅ 正确: 使用项目封装的 Motion 组件
import MotionDiv from '~/components/motion/MotionDiv'

<MotionDiv
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  内容
</MotionDiv>
```

---

## Markdown 处理

### 编辑器
- **md-editor-rt** (^5.5.1): Markdown 编辑器

**现有实现**:
- `app/components/ui/Markdown/index.tsx` - Markdown 渲染组件
- `app/components/ui/MarkdownEditor/` - Markdown 编辑器封装

### 解析与渲染
- **unified** (^11.0.5): Markdown 解析核心
- **remark-parse** (^11.0.0): Markdown 解析
- **remark-gfm** (^4.0.1): GitHub Flavored Markdown
- **remark-rehype** (^11.1.2): Markdown 转 HTML
- **rehype** (^13.0.2): HTML 处理
- **rehype-slug** (^6.0.0): 自动生成标题 ID

### 代码高亮
- **react-syntax-highlighter** (^15.6.6): 代码语法高亮
- 现有样式: `app/assets/highlight/atom-one-dark.css`、`atom-one-light.css`

**约束**:
- ✅ Markdown 编辑功能统一使用 md-editor-rt
- ✅ Markdown 渲染使用 unified 生态
- ✅ 代码高亮使用 react-syntax-highlighter
- ✅ 支持 GFM 语法（表格、任务列表等）
- ❌ 禁止引入 react-markdown、marked 等其他解析库
- ❌ 禁止使用 highlight.js、Prism.js 独立库（使用 react-syntax-highlighter 封装）
- ❌ 禁止引入 MDXEditor（已废弃）

---

## 代码编辑器

### CodeMirror 6
- **用途**: 代码编辑、语法高亮
- **版本**: ^6.x
- **相关包**:
  - `@codemirror/commands`: ^6.8.1
  - `@codemirror/lang-javascript`: ^6.2.4
  - `@codemirror/lang-markdown`: ^6.3.2
  - `@codemirror/language`: ^6.11.0
  - `@codemirror/language-data`: ^6.5.1
  - `@codemirror/state`: ^6.5.2
  - `@codemirror/view`: ^6.36.8

**约束**:
- ✅ 代码编辑功能统一使用 CodeMirror 6
- ✅ 使用 CodeMirror 官方语言包
- ❌ 禁止引入 Monaco Editor、Ace Editor 等其他编辑器

---

## 搜索功能

### Algolia
- **用途**: 全文搜索
- **版本**: ^5.47.0
- **相关包**:
  - `react-instantsearch`: ^7.22.1
  - `react-instantsearch-core`: ^7.22.1
  - `instantsearch.css`: ^8.9.0

**现有实现**: `app/utils/algolia.ts`

### FlexSearch
- **用途**: 客户端本地搜索（⚠️ 计划废弃中）
- **版本**: ^0.8.164
- **现有使用**: `app/server/article.ts` - 文章搜索功能

**约束**:
- ✅ 全站搜索使用 Algolia + InstantSearch
- ✅ 新的搜索功能优先使用 Algolia
- ❌ 禁止引入 Lunr.js、Fuse.js 等其他本地搜索库
- ⚠️ FlexSearch 已计划废弃，不建议用于新功能

---

## 数据库与认证

### Supabase
- **用途**: 后端服务、数据库、认证
- **版本**: 
  - `@supabase/supabase-js`: ^2.49.4
  - `@supabase/ssr`: ^0.6.1

**现有实现**:
- `app/server/supabase.ts` - 服务端 Supabase 客户端
- `app/utils/supabase.ts` - 客户端 Supabase 客户端
- `types/supabase.ts` - 数据库类型定义

**约束**:
- ✅ 数据库操作统一使用 Supabase Client
- ✅ SSR 场景使用 `@supabase/ssr` 的 `createServerClient`
- ✅ 客户端使用 `createClient`
- ✅ 使用项目生成的类型定义 (`types/supabase.ts`)
- ❌ 禁止直接连接数据库（如 `pg`、`mysql2` 等）
- ❌ 禁止引入 Firebase、AWS Amplify 等其他 BaaS

**示例**:
```typescript
// ✅ 正确: 使用项目封装的 Supabase 客户端
import { supabaseClient } from '~/utils/supabase'
import { supabaseSSR } from '~/server/supabase'

// 客户端
const { data } = await supabaseClient.from('users').select()

// 服务端
const client = supabaseSSR(request)
```

---

## 工具库

### React 工具
- **ahooks** (^3.8.5): React Hooks 工具集
  - ✅ 使用 ahooks 提供的常用 hooks（如 useRequest、useDebounce 等）
  - ❌ 禁止引入 react-use、usehooks-ts 等其他 hooks 库

### 浮动定位
- **@floating-ui/react** (^0.27.8): Tooltip、Popover 定位
  - ✅ 所有浮动元素使用 Floating UI
  - 现有封装: `app/utils/floating.ts`

### 滚动效果
- **locomotive-scroll** (^4.1.4): 平滑滚动
  - ✅ 页面平滑滚动效果使用 Locomotive Scroll
  - 现有封装: `app/components/LocomotiveScroll/`

### 轮播图
- **swiper** (^11.2.6): 轮播组件
  - ✅ 轮播功能统一使用 Swiper

### 通知提示
- **react-toastify** (^11.0.5): Toast 通知
  - ✅ 消息提示统一使用 react-toastify
  - 配置文件: `app/config/toast.ts`
  - ❌ 禁止使用 react-hot-toast、sonner 等其他通知库

### 进度条
- **nprogress** (^0.2.0): 页面加载进度条
  - ✅ 页面加载进度使用 NProgress

### Cookie 操作
- **js-cookie** (^3.0.5): Cookie 操作
  - ✅ Cookie 操作使用 js-cookie
  - **cookie** (^1.0.2): 服务端 Cookie 解析

### 字符串处理
- **nanoid** (^5.1.5): 生成唯一 ID
- **match-sorter** (^6.3.1): 模糊匹配排序

### 其他工具
- **react-merge-refs** (^3.0.2): 合并多个 refs
- **murmurhash** (^2.0.1): 哈希算法
- **json-diff-ts** (^4.3.0): JSON 对比

---

## 开发规范

### 代码规范工具

#### Biome
- **用途**: 代码格式化、Lint 检查
- **版本**: 2.0.6
- **配置文件**: `biome.json`

**约束**:
- ✅ 代码格式化统一使用 Biome（`bun run format`）
- ✅ Lint 检查使用 Biome（`bun run lint`）
- ✅ 严格遵循 `biome.json` 配置的规则
- ❌ 禁止引入 ESLint、Prettier（项目已统一使用 Biome）
- ❌ 禁止修改 Biome 配置的核心规则（如禁用 `noExplicitAny`）

**关键规则**:
```json
{
  "indentWidth": 2,
  "lineWidth": 100,
  "semicolons": "asNeeded",
  "quoteStyle": "single",
  "jsxQuoteStyle": "double"
}
```

### TypeScript 配置
- **版本**: ^5.9.3
- **配置文件**: `tsconfig.json`

**约束**:
- ✅ 启用严格模式 (`"strict": true`)
- ✅ 使用路径别名 `~/*` 指向 `./app/*`
- ✅ 禁止使用 `any`（Biome 会报错）

### Git 规范
- **husky** (^9.1.7): Git hooks

**约束**:
- ✅ 提交前自动执行格式化和 Lint 检查

---

## 构建与部署

### 构建工具
- **Vite** (^7.3.1): 构建工具
- **vite-tsconfig-paths** (^6.0.5): 路径别名支持
- **vite-plugin-environment** (^1.1.3): 环境变量处理

### 部署平台
- **Netlify**: 部署平台
- **@netlify/vite-plugin-react-router** (^2.1.3): Netlify 适配插件
- **配置文件**: `netlify.toml`

**约束**:
- ✅ 项目使用 Vite 作为构建工具
- ✅ 环境变量通过 `vite-plugin-environment` 注入
- ✅ 部署到 Netlify 平台
- ❌ 禁止引入 Webpack、Rollup、esbuild 等其他构建工具

---

## 运行时要求

### Node.js
- **最低版本**: >=24.0.0
- **包管理器**: Bun（推荐）或 npm

**约束**:
- ✅ 开发环境使用 Bun 运行（`bun run dev`）
- ✅ 构建使用 `bun x --bun react-router build`
- ❌ 不支持低于 Node.js 24 的版本

---

## 禁止引入的技术

为保持技术栈一致性，以下技术**严格禁止**引入：

### 状态管理
- ❌ Redux、Redux Toolkit
- ❌ Zustand
- ❌ MobX
- ❌ Recoil

### UI 框架
- ❌ Ant Design
- ❌ Chakra UI
- ❌ Mantine
- ❌ Radix UI（除非 MUI 不支持）
- ❌ Headless UI

### 动画库
- ❌ React Spring
- ❌ GSAP
- ❌ Anime.js
- ❌ Lottie

### 表单库
- ❌ Formik
- ❌ React Final Form
- ❌ Vest

### 数据请求
- ❌ SWR
- ❌ Apollo Client（除非引入 GraphQL）

### 样式方案
- ❌ Bootstrap
- ❌ Bulma
- ❌ styled-components（MUI Emotion 除外）
- ❌ Sass/SCSS（使用 Tailwind 或 CSS Modules）

### 其他
- ❌ Lodash（优先使用原生 JS 或 ahooks）
- ❌ Moment.js（使用原生 Date API 或 day.js）

---

## 添加新依赖的流程

如果确实需要添加新依赖，必须经过以下流程：

1. **确认现有方案无法满足需求**
   - 检查本文档中现有库是否已支持
   - 搜索项目代码是否有类似实现

2. **评估必要性**
   - 是否可以用现有库组合实现
   - 是否可以手写少量代码实现
   - 新库是否维护活跃、社区成熟

3. **技术选型标准**
   - 与现有技术栈兼容
   - TypeScript 支持完善
   - Bundle Size 合理
   - 无许可证问题

4. **团队评审**
   - 提交技术方案说明
   - 团队 Review 通过后方可引入

---

## 现有自定义工具

项目已封装以下工具，**必须优先使用**：

### Hooks
- `app/hooks/theme.ts` - 主题切换
- `app/hooks/lockScroll.ts` - 滚动锁定
- `app/hooks/popover.ts` - Popover 逻辑
- `app/hooks/portal.ts` - Portal 挂载
- `app/hooks/time.ts` - 时间处理
- `app/hooks/delayOpen.ts` - 延迟打开

### 组件
- `app/components/ui/` - 自定义 UI 组件库
- `app/components/motion/` - Motion 封装组件
- `app/components/Sidebar/` - 侧边栏
- `app/components/Topbar/` - 顶部导航
- `app/components/Footer/` - 页脚

### 工具函数
- `app/utils/floating.ts` - Floating UI 工具
- `app/utils/supabase.ts` - Supabase 客户端
- `app/utils/algolia.ts` - Algolia 配置
- `app/utils/unit.ts` - 单位转换
- `app/utils/skills.ts` - 技能数据

---

## 总结

本文档旨在确保 Wings 项目的技术栈保持一致性和可维护性。开发者在解决问题时，应：

1. ✅ **优先查阅本文档**，使用已有技术方案
2. ✅ **优先使用项目封装的组件和工具**
3. ✅ **遵循项目代码规范**（Biome、TypeScript）
4. ❌ **避免重复造轮子**
5. ❌ **严格禁止引入冲突或重复的依赖**

如有疑问或需要添加新依赖，请先与团队沟通。

---

**文档版本**: 1.0.0  
**最后更新**: 2026-01-30  
**维护者**: Wings 开发团队

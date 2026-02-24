'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRequest } from 'ahooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify/unstyled'
import FullScreenLoading from '~/components/FullScreenLoading'
import Loading from '~/components/Loading'
import Tiptap, { TiptapProps } from '~/components/Tiptap'
import Modal from '~/components/ui/Modal'
import { FunctionArgs } from '~/types/supabase.additional'
import { supabaseClient } from '~/utils/supabase'
import SaveForm, { ArticleInfo } from './components/SaveForm'

const mdc = `# Wings | 插上翅膀去飞翔
[![Netlify Status](https://api.netlify.com/api/v1/badges/800dbccc-1747-4a93-a408-0705f6503a48/deploy-status)](https://app.netlify.com/projects/flycran/deploys)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一个现代化的个人网站项目，展示个人项目、技术博客和创意作品。

## 🚀 项目特色

- **现代化技术栈**: 基于 React 19 + TypeScript + React Router v7
- **服务端渲染**: 支持 SSR，提升 SEO 和首屏加载速度
- **响应式设计**: 使用 Tailwind CSS 实现优雅的响应式布局
- **全文搜索**: 集成 Algolia 搜索引擎，提供快速精准的搜索体验
- **内容管理**: 内置 Markdown 编辑器和文章管理系统
- **现代化开发体验**: 严格的代码规范和类型安全

## 🏗️ 项目结构

\`\`\`
app/
├── assets/           # 静态资源
├── components/       # 组件库
├── config/          # 配置文件
├── hooks/           # 自定义 hooks
├── icons/           # 图标组件
├── query/           # 数据查询配置
├── routes/          # 路由组件 (具体路由请查看此目录)
├── server/          # 服务端逻辑
├── store/           # 状态管理
├── utils/           # 工具函数
└── globals.css      # 全局样式
\`\`\`

## 🛠️ 技术栈

### 核心框架
- [React 19.1.0](https://react.dev/) - 前端框架
- [React Router v7](https://reactrouter.com/) - 路由管理 + SSR
- [TypeScript 5.9.3](https://www.typescriptlang.org/) - 类型安全

### 状态管理
- [Jotai 2.12.4](https://jotai.org/) - 原子化状态管理
- [TanStack Query 5.90.20](https://tanstack.com/query) - 服务端状态管理

### UI 组件
- [Material-UI 7.3.7](https://mui.com/) - 基础 UI 组件
- [Tailwind CSS 4.1.6](https://tailwindcss.com/) - 原子化 CSS
- [Motion 12.11.0](https://motion.dev/) - 动画库

### 表单与数据
- [React Hook Form 7.71.1](https://react-hook-form.com/) - 表单处理
- [Zod 4.3.6](https://zod.dev/) - 表单验证
- [Supabase 2.49.4](https://supabase.com/) - 后端服务
- [Algolia 5.47.0](https://www.algolia.com/) - 搜索引擎

### 开发工具
- [Biome 2.0.6](https://biomejs.dev/) - 代码格式化和 Lint
- [Vite 7.3.1](https://vitejs.dev/) - 构建工具
- [Netlify](https://netlify.com/) - 部署平台

## 🚀 快速开始

### 环境要求

- Node.js >= 24.0.0
- Bun >= 1.2 (推荐) 或 npm

> 推荐使用 [mise](https://mise.jdx.dev/) 管理 Node.js 版本

### 安装依赖

\`\`\`bash
# 使用 mise 管理版本
mise use node@24
mise use bun@1

# 安装依赖
bun install
\`\`\`

### 环境配置

\`\`\`bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置必要的环境变量
# 必需配置：SUPABASE_URL, SUPABASE_KEY, ALGOLIA_ID 等
\`\`\`

### 开发服务器

\`\`\`bash
# 启动开发服务器
bun dev

# 访问 http://localhost:8000
\`\`\`

### 生成类型定义

\`\`\`bash
# 登录 Supabase (每台设备只需一次)
bun x supabase login

# 生成数据库类型定义
bun run generate-supabase-types
\`\`\`

## 📋 可用脚本

| 脚本                                | 描述                |
|-----------------------------------|-------------------|
| \`bun run dev\`                     | 启动开发服务器           |
| \`npm run build\`                   | 生产环境打包            |
| \`bun run build:bunx\`              | 使用 bun 快速打包       |
| \`bun run start\`                   | 预览生产构建            |
| \`bun run clean\`                   | 清理缓存              |
| \`bun run generate-env-types\`      | 生成环境变量类型        |
| \`bun run generate-icon\`           | 从 SVG 生成图标组件      |
| \`bun run generate-supabase-types\` | 生成 Supabase 数据库类型 |
| \`bun run typecheck\`               | TypeScript 类型检查   |
| \`bun run lint\`                    | 代码规范检查            |
| \`bun run lint:fix\`                | 自动修复代码规范问题        |
| \`bun run format\`                  | 代码格式化检查           |
| \`bun run format:fix\`              | 自动格式化代码           |
| \`bun run netlify:serve\`           | 以 Netlify 环境启动    |

## 🏗️ 构建与部署

### 生产构建

\`\`\`bash
# 构建项目
bun run build

# 预览构建结果
bun run start
\`\`\`

### 部署到 Netlify

项目已配置 Netlify 自动部署，推送代码到主分支即可自动部署。

> 详细信息查看 [netlify.toml](netlify.toml)

## 🔧 开发规范

### 项目模块
项目功能模块按路由划分，具体路由结构请查看 \`app/routes\` 目录：
- 客户端页面 (routes/_client/)
- 管理后台 (routes/admin/)

### 代码风格
- 使用 Biome 进行代码格式化和 Lint 检查
- 严格遵循 TypeScript 类型安全
- 统一使用单引号和 2 空格缩进

### 技术约束
项目有严格的技术栈约束，详细信息请查看 [TECH_STACK_CONSTRAINTS.md](./TECH_STACK_CONSTRAINTS.md)

### 提交规范
- 提交前自动执行格式化和 Lint 检查
- 遵循 conventional commits 规范

## 🌐 部署地址

- 生产环境: [https://flycran.netlify.app/](https://flycran.netlify.app/)

## 📄 许可证

MIT License

## 📋 计划

项目未来的发展计划：

1. 项目模块 - 在主页展示我创作、开源的项目
2. 求职模块 - 展示我的简历和第三方招聘链接
3. 友情链接 - 展示合作伙伴和朋友的网站
4. 随笔 - 展示随手记下的想法和感悟

## 📞 联系方式

- GitHub: [Flycran](https://github.com/FlyingCrane)
- gmail: [cffhidol](mailto:cffhidol@gmail.com)

`

export default function EditorPage() {
  const router = useRouter()
  const params = useSearchParams()

  const [id, setId] = useState<number>()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  // 解析 params
  useEffect(() => {
    const idStr = params.get('id') || ''
    setId(idStr ? +idStr : undefined)
  }, [params])

  const { isLoading, data: article } = useQuery({
    queryFn: async () => {
      const { error, data } = await supabaseClient
        .from('articles')
        .select(
          `
          *,
          article_columns!left(
            column_id,
            article_id
          ),
          categorys(*)
        `
        )
        .eq('id', id!)
        .single()
      if (error) {
        toast.error('文章获取失败，请重试')
        throw error
      } else {
        return data
      }
    },
    queryKey: ['article', id],
    enabled: !!id,
    retry: 3,
  })

  useEffect(() => {
    if (article) {
      setTitle(article.title)
      setContent(article.content)
      setId(article.id)
    }
  }, [article])

  const {
    mutate: onSave,
    mutateAsync: onAsyncSave,
    isPending,
  } = useMutation({
    mutationFn: async (articleInfo?: Partial<FunctionArgs['upsert_article_full']>) => {
      const { error, data } = await supabaseClient.rpc('upsert_article_full', {
        id,
        title: articleInfo?.title ?? article?.title ?? '',
        content: articleInfo?.content ?? article?.content ?? '',
        describe: article?.describe ?? '',
        cover: articleInfo?.cover ?? article?.cover ?? '',
        category_id: articleInfo?.category_id ?? article?.category_id ?? undefined,
        column_ids: articleInfo?.column_ids ?? article?.article_columns.map((e) => e.column_id),
      })
      if (error) {
        throw error
      }
      if (!id) {
        router.replace(`?id=${data}`)
        setId(data)
      }
      return data
    },
    onSuccess: (_, info) => {
      if (info) {
        setOpenSaveModal(false)
      }
    },
    onError: () => {
      toast.error('保存失败')
    },
  })

  const manualSave = async (articleInfo?: ArticleInfo) => {
    const data = await onAsyncSave(articleInfo)
    if (data) {
      toast.success('保存成功')
    }
  }

  const [openSaveModal, setOpenSaveModal] = useState(false)

  const closeSaveModal = () => {
    setOpenSaveModal(false)
  }

  const { run } = useRequest(
    async (e?: Parameters<Exclude<TiptapProps['onChange'], undefined>>[0]) => {
      const _content = e?.editor.getMarkdown() || content
      if (title !== article?.title || _content !== article?.content) {
        onSave({
          content: _content,
        })
      }
    },
    {
      manual: true,
      debounceWait: 3000,
    }
  )

  return (
    <FullScreenLoading loading={isLoading} title="正在获取文章">
      <div className="relative flex flex-col h-screen">
        <div className="relative m-auto w-full lg:w-2xl xl:w-4xl 2xl:w-6xl">
          <input
            placeholder="取一个有趣的标题吧"
            className="w-full text-xl md:text-2xl font-bold h-14 md:h-16 px-4 md:px-6"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              run()
            }}
          />
          {isPending && (
            <div className="absolute top-0 right-4 h-full flex items-center justify-center gap-2 text-sm">
              保存中
              <Loading className="w-6 h-6" />
            </div>
          )}
        </div>
        <Tiptap
          className="flex-1 h-0"
          value={mdc}
          onChange={run}
          onSave={() => setOpenSaveModal(true)}
        />
      </div>
      <Modal
        open={openSaveModal}
        onClose={closeSaveModal}
        closeOnMaskClick
        operates={false}
        className="md:w-120"
      >
        <SaveForm
          onSubmit={manualSave}
          onClose={closeSaveModal}
          article={article}
          saving={isPending}
        />
      </Modal>
    </FullScreenLoading>
  )
}

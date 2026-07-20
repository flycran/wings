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

const mdc = `
[![Netlify Status](https://api.netlify.com/api/v1/badges/800dbccc-1747-4a93-a408-0705f6503a48/deploy-status)](https://app.netlify.com/projects/flycran/deploys)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

# 🚀 项目特色
## 🚀 项目特色
### 🚀 项目特色
#### 🚀 项目特色
##### 🚀 项目特色
###### 🚀 项目特色

- **现代化技术栈**: 基于 React 19 + TypeScript + React Router v7
- **服务端渲染**: 支持 SSR，提升 SEO 和首屏加载速度
- **响应式设计**: 使用 Tailwind CSS 实现优雅的响应式布局
- **全文搜索**: 集成 Algolia 搜索引擎，提供快速精准的搜索体验
- **内容管理**: 内置 Markdown 编辑器和文章管理系统
- **现代化开发体验**: 严格的代码规范和类型安全

1. **现代化技术栈**: 基于 React 19 + TypeScript + React Router v7
1. **服务端渲染**: 支持 SSR，提升 SEO 和首屏加载速度
1. **响应式设计**: 使用 Tailwind CSS 实现优雅的响应式布局
1. **全文搜索**: 集成 Algolia 搜索引擎，提供快速精准的搜索体验
1. **内容管理**: 内置 Markdown 编辑器和文章管理系统
1. **现代化开发体验**: 严格的代码规范和类型安全

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

\`\`\`typescript
import CodeBlock from '@tiptap/extension-code-block'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CustomCodeBlockView from './CustomCodeBlockView'

export const CustomCodeBlockWithView = CodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CustomCodeBlockView)
  },
})
\`\`\`

\`\`\`mermaid
graph LR
源数据1 --> watch
源数据2 --> watch
watch --> 操作DOM
watch --> 修改数据
watch --> 发送请求
\`\`\`
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

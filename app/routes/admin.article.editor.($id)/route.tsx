import { useMutation, useQuery } from '@tanstack/react-query'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify/unstyled'
import FullScreenLoading from '~/components/FullScreenLoading'
import Loading from '~/components/Loading'
import Modal from '~/components/ui/Modal'
import MarkdownEditor from '~/routes/admin.article.editor.($id)/components/MarkdownEditor'
import SaveForm, { ArticleInfo } from '~/routes/admin.article.editor.($id)/components/SaveForm'
import { supabaseClient } from '~/utils/supabase'
import { Route } from './+types/route'

export default function editor({ params: { id: paramId = '' } }: Route.ComponentProps) {
  const navigate = useNavigate()

  const [id, setId] = useState<number | undefined>()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const {
    isLoading,
    data: article,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const _id = id || +paramId
      if (_id) {
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
          .eq('id', _id)
          .single()
        if (error) {
          toast.error('文章获取失败，请重试')
          console.error(error)
        } else {
          return data
        }
      }
    },
    queryKey: ['article', id],
    retry: 3,
  })

  useEffect(() => {
    if (article) {
      if (id !== article.id) {
        setTitle(article.title)
        setContent(article.content)
        setId(article.id)
      }
    }
  }, [article])

  const {
    mutate: onSave,
    mutateAsync: onAsyncSave,
    isPending,
  } = useMutation({
    mutationFn: async (articleInfo?: ArticleInfo) => {
      const { error, data } = await supabaseClient.rpc('upsert_article_full', {
        id,
        title,
        content,
        describe: article?.describe ?? '',
        cover: articleInfo?.cover ?? article?.cover ?? '',
        category_id: articleInfo?.category_id ?? article?.category_id ?? undefined,
        column_ids: articleInfo?.column_ids ?? article?.article_columns.map((e) => e.column_id),
      })
      if (error) {
        throw error
      }
      if (!id) {
        navigate(`/admin/article/editor/${id}`, { replace: true })
        setId(data)
      }
      return data
    },
    onSuccess: (_, info) => {
      if (info) {
        setOpenSaveModal(false)
      }
      refetch()
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
    async () => {
      if (title !== article?.title || content !== article?.content) {
        onSave(undefined)
      }
    },
    {
      manual: true,
      debounceWait: 3000,
    }
  )

  return (
    <FullScreenLoading loading={isLoading} title="正在获取文章">
      <div className="relative flex flex-col h-full">
        <div className="relative">
          <input
            placeholder="取一个有趣的标题吧"
            className="w-full px-4 py-3"
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
        <MarkdownEditor
          className="flex-1"
          value={content}
          onChange={(c) => {
            setContent(c)
            run()
          }}
          onSave={() => setOpenSaveModal(true)}
        />
      </div>
      <Modal open={openSaveModal} onClose={closeSaveModal} closeOnMaskClick operates={false}>
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

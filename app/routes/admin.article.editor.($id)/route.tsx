import { useRequest } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import FullScreenLoading from '~/components/FullScreenLoading'
import Loading from '~/components/Loading'
import { useModal } from '~/components/ui/DialogProvider/dialogHooks'
import MarkdownEditor from '~/routes/admin.article.editor.($id)/components/MarkdownEditor'
import SaveForm from '~/routes/admin.article.editor.($id)/components/SaveForm'
import { supabaseClient } from '~/utils/supabase'
import { Tables } from '../../../types/supabase'
import { Route } from './+types/route'

export default function editor({ params: { id } }: Route.ComponentProps) {
  const navigate = useNavigate()
  const [inited, setInited] = useState(false)
  const [loading, setLoading] = useState(false)

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [_columns, setColumns] = useState<Tables<'columns'>[]>([])
  const [_category, setCategory] = useState<Tables<'categorys'> | null>()

  const getArticle = useCallback(async () => {
    if (id) {
      const { error, data } = await supabaseClient
        .from('articles')
        .select(`
          *,
          article_columns!left(
            column_id,
            columns!inner(*)
          ),
          categorys(*)
        `)
        .eq('id', +id)
      if (error) {
        console.error(error)
      } else if (data[0]) {
        const article = data[0]
        setContent(article.content)
        setTitle(article.title)
        setColumns(article.article_columns.map((e) => e.columns))
        setCategory(article.categorys)
      }
    }
    setInited(true)
  }, [id])

  useEffect(() => {
    getArticle()
  }, [getArticle])

  const onSave = async () => {
    setLoading(true)
    try {
      if (id) {
        const { error } = await supabaseClient
          .from('articles')
          .update({
            content,
            title,
          })
          .eq('id', +id)
        if (error) {
          console.error(error)
          return
        }
      } else {
        const { error, data } = await supabaseClient
          .from('articles')
          .insert({
            title,
            content,
          })
          .select('id')
          .single()
        if (error) {
          console.error(error)
          return
        }
        navigate(`./${data.id}`, { replace: true })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const [openSaveModal] = useModal({
    title: '发布文章',
    describe: <SaveForm />,
    onOk: onSave,
    closeOnMaskClick: true,
  })

  const { run } = useRequest(onSave, {
    manual: true,
    debounceWait: 3000,
  })

  return (
    <FullScreenLoading loading={!inited} title="正在获取文章">
      <div className="relative flex flex-col h-screen">
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
          {loading && (
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
          onSave={openSaveModal}
        />
      </div>
    </FullScreenLoading>
  )
}

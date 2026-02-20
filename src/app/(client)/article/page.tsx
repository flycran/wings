import ArticleCard from '~/components/ArticleCard'
import { supabaseClient } from '~/utils/supabase'

export default async function ArticlesPage() {
  const { data: articles, error } = await supabaseClient
    .from('articles')
    .select(`
      id, title, created_at, updated_at, cover, describe,
      article_columns!left(
        column_id,
        columns!inner(*)
      )
    `)
    .limit(20)

  if (error) {
    throw new Error('Failed to fetch articles')
  }

  return (
    <div className="flex justify-center gap-4 py-6 min-h-screen">
      <div className="flex-1" />
      <div className="w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
        <div className="w-full flex flex-col gap-4">
          {articles?.map((item) => (
            <ArticleCard key={item.id} article={item} showOperatebar />
          ))}
        </div>
      </div>
      <div className="flex-1" />
    </div>
  )
}

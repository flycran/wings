import ArticleCard from '~/components/ArticleCard'
import { supabaseClient } from '~/utils/supabase'

import { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const articles = await supabaseClient
    .from('articles')
    .select(`
      id, title, created_at, updated_at, cover, describe,
      article_columns!left(
        column_id,
        columns!inner(*)
      )
    `)
    .limit(20)

  if (articles.error) {
    console.log(articles.error)
    throw new Response('Not Found', { status: 404 })
  }

  return articles.data
}

export default function article({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex justify-center gap-4 py-6 min-h-screen">
      <div className="flex-1" />
      <div className="w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
        <div className="w-full flex flex-col gap-4">
          {loaderData?.map((item) => (
            <ArticleCard key={item.id} article={item} showOperatebar />
          ))}
        </div>
      </div>
      <div className="flex-1" />
    </div>
  )
}

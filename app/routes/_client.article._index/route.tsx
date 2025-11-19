import { Link } from 'react-router'
import { supabaseSSR } from '~/server/supabase'

import { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = supabaseSSR(request)

  const url = new URL(request.url)
  const query = new URLSearchParams(url.search)
  const w = query.get('w')

  let queryBuilder = supabase
    .from('articles')
    .select(`
      id, title, created_at, updated_at, cover, content,
      article_columns!left(
        column_id,
        columns!inner(*)
      )
    `)
    .limit(20)

  if (w) {
    queryBuilder = queryBuilder.textSearch('content', w)
  }

  const articles = await queryBuilder

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
            <ArticleItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="flex-1" />
    </div>
  )
}

type ArticleItemProps = Exclude<Route.ComponentProps['loaderData'], undefined>[number]

const ArticleItem = ({ id, title, cover, content }: ArticleItemProps) => {
  return (
    <Link
      to={`/article/${id}`}
      className="w-full flex justify-center gap-4 p-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-4 rounded-xl"
    >
      {cover && (
        <div className="flex items-center w-20 aspect-square rounded-sm">
          <img className="w-full h-full" alt={title} src={cover} />
        </div>
      )}
      <div className="flex-1">
        <div className="text-lg hover:underline">{title}</div>
        <div className="w-full pt-2 ellipsis-3 text-sm text-zinc-700 dark:text-zinc-400">
          {content.slice(0, 300)}
        </div>
      </div>
    </Link>
  )
}

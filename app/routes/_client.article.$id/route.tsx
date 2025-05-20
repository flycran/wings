import { LoaderFunctionArgs } from 'react-router'
import Markdown from '~/components/Markdown'
import { supabaseSSR } from '~/server/supabase'
import { Route } from './+types/route'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const supabase = supabaseSSR(request)

  const article = await supabase.from('articles').select().eq('id', +params.id!)

  if (article.error) {
    throw new Response('Not Found', { status: 404 })
  }

  return {
    ...article.data[0],
  }
}

export default function articleId({ loaderData }: Route.ComponentProps) {
  const { title, content } = loaderData

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
      <h1 className="my-6 font-bold text-4xl">{title}</h1>
      <div className="my-6">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  )
}

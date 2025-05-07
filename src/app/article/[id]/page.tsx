import { articles } from '@/articles/articles.json'
import Markdown from '@/components/Markdown'
import { getArticle } from '@/server/article'
import { redirect } from 'next/navigation'

export interface ArticleIdProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArticleId({ params }: ArticleIdProps) {
  const { id } = await params

  const article = await getArticle(id)

  if (!article) {
    return redirect('/404')
  }

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
      <h1 className='my-6 font-bold text-4xl'>{article.title}</h1>
      <div className='prose dark:prose-invert my-6 max-w-none'>
        <Markdown>{article.articleContent}</Markdown>
      </div>
    </div>
  )
}

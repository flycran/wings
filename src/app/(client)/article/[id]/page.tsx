import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle } from '~/server/article'
import { supabaseClient } from '~/utils/supabase'
import ArticleContent from './components/ArticleContent'

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params
  const { data: article } = await supabaseClient
    .from('articles')
    .select('title, describe')
    .eq('id', +id)
    .single()

  return {
    title: article?.title ? `${article.title} | Wings` : '文章详情 | Wings',
    description: article?.describe || 'Wings博客文章详情',
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params

  const { data: article, error } = await getArticle(id)

  if (error || !article) {
    notFound()
  }

  return <ArticleContent article={article} />
}

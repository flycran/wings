import { supabaseClient } from '~/utils/supabase'

export const getArticle = async (id: string) => {
  return supabaseClient
    .from('articles')
    .select(`
      *,
      article_columns!left(
        column_id,
        columns!inner(*)
      )
    `)
    .eq('id', +id)
    .single()
}

export type ArticleFull = Exclude<Awaited<ReturnType<typeof getArticle>>['data'], null>

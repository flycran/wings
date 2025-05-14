'use server'
import { Document } from 'flexsearch'
import { createClient } from '@supabase/supabase-js'

export type Article = {
  id: string
  title: string
  tags: string[]
  category: string
  articleContent: string
}

export const getArticle = async (id: string) => {
  const data = articles.find((e) => e.id === id)

  if (!data) {
    return null
  }

  return {
    ...data,
    articleContent: '',
  }
}

const articleDocument = new Document<Article>({
  document: {
    index: ['title', 'tags', 'category', 'articleContent'],
    store: ['title', 'articleContent', 'tags', 'category'],
  },
})

export interface SearchArticleParams {
  search: string
}

export const searchArticle = async ({
  search,
}: SearchArticleParams): Promise<{
  search: string
  result: Pick<Article, 'id' | 'title'>[]
}> => {
  const searchResult = await articleDocument.searchAsync(search, {
    suggest: true,
    limit: 20,
    enrich: true,
    merge: true,
  })
  return {
    search: search,
    result: searchResult.map((e) => ({
      id: e.id as string,
      title: e.doc!.title,
    })),
  }
}

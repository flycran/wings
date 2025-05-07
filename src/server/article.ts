'use server'
import { articles } from '@/articles/articles.json'
import { Document } from 'flexsearch'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type Article = {
  id: string
  title: string
  tags: string[]
  category: string
  articleContent: string
}

export const getArticle = async (id: string) => {
  const data = articles.find((e) => e.id === id)
  const articleContent = await readFile(path.resolve(__dirname, '../../../../src/articles', `${id}.md`), 'utf-8')

  if (!data) {
    return null
  }

  return {
    ...data,
    articleContent,
  }
}

const articleDocument = new Document<Article>({
  document: {
    index: ['title', 'tags', 'category', 'articleContent'],
    store: ['title', 'articleContent', 'tags', 'category'],
  },
})

const initArticleDocument = async () => {
  for (const article of articles) {
    const articleContent = await readFile(
      path.resolve(__dirname, '../../../../src/articles', `${article.id}.md`),
      'utf-8'
    )
    articleDocument.add({
      ...article,
      articleContent,
    })
  }
}

initArticleDocument()

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

import React from 'react'
import { IoIosShareAlt } from 'react-icons/io'
import { Link } from 'react-router'
import ImageHoverExpand from '~/components/ImageHoverExpand'
import MarkHighlight from '~/components/MarkHighlight'
import { getAbsoluteUrl } from '~/utils'
import { Tables } from '../../../types/supabase'

export type BaseArticle = Pick<
  Tables<'articles'>,
  'id' | 'title' | 'describe' | 'cover' | 'created_at' | 'updated_at'
>

export interface ArticleCardProps {
  article: BaseArticle
  query?: string
}

export default function ArticleCard({ article, query }: ArticleCardProps) {
  const to = `/article/${article?.id}`
  const share = () => {
    navigator.share({
      url: getAbsoluteUrl(to),
      title: article?.title,
    })
  }

  return (
    <Link
      to={`/article/${article?.id}`}
      className="flex p-4 gap-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-card"
    >
      {article.cover && (
        <ImageHoverExpand
          className="aspect-square min-w-0 min-h-0 w-32 dark:border-zinc-500"
          imageClassName="rounded"
        >
          {(rest) => <img {...rest} src={article.cover} alt={article.title} />}
        </ImageHoverExpand>
      )}
      <div className="flex-1 min-w-0">
        <div className="w-full ellipsis text-lg text-zinc-800 dark:text-zinc-300 hover:underline">
          {query ? <MarkHighlight text={article.title} query={query} /> : article.title}
        </div>
        <div className="w-full ellipsis-3 mt-2 text-sm text-zinc-600 dark:text-zinc-500">
          {query ? <MarkHighlight text={article.describe} query={query} /> : article.describe}
        </div>

        <div
          className="flex justify-end px-2 pt-3 pb-0 text-lg"
          onClick={(e) => e.preventDefault()}
        >
          <div className="w-12 h-5 flex justify-center items-center transition text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:dark:text-zinc-50">
            <IoIosShareAlt onClick={share} />
          </div>
        </div>
      </div>
    </Link>
  )
}

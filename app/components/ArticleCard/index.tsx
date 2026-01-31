import clsx from 'clsx'
import React from 'react'
import { GoShareAndroid } from 'react-icons/go'
import { Link } from 'react-router'
import ImageHoverExpand from '~/components/ImageHoverExpand'
import MarkHighlight from '~/components/MarkHighlight'
import Button from '~/components/ui/Button'
import { getAbsoluteUrl, getImageUrl } from '~/utils'
import { Tables } from '../../../types/supabase'

export type BaseArticle = Pick<
  Tables<'articles'>,
  'id' | 'title' | 'describe' | 'cover' | 'created_at' | 'updated_at'
>

export interface ArticleCardProps {
  article: BaseArticle
  query?: string
  showOperatebar?: boolean
}

export default function ArticleCard({ article, query, showOperatebar }: ArticleCardProps) {
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
      className="flex p-4 gap-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg"
    >
      {article.cover && (
        <ImageHoverExpand
          className={clsx('aspect-square min-w-0 min-h-0', showOperatebar ? 'w-32' : 'w-24')}
          imageClassName="rounded"
        >
          {(rest) => <img {...rest} src={getImageUrl(article.cover)} alt={article.title} />}
        </ImageHoverExpand>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="w-full ellipsis text-lg text-fore dark:text-fore-dark hover:underline">
          {query ? <MarkHighlight text={article.title} query={query} /> : article.title}
        </div>
        <div className="w-full ellipsis-3 mt-2 text-sm text-fore-describe dark:text-fore-describe-dark">
          {query ? <MarkHighlight text={article.describe} query={query} /> : article.describe}
        </div>
        <div className="flex-1 flex items-center min-h-4" />
        {showOperatebar && (
          <div className="flex justify-end px-2 pb-0 text-lg" onClick={(e) => e.preventDefault()}>
            <div className="w-12 flex text-[0.5rem] justify-center items-center transition text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:dark:text-zinc-50">
              <Button
                color="success"
                size="responsive"
                variant="text"
                icon={<GoShareAndroid />}
                onClick={share}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

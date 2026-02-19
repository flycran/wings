import { AnimatePresence } from 'motion/react'
import { GoSearch } from 'react-icons/go'
import { Chat, InstantSearch, useHits, useSearchBox } from 'react-instantsearch'
import ArticleCard, { BaseArticle } from '~/components/ArticleCard'
import MotionDiv from '~/components/motion/MotionDiv'
import Input from '~/components/ui/Input'
import webConfig from '~/config/web'
import { algoliaClient } from '~/utils/algolia'
import 'instantsearch.css/themes/algolia-min.css'

const SearchBox = () => {
  const { query, refine } = useSearchBox()

  return (
    <>
      <Input
        className="bg-zinc-100 dark:bg-zinc-800"
        size="large"
        prefix={<GoSearch />}
        value={query}
        allowClear
        onChange={refine}
      />
      <Hits query={query} />
    </>
  )
}

const Hits = ({ query }: { query?: string }) => {
  const { items } = useHits<BaseArticle>()
  return (
    <MotionDiv layout className="flex flex-col gap-2 mt-6">
      <AnimatePresence mode="popLayout">
        {items.map((article) => (
          <MotionDiv
            key={article.id}
            layout
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{
              duration: 0.18,
              ease: 'easeOut',
            }}
          >
            <ArticleCard query={query} article={article} />
          </MotionDiv>
        ))}
      </AnimatePresence>
    </MotionDiv>
  )
}

export default function Search() {
  return (
    <InstantSearch indexName="articles" searchClient={algoliaClient}>
      <SearchBox />
    </InstantSearch>
  )
}

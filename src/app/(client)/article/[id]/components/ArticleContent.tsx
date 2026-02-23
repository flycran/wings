import type { RootContent } from 'hast'
import Link from 'next/link'
import slug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import ArticleSildeContainer from '~/app/(client)/article/[id]/components/ArticleSildeContainer'
import Markdown from '~/components/ui/Markdown'
import { ArticleFull } from '~/server/article'
import { getImageUrl } from '~/utils'

interface TocItem {
  id: string
  depth: number
  value: string
}

interface ArticleContentProps {
  article: ArticleFull
}

export default async function ArticleContent({ article }: ArticleContentProps) {
  const { title, article_columns, content } = article
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(slug)
  const root = processor.parse(content)
  const tree = await processor.run(root, content)

  const toc: TocItem[] = []
  const visit = (node: RootContent) => {
    if (node.type === 'element') {
      if (/^h[1-6]$/.test(node.tagName)) {
        const depth = Number.parseInt(node.tagName.charAt(1))
        const value = node.children?.find((c) => c.type === 'text')?.value || ''
        const id = (node.properties?.id as string) || ''
        toc.push({
          id,
          depth,
          value,
        })
      }
    }
  }
  tree.children.forEach((child) => visit(child))

  return (
    <div className="flex max-md:flex-col justify-center gap-4 max-md:px-4 max-md:pt-18">
      <div className="md:flex-1" />
      <div className="w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
        <h1 className="my-6 font-bold text-4xl">{title}</h1>
        <div className="my-6 min-h-screen">
          <Markdown tree={tree} />
        </div>
      </div>
      <div className="md:flex-1">
        <ArticleSilder toc={toc} article_columns={article_columns} />
      </div>
    </div>
  )
}

function ArticleSilder({
  toc,
  article_columns,
}: {
  toc: TocItem[]
  article_columns: ArticleFull['article_columns']
}) {
  const columnsElement = article_columns.map(
    ({ columns: { name, cover, description }, column_id: id }) => (
      <div key={id} className="flex h-26 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full aspect-square">
          <img
            src={cover ? getImageUrl(cover) : '/no-data.svg'}
            alt={name}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        {description ? (
          <div className="flex flex-col justify-between flex-1 w-0 pl-3">
            <h4 className="text-lg font-bold ellipsis">{name}</h4>
            <div className="text-xs ellipsis-3 w-full">{description}</div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center flex-1 w-0">
            <h4 className="text-lg font-bold ellipsis">{name}</h4>
          </div>
        )}
      </div>
    )
  )

  return (
    <ArticleSildeContainer>
      <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-4 rounded-xl">
        <div>目录:</div>
        <menu className="flex flex-col gap-2 ">
          {toc.map((e) => (
            <li
              key={e.id}
              style={{
                paddingLeft: `${e.depth - 1}rem`,
              }}
              className="hover:underline"
            >
              <Link href={`#${e.id}`}>{e.value}</Link>
            </li>
          ))}
        </menu>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {article_columns.length ? (
          columnsElement
        ) : (
          <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3">暂未收录到专栏</div>
        )}
      </div>
    </ArticleSildeContainer>
  )
}

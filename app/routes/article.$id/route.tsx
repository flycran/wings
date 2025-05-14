import Markdown from '~/components/Markdown'
import { LoaderFunctionArgs } from 'react-router'
import { useLoaderData } from 'react-router'

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    id: params.id,
  }
}

export default async function articleId() {
  const { id } = useLoaderData<typeof loader>()

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl">
      <h1 className="my-6 font-bold text-4xl">{id}</h1>
      <div className="prose dark:prose-invert my-6 max-w-none">
        <Markdown>{id}</Markdown>
      </div>
    </div>
  )
}

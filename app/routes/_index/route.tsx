import FirstScreen from '@/routes/_index/components/FirstScreen'
import { getHomeData } from '@/server/home'
import { useLoaderData } from '@remix-run/react'

export const loader = async () => {
  const homeData = await getHomeData()

  return {
    ...homeData,
  }
}

export default function index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
      <FirstScreen data={data} />
      {/*<div className="py-4">*/}
      {/*  <HomeGridShow data={homeData} />*/}
      {/*</div>*/}
    </div>
  )
}

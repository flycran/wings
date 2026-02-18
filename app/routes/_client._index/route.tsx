import { useLoaderData } from 'react-router'
import { getHomeData } from '~/server/home'
import FirstScreen from './components/FirstScreen'
import HomeGridShow from './components/HomeGridShow'

export const loader = async () => {
  const homeData = await getHomeData()

  return {
    ...homeData,
  }
}

export default function index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="max-w-screen overflow-hidden relative">
      <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
        <FirstScreen data={data} />
        <div className="py-4">
          <HomeGridShow data={data} />
        </div>
      </div>
    </div>
  )
}

import { getHomeData } from '~/server/home'
import FirstScreen from './components/FirstScreen'
import HomeGridShow from './components/HomeGridShow'

export default async function HomePage() {
  const homeData = await getHomeData()

  return (
    <div className="max-w-screen overflow-hidden relative">
      <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
        <FirstScreen data={homeData} />
        <div className="py-4">
          <HomeGridShow data={homeData} />
        </div>
      </div>
    </div>
  )
}

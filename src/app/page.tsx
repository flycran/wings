import FirstScreen from '@/app/components/FirstScreen'
import HomeGridShow from '@/app/components/HomeGridShow'
import { getHomeData } from '@/server/home'

export default async function Home() {
  const homeData = await getHomeData()

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl">
      <FirstScreen data={homeData} />
      <div className="py-4">
        <HomeGridShow data={homeData} />
      </div>
    </div>
  )
}

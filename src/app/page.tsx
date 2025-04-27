'use client'
import HomeCrane from '@/app/components/HomeCrane'
import HomeGridShow from '@/app/components/HomeGridShow'
import HomeTitle from '@/app/components/HomeTitle'
import WheelNext from '@/app/components/WheelNext'

export default function Home() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-evenly">
        <HomeTitle />
        <div className="relative flex justify-between">
          <div>
            <div className="absolute bottom-0 left-0 flex h-30 w-40 flex-col justify-between rounded-xl bg-white p-5 shadow-md">
              <div className="text-crane-blue text-4xl font-bold">9578</div>
              <div className="text-lg text-gray-600">总访问量</div>
            </div>
          </div>
          <HomeCrane />
        </div>
        <WheelNext />
      </div>
      <div className="py-4">
        <HomeGridShow />
      </div>
    </>
  )
}

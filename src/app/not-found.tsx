'use client'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'
import MotionDiv from '~/components/motion/MotionDiv'
import FlyingCrane from '~/icons/FlyingCrane'

export default function NotFound() {
  return (
    <div className="m-auto flex min-h-screen w-[calc(100vw-2rem)] flex-col items-center justify-center lg:w-2xl xl:w-4xl 2xl:w-6xl">
      {/* 背景装饰 */}
      <div className="-z-2 absolute top-0 left-0 h-screen w-full overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="absolute right-20/100 top-30/100 h-80 w-80 rounded-full bg-crane-green/5 dark:bg-crane-blue/5"
        />
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.6,
            delay: 0.1,
          }}
          className="absolute right-5/100 top-50/100 h-60 w-60 rounded-full bg-crane-blue/8 dark:bg-crane-orange/5"
        />
      </div>

      {/* 主内容 */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', visualDuration: 0.4 }}
        className="flex flex-col items-center"
      >
        {/* 飞鹤图标 */}
        <MotionDiv
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', visualDuration: 0.5, delay: 0.2 }}
          className="mb-6 w-32"
        >
          <FlyingCrane />
        </MotionDiv>

        {/* 404 数字 */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', visualDuration: 0.4, delay: 0.1 }}
          className="mb-4 font-bold text-8xl text-crane-blue"
        >
          404
        </MotionDiv>

        {/* 提示文字 */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-xl text-fore dark:text-fore-dark">页面飞走了</p>
          <p className="text-fore-describe dark:text-fore-describe-dark">
            你访问的页面不存在或已被移除
          </p>
        </MotionDiv>

        {/* 返回首页按钮 */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', visualDuration: 0.4, delay: 0.4 }}
        >
          <Link
            href="/public"
            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-6 py-3 font-medium text-fore transition-all hover:bg-crane-blue hover:text-white dark:bg-zinc-800 dark:text-fore-dark dark:hover:bg-crane-blue"
          >
            <ArrowBack />
            <span> 返回首页</span>
          </Link>
        </MotionDiv>
      </MotionDiv>
    </div>
  )
}

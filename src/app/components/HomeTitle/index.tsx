'use client'
import MotionDiv from '@/components/motion/MotionDiv'

export default function HomeTitle() {
  return (
    <div className="relative z-1 flex justify-around">
      <div className="text-right">
        <MotionDiv
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="line rounded-xl text-[3rem]/[1.3] font-bold text-white shadow-sm select-none sm:text-[6rem]/[1.3] lg:text-[8rem]/[1.3]"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="bg-crane-blue inline-block rounded-l-xl pr-3 pl-5">FLY</span>
          <span className="bg-crane-orange inline-block rounded-r-xl pr-5 pl-3">CRAN</span>
        </MotionDiv>
        <MotionDiv
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="pt-3 pb-4 text-[1.75rem] font-bold text-zinc-600 sm:text-[2.5rem] lg:text-[3rem] dark:text-zinc-300"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="relative py-1">
            <span className="relative text-transparent">Flying crane</span>
            <svg className="absolute top-0 left-0 -z-1 h-full w-full py-1 select-none" width="100%" height="100%">
              <text x="0" y="0" alignmentBaseline="text-before-edge" className="fill-none stroke-current stroke-1">
                Flying crane
              </text>
            </svg>
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="text-[1.2rem] text-zinc-800 sm:text-[1.6rem] lg:text-[2rem] dark:text-zinc-300"
        >
          译为飞鹤&nbsp;&nbsp;意为自由
        </MotionDiv>
      </div>
    </div>
  )
}

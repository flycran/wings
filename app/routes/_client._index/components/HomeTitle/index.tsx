import MotionDiv from '~/components/motion/MotionDiv'

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
          className="line select-none rounded-xl font-bold text-[4rem]/[1.3] text-white shadow-sm sm:text-[6rem]/[1.3] lg:text-[8rem]/[1.3]"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="inline-block rounded-l-xl bg-crane-blue pr-3 pl-5">FLY</span>
          <span className="inline-block rounded-r-xl bg-crane-orange pr-5 pl-3">CRAN</span>
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
          className="pt-1 md:pt-3 pb-1 md:pb-4 font-bold text-[1.75rem] text-zinc-600 sm:text-[2.5rem] lg:text-[3rem] dark:text-zinc-300"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="relative py-1">
            <span className="relative text-transparent">Flying crane</span>
            <svg
              className="-z-1 absolute top-0 left-0 h-full w-full select-none py-1"
              width="100%"
              height="100%"
            >
              <text
                x="0"
                y="0"
                alignmentBaseline="text-before-edge"
                className="fill-none stroke-1 stroke-current"
              >
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

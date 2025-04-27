import { motion } from 'motion/react'

export default function HomeTitle() {
  return (
    <div className="relative z-1 flex justify-around">
      <div className="text-right">
        <motion.div
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
          className="line rounded-xl text-[8rem]/[1.3] font-bold text-white shadow-sm select-none"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="bg-crane-blue inline-block rounded-l-xl pr-3 pl-5">FLY</span>
          <span className="bg-crane-orange inline-block rounded-r-xl pr-5 pl-3">CRAN</span>
        </motion.div>
        <motion.div
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
          className="pt-3 pb-4 text-5xl font-bold text-transparent"
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          <span className="relative py-1 text-transparent">
            <span className="relative -z-1">Flying crane</span>
            <svg className="absolute top-0 left-0 h-full w-full py-1" width="100%" height="100%">
              <text x="0" y="0" alignmentBaseline="text-before-edge" className="fill-none stroke-gray-600 stroke-1">
                Flying crane
              </text>
            </svg>
          </span>
        </motion.div>
        <motion.div
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
          className="text-[2rem] text-gray-600 shadow-gray-800"
        >
          译为飞鹤&nbsp;&nbsp;意为自由
        </motion.div>
      </div>
    </div>
  )
}

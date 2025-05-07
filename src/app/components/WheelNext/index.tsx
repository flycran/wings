'use client'
import MotionDiv from '@/components/motion/MotionDiv'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'

export default function WheelNext() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const toNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {scrollY < 300 && (
        <MotionDiv
          initial={{
            y: -20,
            opacity: 0,
          }}
          whileHover={{
            y: 10,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -20,
            opacity: 0,
          }}
          className="-translate-x-1/2 absolute bottom-3 left-1/2 z-1 flex cursor-pointer flex-col items-center gap-1 text-crane-orange drop-shadow"
          onClick={toNext}
        >
          <div className="flex h-15 w-6 justify-center rounded-full bg-current pt-7">
            <div className="h-6 w-3 rounded-full bg-white" />
          </div>
          <GoTriangleDown size={20} />
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}

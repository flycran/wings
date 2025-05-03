import MotionDiv from '@/components/motion/MotionDiv'
import clsx from 'clsx'
import { useAnimate } from 'motion/react'
import { type Ref, useImperativeHandle } from 'react'
import { GoArrowRight } from 'react-icons/go'

export interface SlideArrowRef {
  play: () => void
}

export interface SlideArrowProps {
  ref?: Ref<SlideArrowRef>
  size?: number
  className?: string
}

export default function SlideArrow({ ref, size, className }: SlideArrowProps) {
  const [scope, animate] = useAnimate()

  const play = () => {
    animate(
      scope.current,
      { x: ['-1em', 0] },
      {
        duration: 0.4,
      }
    )
  }

  useImperativeHandle(ref, () => ({
    play,
  }))
  return (
    <MotionDiv ref={scope} className={clsx('flex gap-1', className)} style={{ fontSize: size }}>
      <GoArrowRight className="flex-shrink-0" />
      <GoArrowRight className="flex-shrink-0" />
    </MotionDiv>
  )
}

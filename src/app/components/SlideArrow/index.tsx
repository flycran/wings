import classNames from 'classnames'
import { motion, useAnimate } from 'motion/react'
import { RefObject, useImperativeHandle } from 'react'
import { GoArrowRight } from 'react-icons/go'

export interface SlideArrowRef {
  play: () => void
}

export interface SlideArrowProps {
  ref?: RefObject<SlideArrowRef | null>
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
    <motion.div ref={scope} className={classNames('flex gap-1', className)} style={{ fontSize: size }}>
      <GoArrowRight className="flex-shrink-0" />
      <GoArrowRight className="flex-shrink-0" />
    </motion.div>
  )
}

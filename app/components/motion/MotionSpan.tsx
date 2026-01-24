import { motion } from 'motion/react'
import { ComponentProps, HTMLAttributes } from 'react'

export type MotionSpanProps = Pick<
  ComponentProps<typeof motion.span>,
  'animate' | 'initial' | 'exit' | 'transition' | 'whileHover' | 'whileTap' | 'layout'
> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>

const MotionSpan = (props: MotionSpanProps) => {
  return <motion.span {...props} />
}

export default MotionSpan

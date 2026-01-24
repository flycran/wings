import { motion } from 'motion/react'
import { ComponentProps, HTMLAttributes } from 'react'

export type MotionButtonProps = Pick<
  ComponentProps<typeof motion.button>,
  'animate' | 'initial' | 'exit' | 'transition' | 'whileHover' | 'whileTap' | 'layout'
> &
  Omit<
    HTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  >

const MotionButton = (props: MotionButtonProps) => {
  return <motion.button {...props} />
}

export default MotionButton

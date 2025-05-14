import { motion } from 'motion/react'
import { ComponentProps } from 'react'

export interface MotionSpanProps extends ComponentProps<typeof motion.span> {}

const MotionSpan = (props: MotionSpanProps) => {
  return <motion.span {...props} />
}

export default MotionSpan

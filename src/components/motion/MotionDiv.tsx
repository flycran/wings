'use client'
import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

export type MotionDivProps = ComponentProps<typeof motion.div>

const MotionDiv = (props: MotionDivProps) => {
  return <motion.div {...props} />
}

export default MotionDiv

'use client'
import { motion } from 'motion/react'
import { ComponentProps } from 'react'

export type MotionButtonProps = ComponentProps<typeof motion.button>

const MotionButton = (props: MotionButtonProps) => {
  return <motion.button {...props} />
}

export default MotionButton

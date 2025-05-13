import { motion } from 'motion/react'

interface MyComponentProps {
  children: React.ReactNode
  ref: React.Ref<HTMLDivElement>
  myParam: number
}

function MyComponent({ children, ref }: MyComponentProps) {
  return <div ref={ref}>{children}</div>
}

const MotionMyComponent = motion.create(MyComponent)

export default function App() {
  return <MotionMyComponent myParam={1} />
}

import Crane from '@/app/components/Crane'
import MotionDiv from '@/components/motion/MotionDiv'

export default function HomeCrane() {
  return (
    <MotionDiv
      initial={{
        y: -100,
        x: 50,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        visualDuration: 0.3,
      }}
      viewport={{ once: true }}
    >
      <Crane />
    </MotionDiv>
  )
}

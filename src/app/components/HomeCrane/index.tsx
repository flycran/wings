import Crane from '@/app/components/Crane'
import { motion } from 'motion/react'

export default function HomeCrane() {
  return (
      <motion.div
        initial={ {
          y: -100,
          x: 50,
          opacity: 0,
        } }
        whileInView={ {
          y: 0,
          x: 0,
          opacity: 1,
        } }
        transition={ {
          type: 'spring',
          visualDuration: 0.3,
        } }
        viewport={ { once: true } }
      >
        <Crane />
      </motion.div>
  )
}

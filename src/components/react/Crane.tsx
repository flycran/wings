import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'motion/react'
import styles from './Crane.module.css'

interface CraneProps {
  className?: string
}

const hoverTarget = { '--angle': '120deg', y: -18 } as const
const restTarget = { '--angle': '50deg', y: 0 } as const

export default function Crane({ className = '' }: CraneProps) {
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -90, x: 40 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ type: 'spring', visualDuration: 0.35 }}
    >
      <motion.button
        type="button"
        className={styles.craneButton}
        aria-label="纸鹤，点一下扇动翅膀"
        style={{ '--angle': '50deg' } as CSSProperties}
        initial={restTarget as never}
        whileHover={canHover ? (hoverTarget as never) : undefined}
        whileTap={hoverTarget as never}
        transition={{ type: 'spring', visualDuration: 0.2 }}
      >
        <div className={styles.craneViewport}>
          <div className={styles.crane}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.57 294">
              <polygon
                points="53.53 121.83 201.35 121.83 161.87 210.48 53.53 121.83"
                className={styles.color2}
              />
              <polygon points="0 65.73 45.56 81.27 38.18 43.69 0 65.73" className={styles.color1} />
              <polygon
                points="38.18 43.69 201.35 121.83 53.53 121.83 38.18 43.69"
                className={styles.color2}
              />
              <polygon
                points="154.54 227.01 215.53 294 201.35 121.83 154.54 227.01"
                className={styles.color1}
              />
            </svg>
            <svg
              className={styles.wingOne}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 348.57 294"
            >
              <polygon points="201.35 0 348.57 0 201.35 121.83 201.35 0" className={styles.color2} />
              <polygon
                points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
                className={styles.color1}
              />
            </svg>
            <svg
              className={styles.wingTwo}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 348.57 294"
            >
              <polygon points="201.35 0 348.57 0 201.35 121.83 201.35 0" className={styles.color2} />
              <polygon
                points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
                className={styles.color1}
              />
            </svg>
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}

import clsx from 'clsx'
import MotionDiv from '~/components/motion/MotionDiv'
import styles from './crane.module.css'
import { useMediaQuery } from '@mui/material'

export default function Crane() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <MotionDiv
      className={clsx(styles.frameCraneContainer)}
      initial={{
        '--angle': '50deg',
      }}
      whileTap={
        isMobile
          ? {
              '--angle': '120deg',
              y: -20,
            }
          : undefined
      }
      whileHover={
        isMobile
          ? undefined
          : {
              '--angle': '120deg',
              y: -20,
            }
      }
      transition={{ visualDuration: 0.2, type: 'spring' }}
    >
      <div className={styles.frameCraneAdjustView}>
        <div className={styles.frameCrane}>
          <svg xmlns="http://www.w3.org/2000/svg" id="b" viewBox="0 0 348.57 294">
            <polygon
              points="53.53 121.83 201.35 121.83 161.87 210.48 53.53 121.83"
              className={styles.frameCraneColor2}
              strokeWidth="0"
            />
            <polygon
              points="0 65.73 45.56 81.27 38.18 43.69 0 65.73"
              className={styles.frameCraneColor1}
              strokeWidth="0"
            />
            <polygon
              points="38.18 43.69 201.35 121.83 53.53 121.83 38.18 43.69"
              className={styles.frameCraneColor2}
              strokeWidth="0"
            />
            <polygon
              points="154.54 227.01 215.53 294 201.35 121.83 154.54 227.01"
              className={styles.frameCraneColor1}
              strokeWidth="0"
            />
          </svg>
          <svg
            className={styles.frameCraneWings1}
            xmlns="http://www.w3.org/2000/svg"
            id="b"
            viewBox="0 0 348.57 294"
          >
            <polygon
              points="201.35 0 348.57 0 201.35 121.83 201.35 0"
              className={styles.frameCraneColor2}
              strokeWidth="0"
            />
            <polygon
              points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
              className={styles.frameCraneColor1}
              strokeWidth="0"
            />
          </svg>
          <svg
            className={styles.frameCraneWings2}
            xmlns="http://www.w3.org/2000/svg"
            id="b"
            viewBox="0 0 348.57 294"
          >
            <polygon
              points="201.35 0 348.57 0 201.35 121.83 201.35 0"
              className={styles.frameCraneColor2}
              strokeWidth="0"
            />
            <polygon
              points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
              className={styles.frameCraneColor1}
              strokeWidth="0"
            />
          </svg>
        </div>
      </div>
    </MotionDiv>
  )
}

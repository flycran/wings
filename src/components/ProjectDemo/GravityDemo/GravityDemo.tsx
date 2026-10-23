import { type CSSProperties, useEffect, useState } from 'react'
import { m } from '@/paraglide/messages'
import shared from '../demo.module.css'
import styles from './GravityDemo.module.css'

const cells = Array.from({ length: 112 }, (_, index) => ({
  index,
  falling: index % 17 < 3,
  bright: index % 11 === 0,
  delay: (index % 13) * 55,
}))

export default function GravityDemo() {
  const [running, setRunning] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRunning(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`${shared.demo} ${styles.demo}${running ? ` ${styles.running}` : ''}`}>
      <div className={shared.head}>
        <span>LIVE SVG / github-gravity</span>
        <button
          className={`${styles.badge} ${styles.action}`}
          type="button"
          onClick={() => setRun((value) => value + 1)}
        >
          {m.demoGravityReplay()}
        </button>
      </div>
      <div className={styles.stage} aria-hidden="true" key={run}>
        <div className={styles.text}>FLY</div>
        <div className={styles.grid}>
          {cells.map((cell) => (
            <span
              key={cell.index}
              className={[
                styles.cell,
                cell.falling ? styles.isFalling : '',
                cell.bright ? styles.isBright : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--d': `${cell.delay}ms` } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

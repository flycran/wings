import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import styles from './index.module.css'

export interface LoadingProps extends HTMLAttributes<SVGSVGElement> {}

export default function Loading(props: LoadingProps) {
  return (
    <svg {...props} className={clsx(styles.svg, props.className)} viewBox="25 25 50 50">
      <circle className={styles.circle} cx="50" cy="50" r="20" />
    </svg>
  )
}

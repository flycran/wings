import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
import styles from './index.module.css'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

export default function Skeleton(props: SkeletonProps) {
  return (
    <div {...props} className={clsx(styles.skeleton, props.className)}>
      {props.children}
    </div>
  )
}

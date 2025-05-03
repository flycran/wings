import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import styles from './index.module.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export default function Skeleton(props: SkeletonProps) {
  return (
    <div {...props} className={clsx(styles.skeleton, props.className)}>
      {props.children}
    </div>
  )
}

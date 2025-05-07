import clsx from 'clsx'
import { HTMLAttributes } from 'react'

export interface JuejinProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function Juejin({ className, size, ...rest }: JuejinProps) {
  return (
    <svg
      {...rest}
      className={clsx('h-[1em] w-[1em] fill-current', className)}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
      }}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 14.316 7.454-5.88-2.022-1.625L12 11.1l-.004.003-5.432-4.288-2.02 1.624 7.452 5.88Zm0-7.247 2.89-2.298L12 2.453l-.004-.005-2.884 2.318 2.884 2.3Zm0 11.266-.005.002-9.975-7.87L0 12.088l.194.156 11.803 9.308 7.463-5.885L24 12.085l-2.023-1.624Z"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  )
}

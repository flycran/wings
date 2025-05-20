import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'
import Loading from '~/components/Loading'
import { PortalBody } from '~/components/PortalBody'

export interface FullScreenLoadingProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  loading?: boolean
  title?: string
}

export default function FullScreenLoading({
  children,
  loading,
  className,
  title,
  ...rest
}: FullScreenLoadingProps) {
  return (
    <div {...rest} className={clsx('relative', className)}>
      {loading ? (
        <PortalBody>
          <div className="absolute top-0 left-0 w-full min-h-screen flex flex-col items-center justify-center">
            <Loading />
            {title && <h6 className="mt-6 text-lg text-crane-blue">{title}</h6>}
          </div>
        </PortalBody>
      ) : (
        children
      )}
    </div>
  )
}

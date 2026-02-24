import { ReactNode } from 'react'
import Loading from '~/components/Loading'
import { PortalBody } from '~/components/PortalBody'

export interface FullScreenLoadingProps {
  children: ReactNode
  loading?: boolean
  title?: string
}

export default function FullScreenLoading({ children, loading, title }: FullScreenLoadingProps) {
  return loading ? (
    <PortalBody>
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
        <Loading />
        {title && <h6 className="mt-6 text-lg text-crane-blue">{title}</h6>}
      </div>
    </PortalBody>
  ) : (
    children
  )
}

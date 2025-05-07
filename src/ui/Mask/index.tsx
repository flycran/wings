import { PortalBody } from '@/components/PortalBody'
import { ReactNode } from 'react'

export interface MaskProps {
  children?: ReactNode
}

export default function Mask({ children }: MaskProps) {
  return (
    <PortalBody>
      <div className="fixed z-1000 w-full h-full top-0 left-0 flex justify-center items-center bg-black/40">
        {children}
      </div>
    </PortalBody>
  )
}

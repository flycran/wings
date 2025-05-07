'use client'
import { usePortal } from '@/hooks/portal'
import { Key, ReactNode } from 'react'

export interface PortalBodyProps {
  children: ReactNode
  key?: Key | null
}

export function PortalBody({ children, key }: PortalBodyProps) {
  return usePortal(children, () => document.body, key)
}

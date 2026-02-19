import { createContext, ReactNode } from 'react'

export interface DialogContextProps {
  update: (key: string, node: ReactNode) => void
  mount: (key: string) => void
  unmount: (key: string) => void
}

export const DialogContext = createContext<DialogContextProps | null>(null)

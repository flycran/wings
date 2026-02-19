'use client'
import { ReactNode, useMemo, useState } from 'react'
import { DialogContext, DialogContextProps } from '~/components/ui/DialogProvider/DialogContext'

export interface ModalProviderProps {
  children?: ReactNode
}

interface DialogMate {
  node: ReactNode
  key: string
}

export default function DialogProvider({ children }: ModalProviderProps) {
  const [dialogs, setDialogs] = useState<DialogMate[]>([])

  const context: DialogContextProps = useMemo(
    () => ({
      update(key, node) {
        setDialogs((prev) =>
          prev.map((e) =>
            e.key === key
              ? {
                  key,
                  node,
                }
              : e
          )
        )
      },
      mount(key) {
        setDialogs((prev) => [
          ...prev,
          {
            key,
            node: null,
          },
        ])
      },
      unmount(key) {
        setDialogs((prev) => prev.filter((item) => item.key !== key))
      },
    }),
    []
  )

  return (
    <DialogContext value={context}>
      {children}
      <div>{dialogs.map((e) => e.node)}</div>
    </DialogContext>
  )
}

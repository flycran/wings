import { useCallback, useContext, useEffect, useState } from 'react'
import { DialogContext } from '~/components/ui/DialogProvider/DialogContext'
import { useKey } from '~/components/ui/hooks'
import Modal, { ModalProps } from '~/components/ui/Modal'

export const useModal = (props: Omit<ModalProps, 'open'>) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('useModal must be used within a DialogProvider.')
  const key = useKey()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    context.mount(key)

    return () => {
      context.unmount(key)
    }
  }, [context])

  useEffect(() => {
    context.update(
      key,
      <Modal
        {...props}
        key={key}
        open={isOpen}
        onClose={() => {
          props.onClose?.()
          setIsOpen(false)
        }}
      />
    )
  }, [context, props, isOpen])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    // 打开
    open,
    // 关闭
    close,
    // 状态
    isOpen,
  }
}

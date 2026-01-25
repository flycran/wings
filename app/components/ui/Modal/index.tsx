import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import { ReactNode } from 'react'
import MotionDiv from '~/components/motion/MotionDiv'
import Button from '~/components/ui/Button'
import Dialog from '~/components/ui/Dialog'

export interface ModalProps {
  children?: ReactNode
  title?: ReactNode
  describe?: ReactNode
  operates?: ReactNode
  okText?: boolean
  cancelText?: boolean
  closeOnMaskClick?: boolean
  onOk?: () => void
  onCancel?: () => void
  open?: boolean
  onClose?: () => void
  hiddenCancel?: boolean
}

export default function Modal({
  children,
  operates,
  okText,
  cancelText,
  onOk,
  onCancel,
  open,
  onClose,
  hiddenCancel,
  closeOnMaskClick,
  title,
  describe,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog onClickMask={closeOnMaskClick ? () => onClose?.() : undefined}>
          <MotionDiv
            initial={{
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
            }}
            className="p-4 rounded-xl bg-popover dark:bg-popover-dark shadow-popover dark:shadow-popover-dark min-w-50 xl:min-w-80"
          >
            <div>
              {children ?? (
                <div>
                  <h3 className="text-lg font-bold text-center">{title}</h3>
                  <div className="mt-3">{describe}</div>
                </div>
              )}
            </div>
            <div
              className={clsx('flex items-center justify-center gap-2', {
                'mt-4': operates !== false,
              })}
            >
              {operates ?? (
                <>
                  {!hiddenCancel && (
                    <Button
                      variant="outlined"
                      color="text"
                      block
                      onClick={() => {
                        onCancel?.()
                        onClose?.()
                      }}
                    >
                      {cancelText ?? '取消'}
                    </Button>
                  )}
                  <Button
                    color="primary"
                    block
                    onClick={() => {
                      onOk?.()
                      onClose?.()
                    }}
                  >
                    {okText ?? '确认'}
                  </Button>
                </>
              )}
            </div>
          </MotionDiv>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

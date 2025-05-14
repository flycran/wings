import MotionDiv from '@/components/motion/MotionDiv'
import MotionSpan from '@/components/motion/MotionSpan'
import Button from '@/ui/Button'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { ReactNode, useState } from 'react'

const MotionButton = motion.create(Button)

export interface PopconfirmProps {
  title?: ReactNode
  content?: ReactNode
}

export default function Popconfirm({
  title = '确认进行该操作吗？',
  content = '该操作可能无法撤回',
}: PopconfirmProps) {
  const [open, setOpen] = useState(false)

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        type: 'spring',
        bounce: 0,
      }}
    >
      <span className="relative inline-block">
        <Button
          color="danger"
          shape="round"
          block
          onClick={() => {
            setOpen(true)
          }}
        >
          {open ? '确认删除' : '删除'}
        </Button>
        <AnimatePresence>
          {open && (
            <MotionDiv
              layoutId="modal"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute bottom-0 left-0 w-80 p-3 rounded-xl  bg-popover dark:bg-popover-dark shadow-popover"
            >
              <MotionDiv
                layout
                exit={{
                  y: 90,
                }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm">{content}</p>
                <div className="flex justify-center gap-3">
                  <MotionButton
                    className="flex-1"
                    block
                    shape="round"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    取消
                  </MotionButton>
                  <MotionButton
                    layoutId="button"
                    block
                    shape="round"
                    color="danger"
                    className="flex-1"
                    style={{
                      borderRadius: 999,
                    }}
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <MotionSpan layoutId="button-text">删除</MotionSpan>
                  </MotionButton>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </span>
    </MotionConfig>
  )
}

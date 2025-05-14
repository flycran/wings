import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useState } from 'react'

export default function AnimatedDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const buttonText = '确认'
  const buttonHeight = 'py-3' // Height class
  const buttonRounded = 'rounded-lg' // Border radius class

  return (
    <MotionConfig
      transition={{
        duration: 2,
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={openDialog}
              className={`${buttonHeight} px-20 font-medium text-white bg-blue-600 ${buttonRounded} shadow-md hover:bg-blue-700 focus:outline-none`}
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: 20,
                transition: { duration: 0.2 },
              }}
              layoutId="confirmButton"
            >
              {buttonText}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={closeDialog}
              />

              {/* Dialog */}
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{
                    scale: 0.95,
                    y: 10,
                    transition: { duration: 0.2 },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Dialog header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">对话框标题</h2>
                    <button
                      onClick={closeDialog}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Dialog content */}
                  <div className="mb-6">
                    <p className="text-gray-700 mb-4">
                      这是一个使用framer-motion实现的动画对话框。
                    </p>
                    <p className="text-gray-700">
                      打开按钮会无缝过渡到确认按钮，保持相同的高度、圆角和内容。
                    </p>
                  </div>

                  {/* Dialog footer */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeDialog}
                      className={`px-4 ${buttonHeight} text-gray-700 border border-gray-300 ${buttonRounded} hover:bg-gray-100`}
                    >
                      取消
                    </button>

                    {/* Confirm button that transitions from the open button */}
                    <motion.button
                      onClick={closeDialog}
                      className={`px-4 ${buttonHeight} font-medium text-white bg-blue-600 ${buttonRounded} hover:bg-blue-700`}
                      layoutId="confirmButton"
                    >
                      {buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

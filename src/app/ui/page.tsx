'use client'
import Button from '@/ui/Button'
import Popconfirm from '@/ui/Popconfirm'
import { presetColors, sizes, variants } from '@/ui/utils'
import { useEffect, useState } from 'react'
import { GoDash, GoMortarBoard, GoPlus } from 'react-icons/go'
import NumberAnimation from '../../components/NumberAnimation'

export default function Ui() {
  const [number, setNumber] = useState(0)
  const [number2, setNumber2] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl p-8">
      <div className="grid gap-4 grid-cols-5 w-190">
        {sizes.map((size) =>
          presetColors.map((color) =>
            variants.map((variant) => (
              <div key={`${size}-${color}-${variant}`} className="text-center">
                <Button icon={<GoMortarBoard />} variant={variant} color={color} size={size}>
                  一个按钮
                </Button>
              </div>
            ))
          )
        )}
      </div>
      <Popconfirm/>
      <div className="text-5xl flex flex-col items-center justify-center font-bold">
        <NumberAnimation className="m-3" value={number} />
        <div className="flex items-center">
          <Button
            className="text-base"
            size="responsive"
            shape="circle"
            onClick={() => setNumber2((p) => p - 1)}
            icon={<GoDash />}
          />
          <NumberAnimation className="m-3" value={number2} />
          <Button
            className="text-base"
            size="responsive"
            shape="circle"
            onClick={() => setNumber2((p) => p + 1)}
            icon={<GoPlus />}
          />
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { GoDash, GoMortarBoard, GoPlus } from 'react-icons/go'
import NumberAnimation from '~/components/NumberAnimation'
import Button from '~/components/ui/Button'
import Select from '~/components/ui/Select'
import { presetColors, sizes, variants } from '~/components/ui/utils'

export default function Ui() {
  const [number2, setNumber2] = useState(100)
  const [select, setSelect] = useState(0)

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
      <Select
        placeholder="选择"
        value={select}
        onChange={setSelect}
        options={[
          {
            value: 1,
            label: '选项1',
          },
          {
            value: 2,
            label: '选项2',
          },
          {
            value: 3,
            label: '选项3',
          },
        ]}
      />
      <div className="text-5xl flex flex-col items-center justify-center font-bold">
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

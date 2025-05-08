'use client'
import NumberScroll from '../../components/NumberAnimation'
import Button from '@/ui/Button'
import { presetColors, sizes, variants } from '@/ui/utils'
import { useEffect, useState } from 'react'

export default function Ui() {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl p-8">
      <div className="grid gap-4 grid-cols-5 w-150">
        {sizes.map((size) =>
          presetColors.map((color) =>
            variants.map((variant) => (
              <div key={`${size}-${color}-${variant}`} className="text-center">
                <Button variant={variant} color={color} size={size}>
                  {variant}
                </Button>
              </div>
            ))
          )
        )}
      </div>
      <NumberScroll className="text-5xl m-3" value={number} />
    </div>
  )
}

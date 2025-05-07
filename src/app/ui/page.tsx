import Button from '@/ui/Button'
import PreviewImage from '@/ui/PreviewImage'
import { presetColors, sizes, variants } from '@/ui/utils'

export default function Ui() {
  return (
    <div className="m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl p-8">
      {sizes.map((size) => (
        <div key={size}>
          {presetColors.map((color) => (
            <div className="mb-3 space-x-2" key={color}>
              {variants.map((variant) => (
                <Button key={variant} variant={variant} color={color} size={size}>
                  按钮
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
      <PreviewImage className="w-100 h-60 object-cover" src="/demo.png" alt="demo"/>
    </div>
  )
}

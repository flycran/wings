import { Color, getPresetColor, getSize, getVariants, Size, Variants } from '@/ui/utils'
import Wave from '@/ui/Wave'
import { customVar } from '@/utils'
import clsx from 'clsx'
import { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  ref?: Ref<HTMLButtonElement>
  variant?: Variants
  color?: Color | string
  children: ReactNode
  size?: Size
}

export default function Button({ children, className, size, color, icon, variant, ...rest }: ButtonProps) {
  const node = (
    <button
      {...rest}
      className={clsx(
        'relative rounded-lg duration-200 transition-background cursor-pointer preset-color-primary',
        'size-small:h-6 size-small:px-3 size-small:text-sm',
        'size-default:h-8 size-default:px-3.5 size-default:text-base',
        'size-large:h-10 size-large:px-4 size-large:text-lg',
        'vt-solid:text-white vt-solid:border-preset vt-solid:border vt-solid:bg-preset',
        'vt-solid:hover:bg-preset-a10 hover:border-preset-a10  vt-solid:active:bg-preset active:border-preset-s5',
        'vt-outlined:text-preset vt-outlined:bg-back vt-outlined:border vt-outlined:border-preset',
        'hover:border-preset-a10 active:border-preset-s5',
        'vt-dashed:text-preset vt-dashed:bg-back vt-dashed:border vt-dashed:border-preset vt-dashed:border-dashed ',
        'vt-filled:text-preset vt-filled:bg-preset/12 vt-filled:hover:bg-preset-s10/18 vt-filled:active:bg-preset-s15/24',
        'vt-text:text-preset vt-text:hover:text-preset-a10 vt-text:active:text-preset-s5',
        getVariants(variant),
        getSize(size),
        className
      )}
      style={customVar({
        colorPreset: getPresetColor(color),
      })}
    >
      <span>{children}</span>
      {icon ? <span className="ml-2 align-middle">{icon}</span> : null}
    </button>
  )

  return variant === 'solid' || variant === 'outlined' || variant === 'dashed' ? (
    <Wave color="var(--color-preset-s10)">{node}</Wave>
  ) : (
    node
  )
}

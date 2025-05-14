import {
  Color,
  getPresetColor,
  getShape,
  getSize,
  getVariants,
  Shape,
  Size,
  Variants,
} from '../utils'
import Wave from '../Wave'
import { customVar } from '~/utils'
import clsx from 'clsx'
import { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  ref?: Ref<HTMLButtonElement>
  variant?: Variants
  color?: Color | string
  children?: ReactNode
  size?: Size
  shape?: Shape
  block?: boolean
}

export default function Button({
  children,
  className,
  size,
  color,
  icon,
  variant,
  shape,
  block,
  ...rest
}: ButtonProps) {
  const node = (
    <button
      {...rest}
      className={clsx(
        className,
        'relative rounded-lg duration-200 transition-background cursor-pointer preset-color-primary items-center justify-center gap-[.6em]',
        'text-center whitespace-nowrap',
        // 尺寸
        'size-small:h-6 size-small:px-2 size-small:text-xs',
        'size-default:h-8 size-default:px-3 size-default:text-sm size-default:gap-2',
        'size-large:h-10 size-large:px-4 size-large:text-base',
        'size-responsive:h-[calc(2em)] size-responsive:px-[.5em]',
        // 变体
        'vt-solid:text-white vt-solid:border-preset vt-solid:border vt-solid:bg-preset',
        'vt-solid:hover:bg-preset-a10 hover:border-preset-a10  vt-solid:active:bg-preset active:border-preset-s5',
        'vt-outlined:text-preset vt-outlined:bg-back vt-outlined:border vt-outlined:border-preset',
        'hover:border-preset-a10 active:border-preset-s5',
        'vt-dashed:text-preset vt-dashed:bg-back vt-dashed:border vt-dashed:border-preset vt-dashed:border-dashed ',
        'vt-filled:text-preset vt-filled:bg-preset/12 vt-filled:hover:bg-preset-s10/18 vt-filled:active:bg-preset-s15/24',
        'vt-text:text-preset vt-text:hover:text-preset-a10 vt-text:active:text-preset-s5',
        // 形状
        'shape-round:rounded-full',
        'shape-circle:rounded-full shape-circle:p-0 shape-circle:aspect-square shape-circle:w-auto shape-circle:justify-center',
        getVariants(variant),
        getSize(size),
        getShape(shape),
        block ? 'flex w-full' : 'inline-flex'
      )}
      style={customVar({
        colorPreset: getPresetColor(color),
      })}
    >
      {icon ? <span>{icon}</span> : null}
      {children && <span>{children}</span>}
    </button>
  )

  return variant === 'solid' || variant === 'outlined' || variant === 'dashed' ? (
    <Wave color="var(--color-preset-s10)">{node}</Wave>
  ) : (
    node
  )
}

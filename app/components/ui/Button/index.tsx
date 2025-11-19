import clsx from 'clsx'
import { HTMLAttributes, ReactNode, Ref } from 'react'
import { customVar } from '~/utils'
import { Color, cva, getPresetColor, Shape, Size, Variants } from '../utils'
import Wave from '../Wave'

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
  size = 'default',
  color,
  icon,
  variant = 'solid',
  shape = 'default',
  block,
  ...rest
}: ButtonProps) {
  const node = (
    <button
      {...rest}
      className={clsx(
        className,
        'relative rounded-lg transition-[background_color_150sm] cursor-pointer preset-color-primary items-center justify-center gap-[.6em]',
        'text-center whitespace-nowrap outline-none',
        cva(
          {
            size: {
              small: 'h-6 px-2 text-xs',
              default: 'h-8 px-3 text-sm gap-2',
              large: 'h-10 px-4 text-base',
              responsive: 'h-[calc(2em)] px-[.5em]',
            },
            variant: {
              solid:
                'text-white border-preset border bg-preset hover:bg-preset-a10 hover:border-preset-a10 active:bg-preset',
              outlined:
                'text-preset bg-back border border-preset hover:border-preset-a10 active:border-preset-s5',
              dashed: 'text-preset bg-back border border-preset border-dashed',
              filled:
                'text-preset bg-preset/12 hover:bg-preset-s10/18 active:bg-preset-s15/24 focus-visible:bg-preset-s10/18',
              text: 'text-preset hover:text-preset-a15 active:text-preset-s5 focus-visible:text-preset-a15',
            },
            shape: {
              default: '',
              round: 'rounded-full',
              circle: 'rounded-full p-0 aspect-square w-auto justify-center',
            },
          },
          {
            size,
            variant,
            shape,
          }
        ),
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

  return variant !== 'text' && variant !== 'filled' ? (
    <Wave color="var(--color-preset-s10)">{node}</Wave>
  ) : (
    node
  )
}

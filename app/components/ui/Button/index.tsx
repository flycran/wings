import clsx from 'clsx'
import { HTMLAttributes, ReactNode, Ref } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { customVar } from '~/utils'
import { Color, cva, getPresetColor, Shape, Size, Variants } from '../utils'
import Wave, { WaveRenderProps } from '../Wave'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** 按钮图标 */
  icon?: ReactNode
  /** 按钮变体 */
  variant?: Variants
  /** 按钮颜色 */
  color?: Color | (string & {})
  /** 按钮大小 */
  size?: Size
  /**
   * 按钮形状
   * - `default` 圆角矩形
   * - `round` 半圆角矩形
   * - `circle` 圆形
   */
  shape?: Shape
  /** 按钮是否为块级模式 */
  block?: boolean
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
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
  onClick,
  ...rest
}: ButtonProps) {
  const needWave = variant !== 'text' && variant !== 'filled'

  const renderButton = (waveProps?: WaveRenderProps) => (
    <button
      {...rest}
      onClick={(e) => {
        waveProps?.onClick(e)
        onClick?.(e)
      }}
      className={clsx(
        className,
        'relative transition-[background_color_150sm] cursor-pointer preset-color-primary items-center justify-center gap-[.6em]',
        'text-center whitespace-nowrap outline-none',
        cva(
          {
            size: {
              small: clsx('h-6 text-xs'),
              default: clsx('h-8 text-sm gap-2'),
              large: clsx('h-10 text-base'),
              responsive: clsx('h-[calc(2em)]'),
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
              default: 'rounded-lg',
              round: 'rounded-full',
              circle: 'rounded-full aspect-square w-auto justify-center',
            },
          },
          {
            size,
            variant,
            shape,
          }
        ),
        // 没有文字时渲染为正方形
        children
          ? cva(
              {
                size: {
                  small: clsx('h-6', shape !== 'circle' && 'px-2'),
                  default: clsx('h-8', shape !== 'circle' && 'px-3'),
                  large: clsx('h-10', shape !== 'circle' && 'px-4'),
                  responsive: clsx('h-[calc(2em)]', shape !== 'circle' && 'px-[.5em]'),
                },
              },
              {
                size,
              }
            )
          : 'aspect-square container-size',
        block ? 'flex w-full' : 'inline-flex'
      )}
      style={customVar({
        colorPreset: getPresetColor(color),
      })}
    >
      {icon ? (
        <span
          className={clsx(
            // 没有文字且变体为text时放大图标
            !children && variant === 'text' ? 'text-[100cqw]' : 'text-[1.25em]'
          )}
        >
          {icon}
        </span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  )

  return needWave ? <Wave color="var(--color-preset-s10)">{renderButton}</Wave> : renderButton()
}

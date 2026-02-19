import clsx from 'clsx'
import { InputHTMLAttributes, ReactNode, useMemo } from 'react'
import { GoXCircleFill } from 'react-icons/go'
import { cva, Size } from '~/components/ui/utils'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  size?: Size
  block?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  className?: string
  allowClear?: boolean
  onChange?: (value: string) => void
}

export default function Input({
  size = 'default',
  block = true,
  prefix,
  suffix,
  className,
  allowClear,
  onChange,
  ...rest
}: InputProps) {
  const pl = useMemo(
    () =>
      cva(
        {
          size: {
            small: 'pl-2',
            default: 'pl-3',
            large: 'pl-4',
            responsive: 'pl-[.5em]',
          },
        },
        { size }
      ),
    [size]
  )

  const pr = useMemo(
    () =>
      cva(
        {
          size: {
            small: 'pr-2',
            default: 'pr-3',
            large: 'pr-4',
            responsive: 'pr-[.5em]',
          },
        },
        { size }
      ),
    [size]
  )

  const clearNode = useMemo(() => {
    if (allowClear && rest.value) {
      return (
        <div
          className="h-full aspect-square inline-flex items-center justify-center cursor-pointer transition hover:text-fore-hover hover:dark:text-fore-hover-dark"
          onClick={() => {
            onChange?.('')
          }}
        >
          <GoXCircleFill />
        </div>
      )
    }
  }, [suffix, allowClear, rest.value, onChange])

  return (
    <div
      tabIndex={0}
      className={clsx(
        'w-50 relative items-center duration-150 border border-input-border dark:border-input-dark-border rounded-lg outline-none focus-within:border-input-focus-border',
        cva(
          {
            size: {
              small: 'w-20 h-6 text-xs',
              default: 'w-26 h-8 text-sm gap-2',
              large: 'w-32 h-10 text-base',
              responsive: 'w-[6.5em] h-[calc(2em)]',
            },
          },
          { size }
        ),
        block ? 'flex w-full' : 'inline-flex',
        prefix ? '' : pl,
        clearNode || suffix ? '' : pr,
        className
      )}
    >
      {prefix && (
        <div className="h-full aspect-square inline-flex items-center justify-center">{prefix}</div>
      )}
      <input
        className={clsx('h-full flex-1 p-0')}
        onChange={(e) => {
          onChange?.(e.currentTarget.value)
        }}
        {...rest}
      />
      {clearNode}
      {suffix && (
        <div className="h-full aspect-square inline-flex items-center justify-center">{suffix}</div>
      )}
    </div>
  )
}

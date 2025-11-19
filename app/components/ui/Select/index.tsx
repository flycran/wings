import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import { InputHTMLAttributes, Key, ReactNode, useContext, useMemo, useState } from 'react'
import Loading from '~/components/Loading'
import MotionDiv from '~/components/motion/MotionDiv'
import NoData from '~/components/NoData'
import { FormContext } from '~/components/ui/hooks/form'
import { cva, Size } from '~/components/ui/utils'
import { useDelayActive } from '~/hooks/delayOpen'

export interface SelectOption<T extends string | number = number> {
  value: T
  label: ReactNode
  key?: Key
}

export interface SelectProps<T extends string | number = number>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: Size
  block?: boolean
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  search?: (value: string) => Promise<void> | void
  loading?: boolean
}

export default function Select<T extends string | number = number>({
  size = 'default',
  className,
  block,
  options,
  onChange,
  value,
  search,
  loading,
  name,
  ...rest
}: SelectProps<T>) {
  const { active: open, enter, leave } = useDelayActive(0, 10)
  const [focus, setFocus] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>('')
  const [searchValue, setSearchValue] = useState('')
  const control = useContext(FormContext)
  const register = control && name ? control.register(name) : undefined

  const inputCva = useMemo(
    () =>
      cva(
        {
          size: {
            small: 'px-2',
            default: 'px-3',
            large: 'px-4',
            responsive: 'px-[.5em]',
          },
        },
        { size }
      ),
    [size]
  )

  const selectHandler = (item: SelectOption<T>) => {
    const option = options?.find((e) => e.value === item.value)
    const label = option?.label ?? ''
    setSelectedLabel(label)
    setSearchValue(label.toString())
    onChange?.(item.value)
    leave()
  }

  return (
    <div
      className={clsx(
        'relative gap-2 items-center duration-150 border border-input-border dark:border-input-dark-border rounded-lg outline-none focus-within:border-input-focus-border',
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
        className
      )}
      onFocus={enter}
      onBlur={leave}
    >
      <div className="relative h-full flex-1 w-0 shrink-0">
        <input
          {...rest}
          {...register}
          onFocus={(e) => {
            setFocus(true)
            rest.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocus(false)
            rest.onBlur?.(e)
          }}
          value={focus ? searchValue : value}
          readOnly={!search}
          onChange={
            search
              ? (e) => {
                  setSearchValue(e.target.value)
                  search(e.target.value)
                }
              : undefined
          }
          autoComplete="off"
          className={clsx('h-full w-full relative rounded-lg', inputCva, {
            'opacity-0': !!selectedLabel && !focus,
          })}
        />
        <div
          className={clsx(
            'absolute top-0 left-0 h-full w-full flex items-center pointer-events-none',
            inputCva,
            {
              'opacity-0': focus,
            }
          )}
        >
          {selectedLabel}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <MotionDiv
            initial={{
              opacity: 0,
              scaleY: 0.9,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              scaleY: 0.9,
            }}
            tabIndex={0}
            onFocus={enter}
            onBlur={leave}
            transition={{
              duration: 0.15,
            }}
            className="flex flex-col p-1 bg-popover origin-top dark:bg-popover-dark shadow-card rounded-lg absolute left-0 top-[calc(100%+0.25rem)] z-100 min-w-full max-h-80 overflow-auto"
          >
            {loading ? (
              <div className="flex justify-center items-center min-h-20">
                <Loading />
              </div>
            ) : options?.length ? (
              options?.map((e) => (
                <div
                  className={clsx(
                    'flex items-center w-full h-8 px-2 cursor-pointer duration-150 rounded-lg hover:bg-zinc-500/10',
                    cva(
                      {
                        size: {
                          small: 'w-20 min-h-6 text-xs',
                          default: 'w-26 min-h-8 text-sm gap-2',
                          large: 'w-32 min-h-10 text-base',
                          responsive: 'w-[6.5em] min-h-[calc(2em)]',
                        },
                      },
                      { size }
                    )
                  )}
                  key={e.key ?? e.value}
                  tabIndex={0}
                  onClick={() => selectHandler(e)}
                >
                  {e.label}
                </div>
              ))
            ) : (
              <NoData className="max-w-30" />
            )}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

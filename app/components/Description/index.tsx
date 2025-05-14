import { chunkGenerator } from '@/utils'
import clsx from 'clsx'
import { Fragment, HTMLAttributes, ReactNode } from 'react'

export interface DescriptionProps extends HTMLAttributes<HTMLTableElement> {
  column?: number
  items: DescriptionItem[]
}

export interface DescriptionItem {
  label: ReactNode
  value: ReactNode
  span?: number
  key?: string
}

export default function Description({ column = 2, items, className, ...rest }: DescriptionProps) {
  const columns = [...chunkGenerator(items, column)]

  return (
    <table {...rest} className={clsx('w-full text-sm text-zinc-700 dark:text-zinc-300', className)}>
      <tbody>
        {columns.map((item, index) => (
          <tr key={index}>
            {item.map((item, index) => (
              <Fragment key={index}>
                <td className="px-2 py-1" colSpan={item.span}>
                  {item.label}: {item.value}
                </td>
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

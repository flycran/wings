import { ComponentProps, isValidElement, ReactNode } from 'react'
import { GoLink } from 'react-icons/go'
import Link from 'next/link'

export interface ExteLinkProps extends ComponentProps<typeof Link> {
  icon?: ReactNode | boolean
}

export default function ExteLink({
  children,
  icon = !isValidElement(children),
  ...rest
}: ExteLinkProps) {
  return (
    <Link {...rest} target="_blank">
      <span className="align-middle hover:underline">{children}</span>
      {icon && <GoLink className="mx-0.75 inline-block w-[0.9em] align-middle" />}
    </Link>
  )
}

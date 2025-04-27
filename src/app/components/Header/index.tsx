'use client'
import FlyingCrane from '@/icons/FlyingCrane'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

const Menu = () => {
  const menus = [
    {
      text: '首页',
      href: '/',
      color: 'var(--crane-orange)',
    },
    {
      text: '文章',
      href: '/article',
      color: 'var(--crane-green)',
    },
    {
      text: '项目',
      href: '/project',
      color: 'var(--crane-blue)',
    },
  ]

  return (
    <ul className="absolute top-0 left-1/2 flex h-full -translate-x-1/2 items-center text-lg">
      {menus.map((menu) => (
        <MenuItem key={menu.href} {...menu} />
      ))}
    </ul>
  )
}

interface MenuItemProps {
  text: string
  href: string
  color: string
}

const MenuItem = ({ text, href, color }: MenuItemProps) => {
  const elRef = useRef<HTMLLIElement>(null)

  const pathname = usePathname()

  return (
    <li
      className="group relative flex h-full items-center justify-center px-5 text-white"
      style={{
        backgroundColor: color,
      }}
      data-selected={pathname === href}
      ref={elRef}
    >
      <Link href={href} className="flex-shrink-0">
        {text}
      </Link>
      {pathname === href && (
        <motion.div
          transition={{
            duration: 0.2,
          }}
          layoutId="menu-line"
          className="absolute bottom-0 left-0 z-1 h-2 w-full bg-current"
        />
      )}
    </li>
  )
}

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <header className="absolute top-0 z-1 flex h-12 w-full items-center pl-4">
      <div className="aspect-square w-10">
        <FlyingCrane />
        <Menu />
      </div>
    </header>
  )
}

export default Header

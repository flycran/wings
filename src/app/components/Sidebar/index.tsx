'use client'
import SlideArrow, { SlideArrowRef } from '../../../components/SlideArrow'
import Switchdarkmode from '@/app/components/SwitchDarkMode'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useRef, useState } from 'react'
import { GoCheck, GoChecklist, GoFileCode, GoHome, GoSearch } from 'react-icons/go'

interface MenuItemProps {
  text: string
  href: string
  color: string
  icon?: ReactNode
}

// 菜单项
const MenuItem = ({ text, href, color, icon }: MenuItemProps) => {
  const pathname = usePathname()
  const SARef = useRef<SlideArrowRef>(null)

  const match = pathname === href

  function handleHover() {
    if (match || !SARef.current) return
    SARef.current.play()
  }

  return (
    <Link
      href={href}
      className="flex h-12 cursor-pointer items-center rounded-r-xl text-white shadow duration-300"
      style={{ backgroundColor: color, width: match ? '8rem' : '6rem' }}
      onMouseEnter={handleHover}
    >
      <div className="flex-1 pl-2 text-center">{text}</div>
      <div className="mr-3 aspect-square w-6 overflow-hidden pt-0.5 pl-0.5 text-[1.25rem]">
        {match ? icon || <GoCheck /> : <SlideArrow ref={SARef} />}
      </div>
    </Link>
  )
}
// 搜索菜单
const Search = () => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const search = () => {
    if (keyword) {
      router.push(`/?keyword=${keyword}`)
      setKeyword('')
    }
    setOpen(false)
  }

  return (
    <div
      className="bg-crane-red flex h-12 cursor-pointer items-center rounded-r-xl text-white shadow duration-300"
      style={{ width: open ? '14rem' : '6rem' }}
      onClick={() => setOpen(true)}
    >
      {open ? (
        <input
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          placeholder="搜搜看有什么"
          onBlur={() => setOpen(false)}
          onKeyDown={({ key }) => key === 'Enter' && search()}
          className="box-border h-full w-0 flex-1 px-3"
        />
      ) : (
        <div className="flex-1 text-center">搜索</div>
      )}
      <GoSearch className="mr-3" size={20} />
    </div>
  )
}
// 侧边栏
export default function Sidebar() {
  const menus = () => [
    {
      text: '首页',
      href: '/',
      color: 'var(--color-crane-blue)',
      icon: <GoHome />,
    },
    {
      text: '文章',
      href: '/article',
      color: 'var(--color-crane-green)',
      icon: <GoChecklist />,
    },
    {
      text: '项目',
      href: '/project',
      color: 'var(--color-crane-orange)',
      icon: <GoFileCode />,
    },
  ]

  return (
    <div className="fixed top-1/2 left-0 z-100 -translate-y-1/2">
      <nav className="flex flex-col items-start gap-2">
        <Search />
        {menus().map((menu) => (
          <MenuItem key={menu.href} {...menu} />
        ))}
      </nav>
      <Switchdarkmode />
    </div>
  )
}

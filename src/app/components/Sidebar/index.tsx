'use client'

import SlideArrow, { SlideArrowRef } from '@/app/components/SlideArrow'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { GoCheck, GoSearch } from 'react-icons/go'

interface MenuItemProps {
  text: string
  href: string
  color: string
}

const MenuItem = ({ text, href, color }: MenuItemProps) => {
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
      className="flex h-12 cursor-pointer items-center rounded-r-xl text-white shadow duration-200"
      style={{ backgroundColor: color, width: match ? '140px' : '100px' }}
      onMouseEnter={handleHover}
    >
      <div className="flex-1 pl-2 text-center">{text}</div>
      <div className="mr-3 aspect-square w-6 overflow-hidden pt-0.5 pl-0.5 text-[1.25rem]">
        {match ? <GoCheck /> : <SlideArrow ref={SARef} />}
      </div>
    </Link>
  )
}

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
      style={{ width: open ? '220px' : '100px' }}
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

export default function Sidebar() {
  const menus = () => [
    {
      text: '首页',
      href: '/',
      color: 'var(--crane-blue)',
    },
    {
      text: '文章',
      href: '/article',
      color: 'var(--crane-green)',
    },
    {
      text: '项目',
      href: '/project',
      color: 'var(--crane-orange)',
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
    </div>
  )
}

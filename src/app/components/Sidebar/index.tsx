'use client'
import Switchdarkmode from '@/app/components/SwitchDarkMode'
import MotionDiv from '@/components/motion/MotionDiv'
import NoData from '@/components/NoData'
import { PortalBody } from '@/components/PortalBody'
import { searchArticle } from '@/server/article'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react'
import { useRequest } from 'ahooks'
import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useRef, useState } from 'react'
import { GoCheck, GoChecklist, GoFileCode, GoHome, GoSearch } from 'react-icons/go'
import SlideArrow, { SlideArrowRef } from '../../../components/SlideArrow'

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
  const [expand, setExpand] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const search = () => {
    if (keyword) {
      router.push(`/?keyword=${keyword}`)
      setKeyword('')
    }
    close()
  }

  // 搜索建议

  const [open, setOpen] = useState(false)
  // 搜索
  const { run, data } = useRequest(searchArticle, {
    manual: true,
    debounceWait: 350,
    onFinally() {
      setOpen(true)
    },
  })

  // 浮动元素
  const { refs, floatingStyles } = useFloating({
    strategy: 'fixed',
    placement: 'bottom',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      shift({
        padding: 8,
      }),
    ],
  })

  const onChange = (value: string) => {
    setKeyword(value)
    run({
      search: value,
    })
  }

  const close = () => {
    setExpand(false)
    setOpen(false)
  }

  return (
    <>
      <div
        ref={refs.setReference}
        className="flex h-12 cursor-pointer items-center rounded-r-xl bg-crane-red text-white shadow duration-300"
        style={{ width: expand ? '14rem' : '6rem' }}
        onClick={() => setExpand(true)}
      >
        {expand ? (
          <input
            ref={inputRef}
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
            placeholder="搜搜看有什么"
            onBlur={() =>
              Promise.resolve().then(close)
            }
            onKeyDown={({ key }) => key === 'Enter' && search()}
            className="box-border h-full w-0 flex-1 px-3"
          />
        ) : (
          <div className="flex-1 text-center">搜索</div>
        )}
        <GoSearch className="mr-3" size={20} />
      </div>
      <PortalBody>
        <AnimatePresence>
          {open && (
            <div ref={refs.setFloating} className="z-110" style={floatingStyles}>
              <MotionDiv
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -50,
                }}
              >
                <div className="overflow-hidden rounded-lg bg-popover text-sm shadow-card dark:bg-popover-dark">
                  {data ? (
                    data.result.map((e) => (
                      <Link
                        href={`/article/${e.id}`}
                        key={e.id}
                        className="block p-2 transition hover:bg-zinc-500/10"
                        onClick={close}
                      >
                        <div className="ellipsis-3">{e.title}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="h-30">
                      <NoData />
                    </div>
                  )}
                </div>
              </MotionDiv>
            </div>
          )}
        </AnimatePresence>
      </PortalBody>
    </>
  )
}
// 搜索建议

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
    <div className="-translate-y-1/2 fixed top-1/2 left-0 z-100">
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

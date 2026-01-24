import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { GoCheck, GoChecklist, GoFileCode, GoHome, GoSearch } from 'react-icons/go'
import { Chat, InstantSearch } from 'react-instantsearch'
import 'instantsearch.css/components/chat.css'
import { Link, useLocation } from 'react-router'
import { PortalBody } from '~/components/PortalBody'
import Search from '~/components/Search'
import Switchdarkmode from '~/components/Sidebar/SwitchDarkMode'
import Dialog from '~/components/ui/Dialog'
import webConfig from '~/config/web'
import { algoliaClient } from '~/utils/algolia'
import SlideArrow, { SlideArrowRef } from '../SlideArrow'

interface MenuItemProps {
  text: string
  href: string
  color: string
  icon?: ReactNode
}

export function AgentChat() {
  console.log(import.meta.env)
  return (
    <InstantSearch searchClient={algoliaClient}>
      <Chat
        classNames={{
          container: 'algolia-chat',
          toggleButton: {
            root: 'algolia-chat',
          },
        }}
        agentId={webConfig.algolia.agentId}
        translations={{
          header: {
            clearLabel: '清理记录',
            closeLabel: '关闭',
            title: 'Wings助手',
          },
          messages: {
            loaderText: '加载中...',
          },
          prompt: {
            disclaimer: '人工智能可能会犯错。请核实回答内容。',
            textareaPlaceholder: '输入你的消息',
          },
        }}
      />
    </InstantSearch>
  )
}

// 菜单项
const MenuItem = ({ text, href, color, icon }: MenuItemProps) => {
  const { pathname } = useLocation()
  const SARef = useRef<SlideArrowRef>(null)

  const match = href === '/' ? pathname === href : pathname.startsWith(href)

  function handleHover() {
    if (match || !SARef.current) return
    SARef.current.play()
  }

  return (
    <Link
      to={href}
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
const SearchMenuItem = () => {
  const [expand, setExpand] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()

  useEffect(() => {
    setExpand(false)
  }, [location])

  const close = () => {
    setExpand(false)
  }

  return (
    <>
      <div
        className="flex h-12 cursor-pointer items-center rounded-r-xl bg-crane-red text-white shadow duration-300"
        style={{ width: expand ? '10rem' : '6rem' }}
        onClick={() => setExpand(true)}
      >
        {expand ? (
          <input
            ref={inputRef}
            placeholder="搜搜看有什么"
            className="box-border h-full w-0 flex-1 px-3"
            readOnly
          />
        ) : (
          <div className="flex-1 text-center">搜索</div>
        )}
        <GoSearch className="mr-3" size={20} />
      </div>
      {
        <PortalBody>
          {expand && (
            <Dialog onCancel={close} onClickMask={close} className="items-start">
              <div className="w-full max-h-full overflow-auto scroll-none" onClick={close}>
                <div
                  className="w-140 mt-30 mb-10 p-4 relative mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Search />
                </div>
              </div>
            </Dialog>
          )}
        </PortalBody>
      }
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

  console.log(webConfig.algolia.agentId)

  return (
    <div className="-translate-y-1/2 fixed top-1/2 left-0 z-100">
      <nav className="flex flex-col items-start gap-2">
        <SearchMenuItem />
        {menus().map((menu) => (
          <MenuItem key={menu.href} {...menu} />
        ))}
      </nav>
      <Switchdarkmode />
      <PortalBody>
        <AgentChat />
      </PortalBody>
    </div>
  )
}

'use client'

import clsx from 'clsx'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { GoCheck, GoChecklist, GoFileCode, GoHome, GoSearch } from 'react-icons/go'
import { Chat, InstantSearch } from 'react-instantsearch'
import 'instantsearch.css/components/chat.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PortalBody } from '~/components/PortalBody'
import Search from '~/components/Search'
import Dialog from '~/components/ui/Dialog'
import webConfig from '~/config/web'
import Switchdarkmode from './SwitchDarkMode'
import { algoliaClient } from '~/utils/algolia'
import SlideArrow, { SlideArrowRef } from '~/components/SlideArrow'

interface MenuItemProps {
  text: string
  href: string
  color: string
  icon?: ReactNode
}

export function AgentChat() {
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
            maximizeLabel: '最大化',
            minimizeLabel: '最小化',
            title: 'Wings助手',
          },
          messages: {
            copyToClipboardLabel: '复制到剪贴板',
            loaderText: '加载中...',
            scrollToBottomLabel: '回到底部',
          },
          prompt: {
            disclaimer: '人工智能可能会犯错。请核实回答内容。',
            textareaPlaceholder: '输入你的消息',
            emptyMessageTooltip: '消息为空',
            stopResponseTooltip: '停止输出',
          },
        }}
      />
    </InstantSearch>
  )
}

// 菜单项
const MenuItem = ({ text, href, color, icon }: MenuItemProps) => {
  const pathname = usePathname()
  const SARef = useRef<SlideArrowRef>(null)

  const match = href === '/' ? pathname === href : pathname.startsWith(href)

  function handleHover() {
    if (match || !SARef.current) return
    SARef.current.play()
  }

  return (
    <Link
      href={href}
      className={clsx(
        'flex max-md:writing-vertical-lr text-sm md:text-base cursor-pointer items-center max-md:rounded-b-xl md:rounded-r-xl text-white transition-[width_200ms] shadow',
        [match ? 'h-22 md:w-32 w-8 md:h-12' : 'h-18 md:w-24 w-8 md:h-12']
      )}
      style={{ backgroundColor: color }}
      onMouseEnter={handleHover}
    >
      <div className="flex-1 md:pl-1 text-center">{text}</div>
      <div className="max-md:mb-2 md:mr-3 aspect-square w-4 md:w-5 overflow-hidden text-base md:text-xl">
        {match ? (
          icon || <GoCheck />
        ) : (
          <SlideArrow
            className="max-md:rotate-90 max-md:flex-col max-md:origin-[25%_50%]"
            ref={SARef}
          />
        )}
      </div>
    </Link>
  )
}
// 搜索菜单
const SearchMenuItem = () => {
  const [expand, setExpand] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setExpand(false)
  }, [pathname])

  const close = () => {
    setExpand(false)
  }

  return (
    <>
      <div
        className={clsx(
          'flex max-md:writing-vertical-lr text-sm md:text-base cursor-pointer items-center max-md:rounded-b-xl md:rounded-r-xl bg-crane-red text-white shadow duration-300',
          [expand ? 'h-24 md:w-32 w-8 md:h-12' : 'h-18 md:w-24 w-8 md:h-12']
        )}
        onClick={() => setExpand(true)}
      >
        {expand ? (
          <input
            ref={inputRef}
            placeholder="搜搜看有什么"
            className="box-border md:pl-1 h-full w-0 flex-1 px-3"
            readOnly
          />
        ) : (
          <div className="flex-1 md:pl-1 text-center">搜索</div>
        )}
        <GoSearch className="max-md:mb-2 md:mr-3 text-base md:text-xl" />
      </div>
      {
        <PortalBody>
          {expand && (
            <Dialog onCancel={close} onClickMask={close} className="items-start">
              <div className="w-full max-h-full overflow-auto scroll-none" onClick={close}>
                <div
                  className="w-full md:w-140 mt-30 mb-10 p-4 relative mx-auto"
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

  return (
    <div className="max-md:-translate-x-1/2 md:-translate-y-1/2 fixed top-0 left-1/2 md:top-1/2 md:left-0 z-100">
      <nav className="flex md:flex-col items-start gap-2">
        <SearchMenuItem />
        {menus().map((menu) => (
          <MenuItem key={menu.href} {...menu} />
        ))}
        <Switchdarkmode />
      </nav>
      <PortalBody>
        <AgentChat />
      </PortalBody>
    </div>
  )
}

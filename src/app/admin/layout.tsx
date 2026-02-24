'use client'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, SwipeableDrawer, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import FullScreenLoading from '~/components/FullScreenLoading'
import LoginDialog from '~/components/LoginDialog'
import { menus } from '~/config/admin-menu'
import { useIsMobile } from '~/hooks'
import { useSubscribeTheme } from '~/hooks/subscribe-theme'
import { openLoginAtom } from '~/store/system'
import { userAtom } from '~/store/user'
import { supabaseClient } from '~/utils/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const [_, setOpenLogin] = useAtom(openLoginAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useSubscribeTheme()

  const auth = async () => {
    const { data } = await supabaseClient.auth.getUser()

    if (data.user) {
      setAuthed(true)
      setUser(data.user)
    } else {
      setOpenLogin(true)
    }
  }

  useEffect(() => {
    if (user) {
      setAuthed(true)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      auth()
    }
  }, [])

  // 侧边栏
  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const handleOpen = () => setMobileMenuOpen(true)

  const pathname = usePathname()
  const router = useRouter()

  const menu = useMemo(() => {
    const m = menus.slice(1).find((menu) => pathname.startsWith(menu.value))

    if (m) {
      return m
    }
    if (pathname === '/admin') {
      return menus[0]
    }
  }, [pathname])

  const handleNavigate = (_: unknown, value: string) => {
    router.push(value)
    if (isMobile) {
      handleMobileMenuClose()
    }
  }

  const menuHidden = !menu || menu.hidden

  const menuElement = useMemo(() => {
    if (menuHidden) return null
    const menuContent = (
      <Tabs
        variant="scrollable"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
        className={clsx('h-screen', !isMobile && 'w-40 fixed')}
        orientation="vertical"
        value={menu.value}
        onChange={handleNavigate}
      >
        {menus
          .filter((menu) => !menu.hidden)
          .map((menu) => (
            <Tab key={menu.value} label={menu.label} value={menu.value} />
          ))}
      </Tabs>
    )

    return isMobile ? (
      <SwipeableDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        onOpen={handleOpen}
      >
        {menuContent}
      </SwipeableDrawer>
    ) : (
      <div className="w-40">{menuContent}</div>
    )
  }, [menu, menuHidden])

  return (
    <>
      <LoginDialog />
      <FullScreenLoading loading={!authed} title="正在验证用户">
        <div className="md:flex">
          {menuElement}
          <div className="md:flex-1 shrink-0 min-h-screen md:h-auto h-screen flex flex-col md:block">
            {/* 移动端汉堡菜单按钮 */}
            {isMobile && !menuHidden && (
              <div className="sticky top-0 z-10 flex items-center h-12 px-4 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                <IconButton onClick={handleOpen} edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </div>
            )}
            <div className="flex-1 md:h-full max-md:overflow-auto">{children}</div>
          </div>
        </div>
      </FullScreenLoading>
    </>
  )
}

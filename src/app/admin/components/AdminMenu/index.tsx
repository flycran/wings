'use client'
import { SwipeableDrawer, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { menus } from '~/config/admin-menu'
import { useIsMobile } from '~/hooks'

interface AdminMenuProps {
  mobileOpen?: boolean
  onMobileClose: () => void
  onMobileOpen: () => void
}

export default function AdminMenu({
  mobileOpen = false,
  onMobileClose,
  onMobileOpen,
}: AdminMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()

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
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  if (!menu || menu.hidden) return null

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

  // 移动端
  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        onOpen={onMobileOpen}
      >
        {menuContent}
      </SwipeableDrawer>
    )
  }

  // 桌面端
  return <div className="w-40">{menuContent}</div>
}

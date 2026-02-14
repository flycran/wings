import { SwipeableDrawer, Tab, Tabs, useMediaQuery } from '@mui/material'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { menus } from '~/config/admin-menu'

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
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const menu = useMemo(() => {
    const m = menus.slice(1).find((menu) => location.pathname.startsWith(menu.value))

    if (m) {
      return m
    }
    if (location.pathname === '/admin') {
      return menus[0]
    }
  }, [location.pathname])

  const handleNavigate = (_: unknown, value: string) => {
    navigate(value)
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  const menuContent = (
    <Tabs
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: 'divider' }}
      className={clsx('h-screen', !isMobile && 'w-40 fixed')}
      orientation="vertical"
      value={location.pathname}
      onChange={handleNavigate}
    >
      {menus.map((menu) => (
        <Tab key={menu.value} label={menu.label} value={menu.value} />
      ))}
    </Tabs>
  )

  // 兼容不需要侧边栏的页面
  if (!menu) return null

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

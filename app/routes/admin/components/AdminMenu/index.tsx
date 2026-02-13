import { Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { menus } from '~/config/admin-menu'

export default function AdminMenu() {
  const location = useLocation()
  const navigate = useNavigate()

  const menu = useMemo(() => {
    const m = menus.slice(1).find((menu) => location.pathname.startsWith(menu.value))

    if (m) {
      return m
    }
    if (location.pathname === '/admin') {
      return menus[0]
    }
  }, [location.pathname])

  return (
    !!menu && (
      <div className="w-40">
        <Tabs
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          className={clsx('h-screen w-40 fixed')}
          orientation="vertical"
          value={location.pathname}
          onChange={(_, value) => navigate(value)}
        >
          {menus.map((menu) => (
            <Tab key={menu.value} label={menu.label} value={menu.value} />
          ))}
        </Tabs>
      </div>
    )
  )
}

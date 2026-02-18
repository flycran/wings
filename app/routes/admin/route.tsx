import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, useMediaQuery } from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import FullScreenLoading from '~/components/FullScreenLoading'
import LoginDialog from '~/components/LoginDialog'
import { useSubscribeTheme } from '~/hooks/subscribe-theme'
import AdminMenu from '~/routes/admin/components/AdminMenu'
import { openLoginAtom } from '~/store/system'
import { userAtom } from '~/store/user'
import { supabaseClient } from '~/utils/supabase'

const admin = () => {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const [_, setOpenLogin] = useAtom(openLoginAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

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

  return (
    <>
      <LoginDialog />
      <FullScreenLoading loading={!authed} title="正在验证用户">
        <div className="md:flex">
          <AdminMenu
            mobileOpen={mobileMenuOpen}
            onMobileClose={handleMobileMenuClose}
            onMobileOpen={handleOpen}
          />
          <div className="md:flex-1 shrink-0 min-h-screen md:h-auto h-screen flex flex-col md:block">
            {/* 移动端汉堡菜单按钮 */}
            {isMobile && (
              <div className="sticky top-0 z-10 flex items-center h-12 px-4 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                <IconButton onClick={handleOpen} edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </div>
            )}
            <div className="flex-1 md:h-full max-md:overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </FullScreenLoading>
    </>
  )
}

export default admin

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

  return (
    <>
      <LoginDialog />
      <FullScreenLoading loading={!authed} title="正在验证用户">
        <div className="flex">
          <AdminMenu />
          <div className="flex-1 shrink-0 min-h-screen">
            <Outlet />
          </div>
        </div>
      </FullScreenLoading>
    </>
  )
}

export default admin

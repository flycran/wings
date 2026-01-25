import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import FullScreenLoading from '~/components/FullScreenLoading'
import LoginDialog from '~/components/LoginDialog'
import { userAtom } from '~/store/user'
import { supabaseClient } from '~/utils/supabase'

const admin = () => {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate()

  const auth = async () => {
    if (user) return
    const { data } = await supabaseClient.auth.getUser()

    if (data.user) {
      setAuthed(true)
      setUser(data.user)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <FullScreenLoading loading={!authed} title="正在验证用户">
      <LoginDialog />
      <Outlet />
    </FullScreenLoading>
  )
}

export default admin

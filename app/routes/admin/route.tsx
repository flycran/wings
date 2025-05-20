import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import FullScreenLoading from '~/components/FullScreenLoading'
import { userAtom } from '~/store/user'
import { supabaseClient } from '~/utils/supabase'

const admin = () => {
  const [authed, setAuthed] = useState(false)
  const [, setUser] = useAtom(userAtom)
  const navigate = useNavigate()

  const auth = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (user) {
      setAuthed(true)
      setUser(user)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <>
      <FullScreenLoading loading={!authed} title="正在验证用户">
        <Outlet />
      </FullScreenLoading>
    </>
  )
}

export default admin

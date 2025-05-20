import NProgress from 'nprogress'
import { useEffect } from 'react'
import { useNavigation } from 'react-router'
import './index.css'

export interface TopbarProps {}

export default function Topbar() {
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state !== 'idle') {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [navigation.state])

  return null
}

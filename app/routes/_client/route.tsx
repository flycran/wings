import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import LoginDialog from '~/components/LoginDialog'
import Sidebar from '~/components/Sidebar'

export default function index() {
  return (
    <>
      <Sidebar />
      <LoginDialog />
      <Outlet />
      <Footer />
    </>
  )
}

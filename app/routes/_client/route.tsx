import { Outlet } from 'react-router'
import Footer from '~/routes/_client/components/Footer'
import LoginDialog from '~/components/LoginDialog'
import Sidebar from '~/routes/_client/components/Sidebar'

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

import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'

export default function index() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}

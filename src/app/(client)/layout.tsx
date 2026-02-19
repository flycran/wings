import Footer from './components/Footer'
import LoginDialog from '~/components/LoginDialog'
import Sidebar from './components/Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <LoginDialog />
      {children}
      <Footer />
    </>
  )
}

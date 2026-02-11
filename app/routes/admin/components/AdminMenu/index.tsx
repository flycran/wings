import { Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router'

export default function AdminMenu() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="w-40">
      <Tabs
        variant="scrollable"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={clsx('h-screen w-40 bg-back-dark fixed')}
        orientation="vertical"
        value={location.pathname}
        onChange={(_, value) => navigate(value)}
      >
        <Tab label="我的首页" value="/admin" />
        <Tab label="我的文章" value="/admin/articles" />
        <Tab label="我的项目" value="/admin/projects" />
      </Tabs>
    </div>
  )
}

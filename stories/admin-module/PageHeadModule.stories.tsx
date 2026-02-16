import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'

import AdminPageHeadModule from '~/components/admin-module/AdminPageHeadModule'

const meta = {
  title: 'ADMIN MODULE/PageHeadModule',
  component: AdminPageHeadModule,
  parameters: {
    layout: 'fullscreen',
  },
  tags: [ 'autodocs' ],
  argTypes: {
    action: {
      control: 'radio',
      options: [ 'Add', 'Empty' ],
      mapping: {
        Add: <Button variant="outlined" startIcon={ <Add/> }>添加</Button>,
        Empty: undefined,
      },
    },
  },
  args: {
    title: 'Title',
    description: 'description...',
  },
} satisfies Meta<typeof AdminPageHeadModule>

export default meta
type Story = StoryObj<typeof meta>;

export const Main: Story = {}

/** 展示头部粘性定位效果，滚动页面时头部保持固定在顶部 */
export const StickyDemo: Story = {
  render: (args) => (
    <div className="h-[400px] overflow-auto bg-back dark:bg-back-dark">
      <AdminPageHeadModule {...args} />
      <div className="px-6 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            Content Block {i + 1} - 向下滚动查看头部粘性定位效果
          </div>
        ))}
      </div>
    </div>
  ),
  args: {
    title: '粘性头部演示',
    description: '滚动页面，头部将保持固定在顶部',
    action: <Button variant="outlined" startIcon={<Add />}>添加</Button>,
  },
}

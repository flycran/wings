import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'

import AdminPageFooterModule from '~/components/admin-module/AdminPageFooterModule'

const meta = {
  title: 'ADMIN MODULE/PageFooterModule',
  component: AdminPageFooterModule,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminPageFooterModule>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  args: {
    children: 'Page Footer Module',
  },
}

/** 展示底部粘性定位效果，滚动页面时底部保持固定在底部 */
export const StickyDemo: Story = {
  render: (args) => (
    <div className="h-[400px] overflow-auto flex flex-col bg-back dark:bg-back-dark">
      <div className="px-6 py-4 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            Content Block {i + 1} - 向下滚动查看底部粘性定位效果
          </div>
        ))}
      </div>
      <AdminPageFooterModule {...args} />
    </div>
  ),
  args: {
    children: (
      <div className="flex items-center justify-end gap-2 py-4">
        <Button variant="text">取消</Button>
        <Button variant="contained">保存</Button>
      </div>
    ),
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { GoThumbsup } from 'react-icons/go'

import { fn } from 'storybook/test'

import Button from '~/components/ui/Button'

const spy = fn()

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [ 'autodocs' ],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: { control: 'color' },
    children: {
      control: 'radio',
      options: [ 'Text', 'Empty' ],
      mapping: {
        Text: '按钮',
        Empty: undefined,
      },
    },
    icon: {
      control: 'radio',
      options: [ 'Icon', 'Empty' ],
      mapping: {
        Icon: <GoThumbsup/>,
        Empty: undefined,
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    onClick: (e) => {
      Promise.resolve().then(() => spy(e))
    },
    children: '按钮',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/** 主要 */
export const Primary: Story = {
  args: {
    color: 'primary',
  },
}
/** 危险 */
export const Danger: Story = {
  args: {
    color: 'danger',
  },
}
/** 警告 */
export const Warning: Story = {
  args: {
    color: 'warning',
  },
}
/** 成功 */
export const Success: Story = {
  args: {
    color: 'success',
  },
}
/** 大号 */
export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
}
/** 小号 */
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
}

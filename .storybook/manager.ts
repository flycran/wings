import { addons } from 'storybook/manager-api'
import { darkTheme } from './Theme'

addons.setConfig({
  theme: darkTheme,
  // 侧边栏配置
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  // 工具栏配置
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
})

export interface Menu {
  label: string
  value: string
  hidden?: boolean
}

export const menus: Menu[] = [
  { label: '我的首页', value: '/admin' },
  {
    label: '文章编辑',
    value: '/admin/article/edit',
    hidden: true,
  },
  { label: '我的文章', value: '/admin/article' },
  { label: '类别和专栏', value: '/admin/category' },
  { label: '我的项目', value: '/admin/project' },
]

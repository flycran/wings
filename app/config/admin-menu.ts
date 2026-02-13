export interface Menu {
  label: string
  value: string
}

export const menus: Menu[] = [
  { label: '我的首页', value: '/admin' },
  { label: '我的文章', value: '/admin/articles' },
  { label: '类别和专栏', value: '/admin/categories' },
  { label: '我的项目', value: '/admin/projects' },
]

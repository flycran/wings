import { Typography } from '@mui/material'
import { ReactNode } from 'react'

export interface AdminPageHeadModuleProps {
  /** 标题 */
  title?: ReactNode
  /** 描述 */
  description?: ReactNode
  /** 操作（位于右侧） */
  action?: ReactNode
}

/** 管理页面头部模块 */
export default function AdminPageHeadModule({
  title,
  description,
  action,
}: AdminPageHeadModuleProps) {
  return (
    <div className="flex items-center justify-between sticky top-0 z-10 py-4 mb-4 md:px-6 px-4 gap-2 bg-back dark:bg-back-dark">
      <div className="flex flex-col gap-1">
        <div className="md:text-3xl text-2xl font-bold">{title}</div>
        {description && (
          <Typography color="text.secondary" component="span">
            <span className="md:text-sm text-xs">{description}</span>
          </Typography>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  )
}

export function AdminPageSubheadModule({ title, description, action }: AdminPageHeadModuleProps) {
  return (
    <div className="flex items-start justify-between mb-6 md:px-6 px-4 gap-2">
      <div className="flex flex-col gap-1">
        <div className="md:text-2xl text-lg font-medium">{title}</div>

        {description && (
          <Typography color="text.secondary">
            <span className="md:text-sm text-xs">{description}</span>
          </Typography>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  )
}

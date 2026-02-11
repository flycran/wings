import { Typography } from '@mui/material'
import { ReactNode } from 'react'

export interface AdminPageHeadModuleProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export default function AdminPageHeadModule({
  title,
  description,
  action,
}: AdminPageHeadModuleProps) {
  return (
    <div className="flex items-center justify-between sticky top-0 z-10 py-4 my-4 bg-back dark:bg-back-dark">
      <div className="flex flex-col gap-1">
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </div>
      {action}
    </div>
  )
}

export function AdminPageSubheadModule({ title, description, action }: AdminPageHeadModuleProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex flex-col gap-2">
        <Typography variant="h5" fontWeight="medium">
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </div>
      {action}
    </div>
  )
}

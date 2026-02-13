import { Box } from '@mui/material'
import { ReactNode } from 'react'

export interface AdminPageFooterModuleProps {
  children?: ReactNode
}

export default function AdminPageFooterModule({ children }: AdminPageFooterModuleProps) {
  return (
    <div className="sticky bottom-0 top-0 mt-auto z-10 mb-6 pt-6">
      <Box
        className="border-t"
        sx={{
          backgroundColor: 'background.paper',
          borderColor: 'divider',
        }}
      >
        {children}
      </Box>
    </div>
  )
}

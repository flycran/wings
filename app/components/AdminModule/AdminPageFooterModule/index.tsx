import { Box } from '@mui/material'
import { ReactNode } from 'react'

export interface AdminPageFooterModuleProps {
  children?: ReactNode
}

export default function AdminPageFooterModule({ children }: AdminPageFooterModuleProps) {
  return (
    <Box
      className="sticky bottom-0 mt-6 border-t z-10 mb-6"
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
      }}
    >
      {children}
    </Box>
  )
}

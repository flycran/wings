import { Card, CardProps } from '@mui/material'

export interface AdminCardProps extends CardProps {}

export default function AdminCard({ children, ...rest }: AdminCardProps) {
  return (
    <Card
      {...rest}
      sx={{
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {children}
    </Card>
  )
}

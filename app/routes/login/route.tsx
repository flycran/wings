import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { supabaseClient } from '~/utils/supabase'

const loginSchema = z.object({
  email: z.string().nonempty('请输入电子邮箱').email('电子邮箱格式不正确'),
  password: z
    .string()
    .nonempty('请输入密码')
    .min(8, '密码长度保持在8-16位之间')
    .max(16, '密码长度保持在8-16位之间'),
})

type Login = z.infer<typeof loginSchema>

const login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: Login) => {
    const {
      error,
      data: { user },
    } = await supabaseClient.auth.signInWithPassword(values)
    if (error) {
      console.log(error)
    } else {
      console.log(user)
      navigate('/')
    }
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-100">
        <Card className="p-10">
          <form onSubmitCapture={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            <TextField
              fullWidth
              type="email"
              label="电子邮箱"
              placeholder="请输入电子邮箱"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { required: true })}
            />
            <TextField
              fullWidth
              label="密码"
              placeholder="请输入密码"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', { required: true })}
            />
            <Button type="submit" variant="contained">
              登录
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default login

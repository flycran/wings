import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify/unstyled'
import { z } from 'zod'
import Modal from '~/components/ui/Modal'
import { openLoginAtom } from '~/store/system'
import { userAtom } from '~/store/user'
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

export interface LoginDialogProps {}

export default function LoginDialog(props: LoginDialogProps) {
  const [open, setOpen] = useAtom(openLoginAtom)
  const [_, setUser] = useAtom(userAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: Login) => {
    const { error, data } = await supabaseClient.auth.signInWithPassword(values)
    if (error) {
      toast.error('登录失败')
      console.log(error)
    } else {
      setUser(data.user)
      setOpen(false)
      toast.success('登录成功')
    }
  }
  return (
    <Modal
      open={open}
      operates={false}
      closeOnMaskClick
      onClose={() => {
        setOpen(false)
      }}
    >
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
        <div className="flex gap-2">
          <Button className="flex-1" type="submit" variant="contained">
            登录
          </Button>
          <Button
            variant="outlined"
            className="flex-1"
            onClick={() => {
              setOpen(false)
            }}
          >
            取消
          </Button>
        </div>
      </form>
    </Modal>
  )
}

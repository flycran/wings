import { useAtom } from 'jotai'
import { Link } from 'react-router'
import { toast } from 'react-toastify/unstyled'
import { openLoginAtom } from '~/store/system'
import { supabaseClient } from '~/utils/supabase'

export default function Footer() {
  const [_, setOpenLogin] = useAtom(openLoginAtom)

  return (
    <div className="bg-zinc-900 border-t border-zinc-700 text-zinc-200 text-sm">
      <div className="py-4 md:py-8 mx-4 lg:mx-auto lg:w-2xl xl:w-4xl 2xl:w-6xl flex max-md:flex-col gap-1 md:gap-3">
        <ul className="flex flex-col gap-1 md:gap-3 flex-1">
          <li>
            <Link to="/admin" className="hover:underline">
              进入后台
            </Link>
          </li>
          <li>
            <Link to="/admin/article/editor" className="hover:underline">
              新建文章
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-1 md:gap-3 flex-1">
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()
                setOpenLogin(true)
              }}
              className="hover:underline"
            >
              登录
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={async (e) => {
                e.preventDefault()
                await supabaseClient.auth.signOut()
                toast.info('已退出登陆')
              }}
              className="hover:underline"
            >
              退出登陆
            </a>
          </li>
        </ul>
        <div>本站不开放注册</div>
      </div>
      <div className="text-center py-4">Wings | 插上翅膀去飞翔</div>
    </div>
  )
}

import { Link } from 'react-router'

export default function Footer() {
  return (
    <div className="bg-zinc-900 border-t border-zinc-700 text-zinc-200 text-sm">
      <div className="py-8 m-auto w-[calc(100vw-2rem)] lg:w-2xl xl:w-4xl 2xl:w-6xl flex">
        <ul className="flex flex-col gap-3 flex-1">
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
        <div>本站不开放注册</div>
      </div>
      <div className="text-center py-4">Wings | 插上翅膀去飞翔</div>
    </div>
  )
}

# Wings | 插上翅膀去飞翔

## 技术

- [React](https://react.dev/)框架
- [React Router](https://reactrouter.com/)路由+SSR
- [Supabase](https://supabase.com/)数据存储
- [Algolia](https://www.algolia.com/)搜索引擎

## 开发

- nodejs=^20
- bun>=1.2

> 推荐使用[mise](https://mise.jdx.dev/)管理NodeJS版本

### 配置开发环境

```bash
mise use node@20
mise use bun@1
bun i
# 配置环境变量
cp .env.example .env # 手动配置必选的变量
# 可选|生成数据库类型
bun x supabase login # 每台设备只需运行一次
bun generate-supabase-types
```

Wings在开发环境默认使用`bun`提升启动速度。但在生产环境使用`npm`以兼容不支持`bun`的环境。

### 启动

```bash
bun dev
```

### Scripts

| 脚本                      | 描述                         |
|-------------------------|----------------------------|
| dev                     | 开发服务器                      |
| build                   | 打包                         |
| build:bunx              | 使用bun快速打包                  |
| start                   | 预览                         |
| generate-icon           | 通过SVG(./icons/*.svg)生成图标组件 |
| generate-supabase-types | 从supabase生成数据库类型           |
| typecheck               | 检查ts类型                     |
| lint                    | 规范检查                       |
| lint:fix                | 规范检查并执行安全的修复               |
| format                  | 格式化检查                      |
| format:fix              | 格式化                        |
| netlify:serve           | 以netlify模拟环境启动             |

### 其他功能

从.env文件生成 process.env 类型声明，这项功能随vite plugin启动。

## 部署地址

[netlify](https://flycran.netlify.app/)

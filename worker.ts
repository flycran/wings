// 简历 PDF 的访问控制：防盗链 + 时效签名。
// wrangler.jsonc 的 run_worker_first 仅把 /pdf/* 交给本 Worker，
// 其余请求由静态资产直接伺服，不经过这里。

interface Env {
  ASSETS: { fetch: (input: RequestInfo | URL) => Promise<Response> }
  RESUME_SIGNING_SECRET?: string
}

const TTL_SECONDS = 10 * 60

// 签名覆盖过期时间与下载标记，防止改参续期
async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// 白名单放行：仅同站引用；地址栏直达、收藏夹与外站引用一律拒绝，
// 防止无签名链接被转发后仍可打开
function isAllowed(request: Request): boolean {
  const site = request.headers.get('sec-fetch-site')
  if (site === 'same-origin') return true
  if (site) return false
  // 旧浏览器没有 Sec-Fetch 头，退回同站 Referer 判断
  const referer = request.headers.get('referer')
  if (!referer) return false
  try {
    return new URL(referer).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

async function servePdf(env: Env, request: Request, dl: boolean, maxAge: number): Promise<Response> {
  const asset = await env.ASSETS.fetch(new URL('/pdf/resume.pdf', request.url))
  if (!asset.ok) return new Response('Not Found', { status: 404 })

  const headers = new Headers(asset.headers)
  // 缓存只活到签名过期为止，到期后必须重新走入口拿新签名
  headers.set('Cache-Control', `private, max-age=${Math.max(0, maxAge)}`)
  headers.set(
    'Content-Disposition',
    `${dl ? 'attachment' : 'inline'}; filename="Flycran-Resume.pdf"`,
  )
  return new Response(asset.body, { status: asset.status, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (!url.pathname.startsWith('/pdf/')) return env.ASSETS.fetch(request)

    if (!isAllowed(request)) return new Response('Forbidden', { status: 403 })

    const secret = env.RESUME_SIGNING_SECRET
    const dl = url.searchParams.get('dl') === '1'
    // 未配置密钥时降级：仅防盗链，无时效，缓存给短时间
    if (!secret) return servePdf(env, request, dl, 300)

    const e = url.searchParams.get('e')
    const s = url.searchParams.get('s')

    if (e && s) {
      const expected = await sign(`${e}:${dl ? 1 : 0}`, secret)
      if (!timingSafeEqual(s, expected)) return new Response('Gone', { status: 410 })
      const remaining = Math.floor(Number(e) - Date.now() / 1000)
      if (remaining < 0) return new Response('Gone', { status: 410 })
      return servePdf(env, request, dl, remaining)
    }

    // 无签名的同源/直达请求：签发带时效的新签名
    const expires = Math.floor(Date.now() / 1000) + TTL_SECONDS
    const signature = await sign(`${expires}:${dl ? 1 : 0}`, secret)
    url.searchParams.set('e', String(expires))
    url.searchParams.set('s', signature)
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${url.pathname}${url.search}`,
        'Cache-Control': `private, max-age=${TTL_SECONDS}`,
      },
    })
  },
}

## SEO 优化方案

站点是单页个人主页（`/` 中文 + `/en` 英文），已有 sitemap、hreflang、双语 meta 的良好基础。本次按以下顺序实施：

### 1. noindex 按环境切换（核心，`src/layouts/Layout.astro:37`）
利用 Netlify 自动注入的 `CONTEXT` 环境变量：
```astro
const noindex = process.env.CONTEXT !== 'production'
```
- 生产部署（`CONTEXT=production`）→ 不输出 robots meta，允许收录
- 预览部署 / 本地 dev → 输出 `<meta name="robots" content="noindex">`

### 2. canonical（`Layout.astro`）
按当前 locale 输出 `<link rel="canonical">`，把页面内容归并到唯一规范 URL，避免 `/en`、`/en/`、带跟踪参数等变体被当成重复页面。pathname 去尾斜杠（与 `trailingSlash: 'never'` 一致）：中文页 `https://flycran.xyz/`、英文页 `https://flycran.xyz/en`。`og:url` 复用同值。

### 3. Open Graph + Twitter Card（`Layout.astro`）
复用现有 `m.metaTitle()` / `m.metaDescription()` 双语文案，按 locale 输出：
- `og:type=website`、`og:site_name`、`og:title`、`og:description`、`og:image`（绝对 URL，含 width/height/alt）
- `og:locale`（zh→`zh_CN`、en→`en`）+ `og:locale:alternate`
- `twitter:card=summary_large_image` + title/description/image

### 4. og-image 分享图（Playwright 生成）
- 新增 `scripts/og-image.html`：1200×630 画布，沿用站点纸感视觉（FLYCRAN 大字 + tagline），中英两版
- 新增 `scripts/generate-og-image.ts`：用项目已有的 playwright 截图导出 `public/og-image.png`（中文）与 `public/og-image-en.png`（英文），`package.json` 加 `og:image` 脚本
- 生成物提交进 git，脚本保留供日后改版重新生成

### 5. `public/robots.txt`
`Allow: /` + `Sitemap: https://flycran.xyz/sitemap-index.xml`（预览域名的 noindex 需要页面可被抓取才能生效，故 robots.txt 必须 allow all，与 noindex 不冲突）。

### 6. JSON-LD 结构化数据（`Layout.astro`）
`ProfilePage` + `Person`，含 name、url、jobTitle、description、inLanguage，`sameAs` 取 `src/data/site.ts` 中的 GitHub（github.com/flycran）与掘金主页，随 locale 渲染双语。

### 7. 附带改进（Core Web Vitals / 体验）
- `Home.astro:55,80`：`LangHint`、`ThemeBookmark` 由 `client:load` 降为 `client:idle`（`PaperCrane` 保持 `client:load`，属首屏视觉）
- `Layout.astro` 增加 `theme-color` meta（light/dark 两份，色值取自现有 CSS 变量）

### 验证
- 请求 dev server 页面，确认 head 中 canonical / OG / hreflang / JSON-LD 输出正确
- `astro build` 后检查 `dist/index.html`、`dist/en.html`（本地构建 CONTEXT 非 production，应带 noindex；Netlify 生产构建不带）
- 校验 og-image.png 尺寸为 1200×630

不改动：sitemap 配置、hreflang 逻辑、文案内容、路由结构。
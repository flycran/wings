# Wings v2 — 纸上飞行

当前选择：**纸上飞行**。蓝图草稿保留在 `/drafts/blueprint/` 作为对照，不再作为主方向。

## 查看

```bash
astro dev --background
```

- `/`：方向选择页
- `/drafts/paper/`：纸上飞行（当前方向）
- `/drafts/blueprint/`：蓝图（对照）

## 技术

- Astro 静态页面，React 只用于重交互岛：纸鹤、灯泡。
- 动画使用 `motion`（React 版），纸鹤沿用旧项目的几何与 50°→120° 扇翅逻辑。
- 其余交互仍是原生 TypeScript：代码 tab、单位 demo、导航高亮、滚动 reveal。
- 字体自托管：Noto Serif SC / Noto Sans SC / JetBrains Mono / Space Grotesk。
- 无数据库、无后台、无 Supabase。

## 当前状态

- 示例数据集中在 `src/data/draft.ts`，后续替换为真实信息。
- 首屏加入方格纸与铅笔草稿线框；移动端暂时隐藏草稿层。
- 最小标签字号提高到 10.5–11.5px；代码面板 12px。
- 响应式细节后续统一处理；多语言与时区识别放在最后一轮。

# KEIHAO · 个人作品集（Neo-Brutalism 路线）

> 静态站点 · 零依赖 · 可直接部署到任何静态服务器或 GitHub Pages

## 内容来源

基于本人 GitHub Pages 上**已部署的 3 个站点** + 正在维护的开源项目：

| 站点 / 项目 | 链接 | 类别 |
|---|---|---|
| Front `@b1/frontend` | https://kehao.github.io/ | GitHub Pages |
| BiosanUi `@b1/biosan-ui` | https://kehao.github.io/react-ui/ | GitHub Pages |
| iUi | https://kehao.github.io/iui/ | GitHub Pages |
| AI 热榜 | https://hot.kehao.info | 自托管（阿里云）|
| 股票排行榜 | https://github.com/Kehao/stock-rank | 小程序 |
| github-user-repos | https://github.com/Kehao/github-user-repos | MCP Server |
| dsh-client-ui-weather | https://github.com/Kehao/dsh-client-ui-weather | dsh 插件（DeepSeek Harness）|
| my-skills | https://github.com/Kehao/my-skills | AI Skills 精选库 |
| district_cn_selector | https://github.com/Kehao/district_cn_selector | Ruby gem（2013 早期）|
| BeeUi | https://github.com/history-frontEnd/BeeUi | wepy 小程序组件库（早期团队）|

## 设计语言

**Direction B · Neo-Brutalism 撞色信息流**，参照 [The Verge 2022 redesign]。

| Token | 值 |
|---|---|
| 背景 / 主墨 | `#FFFFFF` / `#08080D` |
| 主撞色 · 电光紫 | `#5200FF` |
| 次撞色 · 品红 | `#E1306C` |
| 强调 · 亮黄 | `#F8E000` |
| 工具/在线 · 青柠 | `#58CC02` |
| 特征 | 3px 粗黑描边 · 硬投影 5/6px · 无圆角 · 巨型字 · 等宽数字 |

完整设计 token 见 `css/style.css` 顶部 `:root`。

## 本地预览

```bash
cd ~/ai/resume
python3 -m http.server 8790
# 浏览器打开 http://127.0.0.1:8790/
```

或直接双击 `index.html`（相对路径的资源需在同一目录）。

## 部署到 GitHub Pages

1. 把 `~/ai/resume/` 整个目录作为仓库根目录初始化：
   ```bash
   cd ~/ai/resume
   git init
   git add .
   git commit -m "feat: 个人作品集 · Neo-Brutalism 路线"
   ```
2. 推送到 GitHub 一个仓库（示例 `Kehao/Kehao.github.io` 的子目录方式 / 或独立仓库）：
   - **用户主页 + 子目录方式**：克隆 `Kehao/Kehao.github.io`，把本目录内容放到 `resume/` 子目录中，commit push，访问 `https://kehao.github.io/resume/`
   - **独立仓库** `Kehao/portfolio` 推送，Settings → Pages → Source 选 `main` 分支根目录，访问 `https://kehao.github.io/portfolio/`
3. 自定义域名（可选）：在 `CNAME` 写入域名，DNS 解析 CNAME 到 `<user>.github.io`。

## 文件结构

```
~/ai/resume/
├── index.html          # 单页结构
├── favicon.svg         # 紫底黑 K 标签
├── css/
│   └── style.css       # 全部样式（CSS Variables + Neo-Brutalism）
├── js/
│   └── main.js         # 滚动入场 + 数字递增 + 导航高亮
└── README.md
```

## 浏览器兼容

- 现代浏览器（Chrome / Edge / Firefox / Safari）— `clamp`、CSS 变量、`@property` 已全数支持
- 移动端：≤ 480px 断点将顶栏与 stats 改为纵向排版
- 无 JS 时页面内容**完整可见**，仅失去入场动效与计数动画（CSS 显隐由 `body.js` 类控制）

## License

个人作品集 · MIT

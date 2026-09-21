# KEIHAO · 个人作品集（Neo-Brutalism 路线）

> 静态站点 · 零依赖 · 可直接部署到任何静态服务器或 GitHub Pages
>
> 线上地址：**https://kehao.info/ ｜ https://www.kehao.info/**（阿里云 ECS 自托管，见「线上部署」）

## 内容来源

基于本人 GitHub Pages 上**已部署的 3 个站点** + 正在维护的开源项目：

| 站点 / 项目 | 链接 | 类别 |
|---|---|---|
| Front `@b1/frontend` | https://kehao.github.io/ | GitHub Pages |
| BiosanUi `@b1/biosan-ui` | https://kehao.github.io/react-ui/ | GitHub Pages |
| iUi | https://kehao.github.io/iui/ | GitHub Pages |
| AI 热榜 | https://hot.kehao.info | 自托管（阿里云）|
| Ai-get | https://get.kehao.info | AI B2B 销售智能体平台（自托管）|
| 股票排行榜 | https://github.com/Kehao/stock-rank | 小程序 |
| github-user-repos | https://github.com/Kehao/github-user-repos | MCP Server |
| dsh-client-ui-weather | https://github.com/Kehao/dsh-client-ui-weather | dsh 插件（DeepSeek Harness）|
| my-skills | https://github.com/Kehao/my-skills | AI Skills 精选库 |
| DAgent | https://github.com/Kehao/DAgent | 企业级多智能体框架（LangGraph + LangChain）|
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

## 线上部署（阿里云 ECS）

| 入口 | 内容 | 说明 |
|---|---|---|
| **https://kehao.info/** | **本作品集** | 裸域；80 → `301` → https |
| **https://www.kehao.info/** | **本作品集** | 与裸域同一份内容（`/var/www/resume-www`），两者互不跳转 |
| https://hot.kehao.info/ | AI 热榜 | 同机另一站点，勿混 |
| https://agent.kehao.info/ | DAgent | 同机另一站点 |

- **机器**：阿里云 ECS `i-bp1dmqyivuxuiaenul6v`（47.114.36.224），nginx 静态托管 + certbot 证书；
- **更新方式**：服务器上执行 `sudo /usr/local/bin/resume-update.sh [分支]`（默认 `main`）：
  取 GitHub 最新 SHA（`api.github.com`）→ 下源码包（`codeload.github.com`）→ 备份
  `/root/resume-backup-<时间戳>/previous.tar.gz` → `rsync` 同步到 `/var/www/resume-www`
  → 归一权限 → 写 `.deployed-revision`。
  > 为什么不是 `git pull`：这台 ECS **到 `github.com` 主站不通**（HTTPS 与 git 协议均超时），
  > 而 `api.github.com` / `codeload.github.com` 可达（实测 < 1.5s）。走官方 tarball 通道，
  > 内容与 `git pull` 等价——文件 md5 与本地逐个一致。
- **本机流程**：改完 → 提交并 push 到 GitHub → 服务器跑脚本。

### 验证记录（2026-09-22 00:30）

| 检查项 | 结果 |
|---|---|
| `http://kehao.info` | `301 → https://kehao.info/` |
| `http://www.kehao.info` | `301 → https://www.kehao.info/` |
| `https://kehao.info/`（裸域） | `200`，27969 字节，标题 `Kehao — Front-End & AI Developer Portfolio` |
| `https://www.kehao.info/` | `200`，27969 字节，内容同上 |
| 裸域证书 | SAN = `kehao.info`（独立证书，webroot 续期指向本站目录） |
| www 证书 | SAN = `agent.kehao.info, www.kehao.info` |
| 内容抽查 | 命中 `get.kehao.info` ×3、`class="sticker s-cyan"`、`class="p-card p-cyan"` ×2 |
| 邻站未受影响 | `hot.kehao.info` → AI 热榜 `200`；`agent.kehao.info` → DAgent `200` |
| ACME 校验路径 | `/.well-known/acme-challenge/…` 返回 `404`（**不是 301**，续期可达） |
| 续期演练 | `certbot renew --dry-run --no-random-sleep-on-renew` → `all simulated renewals succeeded`（3/3） |
| 部署版本 | `.deployed-revision` = `0d7ffcc8e3896fbf3aed8fbdeb796e3c549db983`（GitHub main） |

⚠️ **改 nginx 时的硬约束**：80 端口的 http→https 跳转必须写成
「`location ^~ /.well-known/acme-challenge/ { root <webroot>; }` 放行 + 跳转写在 `location /` 内」，
**不能**用 server 级 `if … return 301`——server 级 `if` 在 rewrite 阶段执行，会把证书续期的校验路径
一起 301 掉，90 天后续期必然失败。（裸 IP `47.114.36.224` 故意不跳 HTTPS：IP 上没有证书。）

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

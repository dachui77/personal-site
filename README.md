# 全栈个人网站部署指南

## 项目结构
```
personal-site/
├── wrangler.jsonc    # Cloudflare Workers 配置（含 D1/KV 绑定和路由）
├── package.json      # 项目依赖与脚本
└── src/
    ├── index.js      # Worker 后端逻辑（API + 数据库初始化）
    └── html.js       # 前端页面（个人主页、学习、生活、博客、留言簿）
```

## 功能模块
- 🏠 **首页** — 个人介绍、技能栈、联系方式
- 📚 **学习** — 学习记录（增/删/查）
- 🌿 **生活** — 生活记录（增/删/查）
- 📝 **博客** — 文章列表（按分类筛选）+ 文章详情
- 📖 **留言簿** — 访客留言（KV 存储）

## 部署步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 本地预览
```bash
npm run dev
```

### 3. 部署到 Cloudflare
```bash
npm run deploy
```

> 注意：`wrangler.jsonc` 中已配置好 D1 数据库（`personal-blog-db`）和 KV 命名空间（`guestbook`）的绑定，以及路由 `byt.test260505.ccwu.cc/*`。部署时会自动应用这些绑定。

## 域名绑定
Worker 已通过 `routes` 配置绑定到 `byt.test260505.ccwu.cc`，部署后即可通过该域名访问。DNS 记录已存在（A 记录 → 49.232.165.228，已代理），无需额外修改。

## 数据库说明
- **D1** (`personal-blog-db`)：存储博客文章（`posts` 表）和学习/生活记录（`records` 表）
- **KV** (`guestbook`)：存储留言簿消息
- Worker 首次请求时会自动创建表结构并插入示例数据
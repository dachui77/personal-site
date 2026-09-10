import { HTML_PAGE } from './html.js';

async function initDB(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  ).run();

  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  ).run();

  // Insert sample posts if empty
  const count = await env.DB.prepare('SELECT COUNT(*) as c FROM posts').first();
  if (count.c === 0) {
    await env.DB.prepare("INSERT INTO posts (title, slug, content, category) VALUES (?, ?, ?, ?)")
      .bind('欢迎来到博雅斋', 'welcome', '这是我的第一篇博客文章！\n\n这个个人网站完全运行在 Cloudflare 边缘网络上，使用 Workers 作为后端、D1 作为数据库、KV 存储留言。\n\n无需服务器、无需备案，全球加速访问。', 'general').run();
    await env.DB.prepare("INSERT INTO posts (title, slug, content, category) VALUES (?, ?, ?, ?)")
      .bind('Cloudflare 全栈开发指南', 'cloudflare-guide', 'Cloudflare Workers 是一个无服务器平台，可以在全球 300+ 数据中心运行代码。\n\n结合 D1 数据库和 KV 存储，你可以构建完整的全栈应用。\n\n关键优势：\n- 全球边缘部署\n- 自动扩缩容\n- 免费额度充足\n- 无需管理服务器', 'study').run();
    await env.DB.prepare("INSERT INTO posts (title, slug, content, category) VALUES (?, ?, ?, ?)")
      .bind('为什么选择无服务器', 'why-serverless', '无服务器架构让你专注于代码而非基础设施。\n\nCloudflare Workers 免费额度包括：\n- 每天 10 万次请求\n- 10 万次/天 D1 查询\n- 10 万次/天 KV 读取\n\n对于个人网站来说完全够用。', 'study').run();
  }

  // Insert sample records if empty
  const recCount = await env.DB.prepare('SELECT COUNT(*) as c FROM records').first();
  if (recCount.c === 0) {
    await env.DB.prepare("INSERT INTO records (type, title, content) VALUES (?, ?, ?)")
      .bind('study', '学习 React Router v7', '正在学习 React Router v7 的全栈模式，结合 Cloudflare Workers 部署。').run();
    await env.DB.prepare("INSERT INTO records (type, title, content) VALUES (?, ?, ?)")
      .bind('study', '完成 D1 数据库实践', '完成了 Cloudflare D1 数据库的 CRUD 实践，包括表设计和查询优化。').run();
    await env.DB.prepare("INSERT INTO records (type, title, content) VALUES (?, ?, ?)")
      .bind('life', '周末爬山', '周末去爬了山，风景很美，放松心情。').run();
    await env.DB.prepare("INSERT INTO records (type, title, content) VALUES (?, ?, ?)")
      .bind('life', '尝试新菜谱', '尝试了一道新菜谱，味道还不错！').run();
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|$/g, '') || 'post-' + Date.now();
}

export default {
  async fetch(request, env, ctx) {
    await initDB(env);
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    // --- Blog API ---
    if (path === '/api/posts' && request.method === 'GET') {
      const category = url.searchParams.get('category');
      let query = 'SELECT * FROM posts ORDER BY created_at DESC';
      let params = [];
      if (category) {
        query = 'SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC';
        params = [category];
      }
      const stmt = env.DB.prepare(query);
      const result = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();
      return jsonResponse(result.results);
    }

    if (path.startsWith('/api/posts/') && request.method === 'GET') {
      const slug = path.split('/').pop();
      const post = await env.DB.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first();
      if (!post) return jsonResponse({ error: 'Not found' }, 404);
      return jsonResponse(post);
    }

    if (path === '/api/posts' && request.method === 'POST') {
      const body = await request.json();
      const slug = body.slug || slugify(body.title);
      const category = body.category || 'general';
      await env.DB.prepare('INSERT INTO posts (title, slug, content, category) VALUES (?, ?, ?, ?)')
        .bind(body.title, slug, body.content, category).run();
      return jsonResponse({ success: true, slug }, 201);
    }

    // --- Records API (学习 & 生活) ---
    if (path === '/api/records' && request.method === 'GET') {
      const type = url.searchParams.get('type');
      let query = 'SELECT * FROM records ORDER BY created_at DESC';
      let params = [];
      if (type) {
        query = 'SELECT * FROM records WHERE type = ? ORDER BY created_at DESC';
        params = [type];
      }
      const stmt = env.DB.prepare(query);
      const result = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();
      return jsonResponse(result.results);
    }

    if (path === '/api/records' && request.method === 'POST') {
      const body = await request.json();
      const type = body.type; // 'study' or 'life'
      const title = String(body.title || '').slice(0, 200);
      const content = String(body.content || '').slice(0, 2000);
      if (!type || !title) return jsonResponse({ error: 'type and title are required' }, 400);
      await env.DB.prepare('INSERT INTO records (type, title, content) VALUES (?, ?, ?)')
        .bind(type, title, content).run();
      return jsonResponse({ success: true }, 201);
    }

    if (path.startsWith('/api/records/') && request.method === 'DELETE') {
      const id = path.split('/').pop();
      await env.DB.prepare('DELETE FROM records WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true });
    }

    // --- Guestbook API (KV) ---
    if (path === '/api/messages' && request.method === 'GET') {
      const list = await env.GUESTBOOK.list();
      const messages = [];
      for (const key of list.keys) {
        const val = await env.GUESTBOOK.get(key.name);
        if (val) messages.push(JSON.parse(val));
      }
      messages.sort((a, b) => b.created_at - a.created_at);
      return jsonResponse(messages);
    }

    if (path === '/api/messages' && request.method === 'POST') {
      const body = await request.json();
      const id = crypto.randomUUID();
      const msg = {
        id,
        name: String(body.name || '匿名').slice(0, 50),
        message: String(body.message || '').slice(0, 500),
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };
      await env.GUESTBOOK.put(id, JSON.stringify(msg));
      return jsonResponse(msg, 201);
    }

    // --- Serve HTML for all other routes ---
    return new Response(HTML_PAGE, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};

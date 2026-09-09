export const HTML_PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人主页 | byt.test260505.ccwu.cc</title>
<style>
:root{--primary:#6366f1;--primary-light:#818cf8;--bg:#0f172a;--card:#1e293b;--card-hover:#24344d;--text:#e2e8f0;--muted:#94a3b8;--border:#334155;--green:#10b981;--orange:#f59e0b}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
nav{position:fixed;top:0;width:100%;background:rgba(15,23,42,.85);backdrop-filter:blur(10px);border-bottom:1px solid var(--border);z-index:100;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}
nav .logo{font-size:1.25rem;font-weight:700;color:var(--primary)}
nav ul{display:flex;gap:2rem;list-style:none}
nav a{color:var(--muted);text-decoration:none;transition:color .3s;cursor:pointer}
nav a:hover,nav a.active{color:var(--primary)}
section{padding:5rem 2rem;max-width:900px;margin:0 auto}
.hero{text-align:center;padding-top:8rem}
.hero h1{font-size:3rem;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem}
.hero p{color:var(--muted);font-size:1.2rem;max-width:600px;margin:0 auto 2rem}
.hero .avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:3rem}
h2{font-size:2rem;margin-bottom:2rem;color:var(--primary);text-align:center}
h2 .subtitle{display:block;font-size:.9rem;color:var(--muted);font-weight:normal;margin-top:.25rem}
.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem}
.skill-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;text-align:center;transition:transform .3s,border-color .3s}
.skill-card:hover{transform:translateY(-5px);border-color:var(--primary)}
.skill-card .icon{font-size:2.5rem;margin-bottom:1rem}
.skill-card h3{font-size:1.1rem;margin-bottom:.5rem}
.skill-card p{color:var(--muted);font-size:.9rem}
.contact-links{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap}
.contact-links a{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1rem 1.5rem;color:var(--text);text-decoration:none;transition:all .3s;cursor:pointer}
.contact-links a:hover{border-color:var(--primary);color:var(--primary)}
.blog-list{display:flex;flex-direction:column;gap:1.5rem}
.blog-item{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;cursor:pointer;transition:all .3s}
.blog-item:hover{border-color:var(--primary);background:var(--card-hover)}
.blog-item h3{color:var(--primary);margin-bottom:.5rem}
.blog-item .date{color:var(--muted);font-size:.85rem}
.blog-item .category{display:inline-block;background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:.15rem .6rem;font-size:.75rem;color:var(--muted);margin-left:.5rem}
.blog-item p{color:var(--muted);margin-top:.5rem}
.blog-detail{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:2rem}
.blog-detail h1{color:var(--primary);margin-bottom:.5rem}
.blog-detail .date{color:var(--muted);margin-bottom:2rem}
.blog-detail .content{white-space:pre-wrap;line-height:1.8}
.back-btn{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:.5rem 1rem;color:var(--text);cursor:pointer;margin-bottom:1.5rem;font-size:.9rem;transition:border-color .3s}
.back-btn:hover{border-color:var(--primary)}
.guestbook-form,.record-form{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:2rem;margin-bottom:2rem}
.guestbook-form input,.guestbook-form textarea,.record-form input,.record-form textarea,.record-form select{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:.75rem 1rem;color:var(--text);margin-bottom:1rem;font-size:1rem}
.guestbook-form textarea,.record-form textarea{resize:vertical;min-height:80px}
.guestbook-form button,.record-form button{background:var(--primary);color:#fff;border:none;border-radius:8px;padding:.75rem 2rem;font-size:1rem;cursor:pointer;transition:opacity .3s}
.guestbook-form button:hover,.record-form button:hover{opacity:.85}
.guestbook-form button:disabled,.record-form button:disabled{opacity:.5;cursor:not-allowed}
.messages,.record-list{display:flex;flex-direction:column;gap:1rem}
.message-item,.record-item{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;transition:border-color .3s}
.message-item:hover,.record-item:hover{border-color:var(--primary)}
.message-item .name{font-weight:600;color:var(--primary)}
.message-item .date{color:var(--muted);font-size:.85rem;margin-left:.5rem}
.message-item .content{margin-top:.5rem}
.record-item .record-title{font-weight:600;color:var(--primary);font-size:1.1rem}
.record-item .record-date{color:var(--muted);font-size:.85rem;margin-top:.25rem}
.record-item .record-content{margin-top:.75rem;color:var(--text)}
.record-item .record-type{display:inline-block;border-radius:6px;padding:.15rem .6rem;font-size:.75rem;margin-right:.5rem}
.record-item .record-type.study{background:rgba(99,102,241,.15);color:var(--primary-light)}
.record-item .record-type.life{background:rgba(245,158,11,.15);color:var(--orange)}
.record-item .delete-btn{float:right;background:transparent;border:1px solid var(--border);border-radius:6px;padding:.25rem .75rem;color:var(--muted);cursor:pointer;font-size:.8rem;transition:all .3s}
.record-item .delete-btn:hover{border-color:#ef4444;color:#ef4444}
.tabs{display:flex;justify-content:center;gap:1rem;margin-bottom:2rem}
.tab{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:.75rem 1.5rem;color:var(--muted);cursor:pointer;transition:all .3s;font-size:.95rem}
.tab.active{border-color:var(--primary);color:var(--primary);background:rgba(99,102,241,.1)}
.tab:hover{color:var(--primary)}
footer{text-align:center;padding:3rem 2rem;color:var(--muted);border-top:1px solid var(--border)}
@media(max-width:640px){nav ul{gap:1rem;font-size:.9rem}.hero h1{font-size:2rem}.hero p{font-size:1rem}.skills{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav>
<div class="logo">⚡ MySite</div>
<ul>
<li><a id="nav-home" onclick="showPage('home')">首页</a></li>
<li><a id="nav-study" onclick="showPage('study')">学习</a></li>
<li><a id="nav-life" onclick="showPage('life')">生活</a></li>
<li><a id="nav-blog" onclick="showPage('blog')">博客</a></li>
<li><a id="nav-guestbook" onclick="showPage('guestbook')">留言簿</a></li>
</ul>
</nav>
<div id="app"></div>
<footer><p>© 2026 byt.test260505.ccwu.cc — Powered by Cloudflare Workers + D1 + KV</p></footer>
<script>
var currentRecordType='study';
function showPage(page, param){
  updateNav(page);
  if(page==='home')renderHome();
  else if(page==='study'){currentRecordType='study';renderRecords('study');}
  else if(page==='life'){currentRecordType='life';renderRecords('life');}
  else if(page==='blog')renderBlog();
  else if(page==='blog-detail')renderBlogDetail(param);
  else if(page==='guestbook')renderGuestbook();
  window.scrollTo(0,0);
}
function updateNav(page){
  document.querySelectorAll('nav a').forEach(function(a){a.classList.remove('active')});
  var navMap={'home':'nav-home','study':'nav-study','life':'nav-life','blog':'nav-blog','blog-detail':'nav-blog','guestbook':'nav-guestbook'};
  var el=document.getElementById(navMap[page]);
  if(el)el.classList.add('active');
}
function renderHome(){
  document.getElementById('app').innerHTML=
  '<section class="hero" id="home">'+
    '<div class="avatar">👋</div>'+
    '<h1>欢迎来到我的个人网站</h1>'+
    '<p>这是一个基于 Cloudflare Workers + D1 + KV 构建的全栈个人网站，无需服务器、无需备案，全球加速。</p>'+
  '</section>'+
  '<section>'+
    '<h2>🛠 技能栈</h2>'+
    '<div class="skills">'+
      '<div class="skill-card"><div class="icon">⚡</div><h3>Cloudflare Workers</h3><p>无服务器边缘计算</p></div>'+
      '<div class="skill-card"><div class="icon">🗄️</div><h3>D1 数据库</h3><p>SQLite 边缘数据库</p></div>'+
      '<div class="skill-card"><div class="icon">🔑</div><h3>Workers KV</h3><p>全球键值存储</p></div>'+
      '<div class="skill-card"><div class="icon">🌍</div><h3>边缘网络</h3><p>全球 CDN 加速</p></div>'+
    '</div>'+
  '</section>'+
  '<section>'+
    '<h2>📬 联系方式</h2>'+
    '<div class="contact-links">'+
      '<a href="mailto:test260505@965942.xyz">📧 Email</a>'+
      '<a onclick="showPage(\'blog\')">📝 博客</a>'+
      '<a onclick="showPage(\'guestbook\')">📖 留言簿</a>'+
    '</div>'+
  '</section>';
}
function renderRecords(type){
  var typeName=type==='study'?'📚 学习记录':'🌿 生活记录';
  var typeLabel=type==='study'?'学习':'生活';
  document.getElementById('app').innerHTML=
  '<section>'+
    '<h2>'+typeName+'<span class="subtitle">记录我的'+typeLabel+'点滴</span></h2>'+
    '<div class="record-form">'+
      '<input type="text" id="record-title" placeholder="标题" maxlength="200">'+
      '<textarea id="record-content" placeholder="详细内容..." maxlength="2000"></textarea>'+
      '<button onclick="submitRecord(\''+type+'\')">添加记录</button>'+
    '</div>'+
    '<div class="record-list" id="record-list"><p style="color:var(--muted);text-align:center">加载中...</p></div>'+
  '</section>';
  loadRecords(type);
}
function loadRecords(type){
  fetch('/api/records?type='+type).then(function(r){return r.json()}).then(function(records){
    var el=document.getElementById('record-list');
    if(records.length===0){el.innerHTML='<p style="color:var(--muted);text-align:center">暂无记录，快来添加第一条吧！</p>';return}
    el.innerHTML=records.map(function(r){
      return '<div class="record-item">'+
        '<button class="delete-btn" onclick="deleteRecord('+r.id+')">删除</button>'+
        '<span class="record-type '+r.type+'">'+(r.type==='study'?'学习':'生活')+'</span>'+
        '<div class="record-title">'+escapeHtml(r.title)+'</div>'+
        '<div class="record-date">'+r.created_at+'</div>'+
        '<div class="record-content">'+escapeHtml(r.content)+'</div>'+
      '</div>';
    }).join('');
  }).catch(function(){document.getElementById('record-list').innerHTML='<p style="color:#f87171">加载失败</p>'});
}
function submitRecord(type){
  var title=document.getElementById('record-title').value.trim();
  var content=document.getElementById('record-content').value.trim();
  if(!title){alert('请填写标题');return}
  var btn=event.target;btn.disabled=true;btn.textContent='提交中...';
  fetch('/api/records',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:type,title:title,content:content})})
  .then(function(){document.getElementById('record-title').value='';document.getElementById('record-content').value='';loadRecords(type)})
  .catch(function(){alert('提交失败，请重试')})
  .finally(function(){btn.disabled=false;btn.textContent='添加记录'});
}
function deleteRecord(id){
  fetch('/api/records/'+id,{method:'DELETE'}).then(function(){loadRecords(currentRecordType)}).catch(function(){alert('删除失败')});
}
function renderBlog(){
  document.getElementById('app').innerHTML=
  '<section>'+
    '<h2>📝 博客文章</h2>'+
    '<div class="tabs">'+
      '<div class="tab active" onclick="loadBlog(null,this)">全部</div>'+
      '<div class="tab" onclick="loadBlog(\'study\',this)">学习</div>'+
      '<div class="tab" onclick="loadBlog(\'general\',this)">随笔</div>'+
    '</div>'+
    '<div class="blog-list" id="blog-list"><p style="color:var(--muted);text-align:center">加载中...</p></div>'+
  '</section>';
  loadBlog(null);
}
function loadBlog(category,tabEl){
  if(tabEl){document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});tabEl.classList.add('active')}
  var el=document.getElementById('blog-list');
  el.innerHTML='<p style="color:var(--muted);text-align:center">加载中...</p>';
  var url=category?'/api/posts?category='+category:'/api/posts';
  fetch(url).then(function(r){return r.json()}).then(function(posts){
    if(posts.length===0){el.innerHTML='<p style="color:var(--muted);text-align:center">暂无文章，敬请期待！</p>';return}
    el.innerHTML=posts.map(function(p){
      return '<div class="blog-item" onclick="showPage(\'blog-detail\',\''+p.slug+'\')">'+
        '<h3>'+escapeHtml(p.title)+'<span class="category">'+(p.category==='study'?'学习':'随笔')+'</span></h3>'+
        '<span class="date">'+p.created_at+'</span>'+
        '<p>'+escapeHtml(p.content.substring(0,120))+'...</p>'+
      '</div>';
    }).join('');
  }).catch(function(){el.innerHTML='<p style="color:#f87171">加载失败</p>'});
}
function renderBlogDetail(slug){
  document.getElementById('app').innerHTML=
  '<section>'+
    '<button class="back-btn" onclick="showPage(\'blog\')">← 返回列表</button>'+
    '<div id="blog-detail"><p style="color:var(--muted)">加载中...</p></div>'+
  '</section>';
  fetch('/api/posts/'+slug).then(function(r){return r.json()}).then(function(post){
    if(post.error){document.getElementById('blog-detail').innerHTML='<p style="color:#f87171">文章未找到</p>';return}
    document.getElementById('blog-detail').innerHTML=
      '<div class="blog-detail">'+
        '<h1>'+escapeHtml(post.title)+'</h1>'+
        '<span class="date">'+post.created_at+'</span>'+
        '<div class="content">'+escapeHtml(post.content)+'</div>'+
      '</div>';
  }).catch(function(){document.getElementById('blog-detail').innerHTML='<p style="color:#f87171">文章未找到</p>'});
}
function renderGuestbook(){
  document.getElementById('app').innerHTML=
  '<section>'+
    '<h2>📖 留言簿<span class="subtitle">给访客留下你的足迹</span></h2>'+
    '<div class="guestbook-form">'+
      '<input type="text" id="msg-name" placeholder="你的名字" maxlength="50">'+
      '<textarea id="msg-content" placeholder="写下你的留言..." maxlength="500"></textarea>'+
      '<button onclick="submitMessage()">发表留言</button>'+
    '</div>'+
    '<div class="messages" id="messages"><p style="color:var(--muted);text-align:center">加载中...</p></div>'+
  '</section>';
  loadMessages();
}
function loadMessages(){
  fetch('/api/messages').then(function(r){return r.json()}).then(function(msgs){
    var el=document.getElementById('messages');
    if(msgs.length===0){el.innerHTML='<p style="color:var(--muted);text-align:center">还没有留言，来抢沙发吧！</p>';return}
    el.innerHTML=msgs.map(function(m){
      return '<div class="message-item">'+
        '<span class="name">'+escapeHtml(m.name)+'</span>'+
        '<span class="date">'+m.created_at+'</span>'+
        '<div class="content">'+escapeHtml(m.message)+'</div>'+
      '</div>';
    }).join('');
  }).catch(function(){document.getElementById('messages').innerHTML='<p style="color:#f87171">加载失败</p>'});
}
function submitMessage(){
  var name=document.getElementById('msg-name').value.trim();
  var content=document.getElementById('msg-content').value.trim();
  if(!name||!content){alert('请填写名字和留言内容');return}
  var btn=event.target;btn.disabled=true;btn.textContent='提交中...';
  fetch('/api/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,message:content})})
  .then(function(){document.getElementById('msg-name').value='';document.getElementById('msg-content').value='';loadMessages()})
  .catch(function(){alert('提交失败，请重试')})
  .finally(function(){btn.disabled=false;btn.textContent='发表留言'});
}
function escapeHtml(text){
  if(!text)return'';
  var div=document.createElement('div');
  div.textContent=text;
  return div.innerHTML;
}
showPage('home');
</script>
</body></html>`;

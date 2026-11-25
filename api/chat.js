const CHARACTERS = {
  cheongsan: { id: 'cheongsan', name: 'Ли Чон-сан', shortName: 'Чон-сан', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces', handle: '@cheongsan_2_5', desc: 'Верный, храбрый, немного неуклюжий. Защитит любого.', initialRelationships: { friendship: 20, trust: 10, respect: 15, sympathy: 10, romance: 0, irritation: 5, hostility: 0, familiarity: 30 }, greeting: 'О, привет! Ты новенький, да? Я Чон-сан. Если что — обращайся.' },
  onjo: { id: 'onjo', name: 'Нам Он-джо', shortName: 'Он-джо', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces', handle: '@onjo_sunny', desc: 'Добрая и внимательная. Горячий чай и тёплые слова.', initialRelationships: { friendship: 25, trust: 15, respect: 10, sympathy: 15, romance: 0, irritation: 0, hostility: 0, familiarity: 25 }, greeting: 'Привет! Ты же новенький? Я Он-джо. Ты уже знаешь, где столовая?' },
  suhyeok: { id: 'suhyeok', name: 'Ли Су-хёк', shortName: 'Су-хёк', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces', handle: '@suhyeok_', desc: 'Молчаливый защитник. Спокойный и уверенный.', initialRelationships: { friendship: 10, trust: 5, respect: 20, sympathy: 5, romance: 0, irritation: 0, hostility: 0, familiarity: 15 }, greeting: 'Привет. Я Су-хёк. Не парься, я не кусаюсь.' },
  namra: { id: 'namra', name: 'Чхве Нам-ра', shortName: 'Нам-ра', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces', handle: '@namra_classrep', desc: 'Холодная и умная. Знает всё и всех.', initialRelationships: { friendship: 0, trust: 5, respect: 15, sympathy: 0, romance: 0, irritation: 0, hostility: 0, familiarity: 10 }, greeting: 'Ты новенький. Я староста класса. Если есть вопросы — спрашивай.' },
  daesu: { id: 'daesu', name: 'Ян Дэ-су', shortName: 'Дэ-су', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces', handle: '@daesu_eats', desc: 'Обожает еду. Смешной и добродушный.', initialRelationships: { friendship: 30, trust: 20, respect: 5, sympathy: 20, romance: 0, irritation: 0, hostility: 0, familiarity: 25 }, greeting: 'Йоу! Я Дэ-су. Ты случайно не принёс что-нибудь поесть? А то я умираю с голоду.' },
  jimin: { id: 'jimin', name: 'Ким Джи-мин', shortName: 'Джи-мин', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces', handle: '@jimin_sarcasm', desc: 'Сарказм 100 уровня. Но преданная подруга.', initialRelationships: { friendship: 15, trust: 10, respect: 10, sympathy: 10, romance: 0, irritation: 0, hostility: 0, familiarity: 20 }, greeting: 'Ага, новенький. Я Джи-мин. Сразу предупреждаю: я саркастичная и невыносимая.' },
  hari: { id: 'hari', name: 'Чан Ха-ри', shortName: 'Ха-ри', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces', handle: '@hari_teamcap', desc: 'Спортивная, лидер. Справедливость превыше всего.', initialRelationships: { friendship: 20, trust: 15, respect: 20, sympathy: 10, romance: 0, irritation: 0, hostility: 0, familiarity: 20 }, greeting: 'Привет. Я Ха-ри, староста и капитан команды. Если хочешь в секцию — поговорим.' },
  nayeon: { id: 'nayeon', name: 'Ли На-ён', shortName: 'На-ён', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces', handle: '@nayeon_rich', desc: 'Высокомерная. Думает, что весь мир ей должен.', initialRelationships: { friendship: -10, trust: -15, respect: 0, sympathy: -20, romance: -30, irritation: 15, hostility: 10, familiarity: 5 }, greeting: 'Ты кто вообще? Я тебя не знаю. Не мешайся.' },
  gwinam: { id: 'gwinam', name: 'Юн Гви-нам', shortName: 'Гви-нам', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces&sat=-100', handle: '@gwinam_', desc: 'Опасный. Агрессивный. Лучше не злить.', initialRelationships: { friendship: -40, trust: -50, respect: -20, sympathy: -60, romance: -80, irritation: 70, hostility: 60, familiarity: 10 }, greeting: 'Какого чёрта тебе надо?' }
};
const WORLD_LOCATIONS = [
  { id: 'class', name: 'Класс 2-3', icon: '🏫', desc: 'Твой класс. Парты, доска.', npcs: ['cheongsan', 'onjo', 'namra', 'jimin'] },
  { id: 'canteen', name: 'Столовая', icon: '🍱', desc: 'Шумно, пахнет едой.', npcs: ['daesu', 'hari'] },
  { id: 'gym', name: 'Спортзал', icon: '🏀', desc: 'Скрип кроссовок.', npcs: ['suhyeok', 'hari'] },
  { id: 'roof', name: 'Крыша', icon: '🌇', desc: 'Ветер, город внизу.', npcs: ['suhyeok', 'namra'] },
  { id: 'corridor', name: 'Коридор', icon: '🚶', desc: 'Шкафчики, гул голосов.', npcs: ['gwinam', 'nayeon', 'daesu'] }
];
const REL_KEYS = ['friendship', 'trust', 'respect', 'sympathy', 'romance', 'irritation', 'hostility', 'familiarity'];
const REL_LABELS = { friendship: 'Дружба', trust: 'Доверие', respect: 'Уважение', sympathy: 'Симпатия', romance: 'Романтика', irritation: 'Раздражение', hostility: 'Враждебность', familiarity: 'Знакомство' };
function getCharacter(id) { return CHARACTERS[id]; }
function getCharacterList() { return Object.values(CHARACTERS); }
function getLocation(id) { return WORLD_LOCATIONS.find(l => l.id === id); }
function clamp(v, min = -100, max = 100) { return Math.max(min, Math.min(max, v | 0)); }
function applyRelationshipChanges(current, changes) { const result = { ...current }; if (!changes) return result; for (const k of REL_KEYS) { if (typeof changes[k] === 'number' && changes[k] !== 0) result[k] = clamp((result[k] || 0) + clamp(changes[k], -5, 5)); } return result; }

const SAVE_KEY = 'hyosan_save_v5';
function getDefaultSave() {
  const npcs = {}; for (const c of getCharacterList()) npcs[c.id] = { relationships: { ...c.initialRelationships }, messages: [], memories: [], worldScenes: {} };
  return { 
    version: 5, 
    player: { 
      tg: { name: 'Игрок', handle: '@player', desc: 'Новенький в школе' }, 
      ig: { name: 'Игрок', handle: '@player_ig', desc: 'Жизнь прекрасна' }, 
      tw: { name: 'Игрок', handle: '@player_tw', desc: 'Просто пишу' },
      friends: [] 
    }, 
    npcs, instagram: { posts: seedIG() }, twitter: { tweets: seedTW() } 
  };
}
function seedIG() { const now = Date.now(); return [ { id: 'p1', authorId: 'daesu', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop', caption: 'Обед — это святое.', ts: now-3600000, likes: 12, likedByMe: false, comments: [{ id: 'c1', authorId: 'jimin', text: 'опять ты про еду', ts: now-3500000 }] }, { id: 'p2', authorId: 'onjo', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=600&fit=crop', caption: 'Контрольная завтра 😭', ts: now-7200000, likes: 24, likedByMe: false, comments: [] } ]; }
function seedTW() { const now = Date.now(); return [ { id: 't1', authorId: 'jimin', text: 'кто решил, что контрольная завтра?', ts: now-1800000, likes: 18, likedByMe: false, replies: [{ id: 'r1', authorId: 'daesu', text: 'учитель сказал вчера', ts: now-1700000 }] } ]; }
function loadSave() { try { const raw = localStorage.getItem(SAVE_KEY); if (!raw) return null; const data = JSON.parse(raw); if (data.version !== 5) return null; return data; } catch { return null; } }
function saveSave(data) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch (e) {} }
function getNpcState(save, npcId) { if (!save.npcs[npcId]) { const c = getCharacter(npcId); save.npcs[npcId] = { relationships: { ...c.initialRelationships }, messages: [], memories: [], worldScenes: {} }; } return save.npcs[npcId]; }

const state = { view: 'home', currentNpcId: null, worldLocId: null, worldNpcId: null, save: null, sending: false, editingProfile: null };
const screenEl = document.getElementById('screen');
document.addEventListener('DOMContentLoaded', () => { state.save = loadSave(); if (!state.save) { state.save = getDefaultSave(); saveSave(state.save); } attachTabs(); render(); });
function attachTabs() { document.querySelectorAll('.tab').forEach(tab => { tab.addEventListener('click', () => { state.view = tab.dataset.tab; state.editingProfile = null; updateTabs(state.view); render(); }); }); }
function updateTabs(active) { document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === active)); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }

function render() { 
  switch (state.view) { 
    case 'home': return renderHome(); 
    case 'chats': return renderChatList(); 
    case 'chat': return renderChat(); 
    case 'profile': return renderProfile(); 
    case 'edit_profile': return renderEditProfile();
    case 'instagram': return renderInstagram(); 
    case 'twitter': return renderTwitter(); 
    case 'world': return renderWorldLocations(); 
    case 'world_location': return renderWorldLocation(); 
    case 'world_scene': return renderWorldScene();
  } 
}

function renderHome() {
  let html = `<div class="home-header"><h2>Привет, ${state.save.player.tg.name}!</h2><p>День 1 • Хёсан</p></div><div class="home-grid">`;
  const apps = [ { id: 'chats', name: 'Telegram', icon: '✈️', css: 'tg' }, { id: 'instagram', name: 'Instagram', icon: '📷', css: 'ig' }, { id: 'twitter', name: 'Twitter / X', icon: '𝕏', css: 'tw' }, { id: 'world', name: 'Школа', icon: '🏫', css: 'tg' } ];
  for (const app of apps) html += `<div class="app-icon-wrapper" data-app="${app.id}"><div class="app-icon ${app.css}">${app.icon}</div><div class="app-name">${app.name}</div></div>`;
  html += `</div>`; screenEl.innerHTML = html;
  screenEl.querySelectorAll('.app-icon-wrapper').forEach(el => el.addEventListener('click', () => { state.view = el.dataset.app; render(); }));
}

function renderChatList() {
  let html = `<div class="page-header"><h1>Чаты</h1><button class="header-btn" id="my-tg-profile">👤 Мой профиль</button></div><div class="list-container">`;
  for (const c of getCharacterList()) {
    const st = getNpcState(state.save, c.id); const last = st.messages[st.messages.length - 1];
    const preview = last ? (last.role === 'user' ? 'Вы: ' : '') + last.text : c.desc;
    html += `<div class="list-item" data-id="${c.id}"><img class="avatar" src="${c.photo}"><div class="list-info"><div class="list-name">${c.name}</div><div class="list-desc">${escapeHtml(preview).slice(0, 40)}</div></div></div>`;
  }
  html += `</div>`; screenEl.innerHTML = html;
  document.getElementById('my-tg-profile').addEventListener('click', () => { state.editingProfile = 'tg'; state.view = 'edit_profile'; render(); });
  screenEl.querySelectorAll('.list-item').forEach(el => el.addEventListener('click', () => { state.currentNpcId = el.dataset.id; state.view = 'chat'; render(); }));
}

function renderChat() {
  const c = getCharacter(state.currentNpcId); const st = getNpcState(state.save, state.currentNpcId);
  if (st.messages.length === 0) { st.messages.push({ role: 'npc', text: c.greeting, ts: Date.now() }); saveSave(state.save); }
  let html = `<div class="chat-header"><button class="back-btn-header" id="back">‹</button><img class="avatar" src="${c.photo}" id="header-avatar"><div class="list-info"><div class="list-name">${c.name}</div><div class="list-desc">${c.handle}</div></div></div><div class="messages" id="messages">`;
  for (const m of st.messages) html += `<div class="msg ${m.role === 'user' ? 'me' : 'npc'}">${escapeHtml(m.text)}</div>`;
  if (state.sending) html += `<div class="typing">печатает…</div>`;
  html += `</div><div class="input-bar"><input id="msg-input" type="text" placeholder="Написать..."><button class="send-btn" id="send">↑</button></div>`;
  screenEl.innerHTML = html;
  const input = document.getElementById('msg-input');
  document.getElementById('back').addEventListener('click', () => { state.view = 'chats'; render(); });
  document.getElementById('header-avatar').addEventListener('click', () => { state.view = 'profile'; render(); });
  document.getElementById('send').addEventListener('click', () => sendMessage(input.value, input));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value, input); });
  const msgs = document.getElementById('messages'); msgs.scrollTop = msgs.scrollHeight;
  if (!state.sending) input.focus();
}

async function sendMessage(text, inputEl) {
  text = (text || '').trim(); if (!text || state.sending) return;
  inputEl.value = ''; const npcId = state.currentNpcId, st = getNpcState(state.save, npcId);
  st.messages.push({ role: 'user', text, ts: Date.now() }); saveSave(state.save);
  state.sending = true; renderChat();
  try {
    const history = st.messages.slice(-20, -1).map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));
    const resp = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'chat', npcId, message: text, history, relationships: st.relationships, memories: st.memories, playerProfile: state.save.player.tg }) });
    const data = await resp.json();
    if (!resp.ok || data.error) throw new Error(data.error || 'AI недоступен');
    st.messages.push({ role: 'npc', text: data.reply, ts: Date.now() });
    if (data.relationshipChanges) st.relationships = applyRelationshipChanges(st.relationships, data.relationshipChanges);
    if (data.newMemory && data.newMemory.trim()) { st.memories.push({ text: data.newMemory.trim(), ts: Date.now() }); if (st.memories.length > 30) st.memories = st.memories.slice(-30); }
    saveSave(state.save);
  } catch (err) { st.messages.push({ role: 'npc', text: `[ошибка: ${err.message}]`, ts: Date.now() }); saveSave(state.save); } 
  finally { state.sending = false; renderChat(); }
}

function renderInstagram() {
  let html = `<div class="page-header"><h1>Instagram</h1><button class="header-btn" id="my-ig-profile">👤 Мой профиль</button></div><div class="feed">`;
  for (const p of state.save.instagram.posts) {
    const author = getCharacter(p.authorId);
    const isFriend = state.save.player.friends.includes(p.authorId);
    html += `<div class="post"><div class="post-header"><img class="avatar" src="${author.photo}"><div class="post-author">${author.shortName}</div>${!isFriend ? `<button class="btn-action" data-add-friend="${author.id}">+ Друг</button>` : `<span style="color:var(--text-dim);font-size:12px">Друг</span>`}</div><img class="post-img" src="${p.img}"><div class="post-text"><b>${author.shortName}</b> ${escapeHtml(p.caption)}</div><div class="post-actions"><button class="like-btn ${p.likedByMe ? 'liked' : ''}" data-like="${p.id}">${p.likedByMe ? '♥' : '♡'}</button><span>${p.likes} лайков</span></div><div class="comments">`;
    for (const cm of p.comments) {
      const ca = getCharacter(cm.authorId); const isMe = cm.authorId === 'me';
      html += `<div class="comment ${isMe ? 'me' : ''}"><b>${isMe ? 'Ты' : ca.shortName}</b>${escapeHtml(cm.text)}</div>`;
    }
    html += `<div class="comment-input"><input type="text" placeholder="Комментарий…" data-cinput="${p.id}"><button data-csend="${p.id}">Отпр.</button></div></div></div>`;
  }
  html += `</div>`; screenEl.innerHTML = html;
  
  document.getElementById('my-ig-profile').addEventListener('click', () => { state.editingProfile = 'ig'; state.view = 'edit_profile'; render(); });
  screenEl.querySelectorAll('[data-add-friend]').forEach(btn => btn.addEventListener('click', () => { if(!state.save.player.friends.includes(btn.dataset.addFriend)) state.save.player.friends.push(btn.dataset.addFriend); saveSave(state.save); renderInstagram(); }));
  screenEl.querySelectorAll('[data-like]').forEach(btn => btn.addEventListener('click', () => { const p = state.save.instagram.posts.find(x => x.id === btn.dataset.like); p.likedByMe = !p.likedByMe; p.likes += p.likedByMe ? 1 : -1; saveSave(state.save); renderInstagram(); }));
  screenEl.querySelectorAll('[data-csend]').forEach(btn => btn.addEventListener('click', () => { const pid = btn.dataset.csend; const inp = screenEl.querySelector(`[data-cinput="${pid}"]`); sendComment(pid, inp.value); }));
}

async function sendComment(postId, text) {
  text = (text || '').trim(); if (!text || state.sending) return;
  const post = state.save.instagram.posts.find(p => p.id === postId); if (!post) return;
  post.comments.push({ id: 'cm' + Date.now(), authorId: 'me', text, ts: Date.now() }); saveSave(state.save);
  state.sending = true; renderInstagram();
  try {
    const authorId = post.authorId; const st = getNpcState(state.save, authorId);
    const history = post.comments.slice(-8, -1).map(cm => { const a = getCharacter(cm.authorId); return { author: cm.authorId === 'me' ? 'Игрок' : a.shortName, text: cm.text }; });
    const resp = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'instagram_comment', npcId: authorId, message: text, postCaption: post.caption, history, relationships: st.relationships, memories: st.memories, playerProfile: state.save.player.ig }) });
    const data = await resp.json();
    if (!resp.ok || data.error) throw new Error(data.error || 'AI недоступен');
    post.comments.push({ id: 'cm' + Date.now(), authorId, text: data.reply, ts: Date.now() });
    saveSave(state.save);
  } catch (err) {} finally { state.sending = false; renderInstagram(); }
}

function renderTwitter() {
  let html = `<div class="page-header"><h1>Twitter / X</h1><button class="header-btn" id="my-tw-profile">👤 Мой профиль</button></div><div class="feed">`;
  for (const t of state.save.twitter.tweets) {
    const author = getCharacter(t.authorId);
    const isFriend = state.save.player.friends.includes(t.authorId);
    html += `<div class="post"><div class="post-header"><img class="avatar" src="${author.photo}"><div class="post-author">${author.shortName} <span style="color:var(--text-dim);font-weight:400">${author.handle}</span></div>${!isFriend ? `<button class="btn-action" data-add-friend-tw="${author.id}">+ Подписаться</button>` : `<span style="color:var(--text-dim);font-size:12px">Подписан</span>`}</div><div class="post-text">${escapeHtml(t.text)}</div><div class="post-actions"><button class="like-btn ${t.likedByMe ? 'liked' : ''}" data-tlike="${t.id}">${t.likedByMe ? '♥' : '♡'} ${t.likes}</button></div><div class="comments">`;
    for (const r of t.replies) {
      const ra = getCharacter(r.authorId); const isMe = r.authorId === 'me';
      html += `<div class="comment ${isMe ? 'me' : ''}"><b>${isMe ? 'Ты' : ra.shortName}</b>${escapeHtml(r.text)}</div>`;
    }
    html += `<div class="comment-input"><input type="text" placeholder="Ответить…" data-tinput="${t.id}"><button data-tsend="${t.id}">Отпр.</button></div></div></div>`;
  }
  html += `</div>`; screenEl.innerHTML = html;
  
  document.getElementById('my-tw-profile').addEventListener('click', () => { state.editingProfile = 'tw'; state.view = 'edit_profile'; render(); });
  screenEl.querySelectorAll('[data-add-friend-tw]').forEach(btn => btn.addEventListener('click', () => { if(!state.save.player.friends.includes(btn.dataset.addFriendTw)) state.save.player.friends.push(btn.dataset.addFriendTw); saveSave(state.save); renderTwitter(); }));
  screenEl.querySelectorAll('[data-tlike]').forEach(btn => btn.addEventListener('click', () => { const t = state.save.twitter.tweets.find(x => x.id === btn.dataset.tlike); t.likedByMe = !t.likedByMe; t.likes += t.likedByMe ? 1 : -1; saveSave(state.save); renderTwitter(); }));
  screenEl.querySelectorAll('[data-tsend]').forEach(btn => btn.addEventListener('click', () => { const tid = btn.dataset.tsend; const inp = screenEl.querySelector(`[data-tinput="${tid}"]`); sendReply(tid, inp.value); }));
}

async function sendReply(tweetId, text) {
  text = (text || '').trim(); if (!text || state.sending) return;
  const tweet = state.save.twitter.tweets.find(t => t.id === tweetId); if (!tweet) return;
  tweet.replies.push({ id: 'tr' + Date.now(), authorId: 'me', text, ts: Date.now() }); saveSave(state.save);
  state.sending = true; renderTwitter();
  try {
    const authorId = tweet.authorId; const st = getNpcState(state.save, authorId);
    const history = tweet.replies.slice(-8, -1).map(r => { const a = getCharacter(r.authorId); return { author: r.authorId === 'me' ? 'Игрок' : a.shortName, text: r.text }; });
    const resp = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'twitter_reply', npcId: authorId, message: text, tweetText: tweet.text, history, relationships: st.relationships, memories: st.memories, playerProfile: state.save.player.tw }) });
    const data = await resp.json();
    if (!resp.ok || data.error) throw new Error(data.error || 'AI недоступен');
    tweet.replies.push({ id: 'tr' + Date.now(), authorId, text: data.reply, ts: Date.now() });
    saveSave(state.save);
  } catch (err) {} finally { state.sending = false; renderTwitter(); }
}

function renderEditProfile() {
  const app = state.editingProfile;
  const p = state.save.player[app];
  let title = app === 'tg' ? 'Telegram' : app === 'ig' ? 'Instagram' : 'Twitter';
  
  let html = `<div class="page-header"><button class="back-btn-header" id="back">‹</button><h1>Мой профиль: ${title}</h1></div>
  <div class="edit-form">
    <div class="input-group"><label>Отображаемое имя</label><input type="text" id="edit-name" value="${p.name}"></div>
    <div class="input-group"><label>Юзернейм (@...)</label><input type="text" id="edit-handle" value="${p.handle}"></div>
    <div class="input-group"><label>Описание / Статус</label><input type="text" id="edit-desc" value="${p.desc}"></div>
    <button class="btn-action primary" style="width:100%;justify-content:center;margin-top:10px" id="save-profile">Сохранить профиль</button>
  </div>`;
  screenEl.innerHTML = html;

  document.getElementById('back').addEventListener('click', () => { state.view = app === 'tg' ? 'chats' : app; render(); });
  document.getElementById('save-profile').addEventListener('click', () => {
    state.save.player[app] = {
      name: document.getElementById('edit-name').value,
      handle: document.getElementById('edit-handle').value,
      desc: document.getElementById('edit-desc').value
    };
    saveSave(state.save);
    state.view = app === 'tg' ? 'chats' : app; 
    render();
  });
}

function renderProfile() {
  const c = getCharacter(state.currentNpcId); const st = getNpcState(state.save, state.currentNpcId);
  let html = `<div class="page-header"><button class="back-btn-header" id="back">‹</button><h1>Профиль</h1></div><div class="profile-wrapper"><div class="profile-card"><div class="profile-top"><img class="avatar" src="${c.photo}"><div class="profile-title"><h2>${c.name}</h2><div class="handle">${c.handle}</div><div class="status-badge">${st.relationships.familiarity > 50 ? 'Друг' : 'Знакомый'}</div></div></div><div class="profile-desc">${c.desc}</div><div class="profile-actions"><button class="btn-action primary" id="go-chat">💬 Чат</button></div><div class="rel-header"><h3>Ваши отношения</h3></div>`;
  for (const k of REL_KEYS) {
    const v = st.relationships[k] || 0;
    const color = v >= 0 ? 'var(--rel-blue)' : 'var(--rel-red)';
    html += `<div class="rel-row"><div class="rel-label">${REL_LABELS[k]}</div><div class="rel-bar-bg"><div class="rel-bar-fill" style="width:${Math.abs(v)}%;background:${color}"></div></div><div class="rel-value">${v}/100</div></div>`;
  }
  html += `</div></div>`; screenEl.innerHTML = html;
  document.getElementById('back').addEventListener('click', () => { state.view = state.currentNpcId ? 'chat' : 'home'; render(); });
  document.getElementById('go-chat').addEventListener('click', () => { state.view = 'chat'; render(); });
}

function renderWorldLocations() {
  let html = `<div class="page-header"><h1>Школа</h1></div><div class="list-container">`;
  for (const loc of WORLD_LOCATIONS) {
    html += `<div class="list-item" data-loc="${loc.id}"><div style="font-size:32px;width:48px;text-align:center">${loc.icon}</div><div class="list-info"><div class="list-name">${loc.name}</div><div class="list-desc">${loc.desc}</div></div></div>`;
  }
  html += `</div>`; screenEl.innerHTML = html;
  screenEl.querySelectorAll('.list-item').forEach(el => el.addEventListener('click', () => { state.worldLocId = el.dataset.loc; state.view = 'world_location'; render(); }));
}

function renderWorldLocation() {
  const loc = getLocation(state.worldLocId); const npcIds = loc.npcs.filter(id => state.save.npcs[id]);
  let html = `<div class="page-header"><button class="back-btn-header" id="back">‹</button><h1>${loc.icon} ${loc.name}</h1></div><div class="list-container">`;
  if (npcIds.length === 0) html += `<div style="padding:20px;color:var(--text-dim)">Здесь никого нет.</div>`;
  else for (const id of npcIds) { const c = getCharacter(id); html += `<div class="list-item" data-npc="${id}"><img class="avatar" src="${c.photo}"><div class="list-info"><div class="list-name">${c.name}</div><div class="list-desc">Подойти</div></div></div>`; }
  html += `</div>`; screenEl.innerHTML = html;
  document.getElementById('back').addEventListener('click', () => { state.view = 'world'; render(); });
  screenEl.querySelectorAll('.list-item').forEach(el => el.addEventListener('click', () => { state.worldNpcId = el.dataset.npc; state.view = 'world_scene'; render(); }));
}

function renderWorldScene() {
  const loc = getLocation(state.worldLocId); const c = getCharacter(state.worldNpcId); const st = getNpcState(state.save, state.worldNpcId);
  if (!st.worldScenes[loc.id]) st.worldScenes[loc.id] = [];
  let html = `<div class="chat-header"><button class="back-btn-header" id="back">‹</button><div class="list-info"><div class="list-name">${c.name}</div><div class="list-desc">${loc.name}</div></div></div><div class="world-scene" id="world-scene">`;
  const scene = st.worldScenes[loc.id];
  if (scene.length === 0) html += `<div class="scene-line action">Ты подходишь к ${c.shortName}.</div>`;
  for (const line of scene) {
    if (line.type === 'player_action') html += `<div class="scene-line player-action">${escapeHtml(line.text)}</div>`;
    else if (line.type === 'npc_action') html += `<div class="scene-line action">${escapeHtml(line.text)}</div>`;
    else if (line.type === 'npc_speech') html += `<div class="scene-line npc-speech"><b>${c.shortName}</b>${escapeHtml(line.text)}</div>`;
  }
  if (state.sending) html += `<div class="typing">…</div>`;
  html += `</div><div class="input-bar"><input id="world-input" type="text" placeholder="Что ты делаешь / говоришь?"><button class="send-btn" id="world-send">↑</button></div>`;
  screenEl.innerHTML = html;
  const input = document.getElementById('world-input');
  document.getElementById('back').addEventListener('click', () => { state.view = 'world_location'; render(); });
  document.getElementById('world-send').addEventListener('click', () => sendWorldAction(input.value, input));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendWorldAction(input.value, input); });
  const sceneEl = document.getElementById('world-scene'); sceneEl.scrollTop = sceneEl.scrollHeight;
  if (!state.sending) input.focus();
}

async function sendWorldAction(text, inputEl) {
  text = (text || '').trim(); if (!text || state.sending) return;
  inputEl.value = '';
  const loc = getLocation(state.worldLocId); const npcId = state.worldNpcId; const st = getNpcState(state.save, npcId);
  if (!st.worldScenes[loc.id]) st.worldScenes[loc.id] = [];
  st.worldScenes[loc.id].push({ type: 'player_action', text, ts: Date.now() }); saveSave(state.save);
  state.sending = true; renderWorldScene();
  try {
    const history = st.worldScenes[loc.id].slice(-14, -1).map(l => ({ type: l.type, text: l.text }));
    const resp = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'world', npcId, message: text, location: loc.name, otherNpcs: loc.npcs.filter(id => id !== npcId).map(id => getCharacter(id).name), history, relationships: st.relationships, memories: st.memories, playerProfile: state.save.player.tg }) });
    const data = await resp.json();
    if (!resp.ok || data.error) throw new Error(data.error || 'AI недоступен');
    if (data.npcAction) st.worldScenes[loc.id].push({ type: 'npc_action', text: data.npcAction, ts: Date.now() });
    if (data.reply) st.worldScenes[loc.id].push({ type: 'npc_speech', text: data.reply, ts: Date.now() });
    if (data.relationshipChanges) st.relationships = applyRelationshipChanges(st.relationships, data.relationshipChanges);
    if (data.newMemory && data.newMemory.trim()) { st.memories.push({ text: data.newMemory.trim(), ts: Date.now() }); if (st.memories.length > 30) st.memories = st.memories.slice(-30); }
    saveSave(state.save);
  } catch (err) { st.worldScenes[loc.id].push({ type: 'npc_action', text: `[ошибка: ${err.message}]`, ts: Date.now() }); saveSave(state.save); } 
  finally { state.sending = false; renderWorldScene(); }
}

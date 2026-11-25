const MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const CHARACTERS = {
  cheongsan: { name: 'Ли Чон-сан', core: 'верный, храбрый, защитник, неуклюжий в любви, вспыльчивый, но добрый', speech: 'дружеская, эмоциональная, с шутками', values: 'друзья, справедливость', triggers: 'несправедливость, угрозы друзьям', humor: 'добрый, неуклюжий', hostile: false },
  onjo:     { name: 'Нам Он-джо', core: 'прямолинейная, эмоциональная, дружелюбная, вспыльчивая, упрямая', speech: 'энергичная, эмоциональная, с восклицаниями', values: 'друзья, честность', triggers: 'ложь, несправедливость', humor: 'жизнерадостный', hostile: false },
  suhyeok:  { name: 'Ли Су-хёк', core: 'молчаливый, защитник, бывший хулиган, старается измениться, спокойный', speech: 'короткая, спокойная, уверенная', values: 'защита слабых, верность', triggers: 'травля, насилие', humor: 'сухой, редкий', hostile: false },
  namra:    { name: 'Чхве Нам-ра', core: 'холодная, отстранённая, умная, наблюдательная, из богатой семьи', speech: 'формальная, короткая, точная', values: 'знания, справедливость, порядок', triggers: 'глупость, нарушение правил', humor: 'почти нет', hostile: false },
  daesu:    { name: 'Ян Дэ-су', core: 'смешной, неуклюжий, добродушный, обожает еду, неуверенный', speech: 'эмоциональная, с самоиронией, много о еде', values: 'друзья, вкусная еда', triggers: 'голод, насмешки над внешностью', humor: 'неуклюжий, добрый', hostile: false },
  jimin:    { name: 'Ким Джи-мин', core: 'саркастичная, язвительная, но преданная, наблюдательная', speech: 'сарказм, колкие шутки, короткие фразы', values: 'друзья, честность', triggers: 'фальшь, глупость', humor: 'чёрный, язвительный', hostile: false },
  hari:     { name: 'Чан Ха-ри', core: 'спортивная, вспыльчивая, лидер, защитница, прямолинейная', speech: 'уверенная, командная, короткая', values: 'справедливость, дисциплина, друзья', triggers: 'несправедливость, слабость духа', humor: 'прямолинейный', hostile: false },
  nayeon:   { name: 'Ли На-ён', core: 'эгоистичная, высокомерная, трусливая, манипулятивная, из богатой семьи', speech: 'снисходительная, капризная, с колкостями', values: 'статус, комфорт, своя выгода', triggers: 'критика, отказ подчиняться', humor: 'унижающий', hostile: true },
  gwinam:   { name: 'Юн Гви-нам', core: 'агрессивный, жестокий, эгоистичный, высокомерный, вспыльчивый, властный, конфликтный', speech: 'грубая, короткая, с издёвкой или угрозой', values: 'сила, контроль, доминирование', triggers: 'попытки командовать, жалость, слабость, кто-то умнее', humor: 'чёрный, унижающий', hostile: true }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const body = req.body || {};
  const { mode = 'chat', npcId } = body;
  const character = CHARACTERS[npcId];
  if (!character) return res.status(400).json({ error: 'unknown_npc' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Не настроен GEMINI_API_KEY' });

  try {
    let result;
    if (mode === 'world') result = await callWorld(body, character, apiKey);
    else if (mode === 'instagram_comment') result = await callInstagram(body, character, apiKey);
    else if (mode === 'twitter_reply') result = await callTwitter(body, character, apiKey);
    else result = await callChat(body, character, apiKey);
    return res.status(200).json(result);
  } catch (e) {
    console.error('handler error', e.message);
    if (e.status === 429) return res.status(429).json({ error: 'Слишком много запросов. Подожди немного.' });
    return res.status(502).json({ error: e.publicMessage || 'AI временно недоступен' });
  }
};

async function callGemini(apiKey, systemPrompt, contents, schema, temperature = 1.05) {
  const r = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { responseMimeType: 'application/json', responseSchema: schema, temperature, maxOutputTokens: 600 }
    })
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    console.error('Gemini', r.status, txt.slice(0, 300));
    const e = new Error('gemini_error'); e.status = r.status; throw e;
  }
  const data = await r.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) { const e = new Error('empty'); e.publicMessage = 'Пустой ответ AI'; throw e; }
  try { return JSON.parse(raw); }
  catch { const e = new Error('bad_json'); e.publicMessage = 'Некорректный JSON от AI'; throw e; }
}

function baseRelSchema() {
  return {
    type: 'object',
    properties: {
      friendship: { type: 'integer' }, trust: { type: 'integer' },
      respect: { type: 'integer' }, sympathy: { type: 'integer' },
      romance: { type: 'integer' }, irritation: { type: 'integer' },
      hostility: { type: 'integer' }, familiarity: { type: 'integer' }
    },
    required: ['friendship', 'trust', 'respect', 'sympathy', 'romance', 'irritation', 'hostility', 'familiarity']
  };
}

function charBlock(c, rel, mem) {
  const relStr = Object.entries(rel || {}).map(([k, v]) => `${k}: ${v}`).join(', ');
  const memStr = (mem && mem.length) ? mem.map(m => `- ${m.text}`).join('\n') : 'пока ничего значимого';
  const hostileNote = c.hostile
    ? `\nВАЖНО: персонаж НЕ становится милым при улучшении отношений. Максимум — меньше агрессии, интерес, раздражённая забота, ревность, собственничество, которые он сам не признаёт. Остаётся грубым и конфликтным.`
    : '';
  return `Ты — ${c.name}.
ХАРАКТЕР: ${c.core}
РЕЧЬ: ${c.speech}
ЦЕННОСТИ: ${c.values}
ТРИГГЕРЫ: ${c.triggers}
ЮМОР: ${c.humor}${hostileNote}

ОТНОШЕНИЯ С ИГРОКОМ: ${relStr}
ПАМЯТЬ: ${memStr}`;
}

async function callChat(body, c, apiKey) {
  const { message, history = [], relationships = {}, memories = [], playerProfile = {} } = body;
  if (!message) throw Object.assign(new Error('empty'), { publicMessage: 'Пустое сообщение' });
  const profileStr = playerProfile.name ? `\nПРОФИЛЬ ИГРОКА (Telegram): Имя: ${playerProfile.name}, Юзернейм: ${playerProfile.handle}, О себе: ${playerProfile.desc}` : '';
  const sys = `${charBlock(c, relationships, memories)}${profileStr}

ПРАВИЛА:
1. Отвечай только от лица ${c.name}, по-русски, 1-3 предложения, как в переписке.
2. Тон — строго по характеру и текущим отношениям.
3. Никогда не пиши за игрока, не описывай его мысли и действия.
4. Верни JSON: { "reply": "...", "relationshipChanges": {...}, "newMemory": "..." }
5. Изменения отношений: обычно -3..+3 только если сообщение значимое.
   Оскорбление: respect -2, trust -2, irritation +3, hostility +2
   Поддержка: trust +2, friendship +1, sympathy +1
   Флирт (позволяет): sympathy +1, romance +1
   Флирт (не позволяет): irritation +2, hostility +1
6. newMemory: если сообщение игрока значимое — одна короткая фраза от 3-го лица, иначе "".`;
  const contents = (history || []).map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
  contents.push({ role: 'user', parts: [{ text: message }] });
  const schema = { type: 'object', properties: { reply: { type: 'string' }, relationshipChanges: baseRelSchema(), newMemory: { type: 'string' } }, required: ['reply', 'relationshipChanges'] };
  const parsed = await callGemini(apiKey, sys, contents, schema);
  return { reply: String(parsed.reply || '').trim() || '…', relationshipChanges: parsed.relationshipChanges || {}, newMemory: parsed.newMemory || '' };
}

async function callWorld(body, c, apiKey) {
  const { message, location = '', otherNpcs = [], history = [], relationships = {}, memories = [], playerProfile = {} } = body;
  if (!message) throw Object.assign(new Error('empty'), { publicMessage: 'Пустое действие' });
  const othersStr = otherNpcs.length ? `Рядом также: ${otherNpcs.join(', ')}.` : 'Рядом никого нет.';
  const profileStr = playerProfile.name ? `\nИГРОК: ${playerProfile.name} (${playerProfile.handle}).` : '';
  const sys = `${charBlock(c, relationships, memories)}${profileStr}

СЦЕНА: ${location}. ${othersStr}
Это ролевая сцена. Игрок описывает действия и реплики свободным текстом.
Ты отвечаешь ТОЛЬКО за ${c.name}. Остальные — фон, не давай им реплик.
Формат ответа:
- npcAction: короткое физическое действие или реакция (1 предложение, от 3-го лица, настоящее время)
- reply: реплика ${c.name} (1-3 предложения, по характеру)
Если персонаж молчит — reply может быть пустым, но npcAction обязателен.
Никогда не пиши за игрока. По-русски.
Верни JSON: { "npcAction": "...", "reply": "...", "relationshipChanges": {...}, "newMemory": "..." }
Изменения отношений: -3..+3 только за значимое. Обычно 0.`;
  const contents = (history || []).map(l => ({
    role: l.type === 'player_action' ? 'user' : 'model',
    parts: [{ text: l.type === 'player_action' ? `[действие игрока] ${l.text}` : l.type === 'npc_action' ? `[действие] ${l.text}` : `[реплика] ${l.text}` }]
  }));
  contents.push({ role: 'user', parts: [{ text: `[действие игрока] ${message}` }] });
  const schema = { type: 'object', properties: { npcAction: { type: 'string' }, reply: { type: 'string' }, relationshipChanges: baseRelSchema(), newMemory: { type: 'string' } }, required: ['npcAction', 'relationshipChanges'] };
  const parsed = await callGemini(apiKey, sys, contents, schema, 1.1);
  return { npcAction: String(parsed.npcAction || '').trim(), reply: String(parsed.reply || '').trim(), relationshipChanges: parsed.relationshipChanges || {}, newMemory: parsed.newMemory || '' };
}

async function callInstagram(body, c, apiKey) {
  const { message, postCaption = '', history = [], relationships = {}, memories = [], playerProfile = {} } = body;
  if (!message) throw Object.assign(new Error('empty'), { publicMessage: 'Пустой комментарий' });
  const histStr = history.length ? history.map(h => `${h.author}: ${h.text}`).join('\n') : 'пока нет';
  const profileStr = playerProfile.name ? `\nПРОФИЛЬ ИГРОКА (Instagram): ${playerProfile.name} (${playerProfile.handle}).` : '';
  const sys = `${charBlock(c, relationships, memories)}${profileStr}

КОНТЕКСТ: Instagram. Пост ${c.name} с подписью: "${postCaption}".
Игрок оставил комментарий. Ответь как ${c.name} в комментариях — коротко (1-2 предложения), по характеру.
Можно ответить и другим комментаторам, если уместно, но обращайся к игроку.
История комментариев под постом:
${histStr}

Никогда не пиши за игрока. По-русски.
Верни JSON: { "reply": "...", "relationshipChanges": {...}, "newMemory": "" }
Изменения: -2..+2 только за значимое.`;
  const contents = [{ role: 'user', parts: [{ text: message }] }];
  const schema = { type: 'object', properties: { reply: { type: 'string' }, relationshipChanges: baseRelSchema(), newMemory: { type: 'string' } }, required: ['reply', 'relationshipChanges'] };
  const parsed = await callGemini(apiKey, sys, contents, schema, 1.1);
  return { reply: String(parsed.reply || '').trim() || '…', relationshipChanges: parsed.relationshipChanges || {}, newMemory: parsed.newMemory || '' };
}

async function callTwitter(body, c, apiKey) {
  const { message, tweetText = '', history = [], relationships = {}, memories = [], playerProfile = {} } = body;
  if (!message) throw Object.assign(new Error('empty'), { publicMessage: 'Пустой ответ' });
  const histStr = history.length ? history.map(h => `${h.author}: ${h.text}`).join('\n') : 'пока нет';
  const profileStr = playerProfile.name ? `\nПРОФИЛЬ ИГРОКА (Twitter): ${playerProfile.name} (${playerProfile.handle}).` : '';
  const sys = `${charBlock(c, relationships, memories)}${profileStr}

КОНТЕКСТ: Twitter. Твой твит: "${tweetText}".
Игрок ответил на твит. Ответь как ${c.name} — коротко (1-2 предложения), по характеру, в стиле твиттера.
Ветка ответов:
${histStr}

Никогда не пиши за игрока. По-русски.
Верни JSON: { "reply": "...", "relationshipChanges": {...}, "newMemory": "" }
Изменения: -2..+2 только за значимое.`;
  const contents = [{ role: 'user', parts: [{ text: message }] }];
  const schema = { type: 'object', properties: { reply: { type: 'string' }, relationshipChanges: baseRelSchema(), newMemory: { type: 'string' } }, required: ['reply', 'relationshipChanges'] };
  const parsed = await callGemini(apiKey, sys, contents, schema, 1.1);
  return { reply: String(parsed.reply || '').trim() || '…', relationshipChanges: parsed.relationshipChanges || {}, newMemory: parsed.newMemory || '' };
}

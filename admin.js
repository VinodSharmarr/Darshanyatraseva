/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva, admin.js  (प्रबंधक पैनल)

   क्या करता है
   ─────────────
   • पासकोड से लॉगिन (पासकोड का ताला config.js में, खुला पासकोड कहीं नहीं)
   • यात्रा का पूरा विवरण एक बार भरो: नाम, तारीख़, समय, दर्शन स्थल,
     Google लोकेशन, कई पिकअप पॉइंट (हर एक का अपना नक़्शा लिंक)
   • यात्रियों की सूची, किसने पूरा पैसा दिया, किसने सिर्फ़ टोकन
   • पूरा भुगतान करने वालों को एक दबाव में विवरण:
     WhatsApp (मुख्य) · SMS · ईमेल · कॉपी

   ⚠️ सारा डेटा इसी ब्राउज़र के localStorage में रहता है, कोई सर्वर नहीं,
      इसलिए hosting मुफ़्त रहती है और यात्रियों के नंबर कहीं बाहर नहीं जाते।
      इसका मतलब यह भी है कि ब्राउज़र का डेटा साफ़ हुआ तो सब चला जाएगा,
      इसीलिए "बैकअप" वाला हिस्सा बनाया गया है।

   ⚠️ यह पासकोड ताला सिर्फ़ आपके अपने फ़ोन/लैपटॉप की सुरक्षा के लिए है।
      यह बैंक जैसा लॉगिन नहीं है, पर चूँकि डेटा कहीं ऑनलाइन है ही नहीं,
      किसी और के लिए यहाँ देखने को कुछ है भी नहीं।
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $  = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const KEY_DATA = 'dys-admin-v1';    // यात्राएँ + यात्री
  const KEY_PASS = 'dys-admin-pass';  // बदला हुआ पासकोड (सिर्फ़ ताला)
  const KEY_SESS = 'dys-admin-in';    // इस बार लॉगिन है या नहीं

  /* ── छोटे औज़ार ─────────────────────────────────────────── */
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  async function sha256(txt) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /* "22:00" → "रात 10:00 बजे" */
  function timeHi(hhmm) {
    if (!hhmm) return '';
    const [h, m] = hhmm.split(':').map(Number);
    let part = 'रात';
    if (h >= 4 && h < 12) part = 'सुबह';
    else if (h >= 12 && h < 16) part = 'दोपहर';
    else if (h >= 16 && h < 19) part = 'शाम';
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${part} ${hh}:${String(m).padStart(2, '0')} बजे`;
  }

  /* "2026-08-14" → "शुक्रवार, 14 अगस्त 2026" (+ उस दिन की तिथि) */
  function dateHi(iso, withTithi) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d, 12);
    let out = window.Panchang ? Panchang.fmtDate(dt, false)
                              : dt.toLocaleDateString('hi-IN');
    if (withTithi && window.Panchang) out += ' (' + Panchang.summary(dt, false) + ')';
    return out;
  }

  const rupee = n => '₹' + Number(n || 0).toLocaleString('en-IN');
  const phoneOK = p => /^[6-9]\d{9}$/.test(String(p).replace(/\D/g, ''));
  const waNum   = p => '91' + String(p).replace(/\D/g, '').slice(-10);

  /* ── डेटा ─────────────────────────────────────────────── */
  let DB = { yatras: [] };

  function load() {
    try {
      const raw = localStorage.getItem(KEY_DATA);
      if (raw) DB = JSON.parse(raw);
    } catch (e) { /* ख़राब डेटा, ख़ाली से शुरू */ }
    if (!DB || !Array.isArray(DB.yatras)) DB = { yatras: [] };
  }
  function save() {
    try {
      localStorage.setItem(KEY_DATA, JSON.stringify(DB));
    } catch (e) {
      alert('डेटा सेव नहीं हो पाया। ब्राउज़र की जगह भर गई हो सकती है, बैकअप उतार लें।');
    }
  }
  const yatraById = id => DB.yatras.find(y => y.id === id);

  /* ══ 1. लॉगिन ══════════════════════════════════════════ */
  const loginBox = $('#loginBox'), panelBox = $('#panelBox'), logoutBtn = $('#logoutBtn');

  function showPanel() {
    loginBox.hidden = true;
    panelBox.hidden = false;
    logoutBtn.hidden = false;
    renderAll();
  }

  $('#loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('#loginErr');
    const want = localStorage.getItem(KEY_PASS) || (window.CONFIG && CONFIG.adminHash) || '';
    let got = '';
    try {
      got = await sha256($('#pass').value);
    } catch (ex) {
      err.textContent = 'यह पेज सीधे फ़ाइल से खुला है। साइट के पते (https) से खोलें।';
      err.hidden = false; return;
    }
    if (got && got === want) {
      sessionStorage.setItem(KEY_SESS, '1');
      $('#pass').value = '';
      err.hidden = true;
      showPanel();
    } else {
      err.textContent = 'पासकोड ग़लत है।';
      err.hidden = false;
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(KEY_SESS);
    location.reload();
  });

  /* ── टैब ── */
  $('#tabs').addEventListener('click', e => {
    const b = e.target.closest('button[data-tab]');
    if (!b) return;
    $$('#tabs button').forEach(x => x.classList.toggle('is-on', x === b));
    $$('.adm__pane').forEach(p => p.classList.toggle('is-on', p.dataset.pane === b.dataset.tab));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ══ 2. यात्रा ══════════════════════════════════════════ */
  const yatraForm = $('#yatraForm'), pickupList = $('#pickupList');

  function pickupRow(p) {
    p = p || { place: '', time: '', map: '' };
    const row = document.createElement('div');
    row.className = 'adm__pickRow';
    row.innerHTML = `
      <input class="pk-place" placeholder="जगह, जैसे उत्तम नगर मेट्रो गेट 2" value="${esc(p.place)}" />
      <input class="pk-time" type="time" value="${esc(p.time)}" />
      <input class="pk-map" type="url" placeholder="Google लोकेशन लिंक" value="${esc(p.map)}" />
      <button type="button" class="adm__del" aria-label="हटाएँ">✕</button>`;
    row.querySelector('.adm__del').addEventListener('click', () => {
      row.remove();
      if (!pickupList.children.length) pickupList.appendChild(pickupRow());
    });
    return row;
  }
  $('#addPickup').addEventListener('click', () => pickupList.appendChild(pickupRow()));

  function readPickups() {
    return [...pickupList.children].map(r => ({
      place: r.querySelector('.pk-place').value.trim(),
      time:  r.querySelector('.pk-time').value,
      map:   r.querySelector('.pk-map').value.trim()
    })).filter(p => p.place);
  }

  /* तारीख़ भरते ही उस दिन की तिथि दिखा दो, ग्राहक को बताने में काम आती है */
  yatraForm.date.addEventListener('change', () => {
    const el = $('#dateTithi');
    el.textContent = yatraForm.date.value ? dateHi(yatraForm.date.value, true) : '';
  });

  function fillYatraForm(y) {
    yatraForm.reset();
    pickupList.innerHTML = '';
    if (!y) {
      yatraForm.id.value = '';
      pickupList.appendChild(pickupRow());
      $('#dateTithi').textContent = '';
      $('#yatraFormTitle').textContent = 'नई यात्रा जोड़ें';
      return;
    }
    ['id','name','date','depart','ret','dest','map','vehicle','seats','fare','note','status']
      .forEach(k => { if (yatraForm[k]) yatraForm[k].value = y[k] || ''; });
    (y.pickups && y.pickups.length ? y.pickups : [null])
      .forEach(p => pickupList.appendChild(pickupRow(p)));
    $('#dateTithi').textContent = dateHi(y.date, true);
    $('#yatraFormTitle').textContent = 'यात्रा में बदलाव';
  }

  yatraForm.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(yatraForm));
    d.pickups = readPickups();
    if (d.id) {
      const y = yatraById(d.id);
      d.pax = y ? y.pax || [] : [];
      DB.yatras = DB.yatras.map(x => x.id === d.id ? d : x);
    } else {
      d.id = uid(); d.pax = [];
      DB.yatras.unshift(d);
    }
    save();
    fillYatraForm(null);
    renderAll();
    flash('यात्रा सेव हो गई ✅');
  });

  $('#yatraReset').addEventListener('click', () => fillYatraForm(null));

  const STATUS = { upcoming: ['आगामी', 'ok'], running: ['अभी चल रही है', 'warn'], done: ['पूरी हो गई', ''] };

  function renderYatraList() {
    const box = $('#yatraList');
    if (!DB.yatras.length) {
      box.innerHTML = '<p class="adm__empty">अभी कोई यात्रा नहीं जोड़ी गई।</p>';
      return;
    }
    box.innerHTML = DB.yatras.map(y => {
      const pax = y.pax || [];
      const full = pax.filter(p => p.paid === 'full').length;
      const st = STATUS[y.status] || STATUS.upcoming;
      return `<div class="adm__item">
        <div class="adm__itemMain">
          <b>${esc(y.name)}</b>
          <span class="pill ${st[1] ? 'pill--' + st[1] : ''}">${st[0]}</span>
          <div class="adm__meta">
            ${esc(dateHi(y.date))} · ${esc(timeHi(y.depart))}<br />
            ${pax.length} यात्री · ${full} ने पूरा भुगतान किया
            ${y.pickups && y.pickups.length ? ' · ' + y.pickups.length + ' पिकअप पॉइंट' : ''}
          </div>
        </div>
        <div class="adm__itemBtns">
          <button class="btn btn--sm btn--outline" data-edit="${y.id}">बदलें</button>
          <button class="btn btn--sm adm__danger" data-delY="${y.id}">हटाएँ</button>
        </div>
      </div>`;
    }).join('');

    box.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => {
      fillYatraForm(yatraById(b.dataset.edit));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
    box.querySelectorAll('[data-delY]').forEach(b => b.addEventListener('click', () => {
      const y = yatraById(b.dataset.delY);
      if (!confirm(`"${y.name}" और उसके ${(y.pax || []).length} यात्री हमेशा के लिए हट जाएँगे। हटाएँ?`)) return;
      DB.yatras = DB.yatras.filter(x => x.id !== y.id);
      save(); renderAll();
    }));
  }

  /* ══ 3. यात्री ══════════════════════════════════════════ */
  const paxForm = $('#paxForm');

  function fillSelect(sel, keep) {
    const cur = keep && sel.value;
    sel.innerHTML = DB.yatras.map(y =>
      `<option value="${y.id}">${esc(y.name)}, ${esc(dateHi(y.date))}</option>`).join('')
      || '<option value="">पहले कोई यात्रा जोड़ें</option>';
    if (cur && DB.yatras.some(y => y.id === cur)) sel.value = cur;
  }

  function fillPickupSelect() {
    const y = yatraById($('#paxYatra').value);
    const list = (y && y.pickups) || [];
    $('#paxPickup').innerHTML = '<option value="">चुनें</option>' +
      list.map(p => `<option value="${esc(p.place)}">${esc(p.place)}${p.time ? ', ' + esc(timeHi(p.time)) : ''}</option>`).join('');
  }

  $('#paxYatra').addEventListener('change', () => { fillPickupSelect(); renderPaxList(); });

  paxForm.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#paxErr');
    const y = yatraById($('#paxYatra').value);
    if (!y) { err.textContent = 'पहले एक यात्रा जोड़ें।'; err.hidden = false; return; }
    const d = Object.fromEntries(new FormData(paxForm));
    if (!phoneOK(d.phone)) {
      err.textContent = 'मोबाइल नंबर 10 अंकों का सही डालें।';
      err.hidden = false; return;
    }
    err.hidden = true;
    d.phone = String(d.phone).replace(/\D/g, '').slice(-10);
    y.pax = y.pax || [];
    if (d.id) y.pax = y.pax.map(p => p.id === d.id ? { ...p, ...d } : p);
    else {
      d.id = uid(); d.sent = false;
      d.at = new Date().toISOString();   // कब जोड़ा, Excel में यही दिखता है
      y.pax.push(d);
    }
    save();
    paxForm.reset(); paxForm.id.value = ''; paxForm.seats.value = 1;
    renderAll();
    flash('यात्री सेव हो गया ✅');
  });

  $('#paxReset').addEventListener('click', () => {
    paxForm.reset(); paxForm.id.value = ''; paxForm.seats.value = 1;
  });

  const PAID = { full: ['पूरा', 'ok'], token: ['टोकन', 'warn'], due: ['बाक़ी', 'warn'] };

  function renderPaxList() {
    const box = $('#paxList');
    const y = yatraById($('#paxYatra').value);
    const pax = (y && y.pax) || [];
    if (!pax.length) {
      box.innerHTML = '<p class="adm__empty">इस यात्रा में अभी कोई यात्री नहीं।</p>';
      return;
    }
    const seats = pax.reduce((n, p) => n + (+p.seats || 1), 0);
    const money = pax.reduce((n, p) => n + (+p.amount || 0), 0);
    box.innerHTML = `<p class="adm__sum">कुल ${pax.length} यात्री · ${seats} सीट · ${rupee(money)} प्राप्त</p>` +
      pax.map(p => {
        const s = PAID[p.paid] || PAID.due;
        return `<div class="adm__item">
          <div class="adm__itemMain">
            <b>${esc(p.name)}</b> <span class="pill pill--${s[1]}">${s[0]}</span>
            <div class="adm__meta">
              📞 ${esc(p.phone)} · ${esc(p.seats || 1)} सीट
              ${p.amount ? ' · ' + rupee(p.amount) : ''}
              ${p.pickup ? '<br />📍 ' + esc(p.pickup) : ''}
            </div>
          </div>
          <div class="adm__itemBtns">
            <button class="btn btn--sm btn--outline" data-editP="${p.id}">बदलें</button>
            <button class="btn btn--sm adm__danger" data-delP="${p.id}">हटाएँ</button>
          </div>
        </div>`;
      }).join('');

    box.querySelectorAll('[data-editP]').forEach(b => b.addEventListener('click', () => {
      const p = y.pax.find(x => x.id === b.dataset.editP);
      ['id','name','phone','email','seats','pickup','paid','amount']
        .forEach(k => { if (paxForm[k]) paxForm[k].value = p[k] || ''; });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
    box.querySelectorAll('[data-delP]').forEach(b => b.addEventListener('click', () => {
      if (!confirm('यह यात्री हटा दें?')) return;
      y.pax = y.pax.filter(x => x.id !== b.dataset.delP);
      save(); renderAll();
    }));
  }

  /* ══ 4. संदेश बनाना ════════════════════════════════════
     rich = true  → WhatsApp (उसमें *मोटा* अक्षर चलता है)
     short = true → SMS (छोटा रखना पड़ता है)                */
  function buildMsg(y, p, opt) {
    opt = opt || {};
    const B = t => opt.rich ? '*' + t + '*' : t;
    const C = window.CONFIG || {};
    const naam = (p && p.name) ? p.name + ' जी' : 'यात्री जी';
    const L = [];

    if (opt.short) {
      L.push('जय श्री श्याम! दर्शन यात्रा सेवा');
      L.push(`${y.name}, ${dateHi(y.date)}`);
      L.push(`प्रस्थान: ${timeHi(y.depart)}`);
      const pk = pickOf(y, p);
      if (pk) L.push(`पिकअप: ${pk.place}${pk.time ? ', ' + timeHi(pk.time) : ''}`);
      L.push(`संपर्क: ${C.phone || ''}`);
      L.push(C.site || '');
      return L.filter(Boolean).join('\n');
    }

    L.push('🙏 जय श्री श्याम');
    L.push('');
    L.push(B('दर्शन यात्रा सेवा') + ', यात्रा का विवरण');
    L.push('');
    L.push(`नमस्ते ${naam},`);
    L.push(p && p.paid === 'full'
      ? 'आपकी सीट पक्की हो चुकी है। पूरा विवरण नीचे है:'
      : 'आपकी यात्रा का पूरा विवरण नीचे है:');
    L.push('');
    L.push(`${B('यात्रा')}: ${y.name}`);
    L.push(`${B('तिथि')}: ${dateHi(y.date, true)}`);
    L.push(`${B('प्रस्थान')}: ${timeHi(y.depart)}`);
    if (y.ret)     L.push(`${B('वापसी')}: ${y.ret}`);
    if (y.dest)    L.push(`${B('दर्शन स्थल')}: ${y.dest}`);
    if (y.map)     L.push(`${B('मंदिर की लोकेशन')}: ${y.map}`);
    if (y.vehicle) L.push(`${B('वाहन')}: ${y.vehicle}`);

    if (p) {
      if (p.seats)  L.push(`${B('आपकी सीटें')}: ${p.seats}`);
      if (p.paid === 'full') L.push(`${B('भुगतान')}: पूरा प्राप्त ✅${p.amount ? ' (' + rupee(p.amount) + ')' : ''}`);
      else if (p.paid === 'token') L.push(`${B('भुगतान')}: टोकन प्राप्त${p.amount ? ' (' + rupee(p.amount) + ')' : ''}, बाक़ी राशि यात्रा से पहले`);
    }

    const pk = pickOf(y, p);
    if (pk) {
      L.push('');
      L.push(B('आपका पिकअप पॉइंट'));
      L.push(`📍 ${pk.place}${pk.time ? ', ' + timeHi(pk.time) : ''}`);
      if (pk.map) L.push(`🗺️ ${pk.map}`);
    }

    const all = (y.pickups || []).filter(x => x.place);
    if (all.length > 1) {
      L.push('');
      L.push(B('सभी पिकअप पॉइंट'));
      all.forEach((x, i) => {
        L.push(`${i + 1}. ${x.place}${x.time ? ', ' + timeHi(x.time) : ''}`);
        if (x.map) L.push(`   ${x.map}`);
      });
    }

    if (y.note && y.note.trim()) {
      L.push('');
      L.push(B('ज़रूरी बातें'));
      y.note.split('\n').filter(t => t.trim()).forEach(t => L.push('• ' + t.trim()));
    }

    L.push('');
    if (C.phone) L.push(`किसी भी मदद के लिए: ${C.phone}`);
    if (C.site)  L.push(`🌐 ${C.site}`);
    const S = C.social || {};
    if (S.instagram) L.push(`📷 Instagram: ${S.instagram}`);
    if (S.facebook)  L.push(`👍 Facebook: ${S.facebook}`);
    if (S.youtube)   L.push(`▶️ YouTube: ${S.youtube}`);
    L.push('');
    L.push('जय श्री श्याम 🙏');
    return L.join('\n');
  }

  /* यात्रा लौटने के बाद रिव्यू माँगने वाला संदेश।
     ⚠️ यहाँ कोई बना-बनाया रिव्यू नहीं भेजा जाता, सिर्फ़ लिंक और तरीक़ा।
        एक जैसे शब्द वाले रिव्यू Google पकड़कर हटा देता है, और नक़ली शब्द
        किसी के मुँह में डालना उपभोक्ता क़ानून के हिसाब से भी ग़लत है। */
  function reviewMsg(y, p, rich) {
    const B = t => rich ? '*' + t + '*' : t;
    const C = window.CONFIG || {};
    const naam = (p && p.name) ? p.name + ' जी' : 'यात्री जी';
    const L = [];
    L.push('🙏 जय श्री श्याम');
    L.push('');
    L.push(`नमस्ते ${naam},`);
    L.push(y ? `${y.name} की यात्रा में हमें सेवा का अवसर देने के लिए धन्यवाद।`
             : 'हमें सेवा का अवसर देने के लिए धन्यवाद।');
    L.push('');
    L.push('आपके दो शब्द किसी और परिवार को सही सेवा चुनने में मदद करेंगे।');
    L.push(`${B('दो मिनट लगेंगे')}, और लिखना न आता हो तो बोलकर भी लिखा जा सकता है, तरीक़ा इस पेज पर बताया है:`);
    L.push('');
    L.push('https://' + (C.site || 'www.darshanyatraseva.com') + '/review');
    if (C.googleReview) {
      L.push('');
      L.push('सीधे Google पर लिखना हो: ' + C.googleReview);
    }
    L.push('');
    L.push('जो सच में लगा वही लिखिएगा, कमी हो तो वो भी बताइए, हम सुधारेंगे।');
    L.push('');
    L.push('- ' + (C.phone || ''));
    L.push('जय श्री श्याम 🙏');
    return L.join('\n');
  }

  /* यात्री का अपना पिकअप, न हो तो पहला वाला */
  function pickOf(y, p) {
    const all = (y.pickups || []).filter(x => x.place);
    if (!all.length) return null;
    if (p && p.pickup) return all.find(x => x.place === p.pickup) || all[0];
    return all.length === 1 ? all[0] : null;
  }

  /* ══ 5. भेजना ══════════════════════════════════════════ */
  function sendButtons(y, p, phone, email) {
    const n = String(phone || '').replace(/\D/g, '');
    const okNum = phoneOK(n);
    const full = encodeURIComponent(buildMsg(y, p, { rich: true }));
    const plain = encodeURIComponent(buildMsg(y, p, {}));
    const sms = encodeURIComponent(buildMsg(y, p, { short: true }));
    const sub = encodeURIComponent(`${y.name}, ${dateHi(y.date)} · यात्रा का विवरण`);

    /* SMS लिंक: Android "?body=" समझता है, iPhone "&body=",
       "?&body=" दोनों जगह चल जाता है, इसलिए वही रखा है। */
    const rev = encodeURIComponent(reviewMsg(y, p, true));

    return `
      <a class="adm__wa ${okNum ? '' : 'is-off'}" ${okNum ? `href="https://wa.me/${waNum(n)}?text=${full}" target="_blank" rel="noopener"` : ''}>💬 WhatsApp</a>
      <a class="adm__sms ${okNum ? '' : 'is-off'}" ${okNum ? `href="sms:+${waNum(n)}?&body=${sms}"` : ''}>📩 SMS</a>
      <a class="adm__mail" href="mailto:${String(email || '').trim()}?subject=${sub}&body=${plain}">✉️ ईमेल</a>
      <a class="adm__rev ${okNum ? '' : 'is-off'}" ${okNum ? `href="https://wa.me/${waNum(n)}?text=${rev}" target="_blank" rel="noopener"` : ''}
         title="यात्रा लौटने के बाद भेजें">⭐ रिव्यू माँगें</a>
      <button type="button" class="adm__copy" data-copy="1">📋 कॉपी</button>`;
  }

  function wireCopy(scope, y, p) {
    scope.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      const txt = buildMsg(y, p, { rich: true });
      try {
        await navigator.clipboard.writeText(txt);
        flash('संदेश कॉपी हो गया 📋');
      } catch (e) {
        prompt('यह संदेश कॉपी कर लें:', txt);
      }
    }));
  }

  function renderSend() {
    const y = yatraById($('#sendYatra').value);
    const box = $('#sendList'), quick = $('#quickSend'), prev = $('#msgPreview');

    if (!y) {
      box.innerHTML = '<p class="adm__empty">पहले कोई यात्रा जोड़ें।</p>';
      quick.innerHTML = ''; prev.textContent = '';
      return;
    }

    prev.textContent = buildMsg(y, (y.pax || [])[0] || null, { rich: true });

    /* सिर्फ़ नंबर डालकर भेजने वाला हिस्सा */
    const qp = $('#quickPhone').value, qn = $('#quickName').value, qe = $('#quickEmail').value;
    quick.innerHTML = sendButtons(y, qn ? { name: qn, paid: 'full' } : null, qp, qe);
    wireCopy(quick, y, qn ? { name: qn, paid: 'full' } : null);

    /* यात्रियों की सूची */
    let pax = y.pax || [];
    if ($('#onlyPaid').checked) pax = pax.filter(p => p.paid === 'full');
    if (!pax.length) {
      box.innerHTML = '<p class="adm__empty">इस यात्रा में ऐसा कोई यात्री नहीं मिला।</p>';
      return;
    }

    box.innerHTML = pax.map(p => `
      <div class="adm__item adm__item--send" data-pax="${p.id}">
        <div class="adm__itemMain">
          <b>${esc(p.name)}</b>${p.sent ? ' <span class="pill pill--ok">भेजा जा चुका</span>' : ''}
          <div class="adm__meta">📞 ${esc(p.phone)}${p.email ? ' · ✉️ ' + esc(p.email) : ''}${p.pickup ? '<br />📍 ' + esc(p.pickup) : ''}</div>
        </div>
        <div class="adm__send">${sendButtons(y, p, p.phone, p.email)}</div>
      </div>`).join('');

    box.querySelectorAll('[data-pax]').forEach(row => {
      const p = (y.pax || []).find(x => x.id === row.dataset.pax);
      wireCopy(row, y, p);
      /* भेजने वाला कोई भी बटन दबते ही "भेजा जा चुका" लग जाए */
      row.querySelectorAll('.adm__wa, .adm__sms, .adm__mail').forEach(a =>
        a.addEventListener('click', () => {
          if (a.classList.contains('is-off')) return;
          p.sent = true; save();
          setTimeout(renderSend, 400);
        }));
      row.querySelector('.adm__itemMain').addEventListener('click', () => {
        prev.textContent = buildMsg(y, p, { rich: true });
      });
    });
  }

  $('#sendYatra').addEventListener('change', renderSend);
  $('#onlyPaid').addEventListener('change', renderSend);
  ['#quickPhone', '#quickName', '#quickEmail'].forEach(s =>
    $(s).addEventListener('input', renderSend));

  $('#copyMsg').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText($('#msgPreview').textContent);
      flash('संदेश कॉपी हो गया 📋');
    } catch (e) {
      prompt('यह संदेश कॉपी कर लें:', $('#msgPreview').textContent);
    }
  });

  /* ══ 6. Excel फ़ाइलें ═══════════════════════════════════
     .csv बनाते हैं, Excel इसे सीधे खोल लेता है और किसी library की
     ज़रूरत नहीं पड़ती। शुरू में ﻿ (BOM) ज़रूरी है, वरना Excel में
     हिन्दी अक्षर कूड़ा दिखते हैं।                                  */
  function csv(rows) {
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    return '﻿' + rows.map(r => r.map(q).join(',')).join('\r\n');
  }

  function download(name, text) {
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  const stamp = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  /* "2026-08-14" → "14-08-2026" (Excel भारतीय क्रम में ही ठीक लगता है) */
  const dmy = iso => iso ? iso.split('-').reverse().join('-') : '';

  const whenHi = iso => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()} ${timeHi(String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'))}`;
  };

  const PAID_TXT = { full: 'पूरा भुगतान', token: 'सिर्फ़ टोकन', due: 'बाक़ी है' };

  /* तारीख़ फिर प्रस्थान के समय के क्रम में, जैसा Vinod को चाहिए */
  function sortedYatras(only) {
    const list = only ? [only] : DB.yatras.slice();
    return list.sort((a, b) =>
      (a.date || '').localeCompare(b.date || '') ||
      (a.depart || '').localeCompare(b.depart || ''));
  }

  function paxCsv(only) {
    const rows = [[
      'यात्रा की तारीख़', 'दिन', 'तिथि (पंचांग)', 'प्रस्थान', 'यात्रा',
      'यात्री का नाम', 'मोबाइल', 'ईमेल', 'सीटें', 'पिकअप पॉइंट', 'पिकअप समय',
      'भुगतान', 'मिली राशि (₹)', 'विवरण भेजा?', 'कब जोड़ा गया'
    ]];
    sortedYatras(only).forEach(y => {
      const dt = y.date ? new Date(y.date + 'T12:00:00') : null;
      const din = dt && window.Panchang ? Panchang.VAAR_HI[dt.getDay()] : '';
      const tithi = dt && window.Panchang ? Panchang.summary(dt, false) : '';
      (y.pax || []).forEach(p => {
        const pk = (y.pickups || []).find(x => x.place === p.pickup);
        rows.push([
          dmy(y.date), din, tithi, timeHi(y.depart), y.name,
          p.name, p.phone, p.email || '', p.seats || 1,
          p.pickup || '', pk ? timeHi(pk.time) : '',
          PAID_TXT[p.paid] || '', p.amount || '',
          p.sent ? 'हाँ' : 'नहीं', whenHi(p.at)
        ]);
      });
    });
    return rows;
  }

  function payCsv() {
    const rows = [[
      'यात्रा की तारीख़', 'यात्रा', 'यात्री', 'मोबाइल', 'सीटें',
      'किराया प्रति सीट (₹)', 'कुल किराया (₹)', 'मिली राशि (₹)', 'बाक़ी (₹)', 'स्थिति'
    ]];
    let tKul = 0, tMili = 0, tBaki = 0;
    sortedYatras().forEach(y => {
      const fare = +y.fare || 0;
      (y.pax || []).forEach(p => {
        const seats = +p.seats || 1;
        const kul = fare * seats;
        const mili = +p.amount || 0;
        const baki = Math.max(0, kul - mili);
        tKul += kul; tMili += mili; tBaki += baki;
        rows.push([
          dmy(y.date), y.name, p.name, p.phone, seats,
          fare || '', kul || '', mili, kul ? baki : '', PAID_TXT[p.paid] || ''
        ]);
      });
    });
    rows.push([]);
    rows.push(['', '', '', '', 'कुल जोड़', '', tKul, tMili, tBaki, '']);
    return rows;
  }

  function needData() {
    if (DB.yatras.some(y => (y.pax || []).length)) return false;
    flash('अभी कोई यात्री जुड़ा ही नहीं है');
    return true;
  }

  /* ── वही सूची स्क्रीन पर ─────────────────────────────────
     फ़ोन पर .csv खोलने के लिए अलग ऐप चाहिए होता है, इसलिए रोज़ का
     देखना यहीं हो जाए, फ़ाइल सिर्फ़ तब जब Excel में काम करना हो।  */
  function showTable(rows, title) {
    const box = $('#xlView');
    const head = rows[0];
    /* ख़ाली पंक्ति और "कुल जोड़" वाली आख़िरी लाइन गिनती में नहीं आतीं */
    const body = rows.slice(1).filter(r => r.length);
    const real = body.filter(r => r[4] !== 'कुल जोड़');
    if (!real.length) {
      box.innerHTML = '<p class="adm__empty">अभी कोई यात्री जुड़ा ही नहीं है, पहले "यात्री" टैब में कोई यात्री जोड़ें।</p>';
      return;
    }
    box.innerHTML = `
      <div class="adm__tableTop">
        <b>${esc(title)}</b>
        <span>${real.length} यात्री · बग़ल में सरकाकर बाक़ी ख़ाने देखें →</span>
      </div>
      <div class="adm__tableWrap">
        <table class="adm__table">
          <thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${body.map(r =>
            `<tr${r[4] === 'कुल जोड़' ? ' class="is-total"' : ''}>${
              r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  $('#viewPax').addEventListener('click', () => showTable(paxCsv(), 'यात्री रजिस्टर'));
  $('#viewPay').addEventListener('click', () => showTable(payCsv(), 'भुगतान का हिसाब'));

  $('#xlPax').addEventListener('click', () => {
    if (needData()) return;
    download(`yatri-register-${stamp()}.csv`, csv(paxCsv()));
    flash('यात्री रजिस्टर उतर गया 📊');
  });

  $('#xlPay').addEventListener('click', () => {
    if (needData()) return;
    download(`bhugtan-hisab-${stamp()}.csv`, csv(payCsv()));
    flash('भुगतान का हिसाब उतर गया 💰');
  });

  $('#xlThis').addEventListener('click', () => {
    const y = yatraById($('#paxYatra').value);
    if (!y || !(y.pax || []).length) return flash('इस यात्रा में अभी कोई यात्री नहीं');
    download(`yatri-${(y.name || 'yatra').replace(/\s+/g, '-')}-${dmy(y.date)}.csv`, csv(paxCsv(y)));
    flash('इस यात्रा का Excel उतर गया 📊');
  });

  /* ══ 6b. WhatsApp का संदेश चिपकाकर फ़ॉर्म भरना ═══════════
     साइट का बुकिंग फ़ॉर्म हमेशा एक ही ढाँचे में संदेश भेजता है
     (script.js §6), इसलिए उसे पढ़ना आसान है।                    */
  function parseInquiry(txt) {
    const pick = label => {
      const m = txt.match(new RegExp('\\*?' + label + ':?\\*?\\s*:?\\s*(.+)'));
      return m ? m[1].replace(/\*/g, '').trim() : '';
    };
    const digits = (txt.match(/\b[6-9]\d{9}\b/) || [''])[0];
    return {
      name:   pick('नाम'),
      phone:  digits || pick('मोबाइल').replace(/\D/g, '').slice(-10),
      route:  pick('यात्रा'),
      seats:  (pick('यात्री').match(/\d+/) || [''])[0],
      pickup: pick('पिकअप')
    };
  }

  $('#pasteFill').addEventListener('click', () => {
    const txt = $('#pasteBox').value.trim();
    if (!txt) return note('#pasteMsg', 'पहले संदेश चिपकाएँ।');
    const g = parseInquiry(txt);
    if (!g.name && !g.phone) return note('#pasteMsg', 'इस संदेश में नाम/नंबर नहीं मिला। हाथ से भर लें।');

    if (g.name)  paxForm.name.value = g.name;
    if (g.phone) paxForm.phone.value = g.phone;
    if (g.seats) paxForm.seats.value = g.seats;

    /* पिकअप तभी चुनो जब यात्रा में वैसा पॉइंट सच में हो */
    let pkNote = '';
    if (g.pickup && g.pickup !== 'बताएँगे') {
      const opt = [...$('#paxPickup').options].find(o => o.value && (
        o.value === g.pickup || o.value.includes(g.pickup) || g.pickup.includes(o.value)));
      if (opt) paxForm.pickup.value = opt.value;
      else pkNote = ` (पिकअप "${g.pickup}" इस यात्रा में नहीं है, या तो यात्रा में जोड़ें, या हाथ से चुनें)`;
    }
    const y = yatraById($('#paxYatra').value);
    const routeNote = (g.route && y && !y.name.includes(g.route) && !g.route.includes(y.name))
      ? ` ⚠️ संदेश में यात्रा "${g.route}" लिखी है, ऊपर सही यात्रा चुनी है या नहीं, देख लें।` : '';

    note('#pasteMsg', 'भर दिया ✅ अब भुगतान चुनकर सेव कर दें।' + pkNote + routeNote, true);
  });

  $('#pasteClear').addEventListener('click', () => {
    $('#pasteBox').value = '';
    $('#pasteMsg').hidden = true;
  });

  /* ══ 7. बैकअप + पासकोड ═════════════════════════════════ */
  $('#exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(DB, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    const d = new Date();
    a.href = URL.createObjectURL(blob);
    a.download = `dys-backup-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });

  $('#importFile').addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const got = JSON.parse(r.result);
        if (!got || !Array.isArray(got.yatras)) throw new Error('bad');
        if (!confirm(`इस फ़ाइल में ${got.yatras.length} यात्राएँ हैं। अभी का सारा डेटा हटाकर यही चढ़ा दें?`)) return;
        DB = got; save(); renderAll();
        note('#moreMsg', 'बैकअप चढ़ गया ✅', true);
      } catch (ex) {
        note('#moreMsg', 'यह फ़ाइल सही नहीं लगी। वही फ़ाइल चुनें जो यहीं से उतारी थी।');
      }
    };
    r.readAsText(f);
    e.target.value = '';
  });

  /* पासकोड बदलने से पहले अभी वाला पूछा जाता है, वरना कोई गलती से
     (या कोई और आपका खुला पैनल देखकर) पासकोड बदल दे तो आप ही बाहर हो जाएँ। */
  $('#passForm').addEventListener('submit', async e => {
    e.preventDefault();
    const old = $('#oldPass').value, a = $('#newPass').value, b = $('#newPass2').value;
    const want = localStorage.getItem(KEY_PASS) || (window.CONFIG && CONFIG.adminHash) || '';
    if (await sha256(old) !== want) return note('#passMsg', 'अभी वाला पासकोड ग़लत है।');
    if (a !== b)      return note('#passMsg', 'दोनों नए पासकोड अलग हैं।');
    if (a.length < 6) return note('#passMsg', 'कम से कम 6 अक्षर रखें।');
    localStorage.setItem(KEY_PASS, await sha256(a));
    $('#passForm').reset();
    note('#passMsg', 'पासकोड बदल गया ✅ अगली बार यही चलेगा।', true);
  });

  /* पासकोड भूल जाएँ तो, config.js वाला पासकोड वापस चालू।
     डेटा को हाथ नहीं लगता। (जिसके हाथ में यह फ़ोन है उसके पास डेटा
     वैसे भी है, इसलिए इससे सुरक्षा कम नहीं होती, बस ताला वापस पुराना।) */
  $('#forgotBtn').addEventListener('click', () => {
    if (!localStorage.getItem(KEY_PASS)) {
      /* 🔴 यहाँ पासकोड लिख कर मत बताना, admin.js भी खुलेआम पढ़ी जा सकती है
         (कोई भी `/admin.js` खोल सकता है)। पहले यहाँ शुरुआती पासकोड लिखा था,
         जिससे वो सबको दिख जाता था (30 जुलाई 2026 को हटाया)। */
      alert('इस फ़ोन पर पासकोड बदला ही नहीं गया है।\n\nजो पासकोड config.js में लगा है, वही चलेगा। (वो HANDOVER.md में लिखा है।)');
      return;
    }
    if (!confirm('बदला हुआ पासकोड हटाकर पुराना (config.js वाला) चालू कर दें?\n\nयात्रा और यात्रियों का डेटा बिल्कुल नहीं मिटेगा।')) return;
    localStorage.removeItem(KEY_PASS);
    alert('हो गया ✅ अब config.js वाले पासकोड से लॉगिन करें।');
  });

  function note(sel, txt, good) {
    const el = $(sel);
    el.textContent = txt;
    el.hidden = false;
    el.classList.toggle('is-good', !!good);
  }

  /* छोटा सा संदेश जो अपने आप ग़ायब हो जाए */
  let flashEl = null;
  function flash(txt) {
    if (!flashEl) {
      flashEl = document.createElement('div');
      flashEl.className = 'adm__flash';
      document.body.appendChild(flashEl);
    }
    flashEl.textContent = txt;
    flashEl.classList.add('is-on');
    clearTimeout(flash._t);
    flash._t = setTimeout(() => flashEl.classList.remove('is-on'), 2200);
  }

  /* ══ 8. सब कुछ दोबारा बनाओ ═════════════════════════════ */
  function renderAll() {
    renderYatraList();
    fillSelect($('#paxYatra'), true);
    fillSelect($('#sendYatra'), true);
    fillPickupSelect();
    renderPaxList();
    renderSend();
  }

  /* ── शुरुआत ── */
  load();
  if (!pickupList.children.length) pickupList.appendChild(pickupRow());
  if (sessionStorage.getItem(KEY_SESS) === '1') showPanel();
})();

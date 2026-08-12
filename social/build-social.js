/* ═══════════════════════════════════════════════════════════
   social/build-social.js, पूरा सोशल कंटेंट एक बार में बना देता है

   चलाने का तरीक़ा:
       node social/build-social.js
       node social/build-social.js --days 240
       node social/build-social.js --date "रविवार, 17 अगस्त"

   क्या बनता है:
       social/html/*.html    हर पोस्ट, दो नापों में
       social/captions.md    हर पोस्ट का कैप्शन, कॉपी करने लायक़
       social/calendar.md    कब क्या डालना है, तारीख़ के क्रम में
       social/plan.json      मशीन के पढ़ने लायक़ पूरा हिसाब

   फिर तस्वीरें बनाने के लिए:
       python social/render.py

   ── पर्व वाली पोस्ट कहाँ से आती हैं ────────────────────────
   panchang.js में पूरे हिन्दू कैलेंडर की गणना पहले से मौजूद है,
   वही फ़ाइल जो वेबसाइट पर चलती है। यहाँ उसी से अगले कुछ महीनों
   के व्रत और पर्व निकालकर हर एक की अपनी पोस्ट बना दी जाती है।
   यानी त्योहार की तारीख़ हाथ से कभी नहीं ढूँढनी पड़ती।

   🔴 इसीलिए यह script समय के साथ पुरानी पड़ जाती है। महीने में
      एक बार दोबारा चला लीजिए, तभी आगे की तारीख़ें आती रहेंगी।
      (build-panchang.js के साथ ही चलाने की आदत बना लें, §9)
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const dir  = __dirname;                       // social/
const root = path.join(dir, '..');            // साइट की जड़

/* ── दलीलें ──────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const argOf = (flag, def) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : def;
};
const DAYS = parseInt(argOf('--days', '180'), 10);
const DEP_DATE = argOf('--date', '');         // प्रस्थान पोस्ट की तारीख़

/* ── config.js से नंबर और पता ──────────────────────────────
   HANDOVER §3: नंबर सिर्फ़ एक जगह बदलता है। यह script भी वहीं से
   पढ़ती है, ताकि नंबर बदलने पर पोस्ट अपने आप सही बन जाएँ।       */
const cfgSrc = fs.readFileSync(path.join(root, 'config.js'), 'utf8');
const pick = re => { const m = cfgSrc.match(re); return m ? m[1] : ''; };
const cfg = {
  whatsapp: pick(/whatsapp:\s*'([^']+)'/),
  phone:    pick(/phone:\s*'([^']+)'/),
  site:     pick(/site:\s*'([^']+)'/)
};
if (!cfg.whatsapp || !cfg.phone) {
  console.error('config.js se number nahi mila, kuch badal gaya hai?');
  process.exit(1);
}

/* ── panchang.js को Node में चलाने का ढाँचा ─────────────────
   वही तरीक़ा जो build-panchang.js में पहले से चल रहा है।        */
global.window = {};
global.document = {
  documentElement: { lang: 'hi' },
  getElementById: () => null,
  readyState: 'complete',
  addEventListener: () => {}
};
global.MutationObserver = function () { return { observe() {} }; };
global.CONFIG = { whatsapp: cfg.whatsapp };
require(path.join(root, 'panchang.js'));
const P = window.Panchang;

const { FACTS, DHAM, TAGS, FOOT, POSTS, PARV_DHAM, parvCaption } = require('./content.js');
const { SIZES, page } = require('./templates.js');

const MAH_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
                'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

/* ═══ 1. पंचांग से पर्व वाली पोस्ट ═══════════════════════════
   रैंक 1 = बड़े त्योहार। रैंक 2 में से सिर्फ़ एकादशी और पूर्णिमा
   ली जाती हैं, क्योंकि यात्रा के लिहाज़ से वही दो तिथियाँ मायने
   रखती हैं (खाटू की एकादशी, सालासर की पूर्णिमा)। अमावस्या और
   बाक़ी मासिक व्रत छोड़ दिए गए हैं, वरना हर हफ़्ते वही पोस्ट
   दोहराई जाती और लोग अनदेखा करने लगते।                        */
function parvPosts() {
  const out = [];
  const seen = new Set();
  const start = new Date(); start.setHours(12, 0, 0, 0);

  for (let i = 1; i <= DAYS; i++) {
    const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i, 12);
    const p  = P.forDate(dt);
    const all = P.parvOf(p, false);

    const names = all.filter(x =>
      x[1] === 1 || /एकादशी|पूर्णिमा/.test(x[0])
    ).map(x => x[0]);
    if (!names.length) continue;

    const key = names.join('|');
    if (seen.has(key) && /एकादशी|पूर्णिमा/.test(key) && names.length === 1) {
      /* एकादशी हर पखवाड़े आती है। दोबारा वही पोस्ट न बने, इसलिए
         दूसरी बार से आगे छोड़ दी जाती है। बड़े त्योहार कभी नहीं छूटते। */
    }
    seen.add(key);

    const dhamKey = (PARV_DHAM.find(([re]) => re.test(key)) || [])[1] || null;
    const tithi = `${P.MASA_HI[p.masa]} ${P.pakshaName(p, false)} ${P.tithiName(p, false)}`;
    const dateStr = `${dt.getDate()} ${MAH_HI[dt.getMonth()]} ${dt.getFullYear()}, ${P.VAAR_HI[dt.getDay()]}`;
    const d = dhamKey ? DHAM[dhamKey] : null;

    out.push({
      id: 'parv-' + dt.toISOString().slice(0, 10),
      cat: 'पर्व', lay: 'parv',
      when: dt,
      head: names.join('\n'),
      /* जिस पर्व का कोई चलती हुई यात्रा से नाता नहीं (गोवर्धन, बरसाना,
         जीण माता), उस पर बुकिंग का बुलावा नहीं लिखा जाता। जो यात्रा
         हम कराते ही नहीं, उसका न्योता देना ग़लत होगा।              */
      sub: (!d || d.book) ? 'इस तिथि की यात्रा की सीट पूछिए' : 'शुभ तिथि',
      dayNum: String(dt.getDate()),
      monthName: MAH_HI[dt.getMonth()],
      weekday: P.VAAR_HI[dt.getDay()],
      tithi,
      dham: dhamKey,
      cap: parvCaption(names, dateStr, tithi, dhamKey),
      status: names.join(', ') + '। ' + dateStr + '।',
      tags: [...TAGS.core, ...(d ? d.tags.slice(0, 2) : []), ...TAGS.gen.slice(0, 3), 'दिल्ली']
    });
  }
  return out;
}

/* ═══ 2. सारी पोस्ट एक साथ ═══════════════════════════════════ */
const parv = parvPosts();
const ever = POSTS.map(p => ({ ...p }));

/* प्रस्थान वाली पोस्ट पर तारीख़, अगर --date दी गई हो */
ever.forEach(p => { if (p.dateSlot && DEP_DATE) p.dateText = DEP_DATE; });

/* तस्वीर और लोगो के रास्ते। HTML social/html/ में बनती है,
   इसलिए दो क़दम ऊपर जाना पड़ता है।                              */
ever.concat(parv).forEach(p => {
  const d = p.dham ? DHAM[p.dham] : null;
  if (p.lay === 'photo' && d && d.photo) p.photoSrc = '../../yatra/' + d.photo;
});

const all = [...ever, ...parv];

/* ═══ 3. HTML फ़ाइलें ════════════════════════════════════════ */
const htmlDir = path.join(dir, 'html');
fs.rmSync(htmlDir, { recursive: true, force: true });
fs.mkdirSync(htmlDir, { recursive: true });

const logo = '../../brand/logo-icon.png';
let files = 0;
all.forEach(p => {
  Object.keys(SIZES).forEach(k => {
    const name = `${p.id}-${SIZES[k].name}-${SIZES[k].w}x${SIZES[k].h}.html`;
    fs.writeFileSync(path.join(htmlDir, name), page(p, k, { cfg, logo }), 'utf8');
    files++;
  });
});

/* ═══ 4. कैप्शन की फ़ाइल ═════════════════════════════════════
   यही फ़ाइल रोज़ काम आती है। पोस्ट डालते समय यहाँ से कैप्शन
   कॉपी कीजिए, तस्वीर social/out/ से उठाइए, बस।                */
const tagLine = t => [...new Set(t)].map(x => '#' + x).join(' ');
const capOf = p => p.cap + '\n' + FOOT + '\n\n' + tagLine(p.tags);

const byCat = {};
all.forEach(p => (byCat[p.cat] = byCat[p.cat] || []).push(p));

let md = `# सोशल पोस्ट के कैप्शन

> यह फ़ाइल **अपने आप बनती है**। हाथ से कुछ मत बदलिए, बदलाव अगली बार
> मिट जाएगा। कुछ सुधारना हो तो \`social/content.js\` खोलिए।
>
> बनी: ${new Date().toLocaleDateString('hi-IN')} · कुल ${all.length} पोस्ट · ${files} तस्वीरें

## कैसे इस्तेमाल करें

1. तस्वीर \`social/out/\` से उठाइए। नाम में \`post\` वाली Instagram और
   Facebook की पोस्ट है, \`story\` वाली Instagram Story और WhatsApp Status की।
2. नीचे से उसी नाम वाला कैप्शन कॉपी कीजिए।
3. Meta Business Suite में दोनों चिपकाकर तारीख़ लगा दीजिए।

⚠️ **दाम कहीं मत लिखिए।** हर कैप्शन का रास्ता WhatsApp पर जाता है, यही पूरी रणनीति है।

`;

Object.keys(byCat).forEach(cat => {
  md += `\n---\n\n# ${cat}\n`;
  byCat[cat].forEach(p => {
    md += `\n## ${p.id}\n\n`;
    md += `**तस्वीर:** \`out/${p.id}-post-1080x1080.png\` · \`out/${p.id}-story-1080x1920.png\`\n\n`;
    md += '### कैप्शन\n\n```\n' + capOf(p) + '\n```\n\n';
    md += '### WhatsApp Status\n\n```\n' + p.status + '\n```\n';
  });
});
/* ⚠️ शुरू में BOM डाला गया है। बिना इसके Notepad जैसे पुराने Windows
   औज़ार हिन्दी को कूड़े की तरह दिखाते हैं। यही परेशानी Excel वाली
   फ़ाइलों में भी आ चुकी है (HANDOVER §10)। हटाइए मत।              */
fs.writeFileSync(path.join(dir, 'captions.md'), '﻿' + md, 'utf8');

/* ═══ 5. डालने का कैलेंडर ════════════════════════════════════
   पर्व वाली पोस्ट की तारीख़ पक्की है, वो पर्व से दो दिन पहले
   जानी चाहिए (लोग तभी योजना बनाते हैं)। बाक़ी पोस्ट बीच के
   ख़ाली दिनों में बाँट दी जाती हैं।                             */
const plan = [];
parv.forEach(p => {
  const post = new Date(p.when); post.setDate(post.getDate() - 2);
  if (post > new Date()) plan.push({ on: post, id: p.id, cat: p.cat, why: 'पर्व से दो दिन पहले' });
});

/* बाक़ी पोस्ट: हफ़्ते में दो बार, बुधवार और शनिवार */
const slots = [];
const cur = new Date(); cur.setHours(12, 0, 0, 0);
for (let i = 1; i <= DAYS && slots.length < ever.length; i++) {
  const dt = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + i, 12);
  if (dt.getDay() === 3 || dt.getDay() === 6) slots.push(dt);
}
/* श्रेणियाँ बारी बारी से आएँ, वरना लगातार एक ही तरह की पोस्ट जाएँगी */
const order = ['धाम', 'सेवा', 'कथा', 'तैयारी', 'सवाल', 'निमंत्रण', 'आवाज़', 'प्रस्थान'];
const pools = order.map(c => (byCat[c] || []).slice());
let pi = 0;
slots.forEach(dt => {
  for (let n = 0; n < pools.length; n++) {
    const pool = pools[(pi + n) % pools.length];
    if (pool.length) {
      const p = pool.shift();
      plan.push({ on: dt, id: p.id, cat: p.cat, why: 'हफ़्ते की आम पोस्ट' });
      pi = (pi + n + 1) % pools.length;
      return;
    }
  }
});
plan.sort((a, b) => a.on - b.on);

let cal = `# डालने का कैलेंडर

> अपने आप बनी। बदलाव \`social/content.js\` में कीजिए, यहाँ नहीं।
>
> ⚠️ पर्व वाली पोस्ट **पर्व से दो दिन पहले** जाती है, उसी दिन नहीं।
> लोग यात्रा की योजना पहले बनाते हैं, त्योहार वाले दिन नहीं।

| तारीख़ | दिन | पोस्ट | श्रेणी | क्यों |
|---|---|---|---|---|
`;
plan.forEach(x => {
  cal += `| ${x.on.getDate()} ${MAH_HI[x.on.getMonth()]} | ${P.VAAR_HI[x.on.getDay()]} | \`${x.id}\` | ${x.cat} | ${x.why} |\n`;
});
fs.writeFileSync(path.join(dir, 'calendar.md'), '﻿' + cal, 'utf8');

/* ═══ 6. मशीन के लिए ═══════════════════════════════════════ */
fs.writeFileSync(path.join(dir, 'plan.json'), JSON.stringify({
  built: new Date().toISOString(),
  config: cfg,
  counts: { posts: all.length, evergreen: ever.length, parv: parv.length, html: files },
  posts: all.map(p => ({
    id: p.id, cat: p.cat, lay: p.lay, dham: p.dham || null,
    when: p.when ? p.when.toISOString().slice(0, 10) : null,
    caption: capOf(p), status: p.status
  })),
  schedule: plan.map(x => ({ on: x.on.toISOString().slice(0, 10), id: x.id, cat: x.cat }))
}, null, 2), 'utf8');

console.log(`social: ${all.length} post (${ever.length} pakki + ${parv.length} parv), ${files} HTML file bani`);
console.log(`        captions.md, calendar.md, plan.json likh di`);
console.log(`ab chalaiye:  python social/render.py`);

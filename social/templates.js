/* ═══════════════════════════════════════════════════════════
   social/templates.js, पोस्ट की तस्वीर का HTML बनाता है

   एक ही साँचा दो नापों में चलता है:
       sq   1080 x 1080   Instagram और Facebook की पोस्ट
       st   1080 x 1920   Instagram Story, WhatsApp Status, Reel cover

   रंग और फ़ॉन्ट वही हैं जो पूरी साइट और छपाई की सामग्री में हैं
   (HANDOVER §8), ताकि जो आदमी पोस्टर देख चुका है वो पोस्ट देखते ही
   पहचान ले कि यह उसी का है।

   ⚠️ Instagram Story में ऊपर और नीचे क़रीब 250px पर ऐप के अपने बटन
      आ जाते हैं। इसलिए story वाले नाप में नीचे बड़ी जगह छोड़ी गई है,
      वरना WhatsApp नंबर उँगली के नीचे दब जाता।
   ═══════════════════════════════════════════════════════════ */

const SIZES = {
  sq: { w: 1080, h: 1080, pad: 64,  safeBottom: 0,   name: 'post'  },
  st: { w: 1080, h: 1920, pad: 76,  safeBottom: 210, name: 'story' }
};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* \n को <br> बनाता है, बाक़ी सब escape */
const lines = s => esc(s).replace(/\n/g, '<br>');

/* संदेश वाला निशान। पहले यहाँ 💬 वाला emoji था, पर headless Edge उसे
   फीके रंग में उतारता है और सुनहरी पट्टी पर वो लगभग दिखता ही नहीं था।
   SVG हर बार एक जैसा और गहरा बनता है।
   ⚠️ यह जान-बूझकर आम बुलबुला है, WhatsApp का अपना निशान नहीं। किसी
      और कंपनी का लोगो अपनी पोस्ट पर लगाना ठीक नहीं होता।            */
const CHAT_ICON = `<svg class="wa" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="24" fill="#7B1E22"/>
  <path d="M24 11c-7.4 0-13.4 5.2-13.4 11.6 0 3.6 1.9 6.9 5 9L14 38.5l7.9-3.9c.7.1 1.4.1 2.1.1
           7.4 0 13.4-5.2 13.4-11.6S31.4 11 24 11z" fill="#FFF9F0"/>
  <circle cx="18.4" cy="22.6" r="1.9" fill="#7B1E22"/>
  <circle cx="24" cy="22.6" r="1.9" fill="#7B1E22"/>
  <circle cx="29.6" cy="22.6" r="1.9" fill="#7B1E22"/>
</svg>`;

/* शीर्षक जितना लंबा, अक्षर उतने छोटे। हाथ से हर पोस्ट का नाप
   तय करना पड़ता, यह उससे बचाता है।                            */
function headSize(text, size) {
  const longest = String(text).split('\n')
    .reduce((m, l) => Math.max(m, l.length), 0);
  const total = String(text).replace(/\n/g, '').length;
  const base = size === 'st' ? 96 : 80;
  let f = base;
  if (longest > 14 || total > 34) f = base * 0.86;
  if (longest > 18 || total > 46) f = base * 0.74;
  if (longest > 24 || total > 62) f = base * 0.62;
  if (longest > 32 || total > 84) f = base * 0.52;
  return Math.round(f);
}

/* ── साझा CSS ───────────────────────────────────────────────
   रंग HANDOVER §8 वाले ही हैं। ⚠️ इन्हें बदलें तो साइट, पोस्टर
   और यहाँ, तीनों जगह बदलना पड़ेगा, वरना ब्रांड बिखर जाएगा।    */
function css(k) {
  const S = SIZES[k];
  const st = k === 'st';
  return `
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${S.w}px;height:${S.h}px;overflow:hidden}
  :root{
    --maroon:#7B1E22; --maroon-d:#4A0F12; --saffron:#E9531F;
    --gold:#D9A441;   --gold-l:#F3D089;   --cream:#FFF9F0;
  }
  body{
    font-family:'Inter',system-ui,sans-serif; color:var(--cream);
    background:
      radial-gradient(120% 52% at 50% 0%, #93262B 0%, transparent 62%),
      linear-gradient(172deg, var(--maroon) 0%, var(--maroon-d) 100%);
    position:relative; display:flex; flex-direction:column;
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
  }
  /* सुनहरा दोहरा किनारा, वही जो पोस्टर पर है */
  body::before{content:'';position:absolute;inset:${st ? 30 : 26}px;
    border:${st ? 5 : 4}px solid var(--gold);border-radius:${st ? 22 : 18}px;
    pointer-events:none;z-index:3}
  body::after{content:'';position:absolute;inset:${st ? 44 : 38}px;
    border:1.5px solid rgba(243,208,137,.5);border-radius:${st ? 15 : 12}px;
    pointer-events:none;z-index:3}

  .wrap{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;
    padding:${S.pad + 24}px ${S.pad}px ${S.pad + 16 + S.safeBottom}px}

  /* ── ऊपर की पहचान पट्टी ── */
  .brand{display:flex;align-items:center;gap:${st ? 22 : 18}px;flex:none}
  .brand img{width:${st ? 92 : 78}px;height:${st ? 92 : 78}px;flex:none}
  .brand .nm b{display:block;font-family:'Marcellus',Georgia,serif;font-weight:400;
    font-size:${st ? 38 : 32}px;letter-spacing:2.4px;line-height:1.05}
  .brand .nm span{display:block;font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 27 : 23}px;color:var(--gold-l);margin-top:5px}
  .om{margin-left:auto;font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 44 : 38}px;color:var(--gold-l);opacity:.85}

  /* ── बीच का हिस्सा ──
     🔴 flex:1 1 0 और min-height:0 दोनों ज़रूरी हैं। सिर्फ़ flex:1 लिखने
        पर लंबी सूची वाली पोस्ट में यह हिस्सा फैलकर नीचे वाली संपर्क
        पट्टी को तस्वीर से ही बाहर धकेल देता था, यानी नंबर ग़ायब।
        अब जगह कम पड़े तो सूची छोटी होती है, नंबर कभी नहीं जाता।     */
  .mid{flex:1 1 0;min-height:0;overflow:hidden;
    display:flex;flex-direction:column;justify-content:center;
    gap:${st ? 40 : 22}px;padding:${st ? 48 : 18}px 0}
  .hd{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;line-height:1.24;
    text-shadow:0 4px 18px rgba(0,0,0,.34)}
  .hd em{font-style:normal;color:var(--gold-l)}
  .sb{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 42 : 36}px;line-height:1.45;color:rgba(255,249,240,.93)}
  .badge{display:inline-block;align-self:flex-start;
    font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 32 : 27}px;padding:${st ? 12 : 9}px ${st ? 30 : 25}px;
    border:2px solid rgba(243,208,137,.55);border-radius:999px;
    background:rgba(255,255,255,.09);color:var(--gold-l)}

  /* सजावटी लकीर, बीच में हीरा। पोस्टर वाला ही निशान। */
  .rule{display:flex;align-items:center;gap:16px;opacity:.75}
  .rule i{flex:1;height:2px;background:var(--gold);display:block}
  .rule b{width:14px;height:14px;background:var(--gold);
    transform:rotate(45deg);display:block;flex:none}

  /* ── तस्वीर ── */
  .shot{width:100%;border-radius:${st ? 20 : 16}px;overflow:hidden;
    border:3px solid rgba(243,208,137,.6);position:relative;flex:none;
    box-shadow:0 18px 50px rgba(0,0,0,.4)}
  /* ⚠️ चौकोर नाप में तस्वीर की ऊँचाई 340 थी और नीचे जगह ठीक उतनी ही
     बचती थी जितनी चाहिए, यानी कोई गुंजाइश नहीं। एक पंक्ति भी बढ़ते ही
     सब सिकुड़ने लगता था। 300 पर हर पोस्ट में साँस लेने की जगह रहती है। */
  .shot img{display:block;width:100%;height:${st ? 470 : 300}px;object-fit:cover}
  .shot::after{content:'';position:absolute;inset:0;
    background:linear-gradient(to top,rgba(74,15,18,.6) 0%,transparent 55%)}

  /* ── सूची वाला डिब्बा ── */
  .rows{background:rgba(0,0,0,.2);border:2px solid rgba(243,208,137,.38);
    border-radius:${st ? 20 : 16}px;padding:${st ? 34 : 26}px ${st ? 38 : 30}px}
  .rows li{list-style:none;display:flex;align-items:center;gap:${st ? 22 : 18}px;
    font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 40 : 34}px;line-height:1.35;padding:${st ? 17 : 13}px 0;
    border-bottom:1.5px solid rgba(243,208,137,.2)}
  .rows li:last-child{border-bottom:0}
  .rows li i{font-style:normal;font-size:${st ? 40 : 34}px;flex:none;width:${st ? 56 : 48}px}
  /* पाँच से ज़्यादा पंक्तियाँ हों तो अक्षर थोड़े छोटे, वरना चौकोर
     नाप में सब नीचे से बाहर निकल जाता है। Story में जगह ज़्यादा है,
     इसलिए वहाँ फ़र्क़ कम रखा है।                                    */
  .rows.dense li{font-size:${st ? 37 : 30}px;padding:${st ? 15 : 10}px 0}
  .rows.dense li i{font-size:${st ? 37 : 30}px;width:${st ? 52 : 44}px}

  /* ── सिर्फ़ अक्षरों वाली पोस्ट, बीच में ── */
  .mid.center{align-items:center;text-align:center}
  .mid.center .badge{align-self:center}
  /* align-items:center लकीर को सिकोड़कर सिर्फ़ हीरा छोड़ देता था,
     इसलिए उसे अलग से पूरी चौड़ाई दी गई है। */
  .mid.center .rule{align-self:stretch}

  /* ── सवाल का जवाब, तस्वीर पर ही ──
     feed में ज़्यादातर लोग कैप्शन नहीं खोलते, इसलिए जवाब यहीं दिखता है। */
  .ans{background:rgba(0,0,0,.2);border:2px solid rgba(243,208,137,.38);
    border-radius:${st ? 20 : 16}px;padding:${st ? 34 : 27}px ${st ? 38 : 31}px;
    font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 42 : 36}px;line-height:1.5;color:rgba(255,249,240,.95)}

  /* ── यात्री की आवाज़ ── */
  .qm{font-family:Georgia,serif;font-size:${st ? 170 : 140}px;line-height:.7;
    color:var(--gold);opacity:.55}
  .qt{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 56 : 48}px;line-height:1.5}
  .who{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 36 : 31}px;color:var(--gold-l)}

  /* ── पर्व का तारीख़ वाला डिब्बा ── */
  .dbox{display:inline-flex;flex-direction:column;align-items:center;
    align-self:flex-start;background:linear-gradient(140deg,var(--gold-l),var(--gold));
    color:#4A0F12;border-radius:${st ? 22 : 18}px;
    padding:${st ? 22 : 17}px ${st ? 40 : 32}px;box-shadow:0 12px 34px rgba(0,0,0,.35)}
  .dbox b{font-family:'Marcellus',Georgia,serif;font-size:${st ? 104 : 86}px;line-height:.98}
  .dbox span{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 34 : 29}px;margin-top:6px}
  .dbox i{font-style:normal;font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 27 : 23}px;opacity:.8}

  /* ── तारीख़ भरने की ख़ाली जगह ── */
  .slot{font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 44 : 37}px;color:var(--gold-l);
    border:2px dashed rgba(243,208,137,.55);border-radius:${st ? 16 : 13}px;
    padding:${st ? 18 : 14}px ${st ? 32 : 26}px;align-self:flex-start}

  /* ── नीचे की संपर्क पट्टी ──
     🔴 नंबर पर nowrap ज़रूरी है। Story वाले नाप में यह एक बार टूटकर
        दो लाइन में चला गया था, और आधा नंबर पढ़ा ही नहीं जा रहा था।
        वही ग़लती साइट की टॉपबार पर भी हो चुकी है (HANDOVER §16)।    */
  .foot{flex:none;background:linear-gradient(135deg,var(--gold-l),var(--gold));
    color:#3B1F0B;border-radius:${st ? 20 : 16}px;
    padding:${st ? 26 : 20}px ${st ? 32 : 28}px;display:flex;
    ${st ? 'flex-direction:column;align-items:stretch;gap:16px'
         : 'align-items:center;gap:20px'}}
  .foot .row{display:flex;align-items:center;gap:${st ? 24 : 20}px;flex:1}
  .foot .wa{width:${st ? 68 : 58}px;height:${st ? 68 : 58}px;flex:none;display:block}
  .foot .t{flex:1;min-width:0}
  .foot .t b{display:block;font-family:'Marcellus',Georgia,serif;
    font-size:${st ? 52 : 42}px;letter-spacing:1.4px;line-height:1.1;
    white-space:nowrap}
  .foot .t span{display:block;font-family:'Tiro Devanagari Hindi','Nirmala UI',serif;
    font-size:${st ? 31 : 25}px;margin-top:5px;opacity:.86;white-space:nowrap}
  .foot .site{font-family:'Marcellus',Georgia,serif;font-size:${st ? 32 : 23}px;
    line-height:1.35;opacity:.92;flex:none;white-space:nowrap;
    ${st ? 'text-align:center;border-top:2px solid rgba(59,31,11,.28);padding-top:15px'
         : 'text-align:right'}}
  `;
}

/* ── बीच वाले हिस्से का HTML, साँचे के हिसाब से ───────────────── */
function midHTML(p, k) {
  const st = k === 'st';
  /* सूची वाली पोस्ट में शीर्षक थोड़ा छोटा रखा जाता है, क्योंकि नीचे
     पंक्तियों को जगह चाहिए। बिना इसके 6 पंक्ति वाली पोस्ट कटती थी। */
  const nRows = (p.rows || []).length;
  const hf = Math.round(headSize(p.head || '', k) * (nRows >= 5 ? 0.82 : 1));
  const rule = '<div class="rule"><i></i><b></b><i></i></div>';
  const head = `<div class="hd" style="font-size:${hf}px">${lines(p.head)}</div>`;
  const sub  = p.sub ? `<div class="sb">${lines(p.sub)}</div>` : '';
  const badge = p.badge ? `<div class="badge">${esc(p.badge)}</div>` : '';
  const slot = p.dateSlot
    ? `<div class="slot">📅 ${esc(p.dateText || 'तारीख़ यहाँ भरें')}</div>` : '';

  switch (p.lay) {
    case 'photo':
      return `<div class="mid">
        ${p.photoSrc ? `<div class="shot"><img src="${esc(p.photoSrc)}" alt=""></div>` : ''}
        ${head}${sub}${slot}${badge}
      </div>`;

    case 'list':
      return `<div class="mid">
        ${head}${sub}
        <ul class="rows${nRows >= 5 ? ' dense' : ''}">${(p.rows || []).map(r =>
          `<li><i>${esc(r[0])}</i><span>${esc(r[1])}</span></li>`).join('')}</ul>
      </div>`;

    case 'quote':
      return `<div class="mid">
        <div class="qm">&#8220;</div>
        <div class="qt">${lines(p.quote)}</div>
        ${rule}
        <div class="who">${esc(p.head)}${p.sub ? ', ' + esc(p.sub) : ''}</div>
      </div>`;

    case 'parv':
      return `<div class="mid">
        <div class="dbox"><b>${esc(p.dayNum)}</b><span>${esc(p.monthName)}</span>
          <i>${esc(p.weekday)}</i></div>
        ${head}
        ${p.tithi ? `<div class="sb">🗓️ ${esc(p.tithi)}</div>` : ''}
        ${rule}
        ${sub ? sub : ''}
      </div>`;

    case 'qa': {
      /* सवाल बड़ा, नीचे जवाब का डिब्बा। सवाल छोटा हो तो अक्षर और
         बड़े कर दिए जाते हैं, वरना पूरा चौकोर ख़ाली दिखता है।    */
      const qf = Math.round(headSize(p.head || '', k) * 1.1);
      return `<div class="mid">
        <div class="badge">${esc(p.sub || 'पूछे जाने वाले सवाल')}</div>
        <div class="hd" style="font-size:${qf}px">${lines(p.head)}</div>
        ${p.ans ? `<div class="ans">${lines(p.ans)}</div>` : ''}
      </div>`;
    }

    default: /* type, सिर्फ़ अक्षर। बीच में रखा जाता है, वरना बड़ी
                ख़ाली जगह एक तरफ़ रह जाती है।                      */
      return `<div class="mid center">
        ${rule}
        <div class="hd" style="font-size:${Math.round(hf * 1.18)}px">${lines(p.head)}</div>
        ${sub}${badge}
        ${rule}
      </div>`;
  }
}

/* ── पूरा पन्ना ─────────────────────────────────────────────── */
function page(p, k, opts) {
  const S = SIZES[k];
  const cfg = opts.cfg;
  return `<!DOCTYPE html>
<html lang="hi"><head><meta charset="UTF-8">
<title>${esc(p.id)} ${S.w}x${S.h}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Tiro+Devanagari+Hindi&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>${css(k)}</style></head>
<body><div class="wrap">
  <div class="brand">
    <img src="${esc(opts.logo)}" alt="">
    <div class="nm"><b>DARSHAN YATRA SEVA</b><span>दर्शन यात्रा सेवा</span></div>
    <div class="om">॥ॐ॥</div>
  </div>
  ${midHTML(p, k)}
  <div class="foot">
    <div class="row">${CHAT_ICON}
      <div class="t"><b>${esc(cfg.phone)}</b><span>WhatsApp पर सीट और ऑफ़र पूछिए</span></div>
      ${k === 'st' ? '' : `<div class="site">${esc(cfg.site)}</div>`}
    </div>
    ${k === 'st' ? `<div class="site">${esc(cfg.site)}</div>` : ''}
  </div>
</div></body></html>`;
}

module.exports = { SIZES, page };

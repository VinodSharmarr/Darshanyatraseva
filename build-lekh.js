/* ════════════════════════════════════════════════════════════
   build-lekh.js, 11upai se aaye lekh (articles) ke pages

   11upai (../11upai) jab "Add to website" dabaata hai to ek file
   lekh/<slug>.json yahan likhta hai. Ye script un sab se pages banata hai:

       /<slug>        har lekh ka apna page
       /lekh          sabki suchi (hub)

   🔴 chalane ka tareeka (bina push ke, sirf local):
       node build-yatra.js     (sitemap yahin se bante hai, ye pehle)
       node build-lekh.js      (ye baad me, sitemap aur llms.txt me apna hissa jodta hai)

   ⚠️ Banai hui .html fail me haath se kuch mat likhna.
   ⚠️ Kaam khatam hone par git push Vinod karega. Ye script kabhi push nahi karta.

   Niyam jo yahan jaanch me hain (HANDOVER §4):
     1. Koi daam nahi (₹, rupaye): milte hi build ruk jaata hai
     2. Koi dash nahi: em dash aur en dash hata diye jaate hain
     3. Sirf Hindi, shell buzurgon-ke-saath-yatra.html se (header, footer, scripts)
   ════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://www.darshanyatraseva.com';
const SHELL = 'buzurgon-ke-saath-yatra.html';
const DIR = path.join(ROOT, 'lekh');
const WA = '917289902692';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── niyam: dash hatao, daam pakdo ── */
function clean(s) {
  return s
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1 से $2')
    .replace(/\s*[–—]\s*/g, ', ');
}
function checkNoPrices(slug, s) {
  if (/₹|रुपय|रुपए|रू\.|\bRs\.?\s*\d|\d\s*रु\b/.test(s)) {
    throw new Error(`${slug}: lekh me daam jaisa kuch mila (§4 niyam 1). 11upai me lekh badal kar dobara bhejo.`);
  }
}

/* ── chhota markdown → html (isi site ke class) ── */
function inline(s) {
  s = esc(s);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  // sirf apni site ke link, root se (aur WhatsApp / tel)
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/(?:www\.)?darshanyatraseva\.com)?(\/[^)]*|tel:[^)]*|https:\/\/wa\.me\/[^)]*)\)/g, '<a href="$3">$1</a>');
  s = s.replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?darshanyatraseva\.com\)/g, '<a href="/">$1</a>');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); // baaki bahar ke link hata do, sirf naam rakho
  return s;
}

function blocks(md) {
  // md ko (heading | list | paragraph | table) tukdon me todo
  const out = [];
  const lines = md.replace(/\r/g, '').split('\n');
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,4})\s+(.*)/))) { out.push({ t: 'h' + m[1].length, x: m[2].trim() }); i++; continue; }
    if (/^\s*\|.*\|\s*$/.test(l)) {
      const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i])) rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
        i++;
      }
      out.push({ t: 'table', rows });
      continue;
    }
    if (/^\s*([-*•]|\d+[.)])\s+/.test(l)) {
      const items = [];
      const ordered = /^\s*\d+[.)]/.test(l);
      while (i < lines.length && /^\s*([-*•]|\d+[.)])\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*•]|\d+[.)])\s+/, '').trim());
        i++;
      }
      out.push({ t: 'list', ordered, items });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4})\s/.test(lines[i]) && !/^\s*([-*•]|\d+[.)])\s+/.test(lines[i]) && !/^\s*\|/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    out.push({ t: 'p', x: para.join(' ') });
  }
  return out;
}

function render(b, first) {
  if (b.t === 'p') return `    <p${first ? ' class="ypage__intro"' : ''}>${inline(b.x)}</p>`;
  if (b.t === 'h3' || b.t === 'h4') return `    <h3>${inline(b.x)}</h3>`;
  if (b.t === 'list') return `    <ul class="kfull__list kfull__list--dhyan ypage__tips">\n${b.items.map((x) => `      <li>${inline(x)}</li>`).join('\n')}\n    </ul>`;
  if (b.t === 'table') {
    // table ke liye alag CSS nahi hai: har row ek list item (pehla column mota)
    const [head, ...rows] = b.rows;
    return `    <ul class="kfull__list kfull__list--dhyan ypage__tips">\n${rows.map((r) => `      <li><strong>${inline(r[0] || '')}</strong>: ${r.slice(1).map((c, k) => `${inline(head[k + 1] || '')} ${inline(c)}`).join(', ')}</li>`).join('\n')}\n    </ul>`;
  }
  return '';
}

/* ── lekh ko sections me baanto: intro | H2 sections | FAQ ── */
function split(md) {
  const bl = blocks(md);
  const intro = [], secs = [];
  let cur = null;
  for (const b of bl) {
    if (b.t === 'h2') { cur = { h: b.x, body: [] }; secs.push(cur); }
    else if (cur) cur.body.push(b); else intro.push(b);
  }
  const isFaq = (h) => /faq|अक्सर|पूछे जाने|सवाल/i.test(h);
  const faqSec = secs.find((s) => isFaq(s.h));
  const faq = [];
  if (faqSec) {
    let q = null;
    for (const b of faqSec.body) {
      if (b.t === 'h3' || b.t === 'h4') { q = { q: b.x, a: [] }; faq.push(q); }
      else if (q && b.t === 'p') q.a.push(b.x);
      else if (q && b.t === 'list') q.a.push(b.items.join(' '));
    }
  }
  return { intro, secs: secs.filter((s) => s !== faqSec), faqHead: faqSec ? faqSec.h : '', faq: faq.filter((f) => f.a.length) };
}

/* ── shell se tukde ── */
const shell = fs.readFileSync(path.join(ROOT, SHELL), 'utf8');
const cut = (from, to) => { const a = shell.indexOf(from); const b = shell.indexOf(to, a); if (a < 0 || b < 0) throw new Error('shell me nahi mila: ' + from); return shell.slice(a, b); };
const HEAD_PREFIX = shell.slice(0, shell.indexOf('<!-- ⚠️')); // <head> shuru se styles.css tak
const BUSINESS_LD = shell.match(/<script type="application\/ld\+json">\s*\{[^<]*"TravelAgency"[\s\S]*?<\/script>/)[0];
const TOP = cut('<!-- ══ TOP BAR ══ -->', '<!-- ══ शीर्षक ══ -->');
const TAIL = shell.slice(shell.indexOf('<!-- ══ FOOTER ══ -->')).replace(/window\.EN_EXTRA = \{[\s\S]*?\n\};/, 'window.EN_EXTRA = {};');

function page({ slug, title, meta, eyebrow, hero, body, ld, date, waText, ctaTitle, ctaText }) {
  const url = `${SITE}/${slug}`;
  let head = HEAD_PREFIX
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)} | Darshan Yatra Seva</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(meta)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(waText)}`;
  const tail = TAIL.replace(/https:\/\/wa\.me\/\d+\?text=[^"']*/g, wa);
  return `${head}<!-- ⚠️ यह फ़ाइल build-lekh.js से बनी है, हाथ से मत बदलिए -->
${ld.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join('\n')}
${BUSINESS_LD}
</head>
<body>

${TOP}<!-- ══ शीर्षक ══ -->
<section class="katha__hero">
  <div class="wrap">
    <p class="eyebrow center">${esc(eyebrow)}</p>
    <h1 class="sec__title">${esc(hero)}</h1>
    <p class="sec__lede">${esc(meta)}</p>
  </div>
</section>

${body}

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="sec">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/#yatras">🚩 चारों यात्राएँ और आगामी प्रस्थान देखें</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/lekh">📖 यात्रा के और लेख पढ़ें</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(ctaTitle)} 🙏</h2>
    <p>${esc(ctaText)}</p>
    <div class="cta__btns">
      <a class="btn btn--gold btn--lg" href="/#book">अभी बुक करें</a>
      <a class="btn btn--ghostlight btn--lg" href="${wa}" target="_blank" rel="noopener">WhatsApp करें</a>
    </div>
  </div>
</section>

${tail}`;
}

/* ── ek lekh ka page ── */
function buildOne(j) {
  const { intro, secs, faqHead, faq } = split(clean(j.markdown));
  const title = clean(j.title), meta = clean(j.meta || '');
  const parts = [];
  // lekh kabhi seedhe H2 se shuru hota hai, tab upar ka khaali section nahi banta
  if (intro.length) parts.push(`<section class="sec">\n  <div class="wrap wrap--narrow">\n${intro.map((b, k) => render(b, k === 0)).join('\n')}\n  </div>\n</section>`);
  secs.forEach((s, k) => {
    parts.push(`<section class="sec${(k + (intro.length ? 0 : 1)) % 2 === 0 ? ' sec--alt' : ''}">\n  <div class="wrap wrap--narrow">\n    <h2 class="sec__title">${inline(s.h)}</h2>\n${s.body.map((b) => render(b, false)).join('\n')}\n  </div>\n</section>`);
  });
  if (faq.length) {
    parts.push(`<section class="sec${(secs.length + (intro.length ? 0 : 1)) % 2 === 0 ? ' sec--alt' : ''}">\n  <div class="wrap wrap--narrow">\n    <h2 class="sec__title">${inline(faqHead)}</h2>\n    <div class="faq">\n${faq.map((f) => `      <details><summary>${inline(f.q)}</summary><p>${inline(f.a.join(' '))}</p></details>`).join('\n')}\n    </div>\n  </div>\n</section>`);
  }
  const ld = [{
    '@context': 'https://schema.org', '@type': 'Article', headline: title, description: meta, inLanguage: 'hi-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/${j.slug}` },
    author: { '@id': `${SITE}/#business` }, publisher: { '@id': `${SITE}/#business` }, dateModified: j.date,
  }];
  if (faq.length) ld.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q.replace(/[*_]/g, ''), acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ').replace(/[*_]/g, '') } })),
  });
  const html = page({
    slug: j.slug, title, meta, eyebrow: 'यात्रा गाइड', hero: title, body: parts.join('\n\n'), ld, date: j.date,
    waText: `Jai Shri Shyam! ${title} ke baare me jaankari chahiye.`, ctaTitle: 'यात्रा के बारे में पूछिए', ctaText: 'तारीख़, सीट और बाक़ी जानकारी के लिए हमें WhatsApp करें या फ़ोन करें।',
  });
  checkNoPrices(j.slug, html.replace(/<script[\s\S]*?<\/script>/g, ''));
  return html;
}

/* ── hub ── */
function buildHub(list) {
  const body = `<section class="sec">\n  <div class="wrap wrap--narrow">\n    <ul class="kfull__list kfull__list--dhyan ypage__tips">\n${list.map((j) => `      <li><a href="/${j.slug}"><strong>${esc(clean(j.title))}</strong></a><br>${esc(clean(j.meta || ''))}</li>`).join('\n')}\n    </ul>\n  </div>\n</section>`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'यात्रा के लेख', inLanguage: 'hi-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/lekh` }, publisher: { '@id': `${SITE}/#business` },
    hasPart: list.map((j) => ({ '@type': 'Article', headline: clean(j.title), url: `${SITE}/${j.slug}` })),
  }];
  return page({
    slug: 'lekh', title: 'यात्रा के लेख, दिल्ली से तीर्थ यात्रा की जानकारी', meta: 'दिल्ली से खाटू श्याम, वृंदावन मथुरा, मेहंदीपुर बालाजी और सालासर की यात्रा के बारे में काम की जानकारी, सवाल और जवाब।',
    eyebrow: 'यात्रा गाइड', hero: 'यात्रा के लेख', body, ld, date: new Date().toISOString().slice(0, 10),
    waText: 'Jai Shri Shyam! Yatra ke baare me jaankari chahiye.', ctaTitle: 'यात्रा के बारे में पूछिए', ctaText: 'तारीख़, सीट और बाक़ी जानकारी के लिए हमें WhatsApp करें या फ़ोन करें।',
  });
}

/* ── sitemap aur llms.txt me apna hissa (markers se, baar baar chalane par duplicate nahi) ── */
function patch(file, startMark, endMark, block, atEnd) {
  const p = path.join(ROOT, file);
  let s = fs.readFileSync(p, 'utf8');
  const re = new RegExp(`\\n?${startMark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${endMark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n?`);
  s = s.replace(re, '\n');
  s = atEnd(s, `${startMark}\n${block}\n${endMark}`);
  fs.writeFileSync(p, s, 'utf8');
}

function main() {
  if (!fs.existsSync(DIR)) { console.log('lekh/ folder nahi hai, kuch banane ko nahi'); return; }
  const list = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (!list.length) { console.log('lekh/ me koi .json nahi'); return; }

  for (const j of list) {
    fs.writeFileSync(path.join(ROOT, `${j.slug}.html`), buildOne(j), 'utf8');
    console.log(`  ✅ ${j.slug}.html`);
  }
  fs.writeFileSync(path.join(ROOT, 'lekh.html'), buildHub(list), 'utf8');
  console.log('  ✅ lekh.html (hub)');

  const urls = [{ loc: `${SITE}/lekh`, date: list[0].date, pr: '0.7' }, ...list.map((j) => ({ loc: `${SITE}/${j.slug}`, date: j.date, pr: '0.6' }))];
  patch('sitemap.xml', '<!-- lekh:start -->', '<!-- lekh:end -->',
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join('\n'),
    (s, blk) => s.replace('</urlset>', `${blk}\n</urlset>`));
  patch('llms.txt', '<!-- lekh:start -->', '<!-- lekh:end -->',
    `## Guides\n\n- [All guides](${SITE}/lekh): helpful articles about yatras from Delhi.\n${list.map((j) => `- [${clean(j.title)}](${SITE}/${j.slug})`).join('\n')}`,
    (s, blk) => s.replace(/\s*$/, '\n\n') + blk + '\n');
  console.log(`  ✅ sitemap.xml aur llms.txt me ${urls.length} URL jode`);
}

// build-about.js uses the same shell and helpers
module.exports = { page, esc, clean, checkNoPrices, patch, SITE, WA };
if (require.main === module) main();

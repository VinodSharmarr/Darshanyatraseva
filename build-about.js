/* ════════════════════════════════════════════════════════════
   build-about.js, "हमारे बारे में" का पेज  →  /hamare-baare-mein

   क्यों: जब कोई Google पर "Darshan Yatra Seva" खोजता है, तो Google को
   यह समझना होता है कि यह एक ही संस्था का नाम है। इस पेज पर नाम (अंग्रेज़ी
   और हिंदी दोनों में), पता, फ़ोन, रजिस्ट्रेशन और असली प्रोफ़ाइल के लिंक एक
   ही जगह हैं, ताकि Google इन्हें जोड़ सके।

   🔴 चलाने का तरीक़ा (build-lekh.js के बाद, push के बिना, सिर्फ़ local):
       node build-yatra.js ; node build-lekh.js ; node build-about.js

   ⚠️ सारी बातें llms.txt और साइट के असली तथ्यों से हैं। कोई नया वादा,
      दाम, या आँकड़ा यहाँ मत जोड़ना जब तक Vinod हाँ न कहें (§4)।
   ⚠️ बनी हुई .html फ़ाइल में हाथ से कुछ मत लिखना।
   ════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const { page, esc, clean, checkNoPrices, patch, SITE } = require('./build-lekh.js');

const ROOT = __dirname;
const SLUG = 'hamare-baare-mein';
const DATE = '2026-10-03';
const FB = 'https://www.facebook.com/people/darshanyatraseva/61592350567964/';
const IG = 'https://www.instagram.com/darshanyatraseva';
const GMAPS = 'https://maps.google.com/?cid=9495498940087702464';

const TITLE = 'हमारे बारे में: Darshan Yatra Seva (दर्शन यात्रा सेवा), दिल्ली की यात्रा संस्था';
const META = 'Darshan Yatra Seva (दर्शन यात्रा सेवा) दिल्ली की तीर्थ यात्रा संस्था है। दिल्ली-NCR से खाटू श्याम, वृंदावन-मथुरा, मेहंदीपुर बालाजी और सालासर धाम की यात्रा। पता, फ़ोन और रजिस्ट्रेशन यहाँ देखें।';

const li = (x) => `      <li>${x}</li>`;
const section = (alt, h, inner) => `<section class="sec${alt ? ' sec--alt' : ''}">\n  <div class="wrap wrap--narrow">\n    <h2 class="sec__title">${h}</h2>\n${inner}\n  </div>\n</section>`;
const list = (items) => `    <ul class="kfull__list kfull__list--dhyan ypage__tips">\n${items.map(li).join('\n')}\n    </ul>`;

const body = [
  `<section class="sec">\n  <div class="wrap wrap--narrow">\n    <p class="ypage__intro">Darshan Yatra Seva (दर्शन यात्रा सेवा) दिल्ली की एक तीर्थ यात्रा संस्था है। हम दिल्ली-NCR से खाटू श्याम जी, वृंदावन और मथुरा, मेहंदीपुर बालाजी और सालासर धाम की यात्रा कराते हैं। साइट पर जानकारी हिंदी में है, और बुकिंग फ़ोन या WhatsApp से होती है।</p>\n  </div>\n</section>`,

  section(true, 'हम कौन सी यात्राएँ कराते हैं', list([
    '<strong>खाटू श्याम जी:</strong> दिल्ली से लगभग 261 किमी। रात को प्रस्थान, सुबह दर्शन, दोपहर तक वापसी।',
    '<strong>वृंदावन और मथुरा:</strong> दिल्ली से लगभग 160 किमी। एक ही दिन में दर्शन।',
    '<strong>मेहंदीपुर बालाजी:</strong> दिल्ली से लगभग 245 किमी। अर्जी की व्यवस्था यात्रा में शामिल है।',
    '<strong>सालासर बालाजी और खाटू श्याम जी:</strong> दो दिन और एक रात की यात्रा, एक रात का ठहराव और भोजन शामिल।',
    '<strong>पंडित जी की सेवा:</strong> घर, दुकान या ऑफ़िस की पूजा के लिए पंडित जी, दिल्ली और NCR में।',
  ])),

  section(false, 'यात्रियों के लिए क्या है', list([
    'AC टेम्पो ट्रैवलर। पूरी गाड़ी की बुकिंग भी होती है।',
    'किराए में AC गाड़ी, टोल, पार्किंग, ड्राइवर, पीने का पानी और मंदिर का प्रसाद शामिल है।',
    'ग्रुप के साथ एक यात्रा सहायक चलता है।',
    'बुज़ुर्ग यात्रियों के लिए सहायता, और महिलाओं के लिए सुरक्षित बैठक।',
    'एक दिन की यात्रा में भोजन किराए में शामिल नहीं है।',
  ])),

  section(true, 'रजिस्ट्रेशन और अनुभव', list([
    'हम दिल्ली Shops and Establishment Act के तहत रजिस्टर्ड हैं। रजिस्ट्रेशन नंबर 2026069268।',
    'अब तक 20 से ज़्यादा यात्राओं में 440 से ज़्यादा यात्री हमारे साथ जा चुके हैं।',
  ])),

  section(false, 'हमें कैसे ढूँढें', `    <p>हमारा नाम <strong>Darshan Yatra Seva</strong> है, हिंदी में <strong>दर्शन यात्रा सेवा</strong>। वेबसाइट: <a href="/">www.darshanyatraseva.com</a>।</p>
${list([
    `Google पर हमारा Business प्रोफ़ाइल: <a href="${GMAPS}" rel="noopener">Darshan Yatra Seva, Mundka, नई दिल्ली</a>`,
    `Facebook: <a href="${FB}" rel="noopener">darshanyatraseva</a>`,
    `Instagram: <a href="${IG}" rel="noopener">@darshanyatraseva</a>`,
  ])}`),

  section(true, 'संपर्क', list([
    'फ़ोन और WhatsApp: <a href="tel:+917289902692">+91 72899 02692</a>',
    'Email: <a href="mailto:darshanyatraseva@gmail.com">darshanyatraseva@gmail.com</a>',
    'पता: KH No. 72/14, Swaran Park, Mundka, Near Durga Dharam Kanta, New Delhi 110041',
    'हम इन जगहों से यात्री लेते हैं: दिल्ली, नोएडा, गुरुग्राम, ग़ाज़ियाबाद और फ़रीदाबाद।',
    'भाषा: हिंदी और English।',
  ])),
].join('\n\n');

const ld = [{
  '@context': 'https://schema.org', '@type': 'AboutPage', name: clean(TITLE), description: clean(META), inLanguage: 'hi-IN',
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/${SLUG}` }, about: { '@id': `${SITE}/#business` }, dateModified: DATE,
}];

const html = page({
  slug: SLUG, title: clean(TITLE), meta: clean(META), eyebrow: 'हमारे बारे में', hero: 'Darshan Yatra Seva (दर्शन यात्रा सेवा)', body, ld, date: DATE,
  waText: 'Jai Shri Shyam! Yatra ke baare me jaankari chahiye.', ctaTitle: 'यात्रा के बारे में पूछिए', ctaText: 'तारीख़, सीट और बाक़ी जानकारी के लिए हमें WhatsApp करें या फ़ोन करें।',
});
checkNoPrices(SLUG, html.replace(/<script[\s\S]*?<\/script>/g, ''));
// the shared page() title adds " | Darshan Yatra Seva": here the name is already in the title, so use the plain one
const out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(clean(TITLE))}</title>`);
fs.writeFileSync(path.join(ROOT, `${SLUG}.html`), out, 'utf8');
console.log(`  ✅ ${SLUG}.html`);

patch('sitemap.xml', '<!-- about:start -->', '<!-- about:end -->',
  `  <url>\n    <loc>${SITE}/${SLUG}</loc>\n    <lastmod>${DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
  (s, blk) => s.replace('</urlset>', `${blk}\n</urlset>`));
patch('llms.txt', '<!-- about:start -->', '<!-- about:end -->',
  `## About\n\n- [About Darshan Yatra Seva](${SITE}/${SLUG}): who we are, the yatras we run, registration, address, phone and our Google, Facebook and Instagram profiles.`,
  (s, blk) => s.replace(/\s*$/, '\n\n') + blk + '\n');
console.log('  ✅ sitemap.xml aur llms.txt me about jodha');

/* ═══════════════════════════════════════════════════════════
   build-katha.js, कथाओं का HTML पहले से katha.html में लिख देता है

   क्यों चाहिए
   ────────────
   पहले सातों कथाएँ सिर्फ़ JavaScript से बनती थीं। Googlebot नई साइट का
   JavaScript देर से चलाता है, इसलिए उसे /katha पर सिर्फ़ शीर्षक दिखते थे
   (2,545 अक्षर), पूरी कथाएँ नहीं। Search Console में वही पेज
   "Discovered – currently not indexed" पड़ा था (29 जुलाई 2026)।

   अब हिन्दी वाला HTML सीधे katha.html में लिखा रहता है, और JavaScript
   बाद में उसे वैसे ही बदल देता है (English टॉगल पर), यानी दिखने में
   कोई फ़र्क़ नहीं, पर Google को पहली ही झलक में पूरी सामग्री मिल जाती है।

   चलाने का तरीक़ा, katha.js की सामग्री बदलने के बाद हर बार:
       node build-katha.js

   ⚠️ katha.html के अंदर <div id="kathaFull"> ... </div> के बीच का सब
      कुछ यह script मिटाकर दोबारा लिखता है, वहाँ हाथ से कुछ मत लिखना।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

/* katha.js को चलाने के लिए ब्राउज़र जैसा ढाँचा, यह script Node में
   चलती है, वहाँ window/document होते नहीं। fullHTML() इन्हें छूती भी
   नहीं, बस फ़ाइल लोड होने भर के लिए चाहिए। */
global.window = {};
global.document = {
  documentElement: { lang: 'hi' },
  getElementById: () => null,
  readyState: 'complete',
  addEventListener: () => {}
};
global.MutationObserver = function () { return { observe(){} }; };

/* config.js से WhatsApp नंबर, वरना बटन का लिंक अधूरा रह जाएगा।
   पूरी फ़ाइल चलाने के बजाय सिर्फ़ नंबर पढ़ लेते हैं, वही काफ़ी है। */
const cfgSrc = fs.readFileSync(path.join(dir, 'config.js'), 'utf8');
const waMatch = cfgSrc.match(/whatsapp:\s*'([^']+)'/);
if (!waMatch) {
  console.error('config.js में whatsapp नंबर नहीं मिला');
  process.exit(1);
}
global.CONFIG = { whatsapp: waMatch[1] };

require(path.join(dir, 'katha.js'));
const html = window.Katha.fullHTML(false);             // false = हिन्दी

const file = path.join(dir, 'katha.html');
let page = fs.readFileSync(file, 'utf8');

const open = '<div class="wrap wrap--narrow" id="kathaFull">';
const close = '</div>';
const start = page.indexOf(open);
if (start === -1) {
  console.error('katha.html में #kathaFull वाला डिब्बा नहीं मिला, कुछ बदल गया है?');
  process.exit(1);
}
/* डिब्बे का अपना बंद टैग ढूँढो (अंदर के टैग गिनकर) */
let i = start + open.length, depth = 1;
while (depth > 0 && i < page.length) {
  const nextOpen = page.indexOf('<div', i);
  const nextClose = page.indexOf(close, i);
  if (nextClose === -1) break;
  if (nextOpen !== -1 && nextOpen < nextClose) { depth++; i = nextOpen + 4; }
  else { depth--; i = nextClose + close.length; }
}
const end = i - close.length;

const before = page.slice(0, start + open.length);
const after = page.slice(end);
page = before + '\n' + html + '\n      ' + after;

fs.writeFileSync(file, page, 'utf8');

const chars = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
console.log('katha.html mein ' + window.Katha.PLACES.length + ' kathaayein likh di gayin (' + chars + ' akshar)');

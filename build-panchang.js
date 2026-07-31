/* ═══════════════════════════════════════════════════════════
   build-panchang.js, आगामी व्रत-पर्वों की सूची पहले से
                       panchang.html में लिख देता है

   क्यों चाहिए
   ────────────
   `/panchang` पेज की असली क़ीमत यही सूची है, "एकादशी कब है",
   "दीपावली 2026 की तारीख़" जैसे सवाल इसी पर आते हैं। पर यह सूची
   सिर्फ़ JavaScript से बनती थी, यानी HTML में <ul id="parvList">
   बिल्कुल ख़ाली जाता था। Googlebot को पूरे पेज पर सिर्फ़ 393 शब्द
   दिखते थे, और शीर्षक में वादा था "आगे आने वाले व्रत और त्योहार",
   पर नीचे कुछ था ही नहीं।

   यह ठीक वही ग़लती है जो /katha पर हो चुकी है (HANDOVER §12),
   वहाँ पेज "Discovered, currently not indexed" पड़ा रह गया था,
   जब तक build-katha.js ने HTML पहले से नहीं लिख दिया।

   अब हिन्दी सूची HTML में लिखी रहती है, और ब्राउज़र में panchang.js
   उसे तुरंत ताज़ा सूची से बदल देता है, यानी यात्री को हमेशा सही
   दिखता है, और Google को पहली ही झलक में पूरी सामग्री मिल जाती है।

   चलाने का तरीक़ा:
       node build-panchang.js

   🔴 यह सूची "आज से अगले 200 दिन" की होती है, यानी समय के साथ
      पुरानी पड़ जाती है। इसलिए **हर deploy से पहले एक बार चला लें**
      (build-katha.js के साथ ही)। भूल गए तो साइट टूटती नहीं, बस
      Google को कुछ बीत चुके पर्व दिखते रहेंगे।

   ⚠️ panchang.html में <ul class="parvList" id="parvList"> के अंदर
      हाथ से कुछ मत लिखना, यह script उसे हर बार मिटाकर भरता है।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

/* panchang.js को चलाने के लिए ब्राउज़र जैसा ढाँचा, यह script Node में
   चलती है, वहाँ window/document होते नहीं। upcomingHTML() इन्हें छूती
   नहीं, बस फ़ाइल लोड होने भर के लिए चाहिए। */
global.window = {};
global.document = {
  documentElement: { lang: 'hi' },
  getElementById: () => null,
  readyState: 'complete',
  addEventListener: () => {}
};
global.MutationObserver = function () { return { observe() {} }; };

/* config.js से WhatsApp नंबर, वरना हर पर्व के आगे वाला
   "💬 यात्रा पूछें" बटन बिना नंबर के रह जाएगा। */
const cfgSrc = fs.readFileSync(path.join(dir, 'config.js'), 'utf8');
const waMatch = cfgSrc.match(/whatsapp:\s*'([^']+)'/);
if (!waMatch) {
  console.error('config.js mein whatsapp number nahi mila');
  process.exit(1);
}
global.CONFIG = { whatsapp: waMatch[1] };

require(path.join(dir, 'panchang.js'));
const html = window.Panchang.upcomingHTML(false);        // false = हिन्दी

const file = path.join(dir, 'panchang.html');
let page = fs.readFileSync(file, 'utf8');

const open = '<ul class="parvList" id="parvList">';
const close = '</ul>';
const start = page.indexOf(open);
if (start === -1) {
  console.error('panchang.html mein #parvList wali <ul> nahi mili, kuch badal gaya hai?');
  process.exit(1);
}
const end = page.indexOf(close, start + open.length);
if (end === -1) {
  console.error('panchang.html mein #parvList ka </ul> nahi mila');
  process.exit(1);
}

page = page.slice(0, start + open.length) + '\n' + html + '\n    ' + page.slice(end);
fs.writeFileSync(file, page, 'utf8');

const count = (html.match(/<li class="parv">/g) || []).length;
const chars = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
console.log('panchang.html mein ' + count + ' parv likh diye gaye (' + chars + ' akshar)');

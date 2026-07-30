/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva — script.js

   ⚠️  नंबर / ईमेल / लिंक / सोशल हैंडल अब **config.js** में हैं।
       बदलना हो तो सिर्फ़ वही फ़ाइल खोलें — यहाँ कुछ नहीं करना।
   ═══════════════════════════════════════════════════════════ */

/* ── 1. सभी नंबर/लिंक CONFIG से अपडेट करें ───────────────── */
(function applyConfig(){
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>{
    const q = a.href.split('?')[1];
    a.href = 'https://wa.me/' + CONFIG.whatsapp + (q ? '?' + q : '');
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
    a.href = 'tel:+' + CONFIG.whatsapp;
    if (/\+91[\d\s]{8,}/.test(a.textContent)) a.textContent = a.textContent.replace(/\+91[\d\s]+/, CONFIG.phone);
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
    a.href = 'mailto:' + CONFIG.email;
    a.textContent = '✉️ ' + CONFIG.email;
  });

  /* भुगतान बटन — यहाँ का काम बस इतना है: config.js का लिंक <a> में भर दो।
     बटन दिखाना/छुपाना यह फ़ाइल नहीं करती — वो CSS करती है (.pay:not([href]))।
     ⚠️ यहाँ hidden लगाने-हटाने की कोशिश मत करना: उसी वजह से 30 जुलाई 2026 को
     बटन गायब हो गया था (नई HTML + ब्राउज़र में पड़ी पुरानी script.js)।
     लिंक ख़ाली हो तो href भरा ही नहीं जाता, और CSS ख़ुद बटन छुपा देती है। */
  const payWrap = document.getElementById('payBox');
  if (payWrap && CONFIG.razorpay) {
    payWrap.querySelector('.pay').href = CONFIG.razorpay;
  }

  /* सोशल पेज — config.js में जो हैंडल भरा है सिर्फ़ वही दिखता है।
     सब ख़ाली हों तो फ़ुटर में कुछ नहीं आता (अधूरा लिंक भरोसा तोड़ता है)। */
  const socialBox = document.getElementById('footSocial');
  if (socialBox) {
    const S = CONFIG.social || {};
    const icons = {
      instagram: ['इंस्टाग्राम', 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.9-11.2a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z'],
      facebook:  ['फ़ेसबुक',   'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z'],
      youtube:   ['यूट्यूब',   'M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16 4.1 12 4.1 12 4.1s-4 0-6.8.2c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2.2 8.8 2.2 10.5v1.6c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.8.8 2.2.9 1.6.1 6.6.2 6.6.2s4 0 6.8-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.6c0-1.7-.2-3.3-.2-3.3zM9.9 14.6V8.9l5.2 2.9-5.2 2.8z']
    };
    let out = '', pills = '';
    for (const k in icons) {
      if (!S[k]) continue;
      const svg = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="${icons[k][1]}"/></svg>`;
      out   += `<a href="${S[k]}" target="_blank" rel="noopener" aria-label="${icons[k][0]}" title="${icons[k][0]}">${svg}</a>`;
      pills += `<a href="${S[k]}" target="_blank" rel="noopener">${svg}<span>${icons[k][0]}</span></a>`;
    }
    socialBox.innerHTML = out;

    /* बुकिंग वाले हिस्से में नाम के साथ — यहाँ लोग भरोसा जाँचते हैं */
    const bookBox = document.getElementById('bookSocial');
    if (bookBox && pills) {
      bookBox.innerHTML = '<b>यात्राओं की झलक देखें</b><div>' + pills + '</div>';
    }

    /* Google वाला JSON-LD अब index.html में ही स्थिर लिखा है (वहाँ का
       बड़ा comment देखें) — यहाँ सिर्फ़ उसके नंबर/ईमेल/सोशल लिंक CONFIG से
       मिला दिए जाते हैं, ताकि बदलने की जगह config.js अकेली ही रहे। */
    const ldTag = document.getElementById('ldBiz');
    if (ldTag) {
      try {
        const ld = JSON.parse(ldTag.textContent);
        ld.telephone = '+' + CONFIG.whatsapp;
        ld.email = CONFIG.email;
        if (ld.contactPoint) ld.contactPoint.telephone = '+' + CONFIG.whatsapp;
        const same = Object.keys(icons).map(k => S[k]).filter(Boolean);
        if (same.length) ld.sameAs = same;
        ldTag.textContent = JSON.stringify(ld);
      } catch (e) { /* JSON बिगड़ा हो तो स्थिर वाला ही चलने दो */ }
    }
  }
})();

/* ── 2. मोबाइल मेन्यू ─────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

/* ── 3. स्क्रॉल पर nav shadow ─────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ── 4. स्क्रॉल रिवील एनिमेशन ─────────────────────────────── */
/* स्लाइडर के अंदर वाले कार्ड यहाँ नहीं — वे बग़ल में छुपे होते हैं, इसलिए
   IntersectionObserver उन्हें कभी नहीं देखता और वे हमेशा ग़ायब रह जाते।
   पूरी पट्टी (.slider) को एक साथ दिखाते हैं। */
const revealables = document.querySelectorAll(
  '.slider, .rev, .form, .book__copy, .sec__title, .sec__lede, .faq details'
);
revealables.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealables.forEach(el => io.observe(el));

/* ── 5. "बुक करें" बटन → फ़ॉर्म में यात्रा पहले से चुनी हुई ── */
const routeSelect = document.getElementById('routeSelect');

document.querySelectorAll('.js-book').forEach(btn => {
  btn.addEventListener('click', () => {
    const route = btn.dataset.route;
    if (!route) return;
    const opt = [...routeSelect.options].find(o => o.value === route || o.text === route);
    if (opt) {
      routeSelect.value = opt.value || opt.text;
      routeSelect.classList.remove('is-bad');
      // हल्का हाइलाइट ताकि यूज़र को दिखे
      routeSelect.style.transition = 'box-shadow .3s';
      routeSelect.style.boxShadow = '0 0 0 3px rgba(233,83,31,.35)';
      setTimeout(() => { routeSelect.style.boxShadow = ''; }, 1400);
    }
  });
});

/* ── 6. फ़ॉर्म → WhatsApp संदेश ───────────────────────────── */
const form    = document.getElementById('bookForm');
const formErr = document.getElementById('formErr');

const showErr = msg => {
  formErr.textContent = msg;
  formErr.hidden = false;
};

form.addEventListener('submit', e => {
  e.preventDefault();
  formErr.hidden = true;

  const d = Object.fromEntries(new FormData(form));
  const bad = [];

  form.querySelectorAll('.is-bad').forEach(el => el.classList.remove('is-bad'));

  /* एरर मैसेज उसी भाषा में जिसमें साइट देखी जा रही है */
  const isEn = document.documentElement.lang === 'en';
  const need = isEn
    ? { name:'Name', phone:'Mobile number', route:'Yatra', pax:'Number of travellers' }
    : { name:'नाम', phone:'मोबाइल नंबर', route:'यात्रा', pax:'यात्रियों की संख्या' };
  for (const k in need) {
    if (!d[k] || !String(d[k]).trim()) {
      bad.push(need[k]);
      form.querySelector(`[name="${k}"]`)?.classList.add('is-bad');
    }
  }

  if (bad.length) {
    showErr((isEn ? 'Please fill in: ' : 'कृपया भरें: ') + bad.join(', '));
    form.querySelector('.is-bad')?.focus();
    return;
  }

  if (!/^[6-9]\d{9}$/.test(String(d.phone).replace(/\D/g,''))) {
    form.querySelector('[name="phone"]').classList.add('is-bad');
    showErr(isEn ? 'Please enter a valid 10-digit mobile number.' : 'कृपया सही 10 अंकों का मोबाइल नंबर डालें।');
    form.querySelector('[name="phone"]').focus();
    return;
  }

  // तारीख़ को भारतीय फ़ॉर्मैट में
  let dateTxt = 'बताएँगे';
  if (d.date) {
    const [y,m,dd] = d.date.split('-');
    dateTxt = `${dd}-${m}-${y}`;
  }

  const msg =
`🙏 जय श्री श्याम! नई बुकिंग पूछताछ

*नाम:* ${d.name}
*मोबाइल:* ${d.phone}
*यात्रा:* ${d.route}
*तिथि:* ${dateTxt}
*यात्री:* ${d.pax}
*पिकअप:* ${d.pickup || 'बताएँगे'}
*विशेष आवश्यकता:* ${d.note?.trim() || 'कोई नहीं'}

— www.darshanyatraseva.com से भेजा गया`;

  window.open(
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,
    '_blank',
    'noopener'
  );

  form.reset();
  showErr('');
  formErr.hidden = true;
});

/* सिर्फ़ अंक ही टाइप हों */
form.querySelector('[name="phone"]').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
});

/* तारीख़ आज से पहले न चुनी जा सके */
const dateInput = form.querySelector('[name="date"]');
dateInput.min = new Date().toISOString().split('T')[0];

/* ── 7. फुटर में वर्तमान वर्ष ─────────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── 8. स्लाइडर — तीर, डॉट, अपने आप चलना ──────────────────
   कोई library नहीं। घुमाना CSS scroll-snap करता है (JS बंद हो तब भी
   उँगली से चलेगा); यहाँ सिर्फ़ तीर/डॉट और अपने आप चलना जोड़ा है।     */
(function sliders(){
  const AUTO  = 5000;   // हर 5 सेकंड में अगली स्लाइड
  const REST  = 6000;   // उँगली से घुमाने के बाद इतनी देर चुप रहे
  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tracks = [];

  document.querySelectorAll('.slider').forEach(track => {
    const items = [...track.children];
    if (items.length < 2) return;
    let onScreen = false;                 // पर्दे पर दिख रहा है या नहीं

    /* तीर + डॉट बनाओ */
    const btn = (cls, label, sign) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = cls; b.setAttribute('aria-label', label);
      b.innerHTML = sign; return b;
    };
    const nav  = document.createElement('div');
    const prev = btn('slider-btn', 'पिछला', '&#8249;');
    const next = btn('slider-btn', 'अगला',  '&#8250;');
    const dots = document.createElement('div');
    nav.className = 'slider-nav';
    dots.className = 'slider-dots';
    items.forEach((_, i) => {
      const d = btn('slider-dot', `स्लाइड ${i + 1}`, '');
      d.addEventListener('click', () => { pause(REST); goTo(i); });
      dots.appendChild(d);
    });
    nav.append(prev, dots, next);
    track.after(nav);

    /* जगह नापना — offsetLeft भरोसेमंद नहीं, इसलिए rect से */
    const posOf  = el => el.getBoundingClientRect().left
                       - track.getBoundingClientRect().left + track.scrollLeft;
    const atEnd  = () => track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    const nearest = () => {
      let best = 0, min = Infinity;
      items.forEach((el, i) => {
        const d = Math.abs(posOf(el) - track.scrollLeft);
        if (d < min) { min = d; best = i; }
      });
      return best;
    };
    const goTo = i => {
      const el = items[Math.max(0, Math.min(items.length - 1, i))];
      track.scrollTo({ left: posOf(el), behavior: 'smooth' });
    };

    /* अपने आप चलना — घड़ी चलती रहती है, हर बार सिर्फ़ "अभी चलूँ या नहीं" देखती है।
       (टाइमर बंद-चालू करने से गड़बड़ होती थी: स्क्रॉल के बाद माउस अपने आप
       कार्ड के ऊपर आ जाता है और pointerenter टाइमर मार देता था।) */
    let hold = 0;                                   // इस वक़्त तक चुप रहो
    const pause = ms => { hold = Date.now() + ms; };
    const stop  = () => pause(1e9);                 // मेन्यू से खुलने पर हमेशा के लिए
    setInterval(() => {
      if (quiet || !onScreen || document.hidden) return;
      if (track.classList.contains('is-open')) return;
      if (Date.now() < hold) return;
      if (track.matches(':hover') || track.contains(document.activeElement)) return;
      atEnd() ? goTo(0) : goTo(nearest() + 1);
    }, AUTO);

    /* उँगली/माउस/कीबोर्ड से छेड़ा — कुछ देर चुप रहो, फिर ख़ुद चलने लगो */
    ['touchstart','pointerdown','wheel','keydown'].forEach(e =>
      track.addEventListener(e, () => pause(REST), { passive:true }));

    prev.addEventListener('click', () => { pause(REST); goTo(nearest() - 1); });
    next.addEventListener('click', () => { pause(REST); goTo(nearest() + 1); });

    /* डॉट व तीर की हालत scroll के बाद ठीक करो */
    let t = null;
    const sync = () => {
      const i = nearest();
      [...dots.children].forEach((d, k) => d.classList.toggle('is-on', k === i));
      prev.disabled = track.scrollLeft < 4;
      next.disabled = atEnd();
    };
    track.addEventListener('scroll', () => {
      clearTimeout(t); t = setTimeout(sync, 90);
    }, { passive:true });
    addEventListener('resize', sync);
    sync();

    /* पर्दे पर दिखे तभी चले — बेकार में बैटरी न ख़र्च हो */
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; },
      { threshold: 0.2 }).observe(track);

    /* मेन्यू से आने पर पूरी पट्टी खोल देना */
    track.openAll = () => { track.classList.add('is-open'); stop(); sync(); };
    tracks.push(track);
  });

  /* ☰ मेन्यू से किसी सेक्शन में जाएँ तो वहाँ सब कुछ एक साथ दिखे —
     ग्राहक जान-बूझकर देखने आया है, कोई विकल्प छूटना नहीं चाहिए */
  function openSection(hash){
    if (!hash || hash === '#') return;
    let sec = null;
    try { sec = document.querySelector(hash); } catch(e){ return; }
    if (sec) sec.querySelectorAll('.slider').forEach(s => s.openAll && s.openAll());
  }
  document.querySelectorAll('#navLinks a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => openSection(a.getAttribute('href')));
  });
  addEventListener('hashchange', () => openSection(location.hash));
  if (location.hash) openSection(location.hash);
})();

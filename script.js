/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva — script.js

   ⚠️  यहाँ अपना असली नंबर डालें / PUT YOUR REAL NUMBER HERE
   सिर्फ़ नीचे की 3 लाइनें बदलें — पूरी साइट अपने आप अपडेट हो जाएगी।
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  whatsapp: '919999445462',          // देश कोड सहित, कोई + या स्पेस नहीं
  phone:    '+91 99994 45462',       // दिखाने के लिए
  email:    'info@darshanyatraseva.in'
};

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
const revealables = document.querySelectorAll(
  '.card, .feat, .step, .rev, .form, .book__copy, .sec__title, .sec__lede, .tablewrap, .faq details'
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

  const need = { name:'नाम', phone:'मोबाइल नंबर', route:'यात्रा', pax:'यात्रियों की संख्या' };
  for (const k in need) {
    if (!d[k] || !String(d[k]).trim()) {
      bad.push(need[k]);
      form.querySelector(`[name="${k}"]`)?.classList.add('is-bad');
    }
  }

  if (bad.length) {
    showErr('कृपया भरें: ' + bad.join(', '));
    form.querySelector('.is-bad')?.focus();
    return;
  }

  if (!/^[6-9]\d{9}$/.test(String(d.phone).replace(/\D/g,''))) {
    form.querySelector('[name="phone"]').classList.add('is-bad');
    showErr('कृपया सही 10 अंकों का मोबाइल नंबर डालें।');
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

— darshanyatraseva.in से भेजा गया`;

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

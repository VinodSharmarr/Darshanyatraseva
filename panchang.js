/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva — panchang.js
   हिन्दू कैलेंडर (पंचांग) — कोई library नहीं, कोई इंटरनेट नहीं,
   कोई backend नहीं। सूर्य-चंद्र की गणना यहीं ब्राउज़र में होती है।

   कैसे काम करता है
   ─────────────────
   1. सूर्य और चंद्रमा का देशांतर (longitude) निकाला जाता है
      — Meeus की "Astronomical Algorithms" वाली विधि से।
   2. दोनों का अंतर ÷ 12 = तिथि।  चंद्रमा ÷ 13°20' = नक्षत्र।
   3. दिल्ली के सूर्योदय के समय जो तिथि हो, वही उस दिन की तिथि
      मानी जाती है — यही परंपरा है।
   4. महीना अमांत पद्धति से (अमावस्या पर महीना बदलता है) —
      दिल्ली/उत्तर भारत की चलन वाली गणना।

   ⚠️ यह गणना से बना पंचांग है, ±कुछ मिनट का फ़र्क़ हो सकता है।
      व्रत/त्योहार की कोई तारीख़ ग्राहक को पक्की बताने से पहले
      अपने स्थानीय पंचांग से एक बार मिला लें।

   ⚠️ नया त्योहार जोड़ना हो तो नीचे PARV वाली सूची में जोड़ें —
      key इस तरह: 'महीना|पक्ष|तिथि'  (महीना 0=चैत्र … 11=फाल्गुन,
      पक्ष S=शुक्ल K=कृष्ण, तिथि 1–15)
   ═══════════════════════════════════════════════════════════ */

window.Panchang = (function () {
  'use strict';

  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  const sin = d => Math.sin(d * D2R);
  const cos = d => Math.cos(d * D2R);
  const norm = a => ((a % 360) + 360) % 360;

  /* दिल्ली — साइट यहीं से चलती है */
  const CITY = { lat: 28.6139, lon: 77.2090, tz: 5.5 };

  /* ── नाम ─────────────────────────────────────────────────── */
  const TITHI_HI = ['प्रतिपदा','द्वितीया','तृतीया','चतुर्थी','पंचमी','षष्ठी','सप्तमी',
                    'अष्टमी','नवमी','दशमी','एकादशी','द्वादशी','त्रयोदशी','चतुर्दशी'];
  const TITHI_EN = ['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami',
                    'Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi'];

  const MASA_HI = ['चैत्र','वैशाख','ज्येष्ठ','आषाढ़','श्रावण','भाद्रपद',
                   'आश्विन','कार्तिक','मार्गशीर्ष','पौष','माघ','फाल्गुन'];
  const MASA_EN = ['Chaitra','Vaishakha','Jyeshtha','Ashadha','Shravana','Bhadrapada',
                   'Ashwin','Kartika','Margashirsha','Paush','Magha','Phalguna'];

  const VAAR_HI = ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];
  const VAAR_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const MAH_HI = ['जनवरी','फ़रवरी','मार्च','अप्रैल','मई','जून',
                  'जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
  const MAH_EN = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  const NAK_HI = ['अश्विनी','भरणी','कृत्तिका','रोहिणी','मृगशिरा','आर्द्रा','पुनर्वसु','पुष्य',
                  'आश्लेषा','मघा','पूर्वा फाल्गुनी','उत्तरा फाल्गुनी','हस्त','चित्रा','स्वाति',
                  'विशाखा','अनुराधा','ज्येष्ठा','मूल','पूर्वाषाढ़ा','उत्तराषाढ़ा','श्रवण',
                  'धनिष्ठा','शतभिषा','पूर्वा भाद्रपद','उत्तरा भाद्रपद','रेवती'];
  const NAK_EN = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya',
                  'Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati',
                  'Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana',
                  'Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];

  const YOGA_HI = ['विष्कम्भ','प्रीति','आयुष्मान','सौभाग्य','शोभन','अतिगण्ड','सुकर्मा','धृति',
                   'शूल','गण्ड','वृद्धि','ध्रुव','व्याघात','हर्षण','वज्र','सिद्धि','व्यतीपात',
                   'वरीयान','परिघ','शिव','सिद्ध','साध्य','शुभ','शुक्ल','ब्रह्म','इन्द्र','वैधृति'];
  const YOGA_EN = ['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti',
                   'Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata',
                   'Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];

  const RASHI_HI = ['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या',
                    'तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];
  const RASHI_EN = ['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya',
                    'Tula','Vrishchika','Dhanu','Makara','Kumbha','Meena'];

  /* ── पर्व सूची — 'मास|पक्ष|तिथि': [हिन्दी, English, स्तर, नियम] ──

     ⚠️ अमांत पद्धति के हिसाब से। इसीलिए जन्माष्टमी श्रावण कृष्ण 8 है
     और दीपावली आश्विन अमावस्या — पूर्णिमांत पंचांग में महीने का नाम
     अलग लिखा मिलेगा, पर तारीख़ वही रहती है।

     नियम — कौन सी घड़ी की तिथि देखी जाए:
       'u' = सूर्योदय की तिथि (ज़्यादातर व्रत-त्योहार)
       'p' = प्रदोष/शाम की तिथि (दीपावली, धनतेरस, होलिका दहन, करवा चौथ)
       'n' = निशीथ/आधी रात की तिथि (महाशिवरात्रि)
     यही वजह है कि 2025 में होलिका दहन 13 मार्च था जबकि सूर्योदय की
     पूर्णिमा 14 मार्च को थी — दहन शाम को होता है।                  */
  const PARV = {
    /* चैत्र */
    '0|S|1' : ['नव संवत्सर · चैत्र नवरात्रि प्रारंभ', 'Hindu New Year · Chaitra Navratri begins', 1, 'u'],
    '0|S|9' : ['राम नवमी', 'Ram Navami', 1, 'u'],
    '0|S|15': ['हनुमान जयंती', 'Hanuman Jayanti', 1, 'u'],
    /* वैशाख */
    '1|S|3' : ['अक्षय तृतीया', 'Akshaya Tritiya', 1, 'u'],
    '1|S|15': ['बुद्ध पूर्णिमा', 'Buddha Purnima', 1, 'u'],
    /* ज्येष्ठ */
    '2|S|11': ['निर्जला एकादशी', 'Nirjala Ekadashi', 1, 'u'],
    '2|K|15': ['वट सावित्री अमावस्या', 'Vat Savitri Amavasya', 1, 'u'],
    /* आषाढ़ */
    '3|S|2' : ['जगन्नाथ रथ यात्रा', 'Jagannath Rath Yatra', 1, 'u'],
    '3|S|11': ['देवशयनी एकादशी', 'Devshayani Ekadashi', 1, 'u'],
    '3|S|15': ['गुरु पूर्णिमा', 'Guru Purnima', 1, 'u'],
    /* श्रावण */
    '4|S|3' : ['हरियाली तीज', 'Hariyali Teej', 1, 'u'],
    '4|S|5' : ['नाग पंचमी', 'Nag Panchami', 1, 'u'],
    '4|S|15': ['रक्षाबंधन', 'Raksha Bandhan', 1, 'u'],
    '4|K|8' : ['श्रीकृष्ण जन्माष्टमी', 'Krishna Janmashtami', 1, 'u'],
    /* भाद्रपद */
    '5|S|3' : ['हरतालिका तीज', 'Hartalika Teej', 1, 'u'],
    '5|S|4' : ['गणेश चतुर्थी', 'Ganesh Chaturthi', 1, 'u'],
    '5|S|15': ['पितृ पक्ष प्रारंभ', 'Pitru Paksha begins', 1, 'u'],
    '5|K|15': ['सर्व पितृ अमावस्या', 'Sarva Pitru Amavasya', 1, 'u'],
    /* आश्विन */
    '6|S|1' : ['शारदीय नवरात्रि · घटस्थापना', 'Sharad Navratri begins', 1, 'u'],
    '6|S|8' : ['दुर्गा अष्टमी', 'Durga Ashtami', 1, 'u'],
    '6|S|9' : ['महानवमी', 'Maha Navami', 1, 'u'],
    '6|S|10': ['विजयादशमी · दशहरा', 'Vijayadashami · Dussehra', 1, 'u'],
    '6|S|15': ['शरद पूर्णिमा', 'Sharad Purnima', 1, 'u'],
    '6|K|4' : ['करवा चौथ', 'Karva Chauth', 1, 'p'],
    '6|K|13': ['धनतेरस', 'Dhanteras', 1, 'p'],
    '6|K|14': ['नरक चतुर्दशी · छोटी दीपावली', 'Narak Chaturdashi', 1, 'u'],
    '6|K|15': ['दीपावली · लक्ष्मी पूजन', 'Deepawali · Lakshmi Pujan', 1, 'p'],
    /* कार्तिक */
    '7|S|1' : ['गोवर्धन पूजा · अन्नकूट', 'Govardhan Puja · Annakut', 1, 'u'],
    '7|S|2' : ['भाई दूज', 'Bhai Dooj', 1, 'u'],
    '7|S|6' : ['छठ पूजा — संध्या अर्घ्य', 'Chhath Puja', 1, 'p'],
    '7|S|11': ['देवउठनी एकादशी · तुलसी विवाह', 'Devuthani Ekadashi', 1, 'u'],
    '7|S|15': ['कार्तिक पूर्णिमा · देव दीपावली', 'Kartik Purnima · Dev Deepawali', 1, 'u'],
    /* मार्गशीर्ष */
    '8|S|11': ['मोक्षदा एकादशी · गीता जयंती', 'Mokshada Ekadashi · Gita Jayanti', 1, 'u'],
    /* माघ */
    '10|S|5' : ['वसंत पंचमी', 'Vasant Panchami', 1, 'u'],
    '10|S|15': ['माघ पूर्णिमा', 'Magha Purnima', 1, 'u'],
    '10|K|14': ['महाशिवरात्रि', 'Mahashivratri', 1, 'n'],
    '10|K|15': ['मौनी अमावस्या', 'Mauni Amavasya', 1, 'u'],
    /* फाल्गुन */
    '11|S|11': ['खाटू श्याम जी लक्खी मेला (फाल्गुन)', 'Khatu Shyam Falgun Mela', 1, 'u']
    /* होलिका दहन और धुलंडी — भद्रा का नियम लगता है, इसलिए holiPair() में */
  };

  /* हर महीने आने वाले व्रत — ऊपर वाली ख़ास तारीख़ न हो तभी दिखते हैं */
  const MAASIK = {
    'S|11': ['एकादशी व्रत', 'Ekadashi Vrat', 2, 'u'],
    'K|11': ['एकादशी व्रत', 'Ekadashi Vrat', 2, 'u'],
    'S|13': ['प्रदोष व्रत', 'Pradosh Vrat', 3, 'p'],
    'K|13': ['प्रदोष व्रत', 'Pradosh Vrat', 3, 'p'],
    'K|4' : ['संकष्टी चतुर्थी', 'Sankashti Chaturthi', 3, 'p'],
    'S|4' : ['विनायक चतुर्थी', 'Vinayak Chaturthi', 3, 'u'],
    'S|15': ['पूर्णिमा', 'Purnima', 2, 'u'],
    'K|15': ['अमावस्या', 'Amavasya', 2, 'u']
  };

  /* ═══ 1. खगोल गणित ═════════════════════════════════════════ */

  /* JS तारीख़ → जूलियन दिन (UT) */
  function jdOf(y, m, d, hourUT) {
    return Date.UTC(y, m - 1, d) / 86400000 + 2440587.5 + (hourUT || 0) / 24;
  }
  function dateOfJD(jd) { return new Date((jd - 2440587.5) * 86400000); }

  /* सूर्य का सायन देशांतर (Meeus, अध्याय 25) */
  function sunLong(jd) {
    const T = (jd - 2451545.0) / 36525;
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M)
            + (0.019993 - 0.000101 * T) * sin(2 * M)
            + 0.000289 * sin(3 * M);
    const om = 125.04 - 1934.136 * T;
    return norm(L0 + C - 0.00569 - 0.00478 * sin(om));
  }

  /* चंद्रमा का सायन देशांतर (Meeus, अध्याय 47 — बड़े पद)
     D, M, M', F के गुणक और 1e-6 अंश में गुणांक */
  const MOON = [
    [0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],
    [0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],
    [2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],
    [0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],
    [4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],
    [2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],
    [2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],
    [2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],
    [0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],
    [2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],
    [2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700]
  ];

  function moonLong(jd) {
    const T = (jd - 2451545.0) / 36525;
    const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T
             + T * T * T / 538841 - T * T * T * T / 65194000;
    const D  = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T
             + T * T * T / 545868 - T * T * T * T / 113065000;
    const M  = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T
             + T * T * T / 24490000;
    const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T
             + T * T * T / 69699 - T * T * T * T / 14712000;
    const F  = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T
             - T * T * T / 3526000 + T * T * T * T / 863310000;
    const E = 1 - 0.002516 * T - 0.0000074 * T * T;

    let s = 0;
    for (const [a, b, c, e, coef] of MOON) {
      let f = coef;
      if (b === 1 || b === -1) f *= E;
      else if (b === 2 || b === -2) f *= E * E;
      s += f * sin(a * D + b * M + c * Mp + e * F);
    }
    /* शुक्र व बृहस्पति की हल्की खींच */
    const A1 = 119.75 + 131.849 * T, A2 = 53.09 + 479264.290 * T;
    s += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);

    return norm(Lp + s / 1e6);
  }

  /* लाहिड़ी अयनांश — सायन को निरयण (भारतीय) में बदलने के लिए */
  function ayanamsa(jd) {
    const y = (jd - 2451545.0) / 365.25 + 2000;
    return 23.85306 + (y - 2000) * (50.2909 / 3600);
  }
  const sunSid  = jd => norm(sunLong(jd)  - ayanamsa(jd));
  const moonSid = jd => norm(moonLong(jd) - ayanamsa(jd));

  /* चंद्र-सूर्य का अंतर — तिथि इसी से बनती है (अयनांश कट जाता है) */
  const elong = jd => norm(moonLong(jd) - sunLong(jd));

  /* जिस क्षण अंतर ठीक `deg` होता है, उसे ढूँढना (न्यूटन विधि)।
     चंद्रमा सूर्य से लगभग 12.19° प्रतिदिन आगे बढ़ता है। */
  function whenElong(deg, near) {
    let t = near;
    for (let i = 0; i < 8; i++) {
      let d = norm(elong(t) - deg);
      if (d > 180) d -= 360;
      const step = d / 12.19;
      t -= step;
      if (Math.abs(step) < 1e-6) break;
    }
    return t;
  }

  /* जिस क्षण चंद्रमा `deg` (निरयण) पर होता है — नक्षत्र के लिए */
  function whenMoonAt(deg, near) {
    let t = near;
    for (let i = 0; i < 8; i++) {
      let d = norm(moonSid(t) - deg);
      if (d > 180) d -= 360;
      const step = d / 13.176;
      t -= step;
      if (Math.abs(step) < 1e-6) break;
    }
    return t;
  }

  /* पिछली अमावस्या — यहीं से अमांत महीना शुरू होता है */
  function lastNewMoon(jd) {
    return whenElong(0, jd - elong(jd) / 12.19 - 0.2);
  }

  /* सूर्योदय / सूर्यास्त — दिल्ली के लिए (sunrise equation) */
  function solar(y, m, d) {
    const jd0 = jdOf(y, m, d) - CITY.tz / 24;      // 00:00 IST, UT में
    const lw = -CITY.lon;
    const n = Math.round(jd0 + 0.5 - 2451545.0 - 0.0009 - lw / 360);
    const Jstar = 2451545.0 + 0.0009 + lw / 360 + n;
    const M = norm(357.5291 + 0.98560028 * (Jstar - 2451545.0));
    const C = 1.9148 * sin(M) + 0.0200 * sin(2 * M) + 0.0003 * sin(3 * M);
    const lam = norm(M + C + 180 + 102.9372);
    const Jt = Jstar + 0.0053 * sin(M) - 0.0069 * sin(2 * lam);
    const sd = sin(lam) * sin(23.44);
    const cd = Math.sqrt(1 - sd * sd);
    let c = (sin(-0.833) - sin(CITY.lat) * sd) / (cos(CITY.lat) * cd);
    c = Math.max(-1, Math.min(1, c));
    const w = Math.acos(c) * R2D;
    return { rise: Jt - w / 360, set: Jt + w / 360 };
  }

  /* ═══ 2. एक दिन का पूरा पंचांग ══════════════════════════════ */

  /* महीने का नाम: जिस अमावस्या से महीना शुरू हुआ, उस वक़्त सूर्य
     जिस राशि में था — उससे एक आगे वाला नाम। (मीन → चैत्र) */
  function masaAt(newMoonJD) {
    return (Math.floor(sunSid(newMoonJD) / 30) + 1) % 12;
  }

  /* किसी भी घड़ी की तिथि + महीना
     adhika = अधिक मास (मलमास/पुरुषोत्तम मास) — इसमें बड़े त्योहार
     नहीं मनाए जाते, वे अगले "निज" महीने में आते हैं। */
  function tithiAt(jd) {
    const ti = Math.floor(elong(jd) / 12);    // 0–29
    const nm = lastNewMoon(jd);
    const masa = masaAt(nm);
    return {
      masa, paksha: ti < 15 ? 'S' : 'K', num: (ti % 15) + 1, index: ti,
      adhika: masaAt(whenElong(0, nm + 29.53)) === masa
    };
  }
  const sameTithi = (a, b) => a && b && a.index === b.index && a.masa === b.masa;

  function forDate(dateObj) {
    const y = dateObj.getFullYear(), m = dateObj.getMonth() + 1, d = dateObj.getDate();
    const sun = solar(y, m, d);
    const t = sun.rise;                       // सूर्योदय की तिथि ही उस दिन की तिथि

    /* तिथि */
    const e = elong(t);
    const ti = Math.floor(e / 12);            // 0–29
    const paksha = ti < 15 ? 'S' : 'K';
    const tNum = (ti % 15) + 1;               // 1–15
    const tEnd = whenElong((ti + 1) * 12 % 360, t + 0.5);

    /* शाम और आधी रात की तिथि — कुछ त्योहार इन्हीं से तय होते हैं।
       पिछले दिन की भी निकालते हैं ताकि एक ही तिथि दो शाम पड़े तो
       त्योहार दो बार न दिखे (पहला दिन ही माना जाता है)। */
    const yest = new Date(y, m - 1, d - 1);
    const sunY = solar(yest.getFullYear(), yest.getMonth() + 1, yest.getDate());
    const pradoshJD = sun.set + 0.5 / 24;                  // सूर्यास्त + आधा घंटा
    const nishithJD = jdOf(y, m, d + 1) - CITY.tz / 24;    // रात 12 बजे (IST)
    const at = {
      u: { masa: 0, paksha, num: tNum, index: ti },
      p: tithiAt(pradoshJD),
      n: tithiAt(nishithJD)
    };
    const prev = {
      p: tithiAt(sunY.set + 0.5 / 24),
      n: tithiAt(jdOf(y, m, d) - CITY.tz / 24)
    };

    /* तिथि क्षय — कोई तिथि इतनी छोटी पड़े कि किसी सूर्योदय को छुए ही नहीं।
       ऐसी तिथि का व्रत/त्योहार उसी दिन माना जाता है जिस दिन वो चढ़ती है।
       (2026 में चैत्र प्रतिपदा ऐसी ही है — नवरात्रि 19 मार्च को बैठती है) */
    const sunNext = solar(y, m, d + 1);
    const tiNext = Math.floor(elong(sunNext.rise) / 12);
    at.k = ((tiNext - ti + 30) % 30 === 2)
      ? tithiAt(whenElong(((ti + 1) * 12 + 6) % 360, t + 0.5))
      : null;

    /* नक्षत्र / योग / करण */
    const ms = moonSid(t), ss = sunSid(t);
    const nak = Math.floor(ms / (360 / 27));
    const nakEnd = whenMoonAt((nak + 1) * (360 / 27) % 360, t + 0.5);
    const yog = Math.floor(norm(ms + ss) / (360 / 27));

    /* महीना, पक्ष, संवत् */
    const nm = lastNewMoon(t);
    const masa = masaAt(nm);
    const nextNM = whenElong(0, nm + 29.53);
    const adhika = masaAt(nextNM) === masa;   // दो अमावस्या, एक ही राशि = अधिक मास

    /* विक्रम संवत् — चैत्र शुक्ल प्रतिपदा से बदलता है।
       पीछे चलकर चैत्र की अमावस्या ढूँढते हैं, उसी का साल + 57। */
    let back = nm, guard = 0;
    while (masaAt(back) !== 0 && guard++ < 14) back = whenElong(0, back - 29.53);
    const vsYear = dateOfJD(back + CITY.tz / 24).getUTCFullYear() + 57;

    /* राशि */
    const moonRashi = Math.floor(ms / 30), sunRashi = Math.floor(ss / 30);

    /* संक्रांति — सूर्य ने इस तारीख़ (आधी रात से आधी रात) में राशि बदली?
       मकर संक्रांति दोपहर बाद भी हो तो उसी दिन मानी जाती है, इसलिए
       सूर्योदय नहीं, पूरी तारीख़ देखी जाती है। */
    const midStart = jdOf(y, m, d) - CITY.tz / 24;
    const rashi0 = Math.floor(sunSid(midStart) / 30);
    const rashi1 = Math.floor(sunSid(midStart + 1) / 30);
    const sankranti = rashi0 !== rashi1 ? rashi1 : -1;

    at.u.masa = masa;
    at.u.adhika = adhika;

    return {
      date: new Date(y, m - 1, d),
      vaar: new Date(y, m - 1, d).getDay(),
      tithiIndex: ti, tithiNum: tNum, paksha, tithiEnd: tEnd,
      nak, nakEnd, yog,
      masa, adhika, vsYear, shakaYear: vsYear - 135,
      moonRashi, sunRashi, sankranti,
      sunrise: sun.rise, sunset: sun.set,
      at, prev
    };
  }

  /* JD → भारतीय तारीख़ के टुकड़े */
  function istParts(jd) {
    const dt = new Date((jd - 2440587.5) * 86400000 + CITY.tz * 3600000);
    return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
  }

  /* होलिका दहन और धुलंडी की तारीख़ ─────────────────────────────
     नियम: दहन उस रात होता है जब फाल्गुन पूर्णिमा चल रही हो और
     भद्रा उतर चुकी हो (भद्रा पूर्णिमा के पहले आधे हिस्से में रहती है)।
     अगर उस रात भद्रा ही नहीं उतरती, तो पंचांग अगले दिन (उदया पूर्णिमा)
     पर दहन रखते हैं। धुलंडी हमेशा दहन के अगले दिन।
     इसी नियम से 2025 में दहन 13 मार्च और 2026 में 3 मार्च बैठता है।  */
  function holiPair(jd) {
    const pEnd = whenElong(180, jd);                   // पूर्णिमा कब उतरी
    const chk = tithiAt(pEnd - 0.02);
    if (!(chk.masa === 11 && chk.paksha === 'S' && chk.num === 15)) return null;

    const pStart = whenElong(168, pEnd - 1);           // पूर्णिमा कब चढ़ी
    const bhadraEnd = whenElong(174, pEnd - 0.5);      // भद्रा कब उतरी

    const c = istParts(pStart);
    const sc = solar(c.y, c.m, c.d);
    const midnight = jdOf(c.y, c.m, c.d + 1) - CITY.tz / 24;
    let day = new Date(c.y, c.m - 1, c.d);

    if (Math.max(sc.set, bhadraEnd) >= Math.min(pEnd, midnight)) {
      /* उस रात दहन का समय नहीं बचा → उदया पूर्णिमा वाला दिन लो */
      const n = istParts(pStart + 1);
      const sn = solar(n.y, n.m, n.d);
      if (sn.rise > pStart && sn.rise < pEnd) day = new Date(n.y, n.m - 1, n.d);
    }
    const holi = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    return { dahan: day, holi };
  }

  /* इस दिन का पर्व — [नाम, रंग-स्तर] की सूची
     स्तर 1 = बड़ा त्योहार · 2 = एकादशी/पूर्णिमा/अमावस्या · 3 = मासिक व्रत */
  function parvOf(p, en) {
    const out = [];
    const seen = new Set();
    const add = (row) => {
      const nm = en ? row[1] : row[0];
      if (seen.has(nm)) return;
      seen.add(nm); out.push([nm, row[2]]);
    };

    /* चारों घड़ियाँ जाँचो — हर त्योहार अपनी वाली घड़ी पर ही पकड़ा जाए।
       k = क्षय हुई तिथि, उस पर सूर्योदय वाला ही नियम लगता है। */
    for (const [slot, rule] of [['u', 'u'], ['p', 'p'], ['n', 'n'], ['k', 'u']]) {
      const a = p.at[slot];
      if (!a) continue;
      /* शाम/रात वाली तिथि पिछले दिन भी वही थी = त्योहार कल था, आज नहीं */
      if ((slot === 'p' || slot === 'n') && sameTithi(a, p.prev[slot])) continue;

      /* अधिक मास में त्योहार नहीं — पर एकादशी/पूर्णिमा/अमावस्या तब भी रहती हैं */
      const row = a.adhika ? null : PARV[a.masa + '|' + a.paksha + '|' + a.num];
      if (row && row[3] === rule) add(row);

      const mk = MAASIK[a.paksha + '|' + a.num];
      if (mk && mk[3] === rule && !(row && row[3] === rule)) add(mk);
    }

    /* होलिका दहन / धुलंडी — भद्रा का नियम अलग से (holiPair देखें) */
    if (p.masa === 11 || p.at.p.masa === 11 || p.at.p.masa === 0) {
      const hp = holiPair(p.sunrise);
      if (hp) {
        const dayStr = p.date.toDateString();
        if (hp.dahan.toDateString() === dayStr) add(['होलिका दहन', 'Holika Dahan', 1]);
        if (hp.holi.toDateString()  === dayStr) add(['धुलंडी · होली', 'Holi', 1]);
      }
    }

    if (p.sankranti >= 0) {
      const nm = en ? RASHI_EN[p.sankranti] : RASHI_HI[p.sankranti];
      const big2 = p.sankranti === 9;         // मकर संक्रांति
      out.push([nm + (en ? ' Sankranti' : ' संक्रांति'), big2 ? 1 : 3]);
    }
    return out;
  }

  /* ═══ 3. नाम/समय हिन्दी में ═════════════════════════════════ */

  function tithiName(p, en) {
    if (p.tithiNum === 15) {
      if (p.paksha === 'S') return en ? 'Purnima' : 'पूर्णिमा';
      return en ? 'Amavasya' : 'अमावस्या';
    }
    return (en ? TITHI_EN : TITHI_HI)[p.tithiNum - 1];
  }
  const pakshaName = (p, en) => p.paksha === 'S'
    ? (en ? 'Shukla' : 'शुक्ल') : (en ? 'Krishna' : 'कृष्ण');

  /* JD → भारतीय समय "सुबह 5:42" */
  function fmtTime(jd, en) {
    const dt = new Date((jd - 2440587.5) * 86400000 + CITY.tz * 3600000 + 30000);
    let h = dt.getUTCHours();
    const mi = String(dt.getUTCMinutes()).padStart(2, '0');
    if (en) {
      const ap = h < 12 ? 'AM' : 'PM';
      const hh = h % 12 === 0 ? 12 : h % 12;
      return hh + ':' + mi + ' ' + ap;
    }
    let part = 'रात';
    if (h >= 4 && h < 12) part = 'सुबह';
    else if (h >= 12 && h < 16) part = 'दोपहर';
    else if (h >= 16 && h < 19) part = 'शाम';
    const hh = h % 12 === 0 ? 12 : h % 12;
    return part + ' ' + hh + ':' + mi;
  }

  /* "शुक्रवार, 31 जुलाई 2026" */
  function fmtDate(dt, en) {
    const V = en ? VAAR_EN : VAAR_HI, M = en ? MAH_EN : MAH_HI;
    return V[dt.getDay()] + ', ' + dt.getDate() + ' ' + M[dt.getMonth()] + ' ' + dt.getFullYear();
  }

  /* एक पंक्ति में पूरी तिथि — WhatsApp संदेश में यही जाती है */
  function summary(dt, en) {
    const p = forDate(dt);
    const mas = (en ? MASA_EN : MASA_HI)[p.masa] + (p.adhika ? (en ? ' (Adhika)' : ' (अधिक)') : '');
    const parv = parvOf(p, en).filter(x => x[1] === 1).map(x => x[0]);
    let s = mas + ' ' + pakshaName(p, en) + ' ' + tithiName(p, en);
    if (parv.length) s += ' · ' + parv.join(' · ');
    return s;
  }

  /* ═══ 4. साइट पर कैलेंडर दिखाना ═════════════════════════════ */

  function render(host, shownMonth) {
    const en = document.documentElement.lang === 'en';
    const T = en ? {
      today: "Today's Panchang", vs: 'Vikram Samvat', paksha: 'Paksha', tithi: 'Tithi',
      nak: 'Nakshatra', yoga: 'Yoga', rise: 'Sunrise', set: 'Sunset', till: 'till',
      moon: 'Moon sign', good: 'Auspicious days this month', ask: 'Ask about this date',
      note: 'Calculated panchang (Delhi sunrise). Please cross-check with your local panchang before fixing a vrat date.',
      prev: 'Previous month', next: 'Next month', none: 'No special days this month.'
    } : {
      today: 'आज का पंचांग', vs: 'विक्रम संवत्', paksha: 'पक्ष', tithi: 'तिथि',
      nak: 'नक्षत्र', yoga: 'योग', rise: 'सूर्योदय', set: 'सूर्यास्त', till: 'तक',
      moon: 'चंद्र राशि', good: 'इस महीने के व्रत-पर्व', ask: 'इस तिथि की यात्रा पूछें',
      note: 'गणना से बना पंचांग (दिल्ली सूर्योदय)। व्रत की तारीख़ पक्की करने से पहले अपने स्थानीय पंचांग से मिला लें।',
      prev: 'पिछला महीना', next: 'अगला महीना', none: 'इस महीने कोई विशेष तिथि नहीं।'
    };

    const today = new Date(); today.setHours(12, 0, 0, 0);
    const p = forDate(today);
    const esc = s => String(s).replace(/[&<>"]/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    /* ── आज का कार्ड ── */
    const masaTxt = (en ? MASA_EN : MASA_HI)[p.masa] + (p.adhika ? (en ? ' (Adhika)' : ' (अधिक)') : '');
    const todayParv = parvOf(p, en);

    let html = `
      <div class="pan__today">
        <div class="pan__todayHead">
          <span class="pan__om">ॐ</span>
          <div>
            <b>${esc(fmtDate(today, en))}</b>
            <span>${T.vs} ${p.vsYear} · ${esc(masaTxt)} ${esc(pakshaName(p, en))} ${T.paksha}</span>
          </div>
        </div>
        <div class="pan__tithi">
          <strong>${esc(tithiName(p, en))}</strong>
          <em>${T.till} ${esc(fmtTime(p.tithiEnd, en))}</em>
        </div>
        <dl class="pan__dl">
          <div><dt>${T.nak}</dt><dd>${esc((en ? NAK_EN : NAK_HI)[p.nak])}</dd></div>
          <div><dt>${T.yoga}</dt><dd>${esc((en ? YOGA_EN : YOGA_HI)[p.yog])}</dd></div>
          <div><dt>${T.moon}</dt><dd>${esc((en ? RASHI_EN : RASHI_HI)[p.moonRashi])}</dd></div>
          <div><dt>${T.rise}</dt><dd>${esc(fmtTime(p.sunrise, en))}</dd></div>
          <div><dt>${T.set}</dt><dd>${esc(fmtTime(p.sunset, en))}</dd></div>
        </dl>
        ${todayParv.length ? `<p class="pan__parv">${todayParv.map(x => esc(x[0])).join(' · ')}</p>` : ''}
      </div>`;

    /* ── महीने का ग्रिड ── */
    const first = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
    const days = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
    const pad = first.getDay();
    const monthName = (en ? MAH_EN : MAH_HI)[first.getMonth()] + ' ' + first.getFullYear();

    /* ग्रिड में पूरा नाम नहीं समाता — "शु 13" जैसा छोटा रूप */
    const short = q => {
      if (q.tithiNum === 15) return q.paksha === 'S' ? (en ? 'Pur' : 'पू') : (en ? 'Ama' : 'अमा');
      return (q.paksha === 'S' ? (en ? 'S' : 'शु') : (en ? 'K' : 'कृ')) + ' ' + q.tithiNum;
    };

    const cells = [];
    const list = [];
    for (let i = 0; i < pad; i++) cells.push('<span class="pan__cell pan__cell--empty"></span>');
    for (let d = 1; d <= days; d++) {
      const dt = new Date(first.getFullYear(), first.getMonth(), d, 12);
      const q = forDate(dt);
      const parv = parvOf(q, en);
      const lvl = parv.length ? Math.min(...parv.map(x => x[1])) : 0;
      const isToday = dt.toDateString() === today.toDateString();
      cells.push(
        `<button type="button" class="pan__cell${isToday ? ' is-today' : ''}" data-d="${d}"
                 title="${esc(parv.map(x => x[0]).join(' · '))}">
           <b>${d}</b><i>${short(q)}</i>${lvl ? `<em class="pan__dot lvl${lvl}"></em>` : ''}
         </button>`);
      if (lvl && lvl <= 2) {
        list.push(`<li class="lvl${lvl}"><b>${d} ${esc((en ? MAH_EN : MAH_HI)[first.getMonth()])}</b>
          <span>${esc(parv.map(x => x[0]).join(' · '))}</span></li>`);
      }
    }

    const wd = en ? ['S','M','T','W','T','F','S'] : ['र','सो','मं','बु','गु','शु','श'];

    html += `
      <div class="pan__cal">
        <div class="pan__calHead">
          <button type="button" class="pan__nav" data-go="-1" aria-label="${T.prev}">&#8249;</button>
          <b>${esc(monthName)}</b>
          <button type="button" class="pan__nav" data-go="1" aria-label="${T.next}">&#8250;</button>
        </div>
        <div class="pan__wd">${wd.map(x => `<span>${x}</span>`).join('')}</div>
        <div class="pan__grid">${cells.join('')}</div>
        <div class="pan__pick" hidden></div>
      </div>
      <div class="pan__list">
        <h4>${T.good}</h4>
        <ul>${list.length ? list.join('') : `<li><span>${T.none}</span></li>`}</ul>
        <p class="pan__note">${T.note}</p>
      </div>`;

    host.innerHTML = html;

    /* किसी दिन पर क्लिक → उसका पूरा विवरण + WhatsApp लिंक */
    const pick = host.querySelector('.pan__pick');
    host.querySelectorAll('.pan__cell[data-d]').forEach(btn => {
      btn.addEventListener('click', () => {
        host.querySelectorAll('.pan__cell').forEach(c => c.classList.remove('is-sel'));
        btn.classList.add('is-sel');
        const dt = new Date(first.getFullYear(), first.getMonth(), +btn.dataset.d, 12);
        const q = forDate(dt);
        const parv = parvOf(q, en).map(x => x[0]);
        const wa = 'https://wa.me/' + (window.CONFIG ? CONFIG.whatsapp : '') + '?text=' +
          encodeURIComponent((en ? 'Jai Shri Shyam! ' : 'जय श्री श्याम! ') +
            fmtDate(dt, false) + (en ? ' — yatra available?' : ' को यात्रा की जानकारी चाहिए।'));
        pick.hidden = false;
        pick.innerHTML =
          `<b>${esc(fmtDate(dt, en))}</b>
           <span>${esc((en ? MASA_EN : MASA_HI)[q.masa])} ${esc(pakshaName(q, en))} ${esc(tithiName(q, en))} · ${esc((en ? NAK_EN : NAK_HI)[q.nak])}</span>
           ${parv.length ? `<span class="pan__pickParv">${esc(parv.join(' · '))}</span>` : ''}
           <a class="btn btn--sm btn--primary" href="${wa}" target="_blank" rel="noopener">💬 ${T.ask}</a>`;
      });
    });

    host.querySelectorAll('.pan__nav').forEach(b => {
      b.addEventListener('click', () => {
        const nx = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + (+b.dataset.go), 1);
        render(host, nx);
      });
    });
  }

  function init() {
    const host = document.getElementById('panchangBox');
    if (!host) return;                       // admin.html पर कैलेंडर नहीं चाहिए
    let shown = new Date();
    shown.setDate(1);
    render(host, shown);

    /* भाषा बदले तो कैलेंडर भी बदल जाए (i18n सिर्फ़ पक्के टेक्स्ट को छूता है) */
    new MutationObserver(() => render(host, shown))
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* admin.html और बाक़ी कोड के लिए */
  return { forDate, parvOf, summary, tithiName, pakshaName, fmtTime, fmtDate,
           MASA_HI, VAAR_HI, NAK_HI };
})();

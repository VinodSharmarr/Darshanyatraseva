/* ═══════════════════════════════════════════════════════════
   build-pandit.js, पंडित जी सेवा का पेज बनाता है  →  /pandit-ji

   क्यों बना (16 अगस्त 2026):
   Vinod ने temple.yatradham.org/pandit-ji दिखाकर वैसा पेज माँगा।
   वो एक बड़ा marketplace है (500+ पूजा, 100+ शहर, login, checkout)।
   हमारे यहाँ वो ढाँचा जान-बूझकर नहीं उतारा गया, क्योंकि:
     • हमारे पास न backend है न login (§8, इसीलिए hosting मुफ़्त है)
     • 500 पूजा गिनाना = वो 500 दावे, जो हम पूरे नहीं कर सकते (§4 नियम 4)
   जो लिया गया: पूजा की सूची, पंडित जी का परिचय, और साफ़ बुकिंग का रास्ता।
   बाक़ी सब हमारी अपनी साइट जैसा, WhatsApp पर बुकिंग।

   SEO की वजह (§17 वाला तर्क यहाँ भी):
   "दिल्ली में गृह प्रवेश के लिए पंडित", "सत्यनारायण कथा के लिए पंडित जी"
   जैसी खोज का साइट पर कोई दरवाज़ा नहीं था। यह पेज वही दरवाज़ा है, और
   यह GBP के इंतज़ार पर टिका नहीं है।

   🔴 चलाने का तरीक़ा:
       node build-pandit.js

   ⚠️ pandit-ji.html में हाथ से कुछ मत लिखना, यह script उसे हर बार
      मिटाकर दोबारा लिखता है। बदलाव नीचे कीजिए।

   ⚠️ §4 नियम 1: दक्षिणा या सामग्री का कोई अंक साइट पर मत लिखना।
   ⚠️ §4 नियम 5: लंबी डैश और छोटी डैश, दोनों नहीं। कॉमा/कोलन लगाइए।
   ⚠️ §4 नियम 2: अनुवाद यहीं t(हिन्दी, English) से बनता है, i18n.js में
      नहीं। नीचे checkTranslations अपने आप जाँच लेता है।

   ═══════════════════════════════════════════════════════════
   ✅ Vinod के जवाब आ गए (16 अगस्त 2026), पेज उसी हिसाब से बना है:

      1. सेवा देनी है                       → हाँ
      2. कितने दिन पहले बताना ज़रूरी है       → कम से कम 3 दिन
                                              (16 अगस्त 2026 को पक्का हुआ)
      3. सामग्री कौन लाता है                 → दोनों तरीक़े। परिवार ख़ुद लाए,
                                              या न ला पाए तो पंडित जी लाएँगे
      4. सेवा क्षेत्र                        → दिल्ली, नोएडा, गुड़गाँव,
                                              ग़ाज़ियाबाद, फ़रीदाबाद + चंडीगढ़,
                                              पंचकूला, कालका। बाक़ी भारत के
                                              लिए फ़ोन पर बात करके पक्का
      5. दक्षिणा पहले से तय होकर बताई जाएगी  → हाँ
      6. यात्रा के साथ धाम में पूजा           → हाँ, पर पहले पता करके पक्का
                                              करना पड़ता है (पेज पर यही
                                              लिखा है, सीधा वादा नहीं)
      7. बड़ी पूजा में एक से ज़्यादा पंडित जी  → हाँ

   🔴 अब भी एक चीज़ बाक़ी है: **पंडित जी की असली जानकारी**।
      नीचे PANDITS ख़ाली है, इसीलिए "हमारे पंडित जी" वाला हिस्सा पेज पर
      दिख ही नहीं रहा। जानकारी की सूची उसी जगह लिखी है।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.darshanyatraseva.com';
const SLUG = 'pandit-ji';
const V    = 22;                       // ?v= , §8 देखें
const TODAY = '2026-08-16';

/* ── छोटा सहायक: हिन्दी + अंग्रेज़ी एक साथ ── */
const t = (hi, en) => ({ hi, en });

/* ═══════════════════════════════════════════════════════════
   1. पेज का सिरा
   ═══════════════════════════════════════════════════════════ */
const HEAD = {
  title: t('दिल्ली में पूजा के लिए पंडित जी बुक करें | Darshan Yatra Seva',
           'Book a Pandit Ji for Puja in Delhi | Darshan Yatra Seva'),
  metaDesc: t('घर, दुकान या ऑफ़िस की पूजा के लिए दिल्ली, NCR और चंडीगढ़ तक अनुभवी पंडित जी। गृह प्रवेश, सत्यनारायण कथा, रुद्राभिषेक, मुंडन, नामकरण, नवग्रह शांति और श्राद्ध तर्पण। मुहूर्त निकालकर, सामग्री की सूची पहले से, बुकिंग WhatsApp पर।',
              'Experienced pandits for puja at home, shop or office, across Delhi, the NCR and up to Chandigarh. Griha Pravesh, Satyanarayan Katha, Rudrabhishek, Mundan, Namkaran, Navagraha Shanti and Shraddh Tarpan. Muhurat worked out, samagri list given in advance, booking over WhatsApp.'),

  eyebrow: t('दिल्ली, NCR और चंडीगढ़ तक पंडित जी की सेवा',
             'Pandit Ji seva across Delhi, the NCR and up to Chandigarh'),
  h1: t('पूजा के लिए पंडित जी बुक करें', 'Book a Pandit Ji for your Puja'),
  lede: t('घर की पूजा हो, दुकान की, या धाम में जाकर कराई जाने वाली, हम आपके लिए अनुभवी पंडित जी की व्यवस्था कर देते हैं। मुहूर्त निकलवाकर, सामग्री की सूची पहले से, और दक्षिणा पहले ही तय करके।',
          'Whether the puja is at home, at your shop, or performed at a dham, we arrange an experienced pandit for you. The muhurat is worked out, the samagri list is given in advance, and the dakshina is settled beforehand.'),

  wa: 'Jai Shri Shyam! Mujhe puja ke liye Pandit Ji chahiye. Poori jaankari bataayein.'
};

/* मुख्य आँकड़े। ⚠️ यहाँ कोई भी अंक ऐसा मत डालना जो गिना न जा सके।
   12 वही गिनती है जो नीचे POOJA की सूची में है, बढ़ाओ तो यहाँ भी बदलना। */
const FACTS = [
  { b: '12',                     s: t('तरह की पूजा और संस्कार', 'kinds of puja and sanskar') },
  { b: t('दिल्ली', 'Delhi'),      s: t('NCR और चंडीगढ़ तक', 'NCR and up to Chandigarh') },
  { b: t('मुहूर्त', 'Muhurat'),   s: t('तिथि देखकर', 'worked out from the tithi') },
  { b: t('घर पर', 'At home'),     s: t('या धाम में', 'or at the dham') }
];

const INTRO = t('बहुत से परिवारों की एक ही दिक़्क़त होती है: पूजा करानी है, पर भरोसेमंद पंडित जी कहाँ से मिलें, कितनी दक्षिणा लगेगी, और सामग्री में क्या क्या आएगा, कुछ पता नहीं होता। ऐन मौक़े पर किसी को पकड़ लाने से न विधि पूरी होती है, न मन को संतोष मिलता है। तीस वर्षों के सत्संग और यात्राओं में हमारा परिचय ऐसे पंडित जी से बना है जो विधि ठीक से कराते हैं और बात साफ़ रखते हैं। आप बस यह बता दीजिए कि कौन सी पूजा है और कब करानी है, बाक़ी व्यवस्था हमारी।',
                'Many families face the same problem: the puja has to be done, but where does one find a pandit who can be trusted, what dakshina will it come to, and what goes into the samagri, none of it is clear. Pulling in whoever is available at the last moment leaves neither the ritual complete nor the mind at peace. Over thirty years of satsang and yatras we have come to know pandits who perform the vidhi properly and keep matters transparent. You only need to tell us which puja and when, the rest is our arrangement.');

/* ═══════════════════════════════════════════════════════════
   2. कौन कौन सी पूजा

   ⚠️ नई पूजा जोड़ें तो ऊपर FACTS की गिनती (12) भी बदलिए।
   ⚠️ सिर्फ़ वही पूजा रखिए जो सच में करा सकते हैं। सूची लंबी करने का
      लालच मत कीजिए, एक भी पूजा ऐसी रह गई जो न हो पाए तो भरोसा जाता है।
   ═══════════════════════════════════════════════════════════ */
const POOJA = {
  head: t('कौन कौन सी पूजा कराई जाती है', 'Which pujas we arrange'),
  lede: t('नीचे वो पूजा और संस्कार हैं जो सबसे ज़्यादा कराए जाते हैं। सूची में आपकी पूजा न दिखे तो भी पूछ लीजिए, बहुत सी पूजा इनके आसपास की ही होती हैं।',
          'Below are the pujas and sanskars asked for most often. If yours is not on the list, ask anyway, many pujas are close relatives of these.'),
  list: [
    { ic: '🏠', h: t('गृह प्रवेश', 'Griha Pravesh'),
                p: t('नए घर या किराए के मकान में प्रवेश की पूजा, वास्तु शांति और हवन के साथ।',
                     'The entry puja for a new or rented home, with vastu shanti and havan.') },
    { ic: '📿', h: t('सत्यनारायण कथा', 'Satyanarayan Katha'),
                p: t('पाँचों अध्याय की कथा, हवन और प्रसाद। मान्यता है कि पूर्णिमा को इसका विशेष फल है।',
                     'The katha of all five chapters, with havan and prasad. It is believed to carry special merit on Purnima.') },
    { ic: '🕉️', h: t('रुद्राभिषेक', 'Rudrabhishek'),
                p: t('शिवलिंग पर जल, दूध, दही, घी, शहद और शक्कर से अभिषेक, रुद्री पाठ के साथ।',
                     'Abhishek of the Shivling with water, milk, curd, ghee, honey and sugar, along with the Rudri path.') },
    { ic: '✨', h: t('नवग्रह शांति', 'Navagraha Shanti'),
                p: t('कुंडली में जो ग्रह भारी पड़ रहा हो उसकी शांति, जाप और हवन।',
                     'Shanti, jaap and havan for whichever graha is weighing heavy in the kundali.') },
    { ic: '👶', h: t('नामकरण संस्कार', 'Namkaran Sanskar'),
                p: t('बच्चे के नामकरण की विधि, नक्षत्र के अक्षर के अनुसार नाम भी निकाल दिया जाता है।',
                     'The naming ceremony for a child, and the name syllable is worked out from the nakshatra as well.') },
    { ic: '✂️', h: t('मुंडन संस्कार', 'Mundan Sanskar'),
                p: t('घर पर या मंदिर में मुंडन की पूजा, शुभ तिथि निकालकर।',
                     'The mundan puja at home or at a temple, on a date worked out as auspicious.') },
    { ic: '🧵', h: t('जनेऊ, उपनयन संस्कार', 'Janeu, Upanayan Sanskar'),
                p: t('यज्ञोपवीत की पूरी विधि, गायत्री मंत्र की दीक्षा के साथ।',
                     'The full yagyopavit ritual, along with initiation into the Gayatri mantra.') },
    { ic: '💒', h: t('विवाह और सगाई', 'Vivah and Sagai'),
                p: t('सगाई, हल्दी, विवाह के फेरे और गृहस्थी की शुरुआत की पूजा।',
                     'Sagai, haldi, the wedding pheras and the puja that begins married life.') },
    { ic: '📖', h: t('भागवत कथा, अखंड रामायण', 'Bhagwat Katha, Akhand Ramayan'),
                p: t('घर या मंदिर में कथा और पाठ की व्यवस्था, पंडित जी और उनकी मंडली के साथ।',
                     'Katha and paath arranged at home or at a temple, with the pandit and his group.') },
    { ic: '🪔', h: t('नवरात्रि और दुर्गा पूजा', 'Navratri and Durga Puja'),
                p: t('कलश स्थापना, दुर्गा सप्तशती का पाठ, हवन और कन्या पूजन।',
                     'Kalash sthapana, the Durga Saptashati paath, havan and kanya pujan.') },
    { ic: '🌾', h: t('श्राद्ध और तर्पण', 'Shraddh and Tarpan'),
                p: t('पितृ पक्ष में श्राद्ध, तर्पण और पिंडदान की विधि, तिथि के अनुसार।',
                     'Shraddh, tarpan and pind daan during Pitru Paksha, according to the tithi.') },
    { ic: '🚗', h: t('वाहन और दुकान की पूजा', 'Vehicle and shop puja'),
                p: t('नई गाड़ी, नई दुकान, दफ़्तर या मशीन की पूजा, थोड़े समय में हो जाने वाली।',
                     'Puja for a new vehicle, shop, office or machine, done in a short sitting.') }
  ]
};

/* ═══════════════════════════════════════════════════════════
   3. पंडित जी का परिचय

   Vinod ने 16 अगस्त 2026 को मुख्य पंडित जी की जानकारी दी। जो बताया
   गया वही लिखा है, उसमें से कुछ भी अंदाज़े से नहीं बढ़ाया गया।

   ✅ मंदिर पक्का हो गया (16 अगस्त 2026): दिल्ली वाला कालका जी मंदिर
      नहीं, बल्कि **हरियाणा के कालका (ज़िला पंचकूला) का काली माता मंदिर**।
      पहले "Kalka Ji mandir" लिखा गया था जिससे दिल्ली वाला भ्रम हो रहा था,
      Vinod ने पूछने पर हरियाणा वाला बताया।

   🔴 एक बात अब भी बाक़ी है, push से पहले:

      "Master in Shastri" का क्या मतलब लिखें? परंपरा में शास्त्री
      स्नातक स्तर की उपाधि है और आचार्य स्नातकोत्तर (Master) की।
      अभी सीधा "शास्त्री (संस्कृत), दिल्ली से" लिखा है, कोई दावा
      बढ़ाया नहीं गया। अगर आचार्य की उपाधि है तो बता दीजिए, बदल देंगे।

   ⚠️ मंदिर का नाम और "सरकारी पुजारी" का पद, दोनों ऐसी बातें हैं जिन्हें
      कोई भी जाँच सकता है। इसलिए इन्हें कभी अंदाज़े से मत बदलना।

   🔴 तस्वीर: AI से बनी तस्वीर यहाँ नहीं लगाई गई। किसी असली, नाम वाले
      व्यक्ति की जगह बनावटी चेहरा लगाना यजमान को धोखा है (§4 नियम 4),
      और यात्री यह सोचकर बुलाएगा कि यही व्यक्ति आएगा। img: '' रहने पर
      कार्ड पर 🕉️ का चिह्न आ जाता है और कार्ड पूरा ठीक दिखता है।
      पंडित जी की अपनी तस्वीर (उनकी अनुमति से) मिलते ही यहाँ लगा दीजिए।

   आगे और पंडित जी जोड़ने हों तो इसी शक्ल में जोड़िए:
     name / role / place / pad / exp / shiksha / bhasha / img
   ═══════════════════════════════════════════════════════════ */
const PANDITS = [
  {
    name:  t('पंडित पम्पी जी', 'Pandit Pampi Ji'),
    role:  t('मुख्य पंडित जी', 'Head Pandit'),
    /* Vinod ने 16 अगस्त 2026 को पक्का किया: दिल्ली वाला कालका जी मंदिर
       नहीं, बल्कि हरियाणा के कालका (ज़िला पंचकूला) का काली माता मंदिर।
       ज़िले का नाम जान-बूझकर लिखा है, वरना लोग दिल्ली वाला समझ लेते हैं। */
    place: t('काली माता मंदिर, कालका, ज़िला पंचकूला, हरियाणा',
             'Kali Mata Mandir, Kalka, district Panchkula, Haryana'),
    /* 🔴 "पद: सरकारी पुजारी" 16 अगस्त 2026 को Vinod के कहने पर हटाया गया।
       वापस लगाना हो तो नीचे वाली लाइन से // हटा दीजिए, कार्ड में वो
       पंक्ति अपने आप लौट आएगी (row() ख़ाली field छोड़ देता है)। */
    // pad: t('सरकारी पुजारी', 'Government pujari'),
    exp:   t('15 वर्ष से अधिक', 'More than 15 years'),
    shiksha: t('शास्त्री (संस्कृत), दिल्ली से', 'Shastri in Sanskrit, from Delhi'),
    bhasha:  t('पूजा संस्कृत में, समझाना हिन्दी में', 'Puja in Sanskrit, explained in Hindi'),
    img:   ''            /* 🔴 ऊपर पढ़िए, AI वाली तस्वीर यहाँ नहीं लगेगी */
  }
];

const PANDIT_SEC = {
  head: t('हमारे मुख्य पंडित जी', 'Our head pandit'),
  lede: t('जो पंडित जी आपके यहाँ आएँगे, उनका परिचय पहले ही दे दिया जाता है।',
          'You are introduced to the pandit who will come to you, before he comes.'),
  /* ⚠️ कोलन जान-बूझकर शब्द के अंदर ही है। HTML में यह `<b>पद:</b>` बनता
     है, और अनुवाद की जाँच टैग के बीच का पूरा टुकड़ा उठाती है, यानी
     "पद:" कोलन समेत। कोलन बाहर लिखा तो मिलान टूट जाएगा (§4 नियम 2)। */
  padLbl:     t('पद:', 'Position:'),
  expLbl:     t('अनुभव:', 'Experience:'),
  shikshaLbl: t('शिक्षा:', 'Education:'),
  bhashaLbl:  t('भाषा:', 'Language:')
};

/* भूमिका और मंदिर एक ही पंक्ति में दिखते हैं, इसलिए उनका अनुवाद भी एक
   ही जोड़े में बनाना पड़ता है। जोड़-तोड़ से बनी हिन्दी लाइन का अनुवाद
   अपने आप नहीं मिलता, इसीलिए यह helper है। */
const subOf = p => t(`${p.role.hi}, ${p.place.hi}`, `${p.role.en}, ${p.place.en}`);

/* ═══════════════════════════════════════════════════════════
   4. बुकिंग कैसे होती है
   ═══════════════════════════════════════════════════════════ */
const STEPS = {
  head: t('बुकिंग कैसे होती है', 'How the booking works'),
  list: [
    { n: '1', h: t('WhatsApp पर बताइए', 'Tell us on WhatsApp'),
             p: t('कौन सी पूजा है, कब करानी है, और कहाँ। बस इतना काफ़ी है।',
                  'Which puja, when you want it, and where. That much is enough.') },
    { n: '2', h: t('मुहूर्त और व्यवस्था तय', 'Muhurat and arrangement settled'),
             p: t('शुभ समय, सामग्री की पूरी सूची और दक्षिणा, तीनों पहले ही बता दिए जाते हैं।',
                  'The auspicious time, the full samagri list and the dakshina, all three are told to you beforehand.') },
    { n: '3', h: t('पूजा के दिन', 'On the day of the puja'),
             p: t('पंडित जी समय से पहुँचते हैं और विधि हिन्दी में समझाते हुए पूरी कराते हैं।',
                  'The pandit arrives on time and performs the full vidhi, explaining it in Hindi as he goes.') }
  ]
};

/* ═══════════════════════════════════════════════════════════
   5. सेवा में क्या क्या रहता है

   ⚠️ यहाँ लिखी हर लाइन एक वादा है। ऊपर की 7 बातों में जिसका जवाब
      "नहीं" आए, उसकी लाइन यहाँ से हटा दीजिए।
   ═══════════════════════════════════════════════════════════ */
const SEVA = {
  head: t('सेवा में क्या क्या रहता है', 'What the seva covers'),
  list: [
    { ic: '🗓️', h: t('मुहूर्त निकालकर', 'The muhurat worked out'),
                p: t('पूजा का शुभ समय तिथि और नक्षत्र देखकर निकाला जाता है, अंग्रेज़ी तारीख़ से नहीं।',
                     'The auspicious time is worked out from the tithi and nakshatra, not from the English date.') },
    { ic: '📜', h: t('सामग्री, आप लाएँ या हम', 'Samagri, yours or ours'),
                p: t('पूरी सूची पहले ही लिखकर भेज दी जाती है। ख़ुद न ला पाएँ तो पंडित जी सामग्री साथ ले आते हैं।',
                     'The full list is sent to you in writing beforehand. If you cannot arrange it yourself, the pandit brings the samagri along.') },
    { ic: '🗣️', h: t('अर्थ समझाते हुए पूजा', 'Puja explained as it goes'),
                p: t('मंत्र संस्कृत में, पर हर विधि का अर्थ हिन्दी में समझाया जाता है।',
                     'The mantras are in Sanskrit, but the meaning of each step is explained in Hindi.') },
    { ic: '💬', h: t('दक्षिणा पहले तय', 'Dakshina settled in advance'),
                p: t('कितनी दक्षिणा है यह बुकिंग के समय ही बता दी जाती है, पूजा के बाद कोई और माँग नहीं।',
                     'The dakshina is stated at booking time. There is no further demand once the puja is done.') },
    { ic: '🚩', h: t('धाम में पूजा', 'Puja at the dham'),
                p: t('यात्रा के साथ खाटू, वृंदावन, मेहंदीपुर या सालासर में पूजा भी हो सकती है, पहले से पूछकर पक्का करना होता है।',
                     'A puja at Khatu, Vrindavan, Mehandipur or Salasar can be added to the yatra. It has to be checked and confirmed in advance.') },
    { ic: '👥', h: t('मंडली के साथ बड़ी पूजा', 'Larger pujas with a group'),
                p: t('भागवत कथा, अखंड रामायण या बड़े हवन में एक से ज़्यादा पंडित जी की व्यवस्था।',
                     'For Bhagwat Katha, Akhand Ramayan or a large havan, more than one pandit is arranged.') }
  ],
  note: t('शामिल नहीं: पूजा की सामग्री, फूल, फल और प्रसाद का ख़र्च, और मंदिर का अपना कोई शुल्क।',
          'Not included: the cost of samagri, flowers, fruit and prasad, and any fee charged by the temple itself.')
};

/* ═══════════════════════════════════════════════════════════
   6. पूजा से पहले ध्यान रखने वाली बातें
   ═══════════════════════════════════════════════════════════ */
const TIPS = {
  head: t('पूजा कराने से पहले यह जान लीजिए', 'Worth knowing before you book a puja'),
  list: [
    t('मुहूर्त तिथि से तय होता है, अंग्रेज़ी तारीख़ से नहीं। इसलिए जो तारीख़ आपको सोच रखी है, उस दिन की तिथि पहले देख लीजिए',
      'The muhurat is fixed by the tithi, not by the English date. So look up the tithi of whichever date you have in mind first'),
    t('ज़्यादातर पूजा सुबह के मुहूर्त में होती हैं, इसलिए सामग्री एक दिन पहले शाम तक जमा कर लीजिए',
      'Most pujas fall in a morning muhurat, so gather the samagri by the evening before'),
    t('गृह प्रवेश, नामकरण और जनेऊ जैसी विधियों में परिवार के कुछ सदस्यों का बैठना ज़रूरी होता है, उन्हें पहले से बता दीजिए',
      'Rituals such as Griha Pravesh, Namkaran and Janeu require certain family members to be seated, so tell them in advance'),
    t('श्राद्ध और तर्पण पितृ पक्ष की उसी तिथि से बँधे होते हैं जिस तिथि को देहावसान हुआ था, वो तिथि पहले से मालूम कर लीजिए',
      'Shraddh and tarpan are tied to the same Pitru Paksha tithi on which the person passed away, so find that tithi out beforehand'),
    t('कम से कम 3 दिन पहले बता दीजिए, इतने समय में मुहूर्त और सामग्री दोनों की व्यवस्था आराम से बन जाती है। नवरात्रि, दीपावली और पितृ पक्ष में पंडित जी का समय जल्दी भर जाता है, उन दिनों के लिए और पहले पूछिए',
      'Tell us at least 3 days ahead, which is enough time to settle both the muhurat and the samagri without a rush. During Navratri, Diwali and Pitru Paksha a pandit\'s calendar fills up quickly, so ask even earlier for those days')
  ]
};

/* ═══════════════════════════════════════════════════════════
   7. सवाल जवाब
   ⚠️ §4 नियम 1: किसी जवाब में दक्षिणा या सामग्री का अंक मत लिखना।
   ═══════════════════════════════════════════════════════════ */
const FAQ = [
  { q: t('दिल्ली में पूजा के लिए पंडित जी कैसे बुक करें?',
         'How do I book a pandit for a puja in Delhi?'),
    a: t('हमें WhatsApp पर बता दीजिए कि कौन सी पूजा है, किस दिन करानी है और जगह कहाँ है। हम मुहूर्त, सामग्री की सूची और दक्षिणा, तीनों बताकर बुकिंग पक्की कर देते हैं। न कोई फ़ॉर्म भरना पड़ता है, न कोई अकाउंट बनाना।',
         'Send us a message on WhatsApp saying which puja it is, on what day, and where. We confirm the booking after telling you the muhurat, the samagri list and the dakshina. There is no form to fill and no account to create.') },

  { q: t('कितने दिन पहले बताना पड़ता है?', 'How far in advance do I need to tell you?'),
    a: t('कम से कम 3 दिन पहले। इतने समय में मुहूर्त ठीक से निकल जाता है, सामग्री की सूची आप तक पहुँच जाती है और पंडित जी का दिन पक्का हो जाता है। गृह प्रवेश, विवाह और भागवत कथा जैसी बड़ी विधियों के लिए इससे भी ज़्यादा समय रखिए। नवरात्रि, दीपावली और पितृ पक्ष में पंडित जी का समय सबसे जल्दी भरता है, उन दिनों के लिए हफ़्तों पहले पूछ लीजिए।',
         'At least 3 days. That is enough time to work out the muhurat properly, get the samagri list to you, and block the pandit\'s day. For larger rituals such as Griha Pravesh, weddings and Bhagwat Katha, allow more than that. A pandit\'s calendar fills fastest during Navratri, Diwali and Pitru Paksha, so ask weeks ahead for those days.') },

  { q: t('पूजा की सामग्री कौन लाता है?', 'Who brings the puja samagri?'),
    a: t('दोनों तरीक़े चलते हैं, जो आपको ठीक लगे। सामग्री की पूरी सूची हम पहले ही लिखकर भेज देते हैं, बहुत से परिवार वो अपने पास के बाज़ार से मँगा लेते हैं, इसमें ख़र्च कम पड़ता है और सामान ताज़ा मिलता है। समय न हो या बाज़ार दूर पड़ता हो तो बुकिंग के समय बता दीजिए, पंडित जी सामग्री अपने साथ ले आएँगे और उसका ख़र्च अलग से बता दिया जाएगा।',
         'Either way works, whichever suits you. We send you the complete samagri list in writing beforehand, and many families buy it from their own local market, which costs less and gets fresher material. If you are short of time or the market is far, tell us at booking time and the pandit brings the samagri with him, with that cost stated to you separately.') },

  { q: t('दक्षिणा कितनी होती है?', 'How much is the dakshina?'),
    a: t('यह पूजा पर निर्भर करता है। वाहन की पूजा और भागवत कथा, दोनों एक जैसी नहीं हो सकतीं, इसलिए हम कोई एक दाम साइट पर नहीं लिखते। आप जो पूजा करानी है वो बता दीजिए, दक्षिणा WhatsApp पर उसी समय बता दी जाएगी। जो एक बार तय हो गया, पूजा के बाद उससे ज़्यादा नहीं माँगा जाता।',
         'It depends on the puja. A vehicle puja and a Bhagwat Katha cannot carry the same figure, which is why we do not publish a single price on the site. Tell us which puja you want and the dakshina is stated on WhatsApp there and then. Once it is settled, nothing more is asked after the puja.') },

  { q: t('क्या पंडित जी हिन्दी में अर्थ भी समझाते हैं?',
         'Does the pandit explain the meaning in Hindi?'),
    a: t('जी हाँ। मंत्र संस्कृत में ही पढ़े जाते हैं, पर हर विधि क्यों की जा रही है यह साथ साथ हिन्दी में बताया जाता है। बहुत से परिवार यही कहते हैं कि इसी वजह से पूजा में मन लगा रहा।',
         'Yes. The mantras are recited in Sanskrit, but why each step is being performed is explained alongside in Hindi. Many families say this is what kept them attentive through the puja.') },

  { q: t('मुहूर्त कैसे तय होता है?', 'How is the muhurat decided?'),
    a: t('तिथि, नक्षत्र और उस दिन के योग देखकर। हमारी साइट पर पंचांग का अपना पेज है, वहाँ आज की तिथि, पूरे महीने का कैलेंडर और आगे आने वाले व्रत त्योहार देखे जा सकते हैं। पक्का मुहूर्त पंडित जी ही निकालकर देते हैं।',
         'From the tithi, the nakshatra and the yoga of that day. Our site has its own panchang page where you can see today\'s tithi, the full month calendar and the upcoming vrats and festivals. The final muhurat is worked out by the pandit himself.') },

  { q: t('क्या यात्रा के साथ धाम में भी पूजा हो सकती है?',
         'Can a puja be done at the dham along with the yatra?'),
    a: t('जी हाँ, यह हो सकता है, और यही हमारा अपना काम भी है। खाटू श्याम जी, वृंदावन, मेहंदीपुर बालाजी या सालासर धाम में कोई पूजा या अनुष्ठान कराना हो तो बुकिंग के समय ही बता दीजिए। ⚠️ इसमें एक बात ध्यान रखिए: हर पूजा हर धाम में उसी दिन नहीं हो पाती, वहाँ के मंदिर और पंडित जी दोनों का समय देखना पड़ता है। इसलिए हम पहले पता करके पक्का बताते हैं, तभी हाँ कहते हैं।',
         'Yes, this can be done, and it is our own line of work. If you want a puja or anushthan at Khatu Shyam Ji, Vrindavan, Mehandipur Balaji or Salasar Dham, tell us right at booking time. ⚠️ One thing to keep in mind: not every puja can be done at every dham on the same day, as both the temple\'s schedule and the pandit\'s have to line up. So we check first and confirm, and only then say yes.') },

  { q: t('क्या दिल्ली से बाहर भी पंडित जी भेजे जाते हैं?',
         'Do you send pandits outside Delhi?'),
    a: t('जी हाँ। दिल्ली, नोएडा, गुड़गाँव, ग़ाज़ियाबाद और फ़रीदाबाद में व्यवस्था आसानी से हो जाती है। इसके अलावा चंडीगढ़, पंचकूला और कालका तक भी पंडित जी भेजे जाते हैं। भारत के किसी और हिस्से के लिए एक बार फ़ोन पर बात कर लीजिए, दूरी, तिथि और आने जाने का समय देखकर पक्का बताया जाएगा। जो न हो सकता हो, हम साफ़ मना कर देते हैं।',
         'Yes. Delhi, Noida, Gurugram, Ghaziabad and Faridabad are arranged easily. Beyond that we also send pandits to Chandigarh, Panchkula and Kalka. For anywhere else in India, have a word with us on the phone and we will confirm after considering the distance, the date and the travel time. If something cannot be done, we say so plainly.') }
];

/* ═══════════════════════════════════════════════════════════
   8. सब जगह एक जैसे शब्द
   ═══════════════════════════════════════════════════════════ */
const TERMS = {
  head: t('बदलने और रद्द करने के नियम', 'Rescheduling and cancellation'),
  body: t('तिथि बदलनी हो तो जितना पहले बता दें, उतनी आसानी से बदल जाती है। पूजा के दिन से एक दिन पहले तक बदलने पर कोई शुल्क नहीं। ऐन दिन पर रद्द करने से पंडित जी का वो पूरा दिन ख़ाली चला जाता है, इसलिए ऐसा न करना पड़े यही कोशिश रखिए। कोई अनहोनी हो जाए तो बता दीजिए, हम आपके साथ हैं।',
          'A date can be changed easily if you tell us early enough. There is no charge for a change made up to the day before the puja. Cancelling on the day itself costs the pandit his whole day, so please try to avoid it. If something unforeseen happens, tell us, we are with you.')
};

const LABELS = {
  faqHead:   t('पूछे जाने वाले सवाल', 'Questions people ask'),
  askOffer:  t('💬 अपनी पूजा के लिए संपर्क करें', '💬 Contact us about your puja'),
  book:      t('बुक करें', 'Book now'),
  poojaPage: t('📖 हर पूजा का महत्व और विधि पढ़ें', '📖 Read the significance and method of each puja'),
  panchang:  t('🗓️ मुहूर्त के लिए पूरा पंचांग देखें', '🗓️ See the full panchang for the muhurat'),
  katha:     t('📖 सातों धामों की कथा और पूजा की विधि पढ़ें', '📖 Read the story and puja method of all seven dhams'),
  allYatras: t('🚩 चारों यात्राएँ और आगामी प्रस्थान देखें', '🚩 See all four yatras and upcoming departures'),
  home:      t('← मुख्य पेज', '← Home'),
  ctaHead:   t('पूजा की तिथि सोच रखी है? 🙏', 'Have a date in mind for the puja? 🙏'),
  ctaSub:    t('बस पूजा का नाम और दिन बता दीजिए, बाक़ी व्यवस्था हमारी।',
               'Just tell us the puja and the day, the rest of the arrangement is ours.'),
  ctaWa:     t('WhatsApp करें', 'Message on WhatsApp'),
  topbar:    t('जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा', 'Jai Shri Shyam, weekly yatras'),
  rights:    t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')
};

/* ═══════════════════════════════════════════════════════════
   HTML बनाने वाले हिस्से
   ═══════════════════════════════════════════════════════════ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const wa = txt => `https://wa.me/917289902692?text=${encodeURIComponent(txt)}`;

/* 🔴 सेक्शन के background की अदला बदली अपने आप।
   क्रीम और हल्का क्रीम, एक के बाद एक। हाथ से sec--alt लिखने पर गड़बड़
   हो जाती: "हमारे पंडित जी" वाला हिस्सा PANDITS ख़ाली होने पर ग़ायब हो
   जाता है, और तब उसके आगे पीछे वाले दो सेक्शन एक ही रंग के पड़ जाते।
   इसलिए गिनती यह function रखता है, हर पेज बनने से पहले sec0() से शून्य। */
let _sec = 0;
const sec0  = () => { _sec = 0; };
const secCl = () => (_sec++ % 2 ? 'sec sec--alt' : 'sec');

/* हर hi/en जोड़े से अनुवाद की सूची बनती है, इसलिए मिलान कभी टूट नहीं सकता */
function collectEN() {
  const out = {};
  const add = o => { if (o && o.hi && o.en && o.hi !== o.en) out[o.hi] = o.en; };

  add(HEAD.title); add(HEAD.eyebrow); add(HEAD.h1); add(HEAD.lede); add(INTRO);
  FACTS.forEach(f => { add(f.s); if (typeof f.b === 'object') add(f.b); });
  add(POOJA.head); add(POOJA.lede);
  POOJA.list.forEach(p => { add(p.h); add(p.p); });
  Object.values(PANDIT_SEC).forEach(add);
  PANDITS.forEach(p => {
    add(p.name); add(subOf(p));
    add(p.pad); add(p.exp); add(p.shiksha); add(p.bhasha);
  });
  add(STEPS.head); STEPS.list.forEach(s => { add(s.h); add(s.p); });
  add(SEVA.head); SEVA.list.forEach(s => { add(s.h); add(s.p); }); add(SEVA.note);
  add(TIPS.head); TIPS.list.forEach(add);
  FAQ.forEach(f => { add(f.q); add(f.a); });
  add(TERMS.head); add(TERMS.body);
  Object.values(LABELS).forEach(add);
  return out;
}

const factsHTML = () => FACTS.map(f => {
  const b = typeof f.b === 'object' ? esc(f.b.hi) : esc(f.b);
  return `      <div><b>${b}</b><span>${esc(f.s.hi)}</span></div>`;
}).join('\n');

const poojaHTML = () => POOJA.list.map(p =>
  `      <div class="feat"><span class="feat__ic">${p.ic}</span><h3>${esc(p.h.hi)}</h3><p>${esc(p.p.hi)}</p></div>`
).join('\n');

const sevaHTML = () => SEVA.list.map(s =>
  `      <div class="feat"><span class="feat__ic">${s.ic}</span><h3>${esc(s.h.hi)}</h3><p>${esc(s.p.hi)}</p></div>`
).join('\n');

const stepsHTML = () => STEPS.list.map(s =>
  `      <div class="step"><span class="step__n">${esc(s.n)}</span><h3>${esc(s.h.hi)}</h3><p>${esc(s.p.hi)}</p></div>`
).join('\n');

const tipsHTML = () => TIPS.list.map(x => `        <li>${esc(x.hi)}</li>`).join('\n');

const faqHTML = () => FAQ.map(f =>
  `      <details><summary>${esc(f.q.hi)}</summary><p>${esc(f.a.hi)}</p></details>`
).join('\n');

/* पंडित जी वाला हिस्सा, सूची ख़ाली हो तो पूरा ग़ायब */
function panditHTML() {
  if (!PANDITS.length) return '';
  const cards = PANDITS.map(p => {
    /* तस्वीर न हो तो 🕉️ का चिह्न, कार्ड तब भी पूरा ठीक दिखता है */
    const pic = p.img
      ? `<img class="feat__pic" src="${esc(p.img)}?v=2" alt="${esc(p.name.hi)}" width="600" height="600" loading="lazy" decoding="async" />`
      : '<span class="feat__ic">🕉️</span>';
    /* कोलन label के अंदर ही है (PANDIT_SEC देखिए), यहाँ मत जोड़िए */
    const row = (lbl, val) => val
      ? `\n        <p><b>${esc(lbl.hi)}</b> ${esc(val.hi)}</p>` : '';
    return `      <div class="feat">${pic}
        <h3>${esc(p.name.hi)}</h3>
        <p>${esc(subOf(p).hi)}</p>${
        row(PANDIT_SEC.padLbl, p.pad)}${
        row(PANDIT_SEC.expLbl, p.exp)}${
        row(PANDIT_SEC.shikshaLbl, p.shiksha)}${
        row(PANDIT_SEC.bhashaLbl, p.bhasha)}
      </div>`;
  }).join('\n');

  /* एक ही पंडित जी हों तो कार्ड को पूरी चौड़ाई में मत फैलाओ, वो खिंचा
     हुआ लगता है। तब पट्टी संकरी रखते हैं। */
  const wrapCl = PANDITS.length === 1 ? 'wrap wrap--narrow' : 'wrap';

  return `
<!-- ══ पंडित जी का परिचय ══ -->
<section class="${secCl()}">
  <div class="${wrapCl}">
    <h2 class="sec__title">${esc(PANDIT_SEC.head.hi)}</h2>
    <p class="sec__lede">${esc(PANDIT_SEC.lede.hi)}</p>
    <div class="feats slider is-open">
${cards}
    </div>
  </div>
</section>
`;
}

/* ── schema, Service + FAQPage + BreadcrumbList + TravelAgency ── */
function schema() {
  const url = `${SITE}/${SLUG}`;
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: HEAD.h1.hi,
    alternateName: 'Pandit Ji booking in Delhi NCR',
    serviceType: 'Hindu priest (Pandit) booking for puja',
    description: HEAD.metaDesc.hi,
    url,
    inLanguage: 'hi-IN',
    provider: { '@id': `${SITE}/#business` },
    /* Vinod ने 16 अगस्त 2026 को यही क्षेत्र बताया। बाक़ी भारत के लिए
       "फ़ोन पर बात करके" वाला रास्ता है, वो schema में नहीं डाला जा सकता
       क्योंकि वो हर जगह के लिए पक्का वादा नहीं है। */
    areaServed: ['Delhi', 'Noida', 'Gurugram', 'Ghaziabad', 'Faridabad',
                 'Chandigarh', 'Panchkula', 'Kalka']
      .map(n => ({ '@type': 'City', name: n })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: '+917289902692'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: POOJA.head.hi,
      itemListElement: POOJA.list.map(p => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.h.hi, description: p.p.hi }
      }))
    }
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({
      '@type': 'Question',
      name: f.q.hi,
      acceptedAnswer: { '@type': 'Answer', text: f.a.hi }
    }))
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'मुख्य पेज', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: HEAD.h1.hi, item: url }
    ]
  };
  const biz = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE}/#business`,
    name: 'Darshan Yatra Seva',
    alternateName: 'दर्शन यात्रा सेवा',
    url: `${SITE}/`,
    telephone: '+917289902692',
    logo: `${SITE}/brand/logo-icon.png`
  };
  return [service, faq, crumbs, biz]
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
}

/* ── पूरा पेज ── */
function page() {
  const url = `${SITE}/${SLUG}`;
  const EN  = collectEN();
  sec0();                     /* background की गिनती हर बार शून्य से */

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(HEAD.title.hi)}</title>
<meta name="description" content="${esc(HEAD.metaDesc.hi)}" />
<meta name="theme-color" content="#7B1E22" />
<link rel="canonical" href="${url}" />

<meta property="og:title" content="${esc(HEAD.h1.hi)}" />
<meta property="og:description" content="${esc(HEAD.metaDesc.hi)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="Darshan Yatra Seva" />
<meta property="og:locale" content="hi_IN" />
<meta property="og:image" content="${SITE}/brand/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="brand/logo-icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="brand/logo-icon.png" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Tiro+Devanagari+Hindi:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

<link rel="stylesheet" href="styles.css?v=${V}" />

<!-- ⚠️ यह फ़ाइल build-pandit.js से बनी है, हाथ से मत बदलिए -->
${schema()}
</head>
<body>

<!-- ══ TOP BAR ══ -->
<div class="topbar">
  <div class="wrap topbar__in">
    <span class="topbar__om">ॐ</span>
    <span>${esc(LABELS.topbar.hi)}</span>
    <a class="topbar__tel" href="tel:+917289902692">📞 +91 72899 02692</a>
  </div>
</div>

<!-- ══ HEADER ══ -->
<header class="nav is-stuck" id="nav">
  <div class="wrap nav__in">
    <a class="brand" href="/">
      <svg class="brand__mark" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="95" fill="#7B1E22"/>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#D9A441" stroke-width="4.5"/>
        <circle cx="100" cy="29" r="4.5" fill="#D9A441"/>
        <path d="M100 38 C110 62 120 86 124 110 L76 110 C80 86 90 62 100 38 Z" fill="#D9A441"/>
        <rect x="68" y="110" width="64" height="7" rx="1.5" fill="#C0872E"/>
        <rect x="74" y="117" width="52" height="28" fill="#D9A441"/>
        <path d="M90 145 L90 132 A10 10 0 0 1 110 132 L110 145 Z" fill="#7B1E22"/>
        <rect x="62" y="145" width="76" height="8" rx="2" fill="#D9A441"/>
        <rect x="56" y="153" width="88" height="5" rx="2" fill="#C0872E"/>
        <path d="M58 172 Q100 158 142 172" stroke="#E9531F" stroke-width="7" fill="none" stroke-linecap="round"/>
      </svg>
      <span class="brand__txt">
        <strong>Darshan Yatra Seva</strong>
        <em>दर्शन यात्रा सेवा</em>
      </span>
    </a>

    <nav class="nav__links katha__nav">
      <a href="/">${esc(LABELS.home.hi)}</a>
      <a class="btn btn--sm btn--primary" href="/#book">${esc(LABELS.book.hi)}</a>
    </nav>

    <button class="langbtn" id="langBtn" type="button" aria-label="View in English">English</button>
  </div>
</header>

<!-- ══ शीर्षक ══ -->
<section class="katha__hero">
  <div class="wrap">
    <p class="eyebrow center">${esc(HEAD.eyebrow.hi)}</p>
    <h1 class="sec__title">${esc(HEAD.h1.hi)}</h1>
    <p class="sec__lede">${esc(HEAD.lede.hi)}</p>
  </div>
</section>

<!-- ══ मुख्य बातें ══ -->
<section class="trust">
  <div class="wrap trust__grid">
${factsHTML()}
  </div>
</section>

<!-- ══ परिचय ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <p class="ypage__intro">${esc(INTRO.hi)}</p>

    <div class="ypage__buy">
      <a class="price__ask" href="${wa(HEAD.wa)}" target="_blank" rel="noopener">${esc(LABELS.askOffer.hi)}</a>
    </div>
  </div>
</section>

<!-- ══ कौन सी पूजा ══ -->
<section class="${secCl()}">
  <div class="wrap">
    <h2 class="sec__title">${esc(POOJA.head.hi)}</h2>
    <p class="sec__lede">${esc(POOJA.lede.hi)}</p>
    <div class="feats slider is-open">
${poojaHTML()}
    </div>
    <!-- हर पूजा का पूरा विवरण /pooja-vidhi पर है (§19)। यहाँ एक ही बटन
         रखा गया है, हर कार्ड पर अलग लिंक नहीं: वो 12 लिंक 44px से छोटे
         पड़ते और §16 का नियम टूटता। -->
    <p class="katha__allWrap"><a class="btn btn--outline" href="/pooja-vidhi">${esc(LABELS.poojaPage.hi)}</a></p>
  </div>
</section>
${panditHTML()}
<!-- ══ बुकिंग कैसे ══ -->
<section class="${secCl()}">
  <div class="wrap">
    <h2 class="sec__title">${esc(STEPS.head.hi)}</h2>
    <div class="steps slider is-open">
${stepsHTML()}
    </div>
  </div>
</section>

<!-- ══ सेवा में क्या ══ -->
<section class="${secCl()}">
  <div class="wrap">
    <h2 class="sec__title">${esc(SEVA.head.hi)}</h2>
    <div class="feats slider is-open">
${sevaHTML()}
    </div>
    <p class="note ypage__note">${esc(SEVA.note.hi)}</p>
  </div>
</section>

<!-- ══ ध्यान रखने वाली बातें ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(TIPS.head.hi)}</h2>
    <ul class="kfull__list kfull__list--dhyan ypage__tips">
${tipsHTML()}
    </ul>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/panchang">${esc(LABELS.panchang.hi)}</a></p>
  </div>
</section>

<!-- ══ सवाल जवाब ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LABELS.faqHead.hi)}</h2>
    <div class="faq">
${faqHTML()}
    </div>
  </div>
</section>

<!-- ══ नियम ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(TERMS.head.hi)}</h2>
    <p class="ypage__intro">${esc(TERMS.body.hi)}</p>
  </div>
</section>

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/katha">${esc(LABELS.katha.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/#yatras">${esc(LABELS.allYatras.hi)}</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(LABELS.ctaHead.hi)}</h2>
    <p>${esc(LABELS.ctaSub.hi)}</p>
    <div class="cta__btns">
      <a class="btn btn--ghostlight btn--lg" href="${wa(HEAD.wa)}" target="_blank" rel="noopener">${esc(LABELS.ctaWa.hi)}</a>
    </div>
  </div>
</section>

<!-- ══ FOOTER ══ -->
<footer class="foot">
  <div class="wrap foot__bar">
    <span>© <span id="yr"></span> Darshan Yatra Seva. ${esc(LABELS.rights.hi)}</span>
    <span class="foot__om">🙏 जय श्री श्याम</span>
  </div>
</footer>

<!-- floating whatsapp -->
<a class="fab" href="${wa(HEAD.wa)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 015.5 16c0-5.8 4.7-10.5 10.5-10.5S26.5 10.2 26.5 16 21.8 26.6 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.6 8.6 0 01-2.5-1.6 9.6 9.6 0 01-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5c0-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
</a>

<!-- इस पेज का अनुवाद, build-pandit.js से बना। i18n.js इसे उठा लेती है। -->
<script>
window.EN_EXTRA = ${JSON.stringify(EN, null, 2)};
</script>

<script src="config.js?v=${V}"></script>
<script src="i18n.js?v=${V}"></script>
<script>
  /* फुटर का वर्ष, इस पेज पर script.js नहीं चलता (वो मुख्य पेज के लिए है) */
  document.getElementById('yr').textContent = new Date().getFullYear();
  /* नंबर/लिंक config.js से */
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
    const q = a.href.split('?')[1];
    a.href = 'https://wa.me/' + CONFIG.whatsapp + (q ? '?' + q : '');
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.href = 'tel:+' + CONFIG.whatsapp;
    if (/\\+91[\\d\\s]{8,}/.test(a.textContent)) a.textContent = a.textContent.replace(/\\+91[\\d\\s]+/, CONFIG.phone);
  });
</script>
</body>
</html>
`;
}

/* ═══════════════════════════════════════════════════════════
   🔴 अनुवाद की अपने आप जाँच (§4 नियम 2)
   बनी हुई HTML में जो भी हिन्दी लाइन दिखती है, उसका अनुवाद होना ही
   चाहिए, या तो इसी पेज के EN_EXTRA में या i18n.js में।
   ═══════════════════════════════════════════════════════════ */
function i18nKeys() {
  const src = fs.readFileSync(path.join(__dirname, 'i18n.js'), 'utf8');
  const from = src.indexOf('const EN = {');
  const to   = src.indexOf('\n};', from);
  if (from < 0 || to < 0) throw new Error('i18n.js में EN नहीं मिला');
  const obj = new Function('return (' + src.slice(from + 'const EN = '.length, to + 2) + ')')();
  return new Set(Object.keys(obj));
}

/* जान-बूझकर बिना अनुवाद वाली चीज़ें (ॐ, ब्रांड का नाम, भाषा वाला बटन) */
const ALLOW = new Set(['ॐ', 'दर्शन यात्रा सेवा', '🙏 जय श्री श्याम', 'हिंदी', 'English']);

function checkTranslations(html, EN, known) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const missing = [];
  for (let chunk of body.split(/<[^>]+>/)) {
    chunk = chunk.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
                 .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
    if (!chunk || !/[ऀ-ॿ]/.test(chunk)) continue;
    if (ALLOW.has(chunk) || EN[chunk] || known.has(chunk)) continue;
    if (!missing.includes(chunk)) missing.push(chunk);
  }
  if (missing.length) {
    console.error(`\n  ❌ ${SLUG}.html: ${missing.length} लाइनों का अनुवाद नहीं है`);
    missing.forEach(m => console.error('     ' + m.slice(0, 80)));
    console.error('\n  इन्हें build-pandit.js में t(हिन्दी, English) से लिखिए, फिर दोबारा चलाइए।\n');
    process.exit(1);
  }
}

/* 🔴 एक और जाँच: §4 नियम 5, लंबी और छोटी डैश साइट पर कहीं नहीं */
function checkDash(html) {
  const bad = (html.match(/[—–]/g) || []).length;
  if (bad) {
    console.error(`\n  ❌ ${SLUG}.html में ${bad} डैश मिले (§4 नियम 5)। कॉमा या कोलन लगाइए।\n`);
    process.exit(1);
  }
}

/* ═══════════════════════════════════════════════════════════
   लिखो
   ═══════════════════════════════════════════════════════════ */
const html = page();
checkTranslations(html, collectEN(), i18nKeys());
checkDash(html);
fs.writeFileSync(path.join(__dirname, SLUG + '.html'), html, 'utf8');

const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                  .replace(/<[^>]+>/g, ' ')
                  .split(/\s+/).filter(Boolean).length;

console.log(`  ✅ ${SLUG}.html   (${words} शब्द Googlebot को दिखते हैं)`);
if (!PANDITS.length) {
  console.log('  ⚠️  PANDITS ख़ाली है, इसलिए "हमारे पंडित जी" वाला हिस्सा पेज पर नहीं है।');
  console.log('      Vinod से असली जानकारी लेकर build-pandit.js में भरिए (फ़ाइल के ऊपर सूची लिखी है)।');
}
console.log(`  ℹ️  sitemap.xml build-yatra.js से बनती है, वहाँ ${SLUG} पहले से जुड़ा है।`);

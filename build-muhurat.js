/* ═══════════════════════════════════════════════════════════
   build-muhurat.js, शुभ मुहूर्त वाले पेज बनाता है

   बने (16 अगस्त 2026): PAGES-PLAN.md का दर्जा 1, पेज 13 और 15।
   ये दोनों सीधे /pandit-ji की बुकिंग से जुड़ते हैं: जो आदमी
   "गृह प्रवेश का मुहूर्त" खोज रहा है, उसे पंडित जी भी चाहिए।

       /griha-pravesh-muhurat
       /mundan-muhurat

   🔴 विवाह मुहूर्त का पेज जान-बूझकर नहीं बनाया गया, नीचे पढ़िए।

   🔴 चलाने का तरीक़ा:
       node build-muhurat.js

   ⚠️ बनी हुई .html फ़ाइलों में हाथ से कुछ मत लिखना।
   ⚠️ यह सूची "आज से अगले 365 दिन" की है, इसलिए समय के साथ पुरानी पड़
      जाती है। §9 वाले build-panchang.js की तरह इसे भी हर deploy से
      पहले चलाइए, वरना Google को बीत चुकी तारीख़ें दिखती रहेंगी।

   ═══════════════════════════════════════════════════════════
   🔴 विवाह मुहूर्त का पेज क्यों नहीं बना, यह ज़रूर पढ़िए

   असली विवाह मुहूर्त निकालने के लिए **गुरु (बृहस्पति) और शुक्र का
   अस्त** देखना पड़ता है। जब ये ग्रह सूर्य के बहुत पास आ जाते हैं तो
   महीनों तक विवाह नहीं होते, और हर साल की विवाह सूची इसी पर टिकी होती है।

   हमारा `panchang.js` सिर्फ़ **सूर्य और चंद्र** की गणना करता है (§9),
   गुरु और शुक्र की नहीं। यानी हम जो सूची छापते, वो हर छपे हुए पंचांग
   से अलग निकलती।

   ⚠️ शादी की तारीख़ ऐसी चीज़ है जिस पर पूरा परिवार महीनों का ख़र्च और
      इंतज़ाम टिका देता है। उसमें ग़लत तारीख़ छापना बाक़ी किसी ग़लती से
      बहुत बड़ा नुक़सान है। इसलिए वो पेज नहीं बनाया गया।

   💡 बनाना ही हो तो दो ही ईमानदार रास्ते हैं:
      (1) `panchang.js` में गुरु और शुक्र की गणना जोड़ी जाए, या
      (2) पंडित पम्पी जी हर साल की सूची ख़ुद देकर दें, और पेज पर साफ़
          लिखा जाए कि यह उनकी दी हुई सूची है, गणना से बनी नहीं।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

/* panchang.js ब्राउज़र की फ़ाइल है, Node में चलाने के लिए वैसा ही
   ढाँचा चाहिए जैसा build-katha.js बनाता है (§11) */
global.window = {};
global.document = {
  documentElement: { lang: 'hi' },
  getElementById: () => null,
  readyState: 'complete',
  addEventListener: () => {}
};
global.MutationObserver = function () { return { observe() {} }; };
require(path.join(__dirname, 'panchang.js'));
const P = window.Panchang;

const SITE  = 'https://www.darshanyatraseva.com';
const V     = 22;
const TODAY = new Date();
const DAYS  = 365;

const t = (hi, en) => ({ hi, en });

/* panchang.js से सिर्फ़ हिन्दी नाम मिलते हैं, अंग्रेज़ी यहीं रखनी पड़ी */
const NAK_EN = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu',
  'Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati',
  'Vishakha','Anuradha','Jyeshtha','Mula','Purvashadha','Uttarashadha','Shravana',
  'Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const VAAR_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MASA_EN = ['Chaitra','Vaishakha','Jyeshtha','Ashadha','Shravana','Bhadrapada',
  'Ashwin','Kartik','Margashirsha','Pausha','Magha','Phalguna'];
const MONTH_HI = ['जनवरी','फ़रवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त',
  'सितंबर','अक्टूबर','नवंबर','दिसंबर'];
const MONTH_EN = ['January','February','March','April','May','June','July','August',
  'September','October','November','December'];

/* रिक्ता तिथि (4, 9, 14) हर शुभ काम में छोड़ी जाती है */
const RIKTA = [4, 9, 14];
/* खरमास: सूर्य धनु (8) या मीन (11) राशि में */
const KHARMAS = [8, 11];

/* ═══════════════════════════════════════════════════════════
   दोनों पेजों के नियम

   ⚠️ ये नियम परंपरा से लिए गए हैं और पेज पर **खुलकर छापे** जाते हैं,
      ताकि पढ़ने वाला ख़ुद देख सके कि तारीख़ किस आधार पर चुनी गई।
      नियम बदलें तो पेज पर लिखी सूची अपने आप बदल जाएगी।
   ═══════════════════════════════════════════════════════════ */
const PAGES = [

{
  slug: 'griha-pravesh-muhurat',
  ic: '🏠',
  poojaAnchor: 'griha-pravesh',
  nak:   [3, 4, 11, 13, 16, 20, 25, 26],
  tithi: [2, 3, 5, 7, 10, 11, 12, 13],
  vaar:  [1, 3, 4, 5],
  masa:  [1, 2, 8, 10, 11],

  title: t('गृह प्रवेश के शुभ मुहूर्त, अगले एक साल की तिथियाँ | Darshan Yatra Seva',
           'Auspicious Griha Pravesh Muhurat, Dates for the Coming Year | Darshan Yatra Seva'),
  metaDesc: t('गृह प्रवेश के लिए अगले एक साल के शुभ दिन, तिथि, नक्षत्र और वार के साथ। कौन सा मास शुभ है, कौन सी तिथि छोड़ी जाती है और खरमास में प्रवेश क्यों नहीं करते, सब सरल भाषा में।',
              'Auspicious days for Griha Pravesh over the coming year, with the tithi, nakshatra and weekday for each. Which months are auspicious, which tithis are avoided, and why entry is not made during Kharmas, explained simply.'),
  eyebrow: t('गृह प्रवेश का शुभ मुहूर्त', 'Auspicious muhurat for Griha Pravesh'),
  h1: t('गृह प्रवेश के शुभ मुहूर्त', 'Auspicious Griha Pravesh Muhurat'),
  lede: t('नए घर में प्रवेश के लिए अगले एक साल के शुभ दिन, हर तारीख़ के साथ उस दिन की तिथि, नक्षत्र और वार। नीचे यह भी लिखा है कि ये दिन किस आधार पर चुने गए हैं।',
          'Auspicious days for entering a new home over the coming year, each with its tithi, nakshatra and weekday. Below you can also read on what basis these days were chosen.'),

  intro: t('गृह प्रवेश की तारीख़ अंग्रेज़ी कैलेंडर से नहीं, तिथि और नक्षत्र से तय होती है। यही कारण है कि किसी महीने में कई दिन मिलते हैं और किसी में एक भी नहीं। नीचे दी गई सूची परंपरा के उन्हीं नियमों से बनी है जो इसी पेज पर आगे लिखे हैं, ताकि आप ख़ुद देख सकें कि कोई दिन क्यों चुना गया और कोई क्यों छोड़ा गया।',
           'The date for Griha Pravesh is fixed by the tithi and nakshatra, not by the English calendar. That is why some months offer several days and others none at all. The list below is built from the same traditional rules that are set out further down this page, so you can see for yourself why a day was chosen and why another was left out.'),

  ruleHead: t('ये दिन किस आधार पर चुने गए हैं', 'On what basis these days were chosen'),
  rules: [
    t('शुभ मास: वैशाख, ज्येष्ठ, मार्गशीर्ष, माघ और फाल्गुन। चातुर्मास (आषाढ़ से कार्तिक) में गृह प्रवेश की परंपरा नहीं है',
      'Auspicious months: Vaishakha, Jyeshtha, Margashirsha, Magha and Phalguna. Tradition does not place Griha Pravesh during Chaturmas, from Ashadha to Kartik'),
    t('शुभ नक्षत्र: रोहिणी, मृगशिरा, उत्तरा फाल्गुनी, चित्रा, अनुराधा, उत्तराषाढ़ा, उत्तरा भाद्रपद और रेवती',
      'Auspicious nakshatras: Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, Uttarashadha, Uttara Bhadrapada and Revati'),
    t('शुभ वार: सोमवार, बुधवार, गुरुवार और शुक्रवार। मंगलवार और शनिवार छोड़े जाते हैं',
      'Auspicious weekdays: Monday, Wednesday, Thursday and Friday. Tuesday and Saturday are left out'),
    t('रिक्ता तिथि (चतुर्थी, नवमी, चतुर्दशी), अमावस्या और पूर्णिमा छोड़ी जाती हैं',
      'Rikta tithis (Chaturthi, Navami, Chaturdashi), Amavasya and Purnima are left out'),
    t('खरमास (सूर्य के धनु या मीन राशि में रहते हुए) और अधिक मास में कोई शुभ कार्य नहीं होता',
      'No auspicious work is undertaken during Kharmas, while the sun is in Dhanu or Meena, nor during Adhik Maas')
  ],

  faq: [
    { q: t('गृह प्रवेश के लिए कौन सा महीना सबसे शुभ है?',
           'Which month is most auspicious for Griha Pravesh?'),
      a: t('परंपरा में माघ, फाल्गुन, वैशाख और ज्येष्ठ को सबसे शुभ माना जाता है, और मार्गशीर्ष को भी। आषाढ़ से कार्तिक तक का चातुर्मास छोड़ा जाता है, क्योंकि मान्यता है कि उन महीनों में देव शयन करते हैं और शुभ कार्य नहीं किए जाते। पौष और चैत्र भी आम तौर पर छोड़े जाते हैं।',
           'Tradition holds Magha, Phalguna, Vaishakha and Jyeshtha to be the most auspicious, and Margashirsha as well. Chaturmas, from Ashadha to Kartik, is left out, since it is believed the devas rest through those months and auspicious work is not undertaken. Pausha and Chaitra are generally avoided too.') },
    { q: t('किराए के मकान में भी गृह प्रवेश होता है?',
           'Is Griha Pravesh done for a rented house as well?'),
      a: t('जी हाँ, बहुत से परिवार करते हैं। विधि वही रहती है, बस उसे छोटा रखा जाता है: गणेश पूजन, वास्तु शांति, छोटा हवन और रसोई में पहली बार दूध उबालना। पूरा हवन और ब्राह्मण भोज ज़रूरी नहीं।',
           'Yes, many families do. The vidhi stays the same but is kept short: Ganesh pujan, vastu shanti, a small havan and boiling milk in the kitchen for the first time. A full havan and brahman bhoj are not necessary.') },
    { q: t('अगर घर का काम अधूरा हो तो प्रवेश कर सकते हैं?',
           'Can we move in if the house is not fully finished?'),
      a: t('परंपरा कहती है कि मुख्य द्वार, रसोई और कम से कम एक कमरा तैयार होना चाहिए। पूरा घर बनने का इंतज़ार सब नहीं कर पाते, और इसमें कोई दोष नहीं माना जाता। पर जिस दिन प्रवेश हो, उस रात घर में रुकने की परंपरा है, इसलिए इतनी तैयारी ज़रूरी है।',
           'Tradition holds that the main door, the kitchen and at least one room should be ready. Not everyone can wait for the whole house to be complete, and no fault is attached to that. But custom is to spend that night in the house, so at least this much should be ready.') },
    { q: t('इस सूची में मेरी सोची हुई तारीख़ नहीं है, तो क्या करें?',
           'My preferred date is not on this list, what should I do?'),
      a: t('यह सूची आम नियमों से बनी है, यह किसी एक परिवार की कुंडली देखकर नहीं बनी। बहुत बार कुल परंपरा, घर के मुखिया की राशि या किसी विशेष कारण से कोई और दिन भी ठीक बैठ जाता है। अपनी सोची हुई तारीख़ हमें बता दीजिए, पंडित जी देखकर बता देंगे कि वो दिन चलेगा या नहीं।',
           'This list is built from general rules, not from any one family\'s kundali. Often a different day works because of family tradition, the head of the household\'s rashi, or some particular reason. Tell us the date you have in mind and the pandit will look at it and say whether it works.') }
  ],

  ctaHead: t('अपने गृह प्रवेश की तारीख़ पक्की कराइए 🙏', 'Have your Griha Pravesh date confirmed 🙏'),
  wa: 'Jai Shri Shyam! Griha Pravesh ke muhurat aur Pandit Ji ke baare mein bataayein.',
  poojaLine: t('📖 गृह प्रवेश पूजा की पूरी विधि और सामग्री पढ़ें',
               '📖 Read the full vidhi and samagri for Griha Pravesh puja')
},

{
  slug: 'mundan-muhurat',
  ic: '✂️',
  poojaAnchor: 'mundan',
  nak:   [0, 4, 6, 7, 12, 13, 14, 17, 21, 22, 23, 26],
  tithi: [2, 3, 5, 7, 10, 11, 13],
  vaar:  [1, 3, 4, 5],
  masa:  [0, 1, 2, 8, 10, 11],

  title: t('मुंडन संस्कार के शुभ मुहूर्त, अगले एक साल की तिथियाँ | Darshan Yatra Seva',
           'Auspicious Mundan Muhurat, Dates for the Coming Year | Darshan Yatra Seva'),
  metaDesc: t('बच्चे के मुंडन संस्कार के लिए अगले एक साल के शुभ दिन, तिथि, नक्षत्र और वार के साथ। किस उम्र में मुंडन कराया जाता है, कौन सा मास शुभ है और मंदिर में मुंडन कराने की परंपरा, सब सरल भाषा में।',
              'Auspicious days for a child\'s Mundan sanskar over the coming year, with the tithi, nakshatra and weekday for each. At what age it is done, which months are auspicious, and the custom of having it done at a temple, explained simply.'),
  eyebrow: t('मुंडन संस्कार का शुभ मुहूर्त', 'Auspicious muhurat for Mundan Sanskar'),
  h1: t('मुंडन संस्कार के शुभ मुहूर्त', 'Auspicious Mundan Sanskar Muhurat'),
  lede: t('बच्चे के मुंडन के लिए अगले एक साल के शुभ दिन, हर तारीख़ के साथ उस दिन की तिथि, नक्षत्र और वार। नीचे यह भी लिखा है कि ये दिन किस आधार पर चुने गए हैं।',
          'Auspicious days for a child\'s mundan over the coming year, each with its tithi, nakshatra and weekday. Below you can also read on what basis these days were chosen.'),

  intro: t('मुंडन संस्कार आम तौर पर पहले, तीसरे या पाँचवें वर्ष में कराया जाता है, यानी विषम वर्ष में। बहुत से परिवार इसे अपने कुल देवता के मंदिर में कराते हैं, और खाटू श्याम जी, सालासर तथा मेहंदीपुर बालाजी में यह बहुत होता है। नीचे दी गई सूची परंपरा के उन्हीं नियमों से बनी है जो इसी पेज पर आगे लिखे हैं।',
           'The Mundan sanskar is usually held in the first, third or fifth year, that is in an odd numbered year. Many families have it done at the temple of their kul devata, and it is very common at Khatu Shyam Ji, Salasar and Mehandipur Balaji. The list below is built from the same traditional rules set out further down this page.'),

  ruleHead: t('ये दिन किस आधार पर चुने गए हैं', 'On what basis these days were chosen'),
  rules: [
    t('शुभ मास: चैत्र, वैशाख, ज्येष्ठ, मार्गशीर्ष, माघ और फाल्गुन',
      'Auspicious months: Chaitra, Vaishakha, Jyeshtha, Margashirsha, Magha and Phalguna'),
    t('शुभ नक्षत्र: अश्विनी, मृगशिरा, पुनर्वसु, पुष्य, हस्त, चित्रा, स्वाति, ज्येष्ठा, श्रवण, धनिष्ठा, शतभिषा और रेवती',
      'Auspicious nakshatras: Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Chitra, Swati, Jyeshtha, Shravana, Dhanishtha, Shatabhisha and Revati'),
    t('शुभ वार: सोमवार, बुधवार, गुरुवार और शुक्रवार',
      'Auspicious weekdays: Monday, Wednesday, Thursday and Friday'),
    t('रिक्ता तिथि (चतुर्थी, नवमी, चतुर्दशी), अमावस्या और पूर्णिमा छोड़ी जाती हैं',
      'Rikta tithis (Chaturthi, Navami, Chaturdashi), Amavasya and Purnima are left out'),
    t('खरमास और अधिक मास में मुंडन नहीं कराया जाता',
      'Mundan is not held during Kharmas or Adhik Maas')
  ],

  faq: [
    { q: t('मुंडन किस उम्र में कराया जाता है?', 'At what age is Mundan done?'),
      a: t('परंपरा में पहले, तीसरे या पाँचवें वर्ष में, यानी विषम वर्ष में। कुछ परिवारों में सातवें वर्ष तक भी कराया जाता है। हर कुल की अपनी परंपरा होती है, इसलिए घर के बड़ों से पूछ लेना सबसे अच्छा रहता है।',
           'By tradition in the first, third or fifth year, that is an odd numbered year. Some families hold it as late as the seventh year. Every family has its own custom, so it is best to ask the elders of the house.') },
    { q: t('क्या मुंडन बच्चे के जन्म वाले महीने में कराया जा सकता है?',
           'Can Mundan be held in the child\'s birth month?'),
      a: t('परंपरा में जन्म का मास छोड़ा जाता है। इसलिए तारीख़ निकलवाते समय बच्चे की जन्म तिथि ज़रूर बता दीजिए, पंडित जी उसी हिसाब से दिन चुनेंगे। इस पेज की सूची आम नियमों से बनी है, उसमें किसी बच्चे का जन्म मास नहीं जोड़ा जा सकता।',
           'Tradition leaves out the month of birth. So do give the child\'s date of birth when the date is being worked out, and the pandit will choose accordingly. The list on this page is built from general rules and cannot account for any particular child\'s birth month.') },
    { q: t('मंदिर में मुंडन कराना हो तो?', 'What if we want the Mundan done at a temple?'),
      a: t('खाटू श्याम जी, सालासर बालाजी और मेहंदीपुर बालाजी, तीनों जगह मुंडन बहुत होता है और हमारी यात्राएँ वहीं जाती हैं। बुकिंग के समय बता दीजिए, यात्रा के साथ ही व्यवस्था जोड़ दी जाएगी। वहाँ की अपनी व्यवस्था अलग से देखनी पड़ती है, इसलिए पहले से बताना ज़रूरी है।',
           'Mundan is very commonly done at Khatu Shyam Ji, Salasar Balaji and Mehandipur Balaji, and our yatras go to all three. Tell us at booking time and it is folded into the trip. Arrangements at the temple have to be looked at separately, so advance notice is necessary.') },
    { q: t('मुंडन के बाद क्या ध्यान रखना चाहिए?', 'What should be kept in mind after the Mundan?'),
      a: t('मुंडन के बाद सिर पर धूप और ठंड दोनों जल्दी लगते हैं, इसलिए टोपी या मुलायम कपड़ा साथ रखिए। सिर पर हल्दी और चंदन का लेप लगाने की परंपरा है। उतारे हुए बाल जल में प्रवाहित किए जाते हैं या मंदिर में चढ़ाए जाते हैं।',
           'After the mundan the head feels both sun and cold quickly, so keep a cap or a soft cloth handy. Custom is to apply turmeric and sandal paste to the head. The hair that is removed is immersed in water or offered at a temple.') }
  ],

  ctaHead: t('मुंडन की तारीख़ पक्की कराइए 🙏', 'Have the Mundan date confirmed 🙏'),
  wa: 'Jai Shri Shyam! Mundan sanskar ke muhurat aur Pandit Ji ke baare mein bataayein.',
  poojaLine: t('📖 मुंडन संस्कार की पूरी विधि पढ़ें', '📖 Read the full vidhi for Mundan Sanskar')
}
];

/* ═══════════════════════════════════════════════════════════
   सब पेजों पर एक जैसा
   ═══════════════════════════════════════════════════════════ */

/* 🔴 यह चेतावनी हटाइए मत। §9 में पंचांग के लिए यही लिखा है, और मुहूर्त
   पर तो किसी परिवार का पूरा दिन टिका होता है। */
const WARN = t('⚠️ यह सूची गणना से बनी है, किसी छपे हुए पंचांग से नहीं उतारी गई। परंपरा के आम नियम लगाए गए हैं, किसी परिवार की कुंडली नहीं देखी गई। तारीख़ पक्की करने से पहले अपने पंडित जी से एक बार ज़रूर मिला लीजिए। हमें बता दीजिए तो पंडित पम्पी जी आपकी कुंडली और कुल परंपरा देखकर पक्का मुहूर्त निकाल देंगे।',
               '⚠️ This list is calculated, not copied from a published panchang. General traditional rules have been applied, and no family\'s kundali has been consulted. Do check with your own pandit before fixing a date. Tell us and Pandit Pampi Ji will work out the exact muhurat after looking at your kundali and family custom.');

const LBL = {
  listHead:  t('अगले एक साल के शुभ दिन', 'Auspicious days over the coming year'),
  none:      t('इस साल की गणना में कोई दिन नहीं मिला। ऐसा तब होता है जब खरमास और अधिक मास शुभ मास पर पड़ जाएँ। हमसे पूछ लीजिए, पंडित जी दूसरा रास्ता बता देंगे।',
               'The calculation found no day this year. That happens when Kharmas and Adhik Maas fall over the auspicious months. Ask us, and the pandit will suggest another way.'),
  faqHead:   t('पूछे जाने वाले सवाल', 'Questions people ask'),
  ask:       t('💬 इस दिन के बारे में पूछें', '💬 Ask about this day'),
  panditPage: t('🕉️ पंडित जी की सेवा और बुकिंग देखें', '🕉️ See the Pandit Ji seva and how to book'),
  panchang:  t('🗓️ आज की तिथि और पूरा पंचांग देखें', '🗓️ See today\'s tithi and the full panchang'),
  home:      t('← मुख्य पेज', '← Home'),
  book:      t('बुक करें', 'Book now'),
  ctaSub:    t('अपनी सोची हुई तारीख़ बता दीजिए, पंडित जी देखकर पक्का बता देंगे।',
               'Tell us the date you have in mind and the pandit will check it and confirm.'),
  ctaWa:     t('WhatsApp करें', 'Message on WhatsApp'),
  topbar:    t('जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा', 'Jai Shri Shyam, weekly yatras'),
  rights:    t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')
};

/* ═══════════════════════════════════════════════════════════
   गणना
   ═══════════════════════════════════════════════════════════ */
function findDays(cfg) {
  const out = [];
  const start = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1);

  for (let i = 0; i < DAYS; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const p = P.forDate(d);

    if (p.adhika) continue;                          // अधिक मास
    if (KHARMAS.includes(p.sunRashi)) continue;      // खरमास
    if (!cfg.masa.includes(p.masa)) continue;
    if (!cfg.vaar.includes(p.vaar)) continue;
    if (p.tithiNum === 15) continue;                 // अमावस्या और पूर्णिमा
    if (RIKTA.includes(p.tithiNum)) continue;
    if (!cfg.tithi.includes(p.tithiNum)) continue;
    if (!cfg.nak.includes(p.nak)) continue;

    out.push({
      d,
      tithiHi: `${P.pakshaName(p)} ${P.tithiName(p)}`,
      tithiEn: `${p.paksha === 'S' ? 'Shukla' : 'Krishna'} ${P.tithiName(p, true)}`,
      masaHi: P.MASA_HI[p.masa], masaEn: MASA_EN[p.masa],
      nakHi: P.NAK_HI[p.nak],   nakEn: NAK_EN[p.nak],
      vaarHi: P.VAAR_HI[p.vaar], vaarEn: VAAR_EN[p.vaar]
    });
  }
  return out;
}

/* ═══════════════════════════════════════════════════════════
   HTML
   ═══════════════════════════════════════════════════════════ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = txt => `https://wa.me/917289902692?text=${encodeURIComponent(txt)}`;

/* हर दिन की अपनी hi/en जोड़ी, इसलिए अनुवाद कभी टूट नहीं सकता */
const dayLines = day => ({
  head: t(`${day.masaHi}, ${day.tithiHi}`, `${day.masaEn}, ${day.tithiEn}`),
  sub:  t(`नक्षत्र ${day.nakHi}`, `${day.nakEn} nakshatra`),
  mon:  t(MONTH_HI[day.d.getMonth()], MONTH_EN[day.d.getMonth()]),
  vaar: t(day.vaarHi, day.vaarEn)
});

function collectEN(cfg, days) {
  const out = {};
  const add = o => { if (o && o.hi && o.en && o.hi !== o.en) out[o.hi] = o.en; };
  add(cfg.title); add(cfg.eyebrow); add(cfg.h1); add(cfg.lede); add(cfg.intro);
  add(cfg.ruleHead); cfg.rules.forEach(add);
  cfg.faq.forEach(f => { add(f.q); add(f.a); });
  add(cfg.ctaHead); add(cfg.poojaLine);
  days.forEach(day => { const L = dayLines(day); add(L.head); add(L.sub); add(L.mon); add(L.vaar); });
  add(WARN);
  Object.values(LBL).forEach(add);
  return out;
}

const listHTML = (cfg, days) => {
  if (!days.length) return `      <p class="note">${esc(LBL.none.hi)}</p>`;
  return days.map(day => {
    const L = dayLines(day);
    const msg = `Jai Shri Shyam! ${day.d.getDate()} ${MONTH_EN[day.d.getMonth()]} ${day.d.getFullYear()} ko ${cfg.slug === 'mundan-muhurat' ? 'mundan' : 'griha pravesh'} ka muhurat hai kya? Pandit Ji se pooch kar bataayein.`;
    return `      <li class="parv">
        <div class="parv__date">
          <b>${day.d.getDate()}</b>
          <span>${esc(L.mon.hi)}</span>
          <i>${esc(L.vaar.hi)}</i>
        </div>
        <div class="parv__body">
          <b>${esc(L.head.hi)}</b>
          <span>${esc(L.sub.hi)}</span>
        </div>
        <a class="parv__ask" href="${wa(msg)}" target="_blank" rel="noopener">${esc(LBL.ask.hi)}</a>
      </li>`;
  }).join('\n');
};

const rulesHTML = cfg => cfg.rules.map(r => `        <li>${esc(r.hi)}</li>`).join('\n');
const faqHTML   = cfg => cfg.faq.map(f =>
  `      <details><summary>${esc(f.q.hi)}</summary><p>${esc(f.a.hi)}</p></details>`).join('\n');

function schema(cfg, days) {
  const url = `${SITE}/${cfg.slug}`;
  const art = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: cfg.h1.hi, description: cfg.metaDesc.hi, inLanguage: 'hi-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': `${SITE}/#business` }, publisher: { '@id': `${SITE}/#business` },
    dateModified: new Date().toISOString().slice(0, 10)
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: cfg.faq.map(f => ({ '@type': 'Question', name: f.q.hi,
      acceptedAnswer: { '@type': 'Answer', text: f.a.hi } }))
  };
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'मुख्य पेज', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'पंडित जी सेवा', item: `${SITE}/pandit-ji` },
      { '@type': 'ListItem', position: 3, name: cfg.h1.hi, item: url }
    ]
  };
  const biz = {
    '@context': 'https://schema.org', '@type': 'TravelAgency', '@id': `${SITE}/#business`,
    name: 'Darshan Yatra Seva', alternateName: 'दर्शन यात्रा सेवा',
    url: `${SITE}/`, telephone: '+917289902692', logo: `${SITE}/brand/logo-icon.png`
  };
  return [art, faq, crumbs, biz]
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
}

function page(cfg, days) {
  const url = `${SITE}/${cfg.slug}`;
  const EN  = collectEN(cfg, days);

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(cfg.title.hi)}</title>
<meta name="description" content="${esc(cfg.metaDesc.hi)}" />
<meta name="theme-color" content="#7B1E22" />
<link rel="canonical" href="${url}" />

<meta property="og:title" content="${esc(cfg.h1.hi)}" />
<meta property="og:description" content="${esc(cfg.metaDesc.hi)}" />
<meta property="og:type" content="article" />
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

<!-- ⚠️ यह फ़ाइल build-muhurat.js से बनी है, हाथ से मत बदलिए -->
${schema(cfg, days)}
</head>
<body>

<!-- ══ TOP BAR ══ -->
<div class="topbar">
  <div class="wrap topbar__in">
    <span class="topbar__om">ॐ</span>
    <span>${esc(LBL.topbar.hi)}</span>
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
      <a href="/">${esc(LBL.home.hi)}</a>
      <a class="btn btn--sm btn--primary" href="/#book">${esc(LBL.book.hi)}</a>
    </nav>

    <button class="langbtn" id="langBtn" type="button" aria-label="View in English">English</button>
  </div>
</header>

<!-- ══ शीर्षक ══ -->
<section class="katha__hero">
  <div class="wrap">
    <p class="eyebrow center">${esc(cfg.eyebrow.hi)}</p>
    <h1 class="sec__title">${esc(cfg.h1.hi)}</h1>
    <p class="sec__lede">${esc(cfg.lede.hi)}</p>
  </div>
</section>

<!-- ══ परिचय और चेतावनी ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">
    <p class="ypage__intro">${esc(cfg.intro.hi)}</p>
    <p class="note">${esc(WARN.hi)}</p>
  </div>
</section>

<!-- ══ तारीख़ों की सूची ══ -->
<section class="sec sec--alt">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LBL.listHead.hi)}</h2>
    <ul class="parvList">
${listHTML(cfg, days)}
    </ul>
  </div>
</section>

<!-- ══ नियम ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(cfg.ruleHead.hi)}</h2>
    <ul class="kfull__list kfull__list--vidhi ypage__tips">
${rulesHTML(cfg)}
    </ul>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/pooja-vidhi#${cfg.poojaAnchor}">${esc(cfg.poojaLine.hi)}</a></p>
  </div>
</section>

<!-- ══ सवाल जवाब ══ -->
<section class="sec sec--alt">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LBL.faqHead.hi)}</h2>
    <div class="faq">
${faqHTML(cfg)}
    </div>
  </div>
</section>

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="sec">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/pandit-ji">${esc(LBL.panditPage.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/panchang">${esc(LBL.panchang.hi)}</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(cfg.ctaHead.hi)}</h2>
    <p>${esc(LBL.ctaSub.hi)}</p>
    <div class="cta__btns">
      <a class="btn btn--ghostlight btn--lg" href="${wa(cfg.wa)}" target="_blank" rel="noopener">${esc(LBL.ctaWa.hi)}</a>
    </div>
  </div>
</section>

<!-- ══ FOOTER ══ -->
<footer class="foot">
  <div class="wrap foot__bar">
    <span>© <span id="yr"></span> Darshan Yatra Seva. ${esc(LBL.rights.hi)}</span>
    <span class="foot__om">🙏 जय श्री श्याम</span>
  </div>
</footer>

<a class="fab" href="${wa(cfg.wa)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 015.5 16c0-5.8 4.7-10.5 10.5-10.5S26.5 10.2 26.5 16 21.8 26.6 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.6 8.6 0 01-2.5-1.6 9.6 9.6 0 01-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5c0-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
</a>

<script>
window.EN_EXTRA = ${JSON.stringify(EN, null, 2)};
</script>

<script src="config.js?v=${V}"></script>
<script src="i18n.js?v=${V}"></script>
<script>
  document.getElementById('yr').textContent = new Date().getFullYear();
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
   जाँच (§4 नियम 2 और नियम 5)
   ═══════════════════════════════════════════════════════════ */
function i18nKeys() {
  const src = fs.readFileSync(path.join(__dirname, 'i18n.js'), 'utf8');
  const from = src.indexOf('const EN = {');
  const to   = src.indexOf('\n};', from);
  if (from < 0 || to < 0) throw new Error('i18n.js में EN नहीं मिला');
  const obj = new Function('return (' + src.slice(from + 'const EN = '.length, to + 2) + ')')();
  return new Set(Object.keys(obj));
}
const ALLOW = new Set(['ॐ', 'दर्शन यात्रा सेवा', '🙏 जय श्री श्याम', 'हिंदी', 'English']);

function checkTranslations(slug, html, EN, known) {
  const body = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
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
    console.error(`\n  ❌ ${slug}.html: ${missing.length} लाइनों का अनुवाद नहीं है`);
    missing.forEach(m => console.error('     ' + m.slice(0, 80)));
    process.exit(1);
  }
}
function checkDash(slug, html) {
  const bad = (html.match(/[—–]/g) || []).length;
  if (bad) {
    console.error(`\n  ❌ ${slug}.html में ${bad} डैश मिले (§4 नियम 5)।\n`);
    process.exit(1);
  }
}

/* ═══════════════════════════════════════════════════════════
   लिखो
   ═══════════════════════════════════════════════════════════ */
const KNOWN = i18nKeys();

for (const cfg of PAGES) {
  const days = findDays(cfg);
  const html = page(cfg, days);
  checkTranslations(cfg.slug, html, collectEN(cfg, days), KNOWN);
  checkDash(cfg.slug, html);
  fs.writeFileSync(path.join(__dirname, cfg.slug + '.html'), html, 'utf8');

  const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                    .replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  ✅ ${cfg.slug}.html   (${days.length} शुभ दिन, ${words} शब्द)`);
  if (!days.length) {
    console.warn('     ⚠️ एक भी दिन नहीं मिला। नियम बहुत सख़्त तो नहीं हो गए? ऊपर PAGES में देखिए।');
  }
}

console.log('  ℹ️  sitemap.xml build-yatra.js से बनती है, वहाँ दोनों slug जोड़िए।');
console.log('  ⚠️  यह सूची आज से अगले 365 दिन की है। हर deploy से पहले दोबारा चलाइए।');

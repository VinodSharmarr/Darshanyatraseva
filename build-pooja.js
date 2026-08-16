/* ═══════════════════════════════════════════════════════════
   build-pooja.js, "कौन सी पूजा क्यों की जाती है" का पेज  →  /pooja-vidhi

   क्यों बना (16 अगस्त 2026):
   Vinod ने कहा: "एक नया पेज और, जिसमें कौन सी पूजा क्या होती है और
   उसका महत्व लिखा हो।" /pandit-ji पर 12 पूजाओं के सिर्फ़ नाम और एक
   पंक्ति थी। बहुत से लोग पूजा कराना चाहते हैं पर उन्हें यह पता ही नहीं
   होता कि उसमें होता क्या है, और यही झिझक उन्हें रोक देती है।

   SEO की वजह: "सत्यनारायण कथा क्या होती है", "गृह प्रवेश पूजा का महत्व",
   "जनेऊ संस्कार की विधि" जैसी खोज बहुत होती हैं और उनका साइट पर कोई
   दरवाज़ा नहीं था। यह पेज /katha जैसा है, बस धामों की जगह पूजाओं का।

   🔴 चलाने का तरीक़ा:
       node build-pooja.js

   ⚠️ pooja-vidhi.html में हाथ से कुछ मत लिखना, यह script उसे हर बार
      मिटाकर दोबारा लिखता है। बदलाव नीचे POOJA में कीजिए।

   ⚠️ §4 नियम 4 यहाँ सबसे ज़रूरी है (§11 में कथाओं के लिए यही लिखा है):
      यह धर्म और परंपरा की बात है, विज्ञान की नहीं। इसलिए हर मान्यता
      "मान्यता है", "कहते हैं", "माना जाता है" के साथ लिखी गई है।
      🔴 कोई भी बात तथ्य की तरह तभी लिखिए जब वो सचमुच तथ्य हो।
      🔴 "इस पूजा से बीमारी ठीक होती है", "नौकरी लग जाती है" जैसा दावा
         कभी मत लिखना। वो भ्रामक विज्ञापन है और नुक़सान भी पहुँचाता है।

   ⚠️ विधि क्षेत्र, परिवार और गुरु-परंपरा से बदलती है। पेज के नीचे यही
      बात साफ़ लिखी है, वो पंक्ति हटाइए मत।

   ⚠️ §4 नियम 1: दक्षिणा या सामग्री का कोई अंक मत लिखना।
   ⚠️ §4 नियम 5: लंबी और छोटी डैश, दोनों नहीं। build में जाँच लगी है।
   ⚠️ §4 नियम 2: अनुवाद यहीं t(हिन्दी, English) से बनता है, i18n.js में
      नहीं। नीचे checkTranslations अपने आप जाँच लेता है।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.darshanyatraseva.com';
const SLUG = 'pooja-vidhi';
const V    = 22;                       // ?v= , §8 देखें
const TODAY = '2026-08-16';

const t = (hi, en) => ({ hi, en });

/* ═══════════════════════════════════════════════════════════
   पेज का सिरा
   ═══════════════════════════════════════════════════════════ */
const HEAD = {
  title: t('कौन सी पूजा क्यों की जाती है, महत्व और विधि | Darshan Yatra Seva',
           'Which Puja is Done and Why, Its Significance and Method | Darshan Yatra Seva'),
  metaDesc: t('गृह प्रवेश, सत्यनारायण कथा, रुद्राभिषेक, नवग्रह शांति, नामकरण, मुंडन, जनेऊ, विवाह, भागवत कथा, नवरात्रि, श्राद्ध और वाहन पूजा। हर पूजा क्या है, उसका महत्व क्या माना जाता है, कब की जाती है और विधि में क्या होता है, सरल हिन्दी में।',
              'Griha Pravesh, Satyanarayan Katha, Rudrabhishek, Navagraha Shanti, Namkaran, Mundan, Janeu, Vivah, Bhagwat Katha, Navratri, Shraddh and vehicle puja. What each puja is, what significance is attached to it, when it is done and what the vidhi involves, in plain language.'),

  eyebrow: t('पूजाओं का महत्व और विधि', 'The significance and method of each puja'),
  h1: t('कौन सी पूजा क्यों की जाती है', 'Which puja is done, and why'),
  lede: t('बहुत से लोग पूजा कराना चाहते हैं पर यह नहीं जानते कि उसमें होता क्या है। यहाँ बारह पूजाओं और संस्कारों के बारे में सरल भाषा में लिखा है: क्या है, महत्व क्या माना जाता है, कब की जाती है और विधि में क्या क्या होता है।',
          'Many people want a puja performed but do not know what it actually involves. Here twelve pujas and sanskars are set out simply: what each one is, what significance is attached to it, when it is done, and what the vidhi involves.'),

  wa: 'Jai Shri Shyam! Mujhe puja ke bare mein jaankari chahiye aur Pandit Ji ki vyavastha bhi.'
};

/* ═══════════════════════════════════════════════════════════
   बारह पूजाएँ

   ⚠️ यहाँ की सूची /pandit-ji वाली सूची से मिलती रहनी चाहिए। वहाँ
      12 पूजाएँ हैं और गिनती वहाँ के FACTS में भी लिखी है। एक जगह
      जोड़ें तो दूसरी जगह भी जोड़िए, वरना दोनों पेज अलग बात कहेंगे।
   ⚠️ id वही रखिए जो नीचे लिखी है, /pandit-ji से इन्हीं पर लिंक जाता है।
   ═══════════════════════════════════════════════════════════ */
const POOJA = [

/* ─────────────────── 1 ─────────────────── */
{
  id: 'griha-pravesh', ic: '🏠',
  name: t('गृह प्रवेश पूजा', 'Griha Pravesh Puja'),
  sub:  t('नए घर में पहला क़दम', 'The first step into a new home'),
  kya:  t('नया घर बनने या ख़रीदने के बाद उसमें रहने से पहले जो पूजा की जाती है, उसे गृह प्रवेश कहते हैं। इसमें वास्तु देवता, गणेश जी और कुल देवता का आवाहन होता है, हवन किया जाता है और रसोई में पहली बार चूल्हा जलाकर दूध उबाला जाता है।',
              'The puja performed before moving into a newly built or newly bought house is called Griha Pravesh. The vastu devata, Ganesh ji and the family deity are invoked, a havan is performed, and milk is boiled on the stove lit for the first time in the new kitchen.'),
  mahatva: t('मान्यता है कि घर सिर्फ़ ईंट और सीमेंट का ढाँचा नहीं होता, उसमें रहने वालों का सुख उसी वातावरण से जुड़ा रहता है। गृह प्रवेश उसी वातावरण को शुद्ध करने और घर को बसाने की परंपरा है। दूध का उबलकर बाहर आना समृद्धि का संकेत माना जाता है, और इसीलिए यह विधि हर परिवार में की जाती है।',
             'It is believed that a house is not merely a structure of brick and cement, and that the well being of those who live in it is tied to its atmosphere. Griha Pravesh is the tradition of purifying that atmosphere and settling the home. Milk boiling over is taken as a sign of abundance, which is why this step is kept in nearly every family.'),
  kab:  t('गृहस्थी शुरू करने से पहले, यानी सामान रखने और रहने से पहले। शुभ तिथि देखकर, आम तौर पर सुबह के मुहूर्त में। कुछ मास और तिथियाँ इसके लिए वर्जित मानी जाती हैं, इसलिए तारीख़ पंडित जी से निकलवाना ज़रूरी है।',
             'Before the household begins, that is before belongings are moved in and the family starts living there. On an auspicious tithi, usually in a morning muhurat. Certain months and tithis are held to be unsuitable, so the date should be worked out by a pandit.'),
  vidhi: [
    t('मुख्य द्वार पर तोरण, आम के पत्ते और स्वस्तिक', 'A toran, mango leaves and a swastik at the main door'),
    t('कलश स्थापना और गणेश पूजन से शुरुआत', 'The puja begins with kalash sthapana and Ganesh pujan'),
    t('वास्तु शांति और नवग्रह का पूजन', 'Vastu shanti and worship of the nine grahas'),
    t('हवन, फिर पूरे घर में गंगाजल का छिड़काव', 'Havan, then Gangajal sprinkled through the whole house'),
    t('रसोई में पहली बार चूल्हा जलाकर दूध उबालना', 'The stove lit for the first time and milk boiled in the kitchen'),
    t('अंत में ब्राह्मण भोज या प्रसाद वितरण', 'A brahman bhoj or distribution of prasad at the end')
  ],
  dhyan: [
    t('जिस दिन प्रवेश हो उस दिन घर पूरी तरह ख़ाली न हो, कम से कम रसोई का सामान पहले पहुँच जाए',
      'The house should not be entirely bare on the day of entry, at least the kitchen essentials should reach beforehand'),
    t('गृह प्रवेश के बाद उसी दिन घर में रात बिताने की परंपरा है, बहुत से परिवार इसे ज़रूरी मानते हैं',
      'Tradition holds that the family should spend that night in the house, and many families consider this essential')
  ]
},

/* ─────────────────── 2 ─────────────────── */
{
  id: 'satyanarayan-katha', ic: '📿',
  name: t('सत्यनारायण कथा', 'Satyanarayan Katha'),
  sub:  t('घर की सबसे आम पूजा', 'The most common puja in a home'),
  kya:  t('भगवान विष्णु के सत्यनारायण रूप की पूजा, जिसमें पाँच अध्याय की कथा सुनी जाती है। कथा में साधु वणिक, राजा उल्कामुख और लकड़हारे जैसी कहानियाँ आती हैं, जिनका सार एक ही है: दिए हुए वचन को निभाना और प्रसाद का अनादर न करना।',
              'Worship of Vishnu in his Satyanarayan form, in which a katha of five chapters is heard. The katha carries stories such as those of the sadhu merchant, King Ulkamukh and the woodcutter, all of which turn on the same point: keeping the word you have given, and never slighting the prasad.'),
  mahatva: t('यह घरों में सबसे ज़्यादा की जाने वाली पूजा है, क्योंकि इसके लिए न बड़ी तैयारी चाहिए न ज़्यादा समय। मान्यता है कि जो मन्नत पूरी हो जाए उसके बाद यह कथा करानी चाहिए, इसीलिए इसे धन्यवाद की पूजा भी कहा जाता है। नए काम की शुरुआत, विवाह के बाद, या घर में कोई शुभ काम होने पर यह कराई जाती है।',
             'This is the puja most often performed in homes, since it needs neither elaborate preparation nor much time. It is believed that once a wish has been fulfilled this katha should be held, which is why it is also spoken of as a puja of thanksgiving. It is arranged at the start of new work, after a wedding, or whenever something auspicious happens in the family.'),
  kab:  t('पूर्णिमा को इसका विशेष महत्व माना जाता है, और संक्रांति व एकादशी को भी। वैसे यह किसी भी शुभ दिन कराई जा सकती है, आम तौर पर शाम के समय।',
             'Purnima is held to carry special significance for it, as are Sankranti and Ekadashi. It can otherwise be held on any auspicious day, usually in the evening.'),
  vidhi: [
    t('कलश स्थापना, गणेश पूजन और नवग्रह का आवाहन', 'Kalash sthapana, Ganesh pujan and invocation of the nine grahas'),
    t('सत्यनारायण भगवान की मूर्ति या चित्र का षोडशोपचार पूजन', 'Shodashopachar worship of the image of Satyanarayan bhagwan'),
    t('पाँचों अध्याय की कथा, परिवार सहित बैठकर सुनना', 'The katha of all five chapters, heard by the family seated together'),
    t('आरती, फिर पंचामृत और सिन्नी (आटा, चीनी, केला, घी) का भोग', 'Aarti, then the bhog of panchamrit and sinni made of flour, sugar, banana and ghee'),
    t('प्रसाद सबमें बाँटना, यही कथा का मुख्य भाव है', 'Distributing the prasad to everyone, which is the heart of this katha')
  ],
  dhyan: [
    t('कथा शुरू होने के बाद बीच में उठना अच्छा नहीं माना जाता, इसलिए सब पहले से बैठ जाएँ',
      'Getting up midway once the katha has begun is not considered right, so everyone should be seated beforehand'),
    t('प्रसाद ज़रूर ग्रहण करें, कथा में इसी का सबसे ज़्यादा ज़ोर है',
      'Do take the prasad, it is the point the katha stresses most')
  ]
},

/* ─────────────────── 3 ─────────────────── */
{
  id: 'rudrabhishek', ic: '🕉️',
  name: t('रुद्राभिषेक', 'Rudrabhishek'),
  sub:  t('शिवजी का जलाभिषेक', 'The abhishek of Shiva'),
  kya:  t('शिवलिंग पर एक के बाद एक द्रव्य चढ़ाकर किया जाने वाला अभिषेक, साथ में रुद्री (श्री रुद्रम) का पाठ। जल, दूध, दही, घी, शहद और शक्कर, इन्हीं से पंचामृत बनता है, और अंत में फिर शुद्ध जल चढ़ाया जाता है।',
              'An abhishek in which one substance after another is poured over the Shivling, accompanied by the recitation of the Rudri, the Shri Rudram. Water, milk, curd, ghee, honey and sugar make up the panchamrit, and pure water is poured again at the end.'),
  mahatva: t('मान्यता है कि शिवजी को कोई महँगी भेंट नहीं चाहिए, वे जल से ही प्रसन्न हो जाते हैं, इसीलिए इस पूजा को सबसे सरल और सबसे प्रिय माना गया है। रुद्राभिषेक ग्रह बाधा, मानसिक अशांति और घर के क्लेश के समय कराया जाता है, और कई परिवार इसे हर साल एक बार नियम से कराते हैं।',
             'It is believed that Shiva asks for no costly offering and is pleased by water alone, which is why this puja is held to be both the simplest and the dearest to him. Rudrabhishek is arranged at times of planetary difficulty, mental unrest or discord at home, and many families hold one every year as a matter of routine.'),
  kab:  t('सोमवार, प्रदोष और श्रावण मास में इसका विशेष महत्व माना जाता है। महाशिवरात्रि की रात चारों प्रहर की पूजा होती है। वैसे यह किसी भी दिन कराई जा सकती है।',
             'Monday, Pradosh and the month of Shravan are held to carry special significance for it. On Mahashivratri the puja is done through all four prahars of the night. It may otherwise be arranged on any day.'),
  vidhi: [
    t('गणेश पूजन और संकल्प से शुरुआत', 'The puja opens with Ganesh pujan and the sankalp'),
    t('शिवलिंग पर क्रम से जल, दूध, दही, घी, शहद और शक्कर', 'Water, milk, curd, ghee, honey and sugar poured over the Shivling in order'),
    t('साथ साथ रुद्री का पाठ, ग्यारह बार पढ़ने को एकादश रुद्री कहते हैं', 'The Rudri recited alongside, eleven recitations being called Ekadash Rudri'),
    t('बेलपत्र, धतूरा, भाँग और सफ़ेद फूल चढ़ाना', 'Offering bel leaves, dhatura, bhang and white flowers'),
    t('भस्म और चंदन का लेप, फिर आरती', 'Applying bhasm and sandal paste, then the aarti')
  ],
  dhyan: [
    t('शिवजी को केतकी का फूल और तुलसी दल नहीं चढ़ाए जाते, यह परंपरा हर जगह मानी जाती है',
      'Ketaki flowers and tulsi leaves are not offered to Shiva, a tradition observed everywhere'),
    t('बेलपत्र तीन पत्तों वाला और बिना कटा हुआ होना चाहिए',
      'The bel leaf should have three lobes and be unbroken')
  ]
},

/* ─────────────────── 4 ─────────────────── */
{
  id: 'navagraha-shanti', ic: '✨',
  name: t('नवग्रह शांति', 'Navagraha Shanti'),
  sub:  t('ग्रहों की शांति का अनुष्ठान', 'The ritual for calming the grahas'),
  kya:  t('कुंडली में जो ग्रह प्रतिकूल चल रहा हो, उसके लिए किया जाने वाला जाप और हवन। इसमें उस ग्रह का मंत्र तय संख्या में जपा जाता है, उसकी समिधा से हवन होता है और उससे जुड़ी वस्तु का दान किया जाता है।',
              'The jaap and havan performed for whichever graha is running unfavourably in the kundali. The mantra of that graha is recited a fixed number of times, a havan is done with its designated wood, and the article associated with it is given in daan.'),
  mahatva: t('मान्यता है कि ग्रह किसी को दंड नहीं देते, वे समय का संकेत भर हैं, और शांति पाठ का उद्देश्य मन को स्थिर करना है ताकि कठिन समय धैर्य से कट जाए। शनि की साढ़े साती, मंगल दोष, कालसर्प और पितृ दोष के लिए यह अनुष्ठान सबसे ज़्यादा कराया जाता है।',
             'It is believed that the grahas do not punish anyone, that they mark a phase of time, and that the purpose of a shanti paath is to steady the mind so a difficult stretch passes with patience. This ritual is most often arranged for Shani\'s sade sati, Mangal dosh, Kaal Sarp and Pitru dosh.'),
  kab:  t('जन्म कुंडली देखकर तय होता है, इसलिए दिन भी कुंडली से ही निकलता है। हर ग्रह का अपना वार होता है, जैसे शनि के लिए शनिवार और मंगल के लिए मंगलवार।',
             'This is decided by reading the birth kundali, so the day is worked out from the kundali as well. Each graha has its own weekday, Saturday for Shani and Tuesday for Mangal, for instance.'),
  vidhi: [
    t('कुंडली देखकर यह तय करना कि कौन सा ग्रह भारी है', 'Reading the kundali to determine which graha is weighing heavy'),
    t('संकल्प, फिर नवग्रह मंडल की स्थापना', 'The sankalp, then establishing the navagraha mandal'),
    t('उस ग्रह के मंत्र का तय संख्या में जाप', 'Reciting that graha\'s mantra a fixed number of times'),
    t('उसकी समिधा से हवन और पूर्णाहुति', 'Havan with its designated wood, and the purnahuti'),
    t('उस ग्रह से जुड़ी वस्तु का दान, जैसे शनि के लिए काला तिल और सरसों का तेल',
      'Daan of the article linked to that graha, such as black sesame and mustard oil for Shani')
  ],
  dhyan: [
    t('🔴 यह श्रद्धा का विषय है। किसी बीमारी, मुक़दमे या पैसे की परेशानी में पूजा के साथ इलाज, वकील और सही सलाह भी उतनी ही ज़रूरी है, इसे उनका विकल्प मत समझिए',
      'This is a matter of faith. In illness, litigation or money trouble, treatment, legal advice and sound counsel matter just as much alongside the puja, and it should never be treated as a substitute for them'),
    t('कुंडली न हो तो जन्म की तारीख़, समय और जगह चाहिए, समय जितना सही होगा गणना उतनी ही ठीक बैठेगी',
      'If there is no kundali, the date, time and place of birth are needed, and the more accurate the time the better the calculation')
  ]
},

/* ─────────────────── 5 ─────────────────── */
{
  id: 'namkaran', ic: '👶',
  name: t('नामकरण संस्कार', 'Namkaran Sanskar'),
  sub:  t('बच्चे का नाम रखने की विधि', 'The naming of a child'),
  kya:  t('जन्म के बाद बच्चे का नाम रखने का संस्कार। सोलह संस्कारों में यह पाँचवाँ है। जन्म के समय के नक्षत्र से एक अक्षर निकलता है, और परंपरा से नाम उसी अक्षर से शुरू किया जाता है।',
              'The sanskar of giving a child a name after birth. It is the fifth of the sixteen sanskars. A syllable is derived from the nakshatra at the time of birth, and by tradition the name begins with that syllable.'),
  mahatva: t('मान्यता है कि नाम जीवन भर साथ चलता है और व्यक्ति की पहचान बनता है, इसलिए उसे यूँ ही नहीं, विधि से रखा जाता है। इस दिन बच्चे को पहली बार परिवार और समाज के सामने औपचारिक रूप से लाया जाता है, और बड़े बुज़ुर्ग आशीर्वाद देते हैं।',
             'It is believed that a name stays with a person all their life and becomes their identity, so it is given through a proper rite rather than casually. On this day the child is formally brought before family and community for the first time, and the elders give their blessing.'),
  kab:  t('परंपरा के अनुसार जन्म के ग्यारहवें, बारहवें या सोलहवें दिन। कुछ परिवारों में इसे इक्कीसवें दिन या पहले महीने के भीतर भी किया जाता है।',
             'By tradition on the eleventh, twelfth or sixteenth day after birth. Some families hold it on the twenty first day or within the first month.'),
  vidhi: [
    t('गणेश पूजन और नवग्रह का आवाहन', 'Ganesh pujan and invocation of the nine grahas'),
    t('जन्म नक्षत्र देखकर नाम का अक्षर निकालना', 'Working out the syllable of the name from the birth nakshatra'),
    t('हवन, फिर पिता या दादा का बच्चे के कान में नाम कहना', 'Havan, then the father or grandfather speaking the name into the child\'s ear'),
    t('बच्चे को सूर्य के दर्शन कराना', 'Showing the child the sun'),
    t('बड़ों का आशीर्वाद और प्रसाद वितरण', 'Blessings from the elders and distribution of prasad')
  ],
  dhyan: [
    t('नक्षत्र वाला अक्षर और घर में पुकारा जाने वाला नाम अलग अलग रखे जा सकते हैं, बहुत से परिवार ऐसा ही करते हैं',
      'The nakshatra syllable and the name used at home may be different, and many families do exactly that'),
    t('बच्चा छोटा है, इसलिए विधि छोटी और शांत रखिए, हवन का धुआँ ज़्यादा न हो',
      'The child is small, so keep the rite short and quiet, and do not let the havan smoke build up')
  ]
},

/* ─────────────────── 6 ─────────────────── */
{
  id: 'mundan', ic: '✂️',
  name: t('मुंडन संस्कार', 'Mundan Sanskar'),
  sub:  t('पहली बार बाल उतारना', 'The first cutting of the hair'),
  kya:  t('बच्चे के जन्म के बाद पहली बार सिर के बाल उतारने का संस्कार, जिसे चूड़ाकर्म भी कहते हैं। पूजा के बाद नाई बाल उतारता है और वे बाल जल में प्रवाहित किए जाते हैं या मंदिर में चढ़ाए जाते हैं।',
              'The sanskar of shaving a child\'s head for the first time after birth, also called Chudakarma. After the puja a barber removes the hair, which is then immersed in water or offered at a temple.'),
  mahatva: t('मान्यता है कि जन्म के समय के बाल उतारने से बच्चा शुद्ध होता है और उसका स्वास्थ्य अच्छा रहता है। बहुत से परिवार यह संस्कार अपने कुल देवता के मंदिर में जाकर कराते हैं, और खाटू श्याम जी, सालासर तथा मेहंदीपुर बालाजी में यह बहुत होता है।',
             'It is believed that removing the hair a child was born with purifies them and keeps them in good health. Many families hold this sanskar at the temple of their kul devata, and it is very commonly done at Khatu Shyam Ji, Salasar and Mehandipur Balaji.'),
  kab:  t('आम तौर पर पहले, तीसरे या पाँचवें वर्ष में, विषम वर्ष में करने की परंपरा है। शुभ तिथि और नक्षत्र देखकर दिन तय होता है।',
             'Usually in the first, third or fifth year, tradition favouring an odd numbered year. The day is fixed by looking at an auspicious tithi and nakshatra.'),
  vidhi: [
    t('गणेश पूजन और संकल्प', 'Ganesh pujan and the sankalp'),
    t('बच्चे को माता या मामा की गोद में बिठाना', 'The child seated in the lap of the mother or maternal uncle'),
    t('पंडित जी के मंत्र के साथ पहली लट काटना, फिर नाई पूरा मुंडन करता है',
      'The first lock cut to the pandit\'s mantras, after which the barber completes the shaving'),
    t('सिर पर हल्दी और चंदन का लेप', 'Turmeric and sandal paste applied to the head'),
    t('बाल जल में प्रवाहित करना या मंदिर में चढ़ाना', 'The hair immersed in water or offered at a temple')
  ],
  dhyan: [
    t('मुंडन के बाद सिर पर धूप और ठंड दोनों जल्दी लगते हैं, टोपी या कपड़ा साथ रखिए',
      'After the mundan the head feels both sun and cold quickly, so keep a cap or cloth handy'),
    t('धाम में मुंडन कराना हो तो बुकिंग के समय बता दीजिए, वहाँ की व्यवस्था अलग से देखनी पड़ती है',
      'If you want the mundan done at a dham, tell us at booking time, as arrangements there have to be looked at separately')
  ]
},

/* ─────────────────── 7 ─────────────────── */
{
  id: 'janeu', ic: '🧵',
  name: t('जनेऊ, उपनयन संस्कार', 'Janeu, Upanayan Sanskar'),
  sub:  t('यज्ञोपवीत धारण', 'Receiving the sacred thread'),
  kya:  t('यज्ञोपवीत यानी जनेऊ धारण करने का संस्कार, जिसे उपनयन कहते हैं। इसमें बालक को गायत्री मंत्र की दीक्षा दी जाती है और तीन धागों वाला जनेऊ पहनाया जाता है।',
              'The sanskar of receiving the yagyopavit, the sacred thread, known as Upanayan. The boy is initiated into the Gayatri mantra and the three stranded thread is placed on him.'),
  mahatva: t('मान्यता है कि इसी संस्कार से विद्या आरंभ होती है, इसीलिए इसे दूसरा जन्म भी कहा जाता है। जनेऊ के तीन धागे तीन ऋणों के प्रतीक माने जाते हैं: देव ऋण, ऋषि ऋण और पितृ ऋण। पहनने वाले से अपेक्षा रहती है कि वह संयम और सफ़ाई का नियम निभाए।',
             'It is believed that learning begins with this sanskar, which is why it is spoken of as a second birth. The three strands of the janeu are taken to stand for three debts, to the devas, to the rishis and to the ancestors. The wearer is expected to keep to a discipline of restraint and cleanliness.'),
  kab:  t('परंपरा के अनुसार बालक की आयु आठ से सोलह वर्ष के बीच। विवाह से पहले यह संस्कार करा लेने की परंपरा है, और बहुत जगह विवाह के दिन ही करा दिया जाता है।',
             'By tradition between the ages of eight and sixteen. Custom holds that it should be done before marriage, and in many places it is performed on the wedding day itself.'),
  vidhi: [
    t('गणेश पूजन, नवग्रह और हवन', 'Ganesh pujan, the nine grahas and havan'),
    t('बालक का मुंडन और स्नान', 'The boy\'s head shaved and a bath taken'),
    t('गुरु या पंडित जी द्वारा गायत्री मंत्र की दीक्षा, कान में', 'Initiation into the Gayatri mantra by the guru or pandit, spoken into the ear'),
    t('जनेऊ धारण और दंड, मेखला तथा मृगचर्म का ग्रहण', 'The janeu put on, along with the danda, mekhala and deerskin'),
    t('भिक्षा की परंपरा, पहले माता से', 'The custom of asking for bhiksha, beginning with the mother')
  ],
  dhyan: [
    t('जनेऊ पहनने के बाद कुछ नियम निभाने होते हैं, वे पंडित जी उसी दिन समझा देते हैं, परिवार भी सुन ले तो अच्छा',
      'Certain rules follow once the janeu is worn, and the pandit explains them the same day, so it is good if the family listens too'),
    t('धागा गंदा या टूट जाए तो बदला जाता है, फेंका नहीं जाता',
      'If the thread becomes soiled or breaks it is replaced, not discarded')
  ]
},

/* ─────────────────── 8 ─────────────────── */
{
  id: 'vivah', ic: '💒',
  name: t('विवाह और सगाई', 'Vivah and Sagai'),
  sub:  t('सोलह संस्कारों में सबसे बड़ा', 'The largest of the sixteen sanskars'),
  kya:  t('विवाह की पूरी विधि, जिसमें सगाई से लेकर फेरे और विदाई तक कई चरण होते हैं। मुख्य भाग कन्यादान, पाणिग्रहण, सात फेरे और सप्तपदी है, और अंत में ध्रुव तारे के दर्शन की परंपरा है।',
              'The complete wedding rite, running through several stages from the engagement to the pheras and the vidai. Its core is the kanyadan, the panigrahan, the seven pheras and the saptapadi, ending with the custom of viewing the pole star.'),
  mahatva: t('मान्यता है कि विवाह केवल दो लोगों का नहीं, दो परिवारों और दो परंपराओं का जुड़ाव है। सात फेरों में सात वचन लिए जाते हैं, और सप्तपदी के सातों क़दम अन्न, बल, धन, सुख, संतान, ऋतु और मित्रता के संकल्प माने जाते हैं। यही कारण है कि इसे सोलह संस्कारों में सबसे बड़ा कहा गया है।',
             'It is believed that a marriage joins not just two people but two families and two traditions. Seven vows are taken across the seven pheras, and the seven steps of the saptapadi are held to be resolutions for food, strength, wealth, happiness, children, the seasons and friendship. This is why it is called the greatest of the sixteen sanskars.'),
  kab:  t('विवाह के मुहूर्त पंचांग से निकाले जाते हैं और साल में गिने चुने दिन ही आते हैं। चातुर्मास, यानी देवशयनी एकादशी से देवउठनी एकादशी तक, विवाह नहीं किए जाते। खरमास में भी नहीं।',
             'Wedding muhurats are worked out from the panchang and fall on only a limited number of days in the year. Weddings are not held during Chaturmas, from Devshayani Ekadashi to Devuthani Ekadashi, nor during Kharmas.'),
  vidhi: [
    t('सगाई, तिलक और गणेश पूजन से शुरुआत', 'Beginning with the sagai, the tilak and Ganesh pujan'),
    t('हल्दी, मंडप स्थापना और मातृका पूजन', 'Haldi, raising the mandap and matrika pujan'),
    t('वर पक्ष की अगवानी, जयमाला', 'Welcoming the groom\'s party, and the jaimala'),
    t('कन्यादान, पाणिग्रहण और अग्नि के सामने सात फेरे', 'Kanyadan, panigrahan and the seven pheras before the fire'),
    t('सप्तपदी, सिंदूर दान, मंगलसूत्र और ध्रुव तारे के दर्शन', 'Saptapadi, sindoor daan, the mangalsutra and the viewing of the pole star')
  ],
  dhyan: [
    t('मुहूर्त के दिन गिने चुने होते हैं, इसलिए तारीख़ महीनों पहले निकलवा लीजिए',
      'Muhurat days are few, so have the date worked out months in advance'),
    t('दोनों परिवारों की परंपरा में थोड़ा अंतर होता है, विधि पहले ही बैठकर तय कर लेना सबसे अच्छा रहता है',
      'The two families\' traditions usually differ a little, so it is best to sit together and settle the vidhi beforehand')
  ]
},

/* ─────────────────── 9 ─────────────────── */
{
  id: 'bhagwat-katha', ic: '📖',
  name: t('भागवत कथा और अखंड रामायण', 'Bhagwat Katha and Akhand Ramayan'),
  sub:  t('कई दिन चलने वाला आयोजन', 'An observance running several days'),
  kya:  t('श्रीमद्भागवत कथा आम तौर पर सात दिन चलती है, जिसे सप्ताह कहते हैं, और इसमें व्यास गद्दी पर बैठकर कथावाचक प्रसंग सुनाते हैं। अखंड रामायण में रामचरितमानस का पूरा पाठ बिना रुके चौबीस घंटे में पूरा किया जाता है।',
              'A Shrimad Bhagwat Katha usually runs seven days, called a saptah, with the kathavachak narrating from the vyas gaddi. In an Akhand Ramayan the whole Ramcharitmanas is recited without a break and completed within twenty four hours.'),
  mahatva: t('मान्यता है कि कथा सुनने से मन शांत होता है और घर का वातावरण बदलता है। ये आयोजन अकेले नहीं होते, पूरा मोहल्ला या परिवार जुड़ता है, इसीलिए इन्हें साथ बैठने का अवसर भी माना जाता है। बहुत से परिवार किसी के जाने के बाद उनकी स्मृति में यह कराते हैं।',
             'It is believed that hearing the katha settles the mind and changes the atmosphere of a home. These are not solitary observances, the whole neighbourhood or family gathers, which is why they are also seen as an occasion for sitting together. Many families hold one in memory of someone who has passed away.'),
  kab:  t('अखंड रामायण चौबीस घंटे की होती है, इसलिए एक दिन में पूरी हो जाती है। भागवत सप्ताह के लिए सात दिन चाहिए और उसके लिए जगह, बैठने की व्यवस्था और भोजन की तैयारी पहले से करनी पड़ती है।',
             'An Akhand Ramayan lasts twenty four hours and so is completed in a day. A Bhagwat saptah needs seven days, and the space, seating and food have to be arranged well in advance.'),
  vidhi: [
    t('कलश यात्रा और व्यास गद्दी की स्थापना', 'The kalash yatra and the setting up of the vyas gaddi'),
    t('रोज़ तय समय पर कथा, बीच में भजन और आरती', 'The katha at a fixed time each day, with bhajans and aarti between'),
    t('अखंड पाठ में पाठ करने वाले बारी बारी बैठते हैं ताकि पाठ रुके नहीं',
      'In an akhand paath the reciters take turns so the recitation never stops'),
    t('अंतिम दिन हवन और पूर्णाहुति', 'Havan and purnahuti on the final day'),
    t('भंडारा या प्रसाद वितरण', 'A bhandara or the distribution of prasad')
  ],
  dhyan: [
    t('इसमें एक से ज़्यादा पंडित जी और कथावाचक लगते हैं, इसलिए बहुत पहले से बताना पड़ता है',
      'This needs more than one pandit and a kathavachak, so it has to be arranged far in advance'),
    t('जगह, बैठने की व्यवस्था, बिजली और भोजन की तैयारी आयोजक को ही देखनी होती है',
      'The space, seating, electricity and food are for the host to arrange')
  ]
},

/* ─────────────────── 10 ─────────────────── */
{
  id: 'navratri', ic: '🪔',
  name: t('नवरात्रि और दुर्गा पूजा', 'Navratri and Durga Puja'),
  sub:  t('नौ दिन का व्रत और पूजन', 'Nine days of vrat and worship'),
  kya:  t('नौ दिनों तक माँ दुर्गा के नौ रूपों की पूजा, जिसमें पहले दिन कलश स्थापना होती है और नौ दिन अखंड ज्योति जलती रहती है। दुर्गा सप्तशती का पाठ किया जाता है और अष्टमी या नवमी को कन्या पूजन तथा हवन होता है।',
              'Nine days of worship of the nine forms of Durga, beginning with kalash sthapana on the first day and an akhand jyoti kept burning throughout. The Durga Saptashati is recited, and kanya pujan and havan are held on Ashtami or Navami.'),
  mahatva: t('मान्यता है कि इन नौ दिनों में शक्ति की उपासना का विशेष फल है। कन्या पूजन में छोटी बच्चियों को देवी का रूप मानकर भोजन कराया जाता है और भेंट दी जाती है, यही इस पर्व का सबसे सुंदर भाग माना जाता है। बहुत से घरों में इन दिनों नया काम शुरू किया जाता है।',
             'It is believed that worship of Shakti carries special merit through these nine days. In the kanya pujan young girls are regarded as forms of the goddess, fed and given gifts, which is held to be the loveliest part of the festival. In many homes new work is begun on these days.'),
  kab:  t('साल में चार नवरात्रि आती हैं, पर मुख्य दो हैं: चैत्र नवरात्रि (मार्च अप्रैल) और शारदीय नवरात्रि (सितंबर अक्टूबर)। कलश स्थापना का मुहूर्त प्रतिपदा को सुबह रहता है।',
             'There are four Navratris in the year, but two are principal: Chaitra Navratri around March and April, and Sharadiya Navratri around September and October. The muhurat for kalash sthapana falls on the morning of Pratipada.'),
  vidhi: [
    t('प्रतिपदा को कलश स्थापना और जौ बोना', 'Kalash sthapana and the sowing of barley on Pratipada'),
    t('अखंड ज्योति, जो नौ दिन बुझनी नहीं चाहिए', 'The akhand jyoti, which should not go out for nine days'),
    t('रोज़ देवी के एक रूप की पूजा और दुर्गा सप्तशती का पाठ', 'Daily worship of one form of the goddess and recitation of the Durga Saptashati'),
    t('अष्टमी या नवमी को कन्या पूजन, नौ कन्याएँ और एक बालक', 'Kanya pujan on Ashtami or Navami, nine girls and one boy'),
    t('हवन, पूर्णाहुति और दशमी को विसर्जन', 'Havan, purnahuti and the visarjan on Dashami')
  ],
  dhyan: [
    t('अखंड ज्योति जला रहे हैं तो घर में कोई न कोई रहना चाहिए, यह सुरक्षा की बात है',
      'If an akhand jyoti is lit, someone should always be at home, which is a matter of safety'),
    t('कन्या पूजन के लिए बच्चियों को पहले से कह रखिए, अष्टमी नवमी को सब जगह बुलावा रहता है',
      'Speak to the families of the girls in advance, since everyone is inviting them on Ashtami and Navami')
  ]
},

/* ─────────────────── 11 ─────────────────── */
{
  id: 'shraddh', ic: '🌾',
  name: t('श्राद्ध और तर्पण', 'Shraddh and Tarpan'),
  sub:  t('पितरों के लिए', 'For the ancestors'),
  kya:  t('पितरों के निमित्त किया जाने वाला कर्म, जिसमें जल से तर्पण, पिंडदान और ब्राह्मण भोजन होता है। पिंड चावल या जौ के आटे से बनाए जाते हैं और कुश तथा तिल के साथ अर्पित किए जाते हैं।',
              'The rite performed for the ancestors, comprising tarpan with water, pind daan and the feeding of brahmans. The pinds are made from rice or barley flour and offered along with kush grass and sesame.'),
  mahatva: t('मान्यता है कि जिन्होंने हमें जन्म और संस्कार दिए, उनके प्रति कृतज्ञता जताना संतान का कर्तव्य है, और श्राद्ध उसी कृतज्ञता का रूप है। कौए, गाय, कुत्ते और चींटी के लिए भी अंश निकाला जाता है, इसे यह याद दिलाने वाली परंपरा माना जाता है कि भोजन पर सबका हिस्सा है।',
             'It is believed that expressing gratitude to those who gave us birth and upbringing is a duty owed by their children, and shraddh is the form that gratitude takes. A portion is also set aside for the crow, the cow, the dog and the ant, a custom taken as a reminder that everyone has a share in food.'),
  kab:  t('पितृ पक्ष के सोलह दिनों में, और उसमें भी उसी तिथि को जिस तिथि को देहावसान हुआ था। जिनकी तिथि मालूम न हो उनके लिए अमावस्या, यानी सर्वपितृ अमावस्या रखी गई है। गया, हरिद्वार और प्रयाग में यह वर्ष भर होता है।',
             'During the sixteen days of Pitru Paksha, and on the same tithi as the day of passing. For those whose tithi is not known, the Amavasya, Sarvapitru Amavasya, is set aside. At Gaya, Haridwar and Prayag it is performed through the year.'),
  vidhi: [
    t('दक्षिण दिशा की ओर मुख, हाथ में कुश और तिल', 'Facing south, with kush grass and sesame in hand'),
    t('जल, तिल और जौ से तर्पण', 'Tarpan with water, sesame and barley'),
    t('चावल या जौ के आटे के पिंड बनाकर अर्पण', 'Pinds of rice or barley flour made and offered'),
    t('कौए, गाय, कुत्ते और चींटी के लिए अंश निकालना', 'Setting aside a portion for the crow, cow, dog and ant'),
    t('ब्राह्मण भोजन और यथाशक्ति दान', 'Feeding brahmans and giving daan according to one\'s means')
  ],
  dhyan: [
    t('तिथि पहले से मालूम कर लीजिए, यह अंग्रेज़ी तारीख़ से नहीं, तिथि से तय होती है',
      'Find out the tithi beforehand, as this is fixed by the tithi and not by the English date'),
    t('इन दिनों घर में सात्विक भोजन बनता है, लहसुन प्याज से परहेज़ की परंपरा है',
      'Satvik food is cooked at home on these days, and the custom is to avoid garlic and onion')
  ]
},

/* ─────────────────── 12 ─────────────────── */
{
  id: 'vahan-dukan', ic: '🚗',
  name: t('वाहन और दुकान की पूजा', 'Vehicle and shop puja'),
  sub:  t('थोड़े समय में हो जाने वाली', 'Done in a short sitting'),
  kya:  t('नई गाड़ी, नई दुकान, दफ़्तर या मशीन की पूजा। इसमें गणेश पूजन, नारियल फोड़ना, नींबू और मौली बाँधना तथा स्वस्तिक बनाना होता है। दुकान की पूजा में लक्ष्मी जी और कुबेर का पूजन भी जोड़ा जाता है।',
              'The puja for a new vehicle, shop, office or machine. It involves Ganesh pujan, breaking a coconut, tying a lemon and mauli, and drawing a swastik. For a shop, worship of Lakshmi and Kubera is added.'),
  mahatva: t('मान्यता है कि कोई भी नया काम शुरू करने से पहले गणेश जी का स्मरण किया जाता है, ताकि काम बिना विघ्न चले। वाहन पूजा में सुरक्षित यात्रा की कामना की जाती है, और दुकान की पूजा में बरकत की। यह सबसे छोटी पूजा है, आधे घंटे से भी कम में हो जाती है।',
             'It is believed that Ganesh should be remembered before any new undertaking so that it proceeds without obstruction. A vehicle puja carries a wish for safe travel, and a shop puja a wish for prosperity. It is the shortest of these pujas and takes less than half an hour.'),
  kab:  t('गाड़ी या दुकान लेने के दिन ही, या उसके बाद पहले शुभ मुहूर्त में। नवरात्रि, दशहरा, धनतेरस और दीपावली को नया सामान लेना विशेष शुभ माना जाता है।',
             'On the day the vehicle or shop is taken, or at the first auspicious muhurat after. Navratri, Dussehra, Dhanteras and Diwali are held to be especially auspicious for acquiring something new.'),
  vidhi: [
    t('गणेश पूजन और संकल्प', 'Ganesh pujan and the sankalp'),
    t('गाड़ी या गल्ले पर स्वस्तिक और मौली', 'A swastik and mauli on the vehicle or the cash box'),
    t('नारियल फोड़ना और नींबू रखना', 'Breaking a coconut and placing a lemon'),
    t('दुकान की पूजा में लक्ष्मी और कुबेर का पूजन', 'Worship of Lakshmi and Kubera in a shop puja'),
    t('आरती और प्रसाद वितरण', 'Aarti and the distribution of prasad')
  ],
  dhyan: [
    t('नारियल खुली जगह पर फोड़िए, बंद जगह में काँच या सामान को नुक़सान हो सकता है',
      'Break the coconut in an open space, as doing it indoors can damage glass or goods'),
    t('गाड़ी की पूजा सड़क के बीच में मत कीजिए, किनारे या पार्किंग में कराइए',
      'Do not perform a vehicle puja in the middle of the road, use the side or a parking area')
  ]
}
];

/* ═══════════════════════════════════════════════════════════
   बाक़ी शब्द
   ═══════════════════════════════════════════════════════════ */
const LBL = {
  kya:     t('क्या है', 'What it is'),
  mahatva: t('महत्व', 'Significance'),
  kab:     t('कब की जाती है', 'When it is done'),
  vidhi:   t('विधि में क्या होता है', 'What the vidhi involves'),
  dhyan:   t('ध्यान रखें', 'Worth keeping in mind'),
  ask:     t('💬 इस पूजा के लिए पंडित जी पूछें', '💬 Ask about a pandit for this puja'),

  /* 🔴 यह पंक्ति हटाइए मत, §4 नियम 4 और §11 दोनों इसी पर टिके हैं */
  foot: t('🙏 ये सब बातें श्रद्धा और परंपरा पर आधारित हैं। क्षेत्र, परिवार और गुरु-परंपरा के अनुसार पूजा की विधि में अंतर मिलता है, इसलिए अपने पंडित जी और घर के बड़ों से पूछ लेना सबसे अच्छा रहता है। कोई बात सुधारने योग्य लगे तो हमें WhatsApp पर ज़रूर बताइए, हम उसे ठीक कर देंगे।',
           '🙏 All of this rests on faith and tradition. The vidhi varies by region, family and guru-parampara, so it is always best to ask your own pandit and the elders of your house. If anything here deserves correction, please tell us on WhatsApp and we will set it right.'),

  panditPage: t('🕉️ पंडित जी की सेवा और बुकिंग देखें', '🕉️ See the Pandit Ji seva and how to book'),
  panchang:   t('🗓️ मुहूर्त के लिए पूरा पंचांग देखें', '🗓️ See the full panchang for the muhurat'),
  katha:      t('📖 सातों धामों की कथा पढ़ें', '📖 Read the stories of all seven dhams'),
  home:       t('← मुख्य पेज', '← Home'),
  book:       t('बुक करें', 'Book now'),
  ctaHead:    t('कौन सी पूजा करानी है? 🙏', 'Which puja do you want performed? 🙏'),
  ctaSub:     t('पूजा का नाम और दिन बता दीजिए, मुहूर्त और पंडित जी दोनों की व्यवस्था हो जाएगी।',
                'Tell us the puja and the day, and both the muhurat and the pandit will be arranged.'),
  ctaWa:      t('WhatsApp करें', 'Message on WhatsApp'),
  topbar:     t('जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा', 'Jai Shri Shyam, weekly yatras'),
  rights:     t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')
};

/* ═══════════════════════════════════════════════════════════
   HTML
   ═══════════════════════════════════════════════════════════ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const wa = txt => `https://wa.me/917289902692?text=${encodeURIComponent(txt)}`;

function collectEN() {
  const out = {};
  const add = o => { if (o && o.hi && o.en && o.hi !== o.en) out[o.hi] = o.en; };

  add(HEAD.title); add(HEAD.eyebrow); add(HEAD.h1); add(HEAD.lede);
  POOJA.forEach(p => {
    add(p.name); add(p.sub); add(p.kya); add(p.mahatva); add(p.kab);
    p.vidhi.forEach(add); (p.dhyan || []).forEach(add);
  });
  Object.values(LBL).forEach(add);
  return out;
}

/* एक पूजा का पूरा हिस्सा, बिल्कुल katha.html के .kfull जैसा */
const article = p => `      <article class="kfull" id="${p.id}">
        <header class="kfull__head">
          <span class="kfull__icon" aria-hidden="true">${p.ic}</span>
          <div>
            <h2>${esc(p.name.hi)}</h2>
            <p>${esc(p.sub.hi)}</p>
          </div>
        </header>

        <h3 class="kfull__label">${esc(LBL.kya.hi)}</h3>
        <p class="kfull__story">${esc(p.kya.hi)}</p>

        <h3 class="kfull__label">${esc(LBL.mahatva.hi)}</h3>
        <p class="kfull__story">${esc(p.mahatva.hi)}</p>

        <h3 class="kfull__label">${esc(LBL.kab.hi)}</h3>
        <p class="kfull__story">${esc(p.kab.hi)}</p>

        <h3 class="kfull__label">${esc(LBL.vidhi.hi)}</h3>
        <ul class="kfull__list kfull__list--vidhi">${
          p.vidhi.map(v => `<li>${esc(v.hi)}</li>`).join('')}</ul>
${p.dhyan && p.dhyan.length ? `
        <h3 class="kfull__label">${esc(LBL.dhyan.hi)}</h3>
        <ul class="kfull__list kfull__list--dhyan">${
          p.dhyan.map(d => `<li>${esc(d.hi)}</li>`).join('')}</ul>
` : ''}
        <a class="btn btn--sm btn--primary" href="${wa('Jai Shri Shyam! ' + p.name.en + ' ke liye Pandit Ji ki jaankari chahiye.')}"
           target="_blank" rel="noopener">${esc(LBL.ask.hi)}</a>
      </article>`;

/* ── schema, Article + ItemList + BreadcrumbList + TravelAgency ── */
function schema() {
  const url = `${SITE}/${SLUG}`;
  const art = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: HEAD.h1.hi,
    description: HEAD.metaDesc.hi,
    inLanguage: 'hi-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author:    { '@id': `${SITE}/#business` },
    publisher: { '@id': `${SITE}/#business` },
    /* ⚠️ सामग्री बदलें तो यह तारीख़ भी बदलिए, वरना AI इसे बासी मान
       सकता है (§12 में कथा पेज के लिए यही चेतावनी लिखी है) */
    dateModified: TODAY,
    about: POOJA.map(p => ({ '@type': 'Thing', name: p.name.hi }))
  };
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: HEAD.h1.hi,
    numberOfItems: POOJA.length,
    itemListElement: POOJA.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name.hi,
      url: `${url}#${p.id}`
    }))
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'मुख्य पेज', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'पंडित जी सेवा', item: `${SITE}/pandit-ji` },
      { '@type': 'ListItem', position: 3, name: HEAD.h1.hi, item: url }
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
  return [art, list, crumbs, biz]
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
}

function page() {
  const url = `${SITE}/${SLUG}`;
  const EN  = collectEN();

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

<!-- ⚠️ यह फ़ाइल build-pooja.js से बनी है, हाथ से मत बदलिए -->
${schema()}
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
    <p class="eyebrow center">${esc(HEAD.eyebrow.hi)}</p>
    <h1 class="sec__title">${esc(HEAD.h1.hi)}</h1>
    <p class="sec__lede">${esc(HEAD.lede.hi)}</p>
  </div>
</section>

<!-- ══ बारह पूजाएँ ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">

${POOJA.map(article).join('\n\n')}

    <p class="note ypage__note">${esc(LBL.foot.hi)}</p>
  </div>
</section>

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="sec sec--alt">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/pandit-ji">${esc(LBL.panditPage.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/panchang">${esc(LBL.panchang.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/katha">${esc(LBL.katha.hi)}</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(LBL.ctaHead.hi)}</h2>
    <p>${esc(LBL.ctaSub.hi)}</p>
    <div class="cta__btns">
      <a class="btn btn--ghostlight btn--lg" href="${wa(HEAD.wa)}" target="_blank" rel="noopener">${esc(LBL.ctaWa.hi)}</a>
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

<!-- floating whatsapp -->
<a class="fab" href="${wa(HEAD.wa)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 015.5 16c0-5.8 4.7-10.5 10.5-10.5S26.5 10.2 26.5 16 21.8 26.6 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.6 8.6 0 01-2.5-1.6 9.6 9.6 0 01-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5c0-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
</a>

<!-- इस पेज का अनुवाद, build-pooja.js से बना। i18n.js इसे उठा लेती है। -->
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
    console.error('\n  इन्हें build-pooja.js में t(हिन्दी, English) से लिखिए, फिर दोबारा चलाइए।\n');
    process.exit(1);
  }
}

function checkDash(html) {
  const bad = (html.match(/[—–]/g) || []).length;
  if (bad) {
    console.error(`\n  ❌ ${SLUG}.html में ${bad} डैश मिले (§4 नियम 5)। कॉमा या कोलन लगाइए।\n`);
    process.exit(1);
  }
}

/* 🔴 /pandit-ji की सूची से गिनती मिलती है या नहीं, यह भी जाँच लो।
   दोनों पेज अलग बात कहें तो भरोसा टूटता है। */
function checkCount() {
  const src = fs.readFileSync(path.join(__dirname, 'build-pandit.js'), 'utf8');
  const n = (src.match(/\{ ic: '/g) || []).length;
  /* build-pandit.js में POOJA की 12 + SEVA की 6 = 18 कार्ड हैं */
  if (n - 6 !== POOJA.length) {
    console.warn(`\n  ⚠️  गिनती नहीं मिल रही: यहाँ ${POOJA.length} पूजाएँ हैं, /pandit-ji पर ${n - 6}।`);
    console.warn('      दोनों जगह एक जैसी रखिए, और build-pandit.js के FACTS में लिखा अंक भी।\n');
  }
}

/* ═══════════════════════════════════════════════════════════
   लिखो
   ═══════════════════════════════════════════════════════════ */
const html = page();
checkTranslations(html, collectEN(), i18nKeys());
checkDash(html);
checkCount();
fs.writeFileSync(path.join(__dirname, SLUG + '.html'), html, 'utf8');

const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                  .replace(/<[^>]+>/g, ' ')
                  .split(/\s+/).filter(Boolean).length;
const chars = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;

console.log(`  ✅ ${SLUG}.html   (${POOJA.length} पूजाएँ, ${words} शब्द / ${chars} अक्षर Googlebot को दिखते हैं)`);
console.log(`  ℹ️  sitemap.xml build-yatra.js से बनती है, वहाँ ${SLUG} जुड़ा होना चाहिए।`);

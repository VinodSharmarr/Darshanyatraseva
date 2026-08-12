/* ═══════════════════════════════════════════════════════════
   build-yatra.js, चारों यात्राओं के अलग पेज बनाता है

   क्यों बने (12 अगस्त 2026):
   साइट पर कुल 3 पेज थे और Google में एक भी नहीं आया था। Vinod की अपनी
   दूसरी साइट (vnextoverseas.com, 42 पेज, 89 दिन पुरानी) उसी Vercel और
   उसी GoDaddy पर होते हुए भी खोज में आ रही थी। फ़र्क़ पेजों की गिनती और
   उनके ढंग का था: वहाँ हर पेज एक ही सवाल का जवाब देता है।

   यहाँ चारों यात्राएँ मुख्य पेज पर सिर्फ़ कार्ड थीं। अब हर यात्रा का
   अपना पेज है, ताकि "दिल्ली से खाटू श्याम कितनी दूर है" जैसी खोज का
   अपना दरवाज़ा बने। यह वो हिस्सा है जो GBP के इंतज़ार पर टिका नहीं है।

   🔴 चलाने का तरीक़ा:
       node build-yatra.js

   ⚠️ बनी हुई .html फ़ाइलों में हाथ से कुछ मत लिखना, यह script उन्हें
      हर बार मिटाकर दोबारा लिखता है। बदलाव नीचे YATRAS में कीजिए।

   ⚠️ अनुवाद यहीं साथ-साथ रखा है (hi/en), i18n.js में नहीं। वजह:
      HTML और अनुवाद दोनों एक ही जगह से बनते हैं, इसलिए §4 नियम 2 वाली
      "हूबहू मिलान टूट गया" वाली गड़बड़ी यहाँ हो ही नहीं सकती।
      पेज `window.EN_EXTRA` में अनुवाद रखता है और i18n.js उसे उठा लेती है।

   ⚠️ §4 नियम 1: असली दाम कहीं मत लिखना। सिर्फ़ काटा हुआ दाम और
      "ऑफ़र पूछें" वाला WhatsApp लिंक, बिल्कुल मुख्य पेज के कार्ड जैसा।
   ⚠️ §4 नियम 5: लंबी डैश और छोटी डैश, दोनों नहीं। कॉमा/कोलन लगाइए।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.darshanyatraseva.com';
const V    = 22;                      // ?v= , §8 देखें
const TODAY = '2026-08-12';

/* ── छोटा सहायक: हिन्दी + अंग्रेज़ी एक साथ ── */
const t = (hi, en) => ({ hi, en });

/* ═══════════════════════════════════════════════════════════
   चारों यात्राओं की सामग्री
   ═══════════════════════════════════════════════════════════ */
const YATRAS = [

/* ─────────────────── 1. खाटू श्याम जी ─────────────────── */
{
  slug: 'khatu-shyam-yatra',
  katha: 'khatu',
  img: 'yatra/khatu.jpg',
  imgAlt: t('खाटू श्याम मंदिर का मुख्य द्वार, सीकर राजस्थान',
            'The main gate of Khatu Shyam temple, Sikar, Rajasthan'),
  priceOld: '₹2,398',
  wa: 'Jai Shri Shyam! Khatu Shyam Ji yatra ki poori jaankari aur best offer bataayein.',

  title: t('दिल्ली से खाटू श्याम यात्रा, 261 किमी, रात्रि प्रस्थान | Darshan Yatra Seva',
           'Khatu Shyam Yatra from Delhi, 261 km, Night Departure | Darshan Yatra Seva'),
  metaDesc: t('दिल्ली से खाटू श्याम जी लगभग 261 किमी, सड़क से 5 से 6 घंटे। रात को प्रस्थान, सुबह दर्शन, दोपहर तक वापसी। AC वाहन, प्रसाद, पानी और दर्शन लाइन में सहायता शामिल।',
              'Khatu Shyam Ji is about 261 km from Delhi, 5 to 6 hours by road. Night departure, morning darshan, return by afternoon. AC vehicle, prasad, water and help in the darshan queue included.'),

  eyebrow: t('दिल्ली से खाटू श्याम जी', 'Delhi to Khatu Shyam Ji'),
  h1: t('दिल्ली से खाटू श्याम यात्रा', 'Khatu Shyam Yatra from Delhi'),
  lede: t('श्री श्याम मंदिर, खाटू, ज़िला सीकर, राजस्थान। रात को दिल्ली से गाड़ी चलती है, सुबह बाबा के दरबार में दर्शन होते हैं, और दोपहर तक आप घर वापस।',
          'Shri Shyam Mandir at Khatu, district Sikar, Rajasthan. The vehicle leaves Delhi at night, darshan is in the morning, and you are back home by afternoon.'),

  facts: [
    { b: '~261', s: t('किमी, दिल्ली से', 'km from Delhi') },
    { b: t('5 से 6', '5 to 6'), s: t('घंटे, एक तरफ़', 'hours each way') },
    { b: t('रात', 'Night'), s: t('दिल्ली से प्रस्थान', 'departure from Delhi') },
    { b: '1', s: t('दिन में वापसी', 'day, round trip') }
  ],

  intro: t('खाटू श्याम जी दिल्ली से सबसे ज़्यादा जाने वाला धाम है, और हमारी सबसे नियमित यात्रा भी यही है। रास्ता दिल्ली से रींगस होते हुए खाटू तक जाता है। रात को चलने का फ़ायदा यह है कि सोते हुए सफ़र कट जाता है, सुबह की ताज़ा हवा में दर्शन होते हैं, और भीड़ भी सुबह अपेक्षाकृत कम मिलती है।',
           'Khatu Shyam Ji is the dham most travelled to from Delhi, and it is our most regular yatra as well. The road runs from Delhi through Reengus to Khatu. The advantage of leaving at night is that the journey passes while you sleep, darshan happens in the fresh morning air, and the crowd is usually lighter early in the day.'),

  steps: [
    { n: '1', h: t('रात को प्रस्थान', 'Night departure'),
             p: t('आपके तय पिकअप पॉइंट से गाड़ी उठाती है। पूरे रास्ते भजन और कीर्तन चलता है।',
                  'The vehicle picks you up from your assigned point. Bhajan and kirtan play through the journey.') },
    { n: '2', h: t('सुबह दर्शन', 'Morning darshan'),
             p: t('सुबह खाटू पहुँचकर दर्शन। लाइन में हमारा यात्रा सहायक साथ रहता है।',
                  'You reach Khatu in the morning for darshan. Our travel assistant stays with you in the queue.') },
    { n: '3', h: t('दोपहर तक वापसी', 'Back by afternoon'),
             p: t('दर्शन और प्रसाद के बाद वापसी। शाम तक आप अपने घर पहुँच जाते हैं।',
                  'We return after darshan and prasad. You are home by evening.') }
  ],

  tips: {
    label: t('जाने से पहले यह जान लीजिए', 'Worth knowing before you go'),
    list: [
      t('एकादशी बाबा का दिन है, हर शुक्ल एकादशी पर विशेष दर्शन होते हैं और भीड़ भी उसी दिन सबसे ज़्यादा रहती है',
        'Ekadashi is Baba\'s day. There is special darshan on every Shukla Ekadashi, and that is also when the crowd is heaviest'),
      t('फाल्गुन शुक्ल एकादशी से द्वादशी तक का लक्खी मेला सबसे बड़ा अवसर होता है, उन तिथियों पर सीटें 3 से 4 सप्ताह पहले भर जाती हैं',
        'The Lakkhi Mela from Phalguna Shukla Ekadashi to Dwadashi is the biggest occasion. Seats for those dates fill up 3 to 4 weeks in advance'),
      t('बहुत से भक्त निशान (ध्वजा) लेकर रींगस से लगभग 17 किमी नंगे पाँव चलते हैं, ऐसी व्यवस्था चाहिए तो बुकिंग के समय बता दीजिए',
        'Many devotees walk the roughly 17 km from Reengus barefoot carrying a nishan (flag). Tell us at booking time if you want this arranged'),
      t('चूरमा का भोग, इत्र और मोर पंख चढ़ाने की परंपरा है, ये सब खाटू में ही मिल जाते हैं',
        'Churma bhog, itr and peacock feathers are the traditional offerings, and all are available at Khatu itself')
    ]
  },

  faq: [
    { q: t('दिल्ली से खाटू श्याम कितनी दूर है और कितना समय लगता है?',
           'How far is Khatu Shyam from Delhi and how long does it take?'),
      a: t('दिल्ली से खाटू श्याम जी लगभग 261 किमी है और सड़क मार्ग से 5 से 6 घंटे लगते हैं। हमारी यात्रा रात को दिल्ली से चलती है, सुबह दर्शन होते हैं और दोपहर तक वापसी हो जाती है।',
           'Khatu Shyam Ji is about 261 km from Delhi and takes 5 to 6 hours by road. Our yatra leaves Delhi at night, darshan is in the morning, and we return by afternoon.') },
    { q: t('क्या एक ही दिन में जाकर लौटा जा सकता है?', 'Can it be done in a single day?'),
      a: t('जी हाँ, यही हमारी नियमित यात्रा है। रात को प्रस्थान होता है, इसलिए सफ़र सोते हुए कट जाता है और अगले दिन दोपहर तक आप वापस आ जाते हैं। अलग से छुट्टी लेने की ज़रूरत नहीं पड़ती।',
           'Yes, that is our regular yatra. Since we leave at night the journey passes while you sleep, and you are back by the next afternoon. You do not need to take separate leave.') },
    { q: t('बुज़ुर्ग यात्रियों के लिए क्या व्यवस्था रहती है?', 'What is arranged for elderly pilgrims?'),
      a: t('आगे की सीट, चढ़ने-उतरने में मदद, दर्शन की लाइन में साथ, और पहले से बताने पर व्हीलचेयर की व्यवस्था। हमारे ज़्यादातर यात्री बुज़ुर्ग ही होते हैं, पूरी यात्रा उसी हिसाब से चलती है।',
           'Front seats, help boarding and alighting, accompaniment in the darshan queue, and a wheelchair arranged if you tell us in advance. Most of our pilgrims are elderly, and the whole yatra is run with that in mind.') },
    { q: t('क्या दर्शन की गारंटी है?', 'Is darshan guaranteed?'),
      a: t('नहीं, और यह हम साफ़ कह देते हैं। मंदिर की भीड़, लाइन की लंबाई और मंदिर प्रशासन के फ़ैसले हमारे हाथ में नहीं होते। हम लाइन में साथ रहते हैं और जो भी मदद हो सकती है वो करते हैं, पर दर्शन का वादा कोई नहीं कर सकता।',
           'No, and we say so plainly. Temple crowding, queue length and the temple administration\'s decisions are not in our hands. We stay with you in the queue and help however we can, but nobody can promise darshan.') }
  ],

  kathaLine: t('📖 खाटू श्याम जी की कथा और पूजा की विधि पढ़ें',
               '📖 Read the story and puja method of Khatu Shyam Ji')
},

/* ─────────────────── 2. वृंदावन, मथुरा ─────────────────── */
{
  slug: 'vrindavan-mathura',
  katha: 'vrindavan',
  img: 'yatra/vrindavan.jpg',
  imgAlt: t('वृंदावन का प्रेम मंदिर, सफ़ेद संगमरमर की भव्य इमारत',
            'Prem Mandir in Vrindavan, a grand white marble temple'),
  priceOld: '₹1,798',
  wa: 'Jai Shri Shyam! Vrindavan Mathura yatra ki poori jaankari aur best offer bataayein.',

  title: t('एक दिन में वृंदावन मथुरा यात्रा, दिल्ली से 160 किमी | Darshan Yatra Seva',
           'Vrindavan Mathura in One Day, 160 km from Delhi | Darshan Yatra Seva'),
  metaDesc: t('दिल्ली से वृंदावन लगभग 160 किमी, यमुना एक्सप्रेसवे से करीब 3 घंटे। बांके बिहारी, प्रेम मंदिर, ISKCON, निधिवन और मथुरा जन्मभूमि, सब एक ही दिन में।',
              'Vrindavan is about 160 km from Delhi, around 3 hours via the Yamuna Expressway. Banke Bihari, Prem Mandir, ISKCON, Nidhivan and Mathura Janmabhoomi, all in a single day.'),

  eyebrow: t('दिल्ली से वृंदावन और मथुरा', 'Delhi to Vrindavan and Mathura'),
  h1: t('एक दिन में वृंदावन मथुरा यात्रा', 'Vrindavan Mathura Yatra in One Day'),
  lede: t('बांके बिहारी, प्रेम मंदिर, ISKCON, निधिवन और मथुरा जन्मभूमि। सुबह निकलकर रात तक वापसी, ब्रज के पाँच प्रमुख दर्शन एक ही दिन में।',
          'Banke Bihari, Prem Mandir, ISKCON, Nidhivan and Mathura Janmabhoomi. Leave in the morning and return by night, five principal darshans of Braj in a single day.'),

  facts: [
    { b: '~160', s: t('किमी, दिल्ली से', 'km from Delhi') },
    { b: '~3', s: t('घंटे, एक तरफ़', 'hours each way') },
    { b: '5', s: t('प्रमुख मंदिर', 'principal temples') },
    { b: '1', s: t('दिन, सुबह से रात', 'day, morning to night') }
  ],

  intro: t('वृंदावन और मथुरा दिल्ली के सबसे पास वाला बड़ा धाम है, इसलिए यह यात्रा एक ही दिन में आराम से पूरी हो जाती है। रास्ता यमुना एक्सप्रेसवे से जाता है, जो सीधा और अच्छा है। सुबह जल्दी निकलने से दिन भर में पाँचों जगह के दर्शन बन जाते हैं और शाम को प्रेम मंदिर का लाइट शो भी देखने को मिल जाता है।',
           'Vrindavan and Mathura form the nearest major dham to Delhi, so this yatra is comfortably done in a single day. The route runs along the Yamuna Expressway, which is straight and in good condition. Leaving early lets you cover all five sites through the day and still catch the Prem Mandir light show in the evening.'),

  steps: [
    { n: '1', h: t('सुबह प्रस्थान', 'Morning departure'),
             p: t('तड़के दिल्ली से चलकर यमुना एक्सप्रेसवे होते हुए वृंदावन।',
                  'We leave Delhi early and reach Vrindavan via the Yamuna Expressway.') },
    { n: '2', h: t('दिन भर दर्शन', 'Darshan through the day'),
             p: t('बांके बिहारी, निधिवन, ISKCON, फिर मथुरा जन्मभूमि के दर्शन।',
                  'Banke Bihari, Nidhivan, ISKCON, and then Mathura Janmabhoomi.') },
    { n: '3', h: t('शाम को प्रेम मंदिर', 'Prem Mandir in the evening'),
             p: t('लाइट शो देखकर वापसी, रात तक दिल्ली पहुँच जाते हैं।',
                  'We watch the light show and head back, reaching Delhi by night.') }
  ],

  tips: {
    label: t('जाने से पहले यह जान लीजिए', 'Worth knowing before you go'),
    list: [
      t('यहाँ अभिवादन "राधे राधे" है, पहले राधा जी का नाम लिया जाता है, फिर कृष्ण का',
        'The greeting here is "Radhe Radhe", Radha\'s name comes first and then Krishna\'s'),
      t('मंदिर के अंदर फ़ोटो लेना मना है, और जन्मभूमि में मोबाइल तथा बैग अंदर नहीं जाते, उन्हें लॉकर में रखना पड़ता है',
        'Photography is not allowed inside the temples, and at Janmabhoomi phones and bags are not permitted inside, they must be left in a locker'),
      t('निधिवन में शाम की आरती के बाद कोई नहीं रुकता, यह वहाँ की पुरानी मान्यता है',
        'Nobody stays in Nidhivan after the evening aarti, this is an old belief of the place'),
      t('भीड़ बहुत रहती है, जेब और बच्चों का ध्यान रखिए। बुज़ुर्गों के लिए हमारे पास व्हीलचेयर सहायता है',
        'It gets very crowded, so keep an eye on your pockets and children. We can arrange wheelchair assistance for elders')
    ]
  },

  faq: [
    { q: t('दिल्ली से वृंदावन कितनी दूर है?', 'How far is Vrindavan from Delhi?'),
      a: t('दिल्ली से वृंदावन लगभग 160 किमी है और यमुना एक्सप्रेसवे से करीब 3 घंटे लगते हैं। मथुरा वहाँ से और थोड़ी दूर है, दोनों एक ही दिन में हो जाते हैं।',
           'Vrindavan is about 160 km from Delhi, around 3 hours via the Yamuna Expressway. Mathura is a little further on, and both fit into a single day.') },
    { q: t('कौन-कौन से मंदिर के दर्शन होते हैं?', 'Which temples are covered?'),
      a: t('बांके बिहारी मंदिर, प्रेम मंदिर, ISKCON मंदिर, निधिवन और मथुरा की कृष्ण जन्मभूमि। समय बचा तो रास्ते के और दर्शन भी करा दिए जाते हैं।',
           'Banke Bihari, Prem Mandir, the ISKCON temple, Nidhivan and the Krishna Janmabhoomi at Mathura. If time permits we cover further darshan along the way.') },
    { q: t('क्या पूरा परिवार लेकर जा सकते हैं?', 'Can the whole family come along?'),
      a: t('जी हाँ, यह हमारी सबसे आसान यात्रा है, इसलिए बच्चों और बुज़ुर्गों दोनों के साथ ठीक रहती है। पूरा वाहन बुक करना हो तो 17 सीटर टेम्पो ट्रैवलर और बस दोनों उपलब्ध हैं।',
           'Yes. This is our easiest yatra, so it suits both children and elders. If you want to book a whole vehicle, a 17 seater Tempo Traveller and buses are both available.') },
    { q: t('भोजन शामिल है या नहीं?', 'Are meals included?'),
      a: t('एक दिन की यात्राओं में भोजन शामिल नहीं होता। किराए में AC वाहन, टोल, पार्किंग, ड्राइवर, पानी की बोतल, मंदिर का प्रसाद और यात्रा सहायक की सेवा शामिल है।',
           'Meals are not included on one day yatras. The fare covers the AC vehicle, tolls, parking, driver, a water bottle, temple prasad and the travel assistant.') }
  ],

  kathaLine: t('📖 बांके बिहारी और वृंदावन की कथा पढ़ें',
               '📖 Read the story of Banke Bihari and Vrindavan')
},

/* ─────────────────── 3. मेहंदीपुर बालाजी ─────────────────── */
{
  slug: 'mehandipur-balaji',
  katha: 'mehandipur',
  img: 'yatra/mehandipur.jpg',
  imgAlt: t('मेहंदीपुर बालाजी का गर्भगृह, सुनहरे स्वरूप के दर्शन',
            'The sanctum of Mehandipur Balaji, the golden form in darshan'),
  priceOld: '₹2,398',
  wa: 'Jai Shri Shyam! Mehandipur Balaji yatra ki poori jaankari aur best offer bataayein.',

  title: t('दिल्ली से मेहंदीपुर बालाजी यात्रा, 245 किमी | Darshan Yatra Seva',
           'Mehandipur Balaji Yatra from Delhi, 245 km | Darshan Yatra Seva'),
  metaDesc: t('दिल्ली से मेहंदीपुर बालाजी लगभग 245 किमी, दौसा राजस्थान। सुबह 4 बजे प्रस्थान, एक दिन में वापसी। अर्जी की सामग्री और दर्शन विधि का पूरा मार्गदर्शन।',
              'Mehandipur Balaji is about 245 km from Delhi, in Dausa, Rajasthan. Departure at 4 AM, back the same day. Arji materials and full guidance on the darshan method.'),

  eyebrow: t('दिल्ली से मेहंदीपुर बालाजी', 'Delhi to Mehandipur Balaji'),
  h1: t('दिल्ली से मेहंदीपुर बालाजी यात्रा', 'Mehandipur Balaji Yatra from Delhi'),
  lede: t('मेहंदीपुर, ज़िला दौसा, राजस्थान। बालाजी महाराज, प्रेतराज सरकार और भैरव बाबा, तीनों दरबार के दर्शन। यहाँ की विधि अलग है, इसलिए हमारा सहायक पूरा तरीक़ा साथ रहकर बताता है।',
          'Mehandipur in Dausa district, Rajasthan. Darshan at all three courts: Balaji Maharaj, Pretraj Sarkar and Bhairav Baba. The method here is different, so our assistant stays with you and explains it step by step.'),

  facts: [
    { b: '~245', s: t('किमी, दिल्ली से', 'km from Delhi') },
    { b: '~6', s: t('घंटे, एक तरफ़', 'hours each way') },
    { b: t('4 बजे', '4 AM'), s: t('सुबह प्रस्थान', 'morning departure') },
    { b: '1', s: t('दिन में वापसी', 'day, round trip') }
  ],

  intro: t('मेहंदीपुर बालाजी की यात्रा बाक़ी धामों से थोड़ी अलग है। यहाँ दर्शन की अपनी विधि है और तीन दरबार में अलग-अलग अर्जी चढ़ती है। जो पहली बार आ रहे हों उन्हें अकसर यही समझ नहीं आता कि करना क्या है, इसीलिए हमारा यात्रा सहायक पूरे समय साथ रहता है और अर्जी की सामग्री की व्यवस्था भी पहले से करा देता है।',
           'The Mehandipur Balaji yatra is a little different from the other dhams. Darshan here follows its own method, and a separate arji is offered at each of the three courts. First time visitors often do not know what to do, which is why our travel assistant stays with you throughout and arranges the arji materials in advance.'),

  steps: [
    { n: '1', h: t('सुबह 4 बजे प्रस्थान', 'Departure at 4 AM'),
             p: t('जल्दी निकलना ज़रूरी है, ताकि दिन में दर्शन हो जाएँ और रात होने से पहले वापसी बने।',
                  'An early start matters so that darshan is done during the day and we return before nightfall.') },
    { n: '2', h: t('तीन दरबार के दर्शन', 'Darshan at three courts'),
             p: t('बालाजी महाराज, प्रेतराज सरकार और भैरव बाबा, तीनों की अर्जी अलग होती है।',
                  'Balaji Maharaj, Pretraj Sarkar and Bhairav Baba, each court has its own arji.') },
    { n: '3', h: t('उसी दिन वापसी', 'Return the same day'),
             p: t('दर्शन के बाद सीधी वापसी, रात तक दिल्ली पहुँच जाते हैं।',
                  'We head straight back after darshan and reach Delhi by night.') }
  ],

  tips: {
    label: t('यहाँ की परंपरा, ध्यान रखने वाली बातें', 'Local tradition, things to keep in mind'),
    list: [
      t('यहाँ का प्रसाद वहीं चढ़ाया जाता है, घर नहीं ले जाया जाता',
        'The prasad here is offered at the temple itself, it is not carried home'),
      t('लौटते समय पीछे मुड़कर नहीं देखते और रास्ते में कुछ खाते-पीते नहीं, यह वहाँ की पुरानी परंपरा है',
        'On the way back one does not look behind or eat and drink en route, this is the old tradition of the place'),
      t('आने से कुछ दिन पहले से लहसुन, प्याज, मांस और मदिरा से परहेज़ रखा जाता है',
        'For some days before coming, garlic, onion, meat and liquor are avoided'),
      t('हर परिवार की अपनी परंपरा होती है, वहाँ के पंडित जी से पूछ लेना सबसे अच्छा रहता है',
        'Every family has its own tradition, so it is best to ask the pandit ji there'),
      t('मान्यता अपनी जगह है, पर किसी की तबीयत ख़राब हो तो इलाज भी साथ चलता रहे, यही समझदारी है',
        'Belief has its place, but if someone is unwell the medical treatment should continue alongside, that is the sensible course')
    ]
  },

  faq: [
    { q: t('दिल्ली से मेहंदीपुर बालाजी कितनी दूर है?', 'How far is Mehandipur Balaji from Delhi?'),
      a: t('दिल्ली से मेहंदीपुर बालाजी लगभग 245 किमी है और सड़क मार्ग से करीब 6 घंटे लगते हैं। इसीलिए प्रस्थान सुबह 4 बजे रखा जाता है।',
           'Mehandipur Balaji is about 245 km from Delhi and takes around 6 hours by road. That is why departure is set for 4 AM.') },
    { q: t('अर्जी की सामग्री कहाँ से मिलती है?', 'Where do the arji materials come from?'),
      a: t('मंदिर के बाहर से अर्जी का प्रसाद मिल जाता है, जो तीनों दरबार में अलग-अलग चढ़ता है। हमारा सहायक इसकी व्यवस्था करा देता है, आपको ढूँढना नहीं पड़ता।',
           'The arji prasad is available outside the temple, and a separate portion is offered at each of the three courts. Our assistant arranges it, so you do not have to go looking for it.') },
    { q: t('पहली बार जा रहे हैं, क्या करना होता है?', 'Going for the first time, what needs to be done?'),
      a: t('यहाँ दर्शन की अपनी विधि है और पहली बार में उलझन होना आम बात है। हमारा यात्रा सहायक पूरे समय साथ रहता है और क्रम से बताता जाता है कि कहाँ क्या करना है।',
           'Darshan here follows its own method and confusion on a first visit is common. Our travel assistant stays with you the whole time and explains, in order, what to do where.') },
    { q: t('क्या बच्चों और बुज़ुर्गों को ले जाना ठीक रहेगा?', 'Is it suitable for children and elders?'),
      a: t('बुज़ुर्गों के लिए हम आगे की सीट और चढ़ने-उतरने की मदद देते हैं। यहाँ का माहौल बाक़ी धामों से अलग होता है, इसलिए छोटे बच्चों के साथ आने से पहले एक बार सोच लीजिए, और जो भी सवाल हो WhatsApp पर पूछ लीजिए।',
           'For elders we provide front seats and help boarding and alighting. The atmosphere here differs from the other dhams, so do think it over before bringing small children, and ask us anything on WhatsApp.') }
  ],

  kathaLine: t('📖 मेहंदीपुर बालाजी की कथा और विधि पढ़ें',
               '📖 Read the story and method of Mehandipur Balaji')
},

/* ─────────────────── 4. सालासर धाम ─────────────────── */
{
  slug: 'salasar-dham',
  katha: 'salasar',
  img: 'yatra/salasar.jpg',
  imgAlt: t('सालासर धाम का प्रवेश द्वार, चूरू राजस्थान',
            'The entrance gate of Salasar Dham, Churu, Rajasthan'),
  priceOld: '₹5,198',
  wa: 'Jai Shri Shyam! Salasar Dham yatra ki poori jaankari aur best offer bataayein.',

  title: t('दिल्ली से सालासर धाम यात्रा, 299 किमी | Darshan Yatra Seva',
           'Salasar Dham Yatra from Delhi, 299 km | Darshan Yatra Seva'),
  metaDesc: t('दिल्ली से सालासर बालाजी लगभग 299 किमी, चूरू राजस्थान। हम इसे खाटू श्याम के साथ 2 दिन 1 रात के पैकेज में कराते हैं, रात्रि विश्राम और भोजन सहित।',
              'Salasar Balaji is about 299 km from Delhi, in Churu, Rajasthan. We run it as a 2 day 1 night package together with Khatu Shyam, including the night stay and meals.'),

  eyebrow: t('दिल्ली से सालासर धाम', 'Delhi to Salasar Dham'),
  h1: t('दिल्ली से सालासर धाम यात्रा', 'Salasar Dham Yatra from Delhi'),
  lede: t('सालासर बालाजी, ज़िला चूरू, राजस्थान। दिल्ली से लगभग 299 किमी। हम इसे खाटू श्याम जी के साथ जोड़कर 2 दिन और 1 रात के पैकेज में कराते हैं, ताकि एक ही बार में दोनों धामों के दर्शन हो जाएँ।',
          'Salasar Balaji in Churu district, Rajasthan, about 299 km from Delhi. We run it combined with Khatu Shyam Ji as a 2 day, 1 night package, so both dhams are covered in a single trip.'),

  facts: [
    { b: '~299', s: t('किमी, दिल्ली से', 'km from Delhi') },
    { b: '~410', s: t('किमी, दोनों धाम', 'km, both dhams') },
    { b: '2', s: t('दिन, 1 रात', 'days, 1 night') },
    { b: t('वीकेंड', 'Weekend'), s: t('पर प्रस्थान', 'departure') }
  ],

  intro: t('सालासर बालाजी और खाटू श्याम जी पास-पास पड़ते हैं, इसलिए हम दोनों को एक ही यात्रा में जोड़ देते हैं। रास्ता नांगलोई से सालासर और फिर खाटू होते हुए बनता है, कुल लगभग 410 किमी। इसमें एक रात का ठहराव और दो समय का भोजन शामिल रहता है। सिर्फ़ सालासर जाना हो तो पूरी गाड़ी बुक कराई जा सकती है, उसके लिए WhatsApp पर बात कर लीजिए।',
           'Salasar Balaji and Khatu Shyam Ji lie close to each other, so we combine both into one yatra. The route runs from Nangloi to Salasar and then on to Khatu, about 410 km in all. One night\'s stay and two meals are included. If you want Salasar alone, a whole vehicle can be booked, just talk to us on WhatsApp.'),

  steps: [
    { n: '1', h: t('पहले दिन सालासर', 'Day one, Salasar'),
             p: t('दिल्ली से चलकर सालासर बालाजी के दर्शन, फिर रात्रि विश्राम।',
                  'We leave Delhi for darshan at Salasar Balaji, followed by the night halt.') },
    { n: '2', h: t('रात का ठहराव', 'The night halt'),
             p: t('होटल या धर्मशाला में एक रात, दो समय का भोजन शामिल।',
                  'One night at a hotel or dharamshala, with two meals included.') },
    { n: '3', h: t('दूसरे दिन खाटू', 'Day two, Khatu'),
             p: t('सुबह खाटू श्याम जी के दर्शन, उसके बाद दिल्ली वापसी।',
                  'Morning darshan at Khatu Shyam Ji, and then back to Delhi.') }
  ],

  tips: {
    label: t('जाने से पहले यह जान लीजिए', 'Worth knowing before you go'),
    list: [
      t('मनोकामना के लिए मंदिर परिसर में नारियल बाँधा जाता है, और पूरी होने पर लौटकर उसे खोलना होता है',
        'A coconut is tied in the temple precinct for a wish, and when it is fulfilled you return to untie it'),
      t('सवामणि यानी सवा मन चूरमा या लड्डू का भोग, मनोकामना पूरी होने पर चढ़ाया जाता है',
        'Sawamani, an offering of one and a quarter maund of churma or laddu, is made when a wish is fulfilled'),
      t('ध्वजा चढ़ाना और चरणों में सिंदूर तथा चोला अर्पित करना यहाँ की परंपरा है',
        'Offering a flag, and sindoor and chola at the feet, is the tradition here'),
      t('शनिवार और मंगलवार बालाजी के दिन माने जाते हैं, भीड़ भी उन्हीं दिनों सबसे ज़्यादा रहती है',
        'Saturday and Tuesday are considered Balaji\'s days, and the crowd is heaviest then')
    ]
  },

  faq: [
    { q: t('दिल्ली से सालासर धाम कितनी दूर है?', 'How far is Salasar Dham from Delhi?'),
      a: t('दिल्ली से सालासर बालाजी लगभग 299 किमी है। खाटू श्याम के साथ जोड़कर पूरा रास्ता लगभग 410 किमी बनता है, नांगलोई से सालासर और फिर खाटू।',
           'Salasar Balaji is about 299 km from Delhi. Combined with Khatu Shyam the full route comes to about 410 km, from Nangloi to Salasar and then Khatu.') },
    { q: t('क्या सिर्फ़ सालासर की यात्रा हो सकती है?', 'Can the yatra be to Salasar only?'),
      a: t('हमारी नियमित यात्रा खाटू श्याम के साथ जुड़ी हुई दो दिन की है, क्योंकि दोनों धाम पास-पास हैं और एक ही बार में हो जाते हैं। सिर्फ़ सालासर जाना हो तो पूरी गाड़ी बुक कराई जा सकती है, WhatsApp पर बता दीजिए।',
           'Our regular yatra is the two day trip combined with Khatu Shyam, since the two dhams are close together and both are covered in one go. For Salasar alone you can book a whole vehicle, just tell us on WhatsApp.') },
    { q: t('रात कहाँ रुकना होता है?', 'Where is the night halt?'),
      a: t('होटल या धर्मशाला में एक रात का ठहराव पैकेज में शामिल है, साथ में दो समय का भोजन भी। ठहरने की जगह यात्रा से पहले बता दी जाती है।',
           'One night at a hotel or dharamshala is part of the package, along with two meals. The place of stay is told to you before the yatra.') },
    { q: t('यह यात्रा किन दिनों चलती है?', 'Which days does this yatra run?'),
      a: t('आम तौर पर वीकेंड पर, क्योंकि दो दिन लगते हैं। आगामी तिथियाँ WhatsApp पर पूछ लीजिए, या पंचांग वाले पेज पर देख लीजिए कि किस दिन कौन सा पर्व पड़ रहा है।',
           'Usually on weekends, since it takes two days. Ask us on WhatsApp for upcoming dates, or check the panchang page to see which festival falls on which day.') }
  ],

  kathaLine: t('📖 सालासर बालाजी की कथा और पूजा विधि पढ़ें',
               '📖 Read the story and puja method of Salasar Balaji')
}
];

/* ═══════════════════════════════════════════════════════════
   सब पेजों पर एक जैसी सामग्री
   ═══════════════════════════════════════════════════════════ */
const INCLUDED = {
  head: t('किराए में क्या शामिल है', 'What the fare includes'),
  list: [
    { ic: '🚐', h: t('AC टेम्पो ट्रैवलर या बस', 'AC Tempo Traveller or bus'),
                p: t('वाहन का किराया, टोल, पार्किंग और ड्राइवर, सब किराए में।',
                     'Vehicle hire, tolls, parking and driver, all in the fare.') },
    { ic: '🍎', h: t('प्रसाद और पानी', 'Prasad and water'),
                p: t('हर यात्री को पानी की बोतल और मंदिर का प्रसाद, कोई छिपा शुल्क नहीं।',
                     'A water bottle and temple prasad for every pilgrim, no hidden charges.') },
    { ic: '🧑‍🦳', h: t('यात्रा सहायक साथ', 'A travel assistant with you'),
                p: t('पूरी यात्रा में एक सहायक साथ रहता है, दर्शन की लाइन में भी।',
                     'An assistant travels with the group throughout, including in the darshan queue.') },
    { ic: '🚇', h: t('मेट्रो से पिकअप', 'Pickup from the metro'),
                p: t('उत्तम नगर, द्वारका, रोहिणी, लक्ष्मी नगर, आनंद विहार, कश्मीरी गेट और अन्य।',
                     'Uttam Nagar, Dwarka, Rohini, Laxmi Nagar, Anand Vihar, Kashmere Gate and others.') },
    { ic: '🛡️', h: t('यात्रा बीमा कवर', 'Travel insurance cover'),
                p: t('हर यात्री का ट्रैवल इंश्योरेंस, सुरक्षा में कोई समझौता नहीं।',
                     'Travel insurance for every pilgrim, no compromise on safety.') },
    { ic: '📍', h: t('परिवार को लाइव लोकेशन', 'Live location for the family'),
                p: t('घरवालों को WhatsApp पर यात्रा की लाइव लोकेशन भेजी जाती है।',
                     'The family is sent the live location of the trip on WhatsApp.') }
  ],
  note: t('शामिल नहीं: एक दिन की यात्राओं में भोजन, और मंदिर की विशेष पूजा या VIP दर्शन का शुल्क।',
          'Not included: meals on one day yatras, and any special puja or VIP darshan fee charged by the temple.')
};

const REFUND = t('प्रस्थान से 72 घंटे पहले तक रद्द करने पर 100% रिफंड। 24 से 72 घंटे के बीच 50%। 24 घंटे के अंदर रिफंड संभव नहीं, परंतु आप अपनी सीट किसी और को दे सकते हैं या अगली यात्रा में समायोजित करा सकते हैं।',
                 '100% refund if you cancel more than 72 hours before departure. 50% between 24 and 72 hours. No refund within 24 hours, but you may pass your seat to someone else or carry it over to a future yatra.');

const LABELS = {
  planHead:  t('यात्रा का क्रम', 'How the yatra runs'),
  faqHead:   t('इस यात्रा के बारे में पूछे जाने वाले सवाल', 'Questions asked about this yatra'),
  askOffer:  t('💬 बेहतरीन ऑफ़र के लिए संपर्क करें', '💬 Contact us for the best offer'),
  book:      t('बुक करें', 'Book now'),
  allYatras: t('🚩 चारों यात्राएँ और आगामी प्रस्थान देखें', '🚩 See all four yatras and upcoming departures'),
  panchang:  t('🗓️ पूरा पंचांग और आगामी व्रत-त्योहार देखें', '🗓️ See the full panchang and upcoming vrat and festivals'),
  refundHead: t('रद्द करने और रिफंड के नियम', 'Cancellation and refund terms'),
  home:      t('← मुख्य पेज', '← Home'),
  ctaHead:   t('अगली यात्रा में आपका स्वागत है 🙏', 'You are welcome on the next yatra 🙏'),
  ctaSub:    t('सीटें सीमित हैं, आज ही अपनी जगह पक्की करें।', 'Seats are limited, reserve your place today.'),
  ctaBook:   t('अभी बुक करें', 'Book now'),
  ctaWa:     t('WhatsApp करें', 'Message on WhatsApp'),
  topbar:    t('जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा', 'Jai Shri Shyam, weekly yatras'),
  rights:    t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')
};

/* ═══════════════════════════════════════════════════════════
   HTML बनाने वाले हिस्से
   ═══════════════════════════════════════════════════════════ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* हर hi/en जोड़े से अनुवाद की सूची बनती है, इसलिए मिलान कभी टूट नहीं सकता */
function collectEN(y) {
  const out = {};
  const add = o => { if (o && o.hi && o.en && o.hi !== o.en) out[o.hi] = o.en; };

  add(y.title); add(y.eyebrow); add(y.h1); add(y.lede); add(y.intro);
  add(y.imgAlt); add(y.kathaLine);
  y.facts.forEach(f => { add(f.s); if (typeof f.b === 'object') add(f.b); });
  y.steps.forEach(s => { add(s.h); add(s.p); });
  add(y.tips.label); y.tips.list.forEach(add);
  y.faq.forEach(f => { add(f.q); add(f.a); });

  add(INCLUDED.head); INCLUDED.list.forEach(i => { add(i.h); add(i.p); });
  add(INCLUDED.note); add(REFUND);
  Object.values(LABELS).forEach(add);
  return out;
}

const factsHTML = y => y.facts.map(f => {
  const b = typeof f.b === 'object' ? esc(f.b.hi) : esc(f.b);
  return `      <div><b>${b}</b><span>${esc(f.s.hi)}</span></div>`;
}).join('\n');

const stepsHTML = y => y.steps.map(s =>
  `      <div class="step"><span class="step__n">${esc(s.n)}</span><h3>${esc(s.h.hi)}</h3><p>${esc(s.p.hi)}</p></div>`
).join('\n');

const inclHTML = () => INCLUDED.list.map(i =>
  `      <div class="feat"><span class="feat__ic">${i.ic}</span><h3>${esc(i.h.hi)}</h3><p>${esc(i.p.hi)}</p></div>`
).join('\n');

const tipsHTML = y => y.tips.list.map(x =>
  `        <li>${esc(x.hi)}</li>`
).join('\n');

const faqHTML = y => y.faq.map(f =>
  `      <details><summary>${esc(f.q.hi)}</summary><p>${esc(f.a.hi)}</p></details>`
).join('\n');

/* ── schema, TouristTrip + FAQPage + BreadcrumbList ── */
function schema(y) {
  const url = `${SITE}/${y.slug}`;
  const trip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: y.h1.hi,
    description: y.metaDesc.hi,
    url,
    image: `${SITE}/${y.img}`,
    inLanguage: 'hi-IN',
    touristType: ['Pilgrims', 'Families', 'Senior citizens'],
    departureLocation: { '@type': 'Place', name: 'Delhi, India' },
    provider: { '@id': `${SITE}/#business` },
    subjectOf: { '@type': 'WebPage', '@id': url }
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: y.faq.map(f => ({
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
      { '@type': 'ListItem', position: 2, name: y.h1.hi, item: url }
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
  return [trip, faq, crumbs, biz]
    .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
    .join('\n');
}

/* ── पूरा पेज ── */
function page(y) {
  const url = `${SITE}/${y.slug}`;
  const EN  = collectEN(y);

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(y.title.hi)}</title>
<meta name="description" content="${esc(y.metaDesc.hi)}" />
<meta name="theme-color" content="#7B1E22" />
<link rel="canonical" href="${url}" />

<meta property="og:title" content="${esc(y.h1.hi)}" />
<meta property="og:description" content="${esc(y.metaDesc.hi)}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="Darshan Yatra Seva" />
<meta property="og:locale" content="hi_IN" />
<meta property="og:image" content="${SITE}/${y.img}" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="brand/logo-icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="brand/logo-icon.png" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Tiro+Devanagari+Hindi:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

<link rel="stylesheet" href="styles.css?v=${V}" />

<!-- ⚠️ यह फ़ाइल build-yatra.js से बनी है, हाथ से मत बदलिए -->
${schema(y)}
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
    <p class="eyebrow center">${esc(y.eyebrow.hi)}</p>
    <h1 class="sec__title">${esc(y.h1.hi)}</h1>
    <p class="sec__lede">${esc(y.lede.hi)}</p>
  </div>
</section>

<!-- ══ तस्वीर ══ -->
<section class="ypage__art">
  <div class="wrap wrap--narrow">
    <img src="${y.img}?v=2" alt="${esc(y.imgAlt.hi)}"
         width="800" height="340" fetchpriority="high" decoding="async" />
  </div>
</section>

<!-- ══ मुख्य आँकड़े ══ -->
<section class="trust">
  <div class="wrap trust__grid">
${factsHTML(y)}
  </div>
</section>

<!-- ══ परिचय ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">
    <p class="ypage__intro">${esc(y.intro.hi)}</p>

    <div class="ypage__buy">
      <s class="price__old">${esc(y.priceOld)}</s>
      <a class="price__ask" href="https://wa.me/917289902692?text=${encodeURIComponent(y.wa)}" target="_blank" rel="noopener">${esc(LABELS.askOffer.hi)}</a>
    </div>
  </div>
</section>

<!-- ══ यात्रा का क्रम ══ -->
<section class="sec sec--alt">
  <div class="wrap">
    <h2 class="sec__title">${esc(LABELS.planHead.hi)}</h2>
    <div class="steps slider is-open">
${stepsHTML(y)}
    </div>
  </div>
</section>

<!-- ══ ध्यान रखने वाली बातें ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(y.tips.label.hi)}</h2>
    <ul class="kfull__list kfull__list--dhyan ypage__tips">
${tipsHTML(y)}
    </ul>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/katha#${y.katha}">${esc(y.kathaLine.hi)}</a></p>
  </div>
</section>

<!-- ══ क्या शामिल है ══ -->
<section class="sec sec--alt">
  <div class="wrap">
    <h2 class="sec__title">${esc(INCLUDED.head.hi)}</h2>
    <div class="feats slider is-open">
${inclHTML()}
    </div>
    <p class="note ypage__note">${esc(INCLUDED.note.hi)}</p>
  </div>
</section>

<!-- ══ सवाल जवाब ══ -->
<section class="sec">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LABELS.faqHead.hi)}</h2>
    <div class="faq">
${faqHTML(y)}
    </div>
  </div>
</section>

<!-- ══ रिफंड ══ -->
<section class="sec sec--alt">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LABELS.refundHead.hi)}</h2>
    <p class="ypage__intro">${esc(REFUND.hi)}</p>
  </div>
</section>

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="sec">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/#yatras">${esc(LABELS.allYatras.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/panchang">${esc(LABELS.panchang.hi)}</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(LABELS.ctaHead.hi)}</h2>
    <p>${esc(LABELS.ctaSub.hi)}</p>
    <div class="cta__btns">
      <a class="btn btn--gold btn--lg" href="/#book">${esc(LABELS.ctaBook.hi)}</a>
      <a class="btn btn--ghostlight btn--lg" href="https://wa.me/917289902692?text=${encodeURIComponent(y.wa)}" target="_blank" rel="noopener">${esc(LABELS.ctaWa.hi)}</a>
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
<a class="fab" href="https://wa.me/917289902692?text=${encodeURIComponent(y.wa)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 015.5 16c0-5.8 4.7-10.5 10.5-10.5S26.5 10.2 26.5 16 21.8 26.6 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.6 8.6 0 01-2.5-1.6 9.6 9.6 0 01-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5c0-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
</a>

<!-- इस पेज का अनुवाद, build-yatra.js से बना। i18n.js इसे उठा लेती है। -->
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
   चाहिए, या तो इसी पेज के EN_EXTRA में या i18n.js में। एक बार ऐसा हो
   चुका है कि लिंक के आगे लगा 📖 अनुवाद से बाहर रह गया और वो लाइन
   English मोड में हिन्दी ही दिखती रही। अब यह script ऐसी हर लाइन
   पकड़कर build रोक देता है।
   ═══════════════════════════════════════════════════════════ */

/* i18n.js की चाबियाँ पढ़ो, ताकि दोनों जगह का हिसाब एक साथ लगे */
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

function checkTranslations(y, html, EN, known) {
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
    console.error(`\n  ❌ ${y.slug}.html: ${missing.length} लाइनों का अनुवाद नहीं है`);
    missing.forEach(m => console.error('     ' + m.slice(0, 80)));
    console.error('\n  इन्हें build-yatra.js में t(हिन्दी, English) से लिखिए, फिर दोबारा चलाइए।\n');
    process.exit(1);
  }
}

const KNOWN = i18nKeys();

/* ═══════════════════════════════════════════════════════════
   लिखो
   ═══════════════════════════════════════════════════════════ */
let n = 0;
for (const y of YATRAS) {
  const file = path.join(__dirname, y.slug + '.html');
  const html = page(y);
  checkTranslations(y, html, collectEN(y), KNOWN);
  fs.writeFileSync(file, html, 'utf8');
  const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                    .replace(/<[^>]+>/g, ' ')
                    .split(/\s+/).filter(Boolean).length;
  console.log(`  ✅ ${y.slug}.html   (${words} शब्द Googlebot को दिखते हैं)`);
  n++;
}

/* ── sitemap.xml भी यहीं से ── */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Google को साइट का नक़्शा।
     ⚠️ यह फ़ाइल build-yatra.js से बनती है, हाथ से मत बदलिए।
     नया पेज जोड़ना हो तो build-yatra.js में जोड़िए और दोबारा चलाइए। -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${YATRAS.map(y => `  <url>
    <loc>${SITE}/${y.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
  <url>
    <loc>${SITE}/panchang</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE}/katha</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');
console.log(`  ✅ sitemap.xml       (${n + 3} पेज)`);

/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva, katha.js
   धामों की कथा, मान्यता और पूजा विधि।

   ⚠️ सारी सामग्री यहीं एक जगह है, index.html और katha.html दोनों
      इसी से भरते हैं। कुछ जोड़ना/सुधारना हो तो सिर्फ़ यही फ़ाइल खोलें,
      HTML में हाथ लगाने की ज़रूरत नहीं।

   ⚠️ अनुवाद भी यहीं (hi/en) रखा है, i18n.js में नहीं, क्योंकि यह
      लंबा टेक्स्ट है और वहाँ एक स्पेस का फ़र्क़ भी मिलान तोड़ देता है।
      भाषा बदलते ही यह हिस्सा अपने आप दोबारा बन जाता है।

   ⚠️ ये कथाएँ श्रद्धा और परंपरा पर आधारित हैं। क्षेत्र और परिवार के
      अनुसार विधि में थोड़ा अंतर मिलता है, इसीलिए पेज पर नीचे यह बात
      साफ़ लिखी है। नया धाम जोड़ें तो वही सावधानी रखें: जो बात पक्की
      न हो, उसे "मान्यता है" कहकर लिखें, तथ्य बनाकर नहीं।

   नया धाम जोड़ने का तरीक़ा: नीचे की सूची में वैसा ही एक खंड जोड़ दें।
   home:true रखेंगे तो मुख्य पेज पर भी दिखेगा (वहाँ 4 ही अच्छे लगते हैं)।
   ═══════════════════════════════════════════════════════════ */

window.Katha = (function () {
  'use strict';

  const PLACES = [

    /* ─────────── 1. खाटू श्याम जी ─────────── */
    {
      id: 'khatu', home: true, icon: '🏹',
      name:  { hi: 'खाटू श्याम जी', en: 'Khatu Shyam Ji' },
      where: { hi: 'सीकर, राजस्थान', en: 'Sikar, Rajasthan' },
      teaser: {
        hi: 'जिसने अपना शीश दान कर दिया और वरदान में "हारे का सहारा" कहलाया।',
        en: 'The warrior who gave away his own head, and was blessed as the refuge of the defeated.'
      },
      story: {
        hi: 'महाभारत के वीर बर्बरीक, भीम के पौत्र। माँ को वचन दिया था कि जो पक्ष हार रहा होगा, लड़ेंगे उसी की ओर से। उनके पास तीन ऐसे बाण थे जो पूरा युद्ध पल भर में समाप्त कर सकते थे। श्रीकृष्ण ब्राह्मण का रूप धरकर आए और दान में उन्हीं का शीश माँग लिया, बर्बरीक ने हँसते हुए दे दिया। कृष्ण ने वरदान दिया: कलियुग में तुम मेरे ही नाम "श्याम" से पूजे जाओगे और हारे हुए का सहारा कहलाओगे। वही शीश खाटू में प्रकट हुआ, और वहीं बाबा का दरबार सजा।',
        en: 'Barbarik, grandson of Bhima, had promised his mother that he would always fight for the losing side. He carried three arrows that could end the entire war in moments. Krishna came to him disguised as a brahmin and asked for his head as charity, and Barbarik gave it, smiling. Krishna blessed him: in Kaliyuga you will be worshipped by my own name, Shyam, and you will be known as the refuge of the defeated. That head appeared at Khatu, and the darbar stands there to this day.'
      },
      vidhi: {
        hi: ['निशान (ध्वजा) चढ़ाना, बहुत से भक्त रींगस से लगभग 17 किमी नंगे पाँव चलते हैं',
             'चूरमा का भोग, साथ में इत्र और मोर पंख',
             'एकादशी बाबा का दिन है, हर शुक्ल एकादशी पर विशेष दर्शन',
             'फाल्गुन शुक्ल एकादशी–द्वादशी का लक्खी मेला सबसे बड़ा अवसर'],
        en: ['Offering the nishan (flag), many walk the 17 km from Ringas barefoot',
             'Churma as bhog, along with itra (perfume) and a peacock feather',
             'Ekadashi is Baba’s day, special darshan on every Shukla Ekadashi',
             'The Lakkhi Mela on Phalguna Shukla Ekadashi–Dwadashi is the biggest occasion']
      },
      dhyan: {
        hi: ['एकादशी और मेले में दर्शन की लाइन 4–6 घंटे तक लग जाती है',
             'बुज़ुर्गों और बच्चों के लिए पानी और ज़रूरी दवा साथ रखें'],
        en: ['On Ekadashi and during the mela the queue can take 4–6 hours',
             'Carry water and essential medicines for elders and children']
      }
    },

    /* ─────────── 2. बांके बिहारी, वृंदावन ─────────── */
    {
      id: 'vrindavan', home: true, icon: '🪈',
      name:  { hi: 'बांके बिहारी, वृंदावन', en: 'Banke Bihari, Vrindavan' },
      where: { hi: 'वृंदावन, मथुरा', en: 'Vrindavan, Mathura' },
      teaser: {
        hi: 'वो दर्शन जिन पर हर कुछ पल में परदा गिरा दिया जाता है, और उसकी वजह भी सुनिए।',
        en: 'The darshan where a curtain falls every few moments, and the reason why.'
      },
      story: {
        hi: 'स्वामी हरिदास जी निधिवन में भजन किया करते थे। उनकी भक्ति से स्वयं ठाकुर जी प्रकट हुए, तीन जगह से मुड़ी हुई मुद्रा में, इसीलिए "बाँके" बिहारी। कहते हैं इनकी दृष्टि इतनी मोहिनी है कि निगाह टिक जाए तो भक्त सुध-बुध खो बैठे, यही कारण है कि दर्शन के बीच हर कुछ पल में परदा गिराया जाता है। मंगला आरती यहाँ साल में सिर्फ़ एक बार होती है, जन्माष्टमी की रात।',
        en: 'Swami Haridas ji sang his bhajans in Nidhivan. From his devotion the Thakur ji appeared himself, bent at three places, and so "Banke" Bihari. It is said his gaze is so enchanting that a devotee who holds it too long loses all sense of himself. That is why the curtain is drawn every few moments. The Mangala Aarti here happens only once a year, on Janmashtami night.'
      },
      vidhi: {
        hi: ['पेड़ा, माखन-मिश्री और तुलसी दल का भोग',
             'यहाँ अभिवादन "राधे राधे" है, पहले राधा जी का नाम, फिर कृष्ण का',
             'निधिवन में शाम की आरती के बाद कोई नहीं रुकता',
             'प्रेम मंदिर का लाइट शो शाम को, मथुरा जन्मभूमि के दर्शन सुबह'],
        en: ['Peda, makhan-mishri and tulsi leaves as bhog',
             'The greeting here is “Radhe Radhe”, Radha’s name first, then Krishna’s',
             'Nobody stays in Nidhivan after the evening aarti',
             'Prem Mandir light show in the evening, Mathura Janmabhoomi in the morning']
      },
      dhyan: {
        hi: ['मंदिर के अंदर फ़ोटो लेना मना है',
             'जन्मभूमि में मोबाइल और बैग अंदर नहीं जाते, लॉकर में रखने पड़ते हैं',
             'भीड़ बहुत रहती है, जेब और बच्चों का ध्यान रखें'],
        en: ['Photography is not allowed inside the temple',
             'Phones and bags are not allowed inside Janmabhoomi, lockers are provided',
             'It stays crowded, mind your pockets and your children']
      }
    },

    /* ─────────── 3. मेहंदीपुर बालाजी ─────────── */
    {
      id: 'mehandipur', home: true, icon: '🔱',
      name:  { hi: 'मेहंदीपुर बालाजी', en: 'Mehandipur Balaji' },
      where: { hi: 'दौसा, राजस्थान', en: 'Dausa, Rajasthan' },
      teaser: {
        hi: 'जहाँ मूर्ति किसी ने स्थापित नहीं की, वह पहाड़ी की चट्टान में स्वयं उभरी है।',
        en: 'Where no one installed the idol, it rose out of the rock of the hill itself.'
      },
      story: {
        hi: 'यहाँ बालाजी की मूर्ति किसी ने स्थापित नहीं की, वह पहाड़ी की चट्टान में स्वयं उभरी हुई है, और चरणों के पास का जल कभी सूखता नहीं। दरबार तीन का है: बालाजी महाराज, प्रेतराज सरकार और कोतवाल भैरव बाबा। मान्यता है कि जिस पर कोई संकट, बाधा या नज़र का दोष हो, वह यहाँ अर्जी लगाता है और सुनवाई तीनों दरबार में होती है। इसी विश्वास पर दूर-दूर से लोग मन्नत लेकर आते हैं।',
        en: 'No one installed the idol here, it rose out of the rock of the hill itself, and the water at its feet has never dried up. Three courts sit here: Balaji Maharaj, Pretraj Sarkar and Kotwal Bhairav Baba. The belief is that anyone burdened by trouble, obstruction or the evil eye files an arji here, and it is heard in all three courts. It is on that faith that people come from far away.'
      },
      vidhi: {
        hi: ['मंदिर के बाहर से "अर्जी" का प्रसाद मिलता है, जो तीनों दरबार में अलग-अलग चढ़ता है',
             'यहाँ का प्रसाद वहीं चढ़ाया जाता है, घर नहीं ले जाया जाता',
             'लौटते समय पीछे मुड़कर नहीं देखते और रास्ते में कुछ खाते-पीते नहीं',
             'आने से कुछ दिन पहले से लहसुन-प्याज, मांस और मदिरा से परहेज़'],
        en: ['The arji offering is bought outside and presented separately at each of the three courts',
             'Prasad here is offered at the temple, not carried home',
             'On the way back one does not look behind, and does not eat or drink on the road',
             'For some days before coming, devotees avoid garlic, onion, meat and liquor']
      },
      dhyan: {
        hi: ['हर परिवार की अपनी परंपरा है, वहाँ के पंडित जी से पूछ लेना सबसे अच्छा',
             'मान्यता अपनी जगह है, पर किसी की तबीयत ख़राब हो तो इलाज भी साथ चलता रहे, यही समझदारी है'],
        en: ['Every family follows its own tradition, it is best to ask the pandit there',
             'Faith has its place, but if someone is unwell the treatment should continue alongside']
      }
    },

    /* ─────────── 4. सालासर बालाजी ─────────── */
    {
      id: 'salasar', home: true, icon: '🚩',
      name:  { hi: 'सालासर बालाजी', en: 'Salasar Balaji' },
      where: { hi: 'चूरू, राजस्थान', en: 'Churu, Rajasthan' },
      teaser: {
        hi: 'पूरे देश में अकेले हनुमान जी जिनका स्वरूप दाढ़ी-मूँछ सहित है।',
        en: 'The only Hanuman in the country worshipped with a beard and moustache.'
      },
      story: {
        hi: 'संवत् 1811 (सन् 1754) की बात है। असोटा गाँव में एक किसान हल चला रहा था कि फाल से कुछ टकराया, मिट्टी हटाई तो हनुमान जी की मूर्ति निकली। उसी रात सालासर के भक्त मोहनदास जी को स्वप्न हुआ। मूर्ति बैलगाड़ी में लाई गई और जहाँ बैल अपने आप रुक गए, वहीं दरबार बना। सालासर के बालाजी पूरे देश में अकेले हैं जिनका स्वरूप दाढ़ी-मूँछ सहित है।',
        en: 'In Samvat 1811 (1754 CE), a farmer ploughing his field in Asota village struck something hard. When the soil was cleared, an idol of Hanuman emerged. That same night the devotee Mohandas ji of Salasar had a dream. The idol was brought by bullock cart, and where the bullocks stopped on their own, the darbar was built. Salasar’s Balaji is the only Hanuman in the country worshipped with a beard and moustache.'
      },
      vidhi: {
        hi: ['मनोकामना के लिए मंदिर परिसर में नारियल बाँधा जाता है',
             'सवामणि: सवा मन चूरमा या लड्डू का भोग, मनोकामना पूरी होने पर',
             'ध्वजा चढ़ाना और चरणों में सिंदूर-चोला',
             'शनिवार और मंगलवार बालाजी के दिन हैं, भीड़ भी उन्हीं दिनों'],
        en: ['A coconut is tied in the temple compound when making a wish',
             'Sawamani: a bhog of churma or laddus, offered when the wish is fulfilled',
             'Offering a flag, and sindoor-chola at the feet',
             'Saturday and Tuesday are Balaji’s days, and the most crowded']
      },
      dhyan: {
        hi: ['नारियल बाँधते समय मन्नत मन में साफ़ रखें, पूरी होने पर लौटकर खोलना होता है'],
        en: ['Keep the wish clear in your mind while tying the coconut, you return to untie it when it is fulfilled']
      }
    },

    /* ─────────── 5. गिरिराज गोवर्धन ─────────── */
    {
      id: 'govardhan', home: false, icon: '⛰️',
      name:  { hi: 'गिरिराज गोवर्धन', en: 'Giriraj Govardhan' },
      where: { hi: 'मथुरा, वृंदावन से लगभग 25 किमी', en: 'Mathura, about 25 km from Vrindavan' },
      teaser: {
        hi: 'यहाँ पर्वत को पर्वत नहीं, स्वयं भगवान माना जाता है, इसीलिए उस पर पैर नहीं रखते।',
        en: 'Here the hill is not a hill but the Lord himself, which is why no one sets foot on it.'
      },
      story: {
        hi: 'इंद्र के क्रोध से जब सात दिन तक मूसलाधार वर्षा हुई, तो श्रीकृष्ण ने पूरा गोवर्धन पर्वत अपनी कनिष्ठा अंगुली पर उठा लिया और सारा ब्रज उसके नीचे सुरक्षित रहा। तभी से गिरिराज जी को कृष्ण का ही स्वरूप माना जाता है: पर्वत नहीं, स्वयं भगवान। यही कारण है कि भक्त परिक्रमा तो करते हैं, पर पहाड़ पर चढ़ते नहीं।',
        en: 'When Indra’s anger brought seven days of torrential rain, Krishna lifted the whole of Govardhan hill on his little finger and all of Braj sheltered safely beneath it. Since then Giriraj ji has been regarded as Krishna himself, not a hill, but the Lord. That is why devotees circle it but never climb it.'
      },
      vidhi: {
        hi: ['21 किमी की परिक्रमा, कुछ भक्त दंडवती परिक्रमा भी करते हैं',
             'गिरिराज जी पर पैर नहीं रखा जाता, वे स्वयं भगवान हैं',
             'दूध और जल से अभिषेक, कढ़ी-चावल का भोग',
             'अन्नकूट, दीपावली के अगले दिन गोवर्धन पूजा'],
        en: ['A 21 km parikrama, some devotees do it prostrating the whole way',
             'One never steps on Giriraj ji, who is the Lord himself',
             'Abhishek with milk and water, kadhi-chawal as bhog',
             'Annakut, Govardhan Puja, the day after Deepawali']
      },
      dhyan: {
        hi: ['पूरी परिक्रमा में 6–8 घंटे लगते हैं, नंगे पाँव हो तो और ज़्यादा'],
        en: ['The full parikrama takes 6–8 hours, longer if done barefoot']
      }
    },

    /* ─────────── 6. बरसाना, राधा रानी ─────────── */
    {
      id: 'barsana', home: false, icon: '💛',
      name:  { hi: 'बरसाना, राधा रानी', en: 'Barsana, Radha Rani' },
      where: { hi: 'मथुरा, लगभग 45 किमी', en: 'Mathura, about 45 km' },
      teaser: {
        hi: 'वो गाँव जहाँ कृष्ण से पहले राधा जी का नाम लिया जाता है।',
        en: 'The village where Radha’s name is spoken before Krishna’s.'
      },
      story: {
        hi: 'बरसाना राधा रानी का गाँव है। श्रीजी का मंदिर ब्रह्मांचल पहाड़ी पर है, और चढ़ाई के हर मोड़ पर "राधे राधे" गूँजता रहता है। ब्रज की रीत ही यही है कि पहले राधा जी का नाम लिया जाता है, फिर कृष्ण का। फाल्गुन की मशहूर लट्ठमार होली यहीं की है, नंदगाँव के हुरियारे आते हैं और बरसाने की गोपियाँ लाठियों से उनका स्वागत करती हैं।',
        en: 'Barsana is Radha Rani’s village. The Shriji temple sits on the Brahmanchal hill, and “Radhe Radhe” echoes at every turn of the climb. The custom of Braj is to say Radha’s name first and Krishna’s after. The famous Lathmar Holi of Phalguna belongs to this place, the men of Nandgaon arrive, and the women of Barsana welcome them with sticks.'
      },
      vidhi: {
        hi: ['अभिवादन और भजन दोनों "राधे राधे" से',
             'श्रीजी मंदिर की चढ़ाई, बुज़ुर्गों के लिए पालकी मिल जाती है',
             'लड्डू और चुनरी का चढ़ावा',
             'लट्ठमार होली फाल्गुन शुक्ल नवमी को'],
        en: ['Both greeting and bhajan begin with “Radhe Radhe”',
             'The climb to Shriji temple, palanquins are available for elders',
             'Laddus and a chunari as offering',
             'Lathmar Holi falls on Phalguna Shukla Navami']
      },
      dhyan: { hi: [], en: [] }
    },

    /* ─────────── 7. जीण माता ─────────── */
    {
      id: 'jeenmata', home: false, icon: '🪔',
      name:  { hi: 'जीण माता', en: 'Jeen Mata' },
      where: { hi: 'सीकर, खाटू से लगभग 30 किमी', en: 'Sikar, about 30 km from Khatu' },
      teaser: {
        hi: 'भाई-बहन के रूठने की वो कथा, जिसके दोनों मंदिर आमने-सामने की पहाड़ियों पर हैं।',
        en: 'A quarrel between a brother and sister, whose two temples still face each other across the hills.'
      },
      story: {
        hi: 'जीण माता चौहान वंश की कन्या थीं। भाई हर्ष से रूठकर वे रेवासा की पहाड़ियों में तप करने चली गईं और वहीं देवी रूप में प्रतिष्ठित हुईं। मनाने गए भाई हर्ष भी पास की पहाड़ी पर तपस्वी हो गए। आज दोनों के मंदिर आमने-सामने की पहाड़ियों पर हैं। खाटू से पास होने के कारण बहुत से यात्री दोनों दर्शन एक ही यात्रा में कर लेते हैं।',
        en: 'Jeen Mata was a daughter of the Chauhan lineage. After a quarrel with her brother Harsh she went into the Rewasa hills to meditate, and was established there in the form of the goddess. Harsh, who came to bring her back, took up penance on the neighbouring hill. Their two temples still stand facing each other. Being close to Khatu, many travellers take both darshans in a single trip.'
      },
      vidhi: {
        hi: ['चुनरी, नारियल और लाल ध्वजा का चढ़ावा',
             'नवरात्रि में सीकर और जयपुर से पैदल जात निकलती है',
             'अखंड ज्योत के दर्शन'],
        en: ['Chunari, coconut and a red flag as offering',
             'During Navratri, walking processions set out from Sikar and Jaipur',
             'Darshan of the perpetual flame']
      },
      dhyan: {
        hi: ['चैत्र और आश्विन नवरात्रि में मेला लगता है, भीड़ तभी सबसे ज़्यादा होती है'],
        en: ['The mela falls in Chaitra and Ashwin Navratri, the busiest time by far']
      }
    }
  ];

  /* ── दिखाना ─────────────────────────────────────────────── */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const isEn = () => document.documentElement.lang === 'en';
  const pick = o => (isEn() ? o.en : o.hi);

  const WORDS = {
    hi: { manyata: 'मान्यता', vidhi: 'पूजा की विधि', dhyan: 'ध्यान रखें',
          more: 'पूरी कथा और पूजा विधि पढ़ें', all: 'सातों धामों की कथा पढ़ें',
          ask: 'इस धाम की यात्रा पूछें' },
    en: { manyata: 'The belief', vidhi: 'How the puja is done', dhyan: 'Keep in mind',
          more: 'Read the full story and puja vidhi', all: 'Read the stories of all seven dhams',
          ask: 'Ask about a yatra to this dham' }
  };
  const w = () => (isEn() ? WORDS.en : WORDS.hi);

  /* मुख्य पेज, सिर्फ़ छोटे कार्ड */
  function renderHome(host) {
    const t = w();
    host.innerHTML = PLACES.filter(p => p.home).map(p => `
      <a class="kcard" href="katha.html#${p.id}">
        <span class="kcard__icon" aria-hidden="true">${p.icon}</span>
        <h3>${esc(pick(p.name))}</h3>
        <p class="kcard__where">${esc(pick(p.where))}</p>
        <p class="kcard__teaser">${esc(pick(p.teaser))}</p>
        <span class="kcard__more">${t.more} →</span>
      </a>`).join('');
  }

  /* कथा वाले पेज का पूरा HTML, एक ही जगह बनता है।
     ⚠️ यही build-katha.js भी इस्तेमाल करता है, ताकि वही HTML पहले से
        katha.html में लिखा जा सके (Googlebot को JavaScript चलाए बिना
        पूरी कथाएँ दिख जाएँ, 29 जुलाई 2026 को यह कमी पकड़ी गई थी)।
        इसलिए यहाँ document/location मत छूना, सिर्फ़ शुद्ध HTML लौटाना। */
  function fullHTML(en) {
    const t = en ? WORDS.en : WORDS.hi;
    const g = o => (en ? o.en : o.hi);
    const wa = 'https://wa.me/' + ((typeof CONFIG !== 'undefined' && CONFIG.whatsapp) || '');
    const list = (arr, cls) => arr && arr.length
      ? `<ul class="kfull__list ${cls}">${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';

    return PLACES.map(p => `
      <article class="kfull" id="${p.id}">
        <header class="kfull__head">
          <span class="kfull__icon" aria-hidden="true">${p.icon}</span>
          <div>
            <h2>${esc(g(p.name))}</h2>
            <p>${esc(g(p.where))}</p>
          </div>
        </header>

        <h3 class="kfull__label">${t.manyata}</h3>
        <p class="kfull__story">${esc(g(p.story))}</p>

        <h3 class="kfull__label">${t.vidhi}</h3>
        ${list(g(p.vidhi), 'kfull__list--vidhi')}

        ${(g(p.dhyan) || []).length
          ? `<h3 class="kfull__label">${t.dhyan}</h3>${list(g(p.dhyan), 'kfull__list--dhyan')}`
          : ''}

        <a class="btn btn--sm btn--primary" href="${wa}?text=${encodeURIComponent(
             (en ? 'Jai Shri Shyam! ' : 'जय श्री श्याम! ') + g(p.name) +
             (en ? ', please tell me about a yatra.' : ' की यात्रा की जानकारी चाहिए।'))}"
           target="_blank" rel="noopener">💬 ${t.ask}</a>
      </article>`).join('');
  }

  /* कथा वाला पेज, सब कुछ खुला हुआ */
  function renderFull(host) {
    host.innerHTML = fullHTML(isEn());

    /* पते में #khatu जैसा हिस्सा हो तो वहीं तक ले जाओ */
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }

  function init() {
    const home = document.getElementById('kathaBox');
    const full = document.getElementById('kathaFull');
    if (!home && !full) return;

    const draw = () => { if (home) renderHome(home); if (full) renderFull(full); };
    draw();

    /* भाषा बदले तो यह हिस्सा भी बदल जाए (i18n.js सिर्फ़ पक्के टेक्स्ट को छूता है) */
    new MutationObserver(draw)
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { PLACES, fullHTML };
})();

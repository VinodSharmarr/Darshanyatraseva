/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva — i18n.js

   साइट हिंदी में लिखी है। यहाँ हर हिंदी वाक्य का अंग्रेज़ी अनुवाद है।
   नया टेक्स्ट जोड़ें तो उसका अनुवाद भी नीचे EN में जोड़ दें —
   वरना अंग्रेज़ी मोड में वो हिंदी ही दिखेगा।

   HTML में कुछ बदलने की ज़रूरत नहीं — मिलान पूरे वाक्य से होता है।
   ═══════════════════════════════════════════════════════════ */

const EN = {
  /* ── topbar / nav ── */
  'जय श्री श्याम — दिल्ली से हर सप्ताह यात्रा': 'Jai Shri Shyam — weekly yatras',
  'दर्शन यात्रा सेवा': 'Pilgrimage tours from Delhi',
  'यात्राएँ': 'Yatras',
  'क्यों हम': 'Why Us',
  'कैसे बुक करें': 'How to Book',
  'आगामी तिथियाँ': 'Upcoming Dates',
  'सवाल-जवाब': 'FAQ',
  'बुक करें': 'Book Now',
  'मेन्यू': 'Menu',

  /* ── hero ── */
  'दिल्ली • NCR से तीर्थ यात्रा': 'Pilgrimage yatras from Delhi • NCR',
  'आस्था की यात्रा,': 'A journey of faith,',
  'सेवा के साथ': 'served with devotion',
  'खाटू श्याम जी • वृंदावन-मथुरा • मेहंदीपुर बालाजी • सालासर धाम': 'Khatu Shyam Ji • Vrindavan–Mathura • Mehandipur Balaji • Salasar Dham',
  'आरामदायक AC टेम्पो ट्रैवलर, प्रसाद व पानी शामिल, बुज़ुर्गों की विशेष सहायता।': 'Comfortable AC Tempo Traveller, prasad and water included, special assistance for elders.',
  'सीट बुक करें →': 'Book your seat →',
  'यात्राएँ देखें': 'View yatras',
  '✓ विशेष छूट — WhatsApp पर पूछें': '✓ Special discount — ask on WhatsApp',
  '✓ मेट्रो स्टेशन से पिकअप': '✓ Pickup from metro stations',
  '✓ महिलाओं हेतु सुरक्षित सीटिंग': '✓ Safe seating for women',
  '✓ परिवार को लाइव लोकेशन': '✓ Live location for family',

  /* ── trust strip ── */
  'संतुष्ट यात्री': 'Happy pilgrims',
  'सफल यात्राएँ': 'Yatras completed',
  'औसत रेटिंग': 'Average rating',
  'बीमा कवर': 'Insurance cover',

  /* ── yatras ── */
  'हमारी यात्राएँ': 'Our Yatras',
  'दिल्ली से चलने वाली प्रमुख यात्राएँ': 'Popular yatras departing from Delhi',
  'हर यात्रा में AC वाहन, प्रसाद, पानी, अनुभवी ड्राइवर और यात्रा सहायक शामिल।': 'Every yatra includes an AC vehicle, prasad, water, an experienced driver and a travel assistant.',
  'सबसे लोकप्रिय': 'Most popular',

  'खाटू श्याम जी': 'Khatu Shyam Ji',
  'सीकर, राजस्थान • ~270 किमी • रात्रि प्रस्थान / 1 दिन': 'Sikar, Rajasthan • ~270 km • night departure / 1 day',
  'रात को दिल्ली से प्रस्थान, सुबह दर्शन, दोपहर तक वापसी। श्याम बाबा के दरबार में निशान यात्रा की व्यवस्था भी उपलब्ध।': 'Depart Delhi at night, darshan in the morning, back by afternoon. Nishan Yatra at Shyam Baba’s darbar can also be arranged.',
  'AC टेम्पो ट्रैवलर / बस': 'AC Tempo Traveller / bus',
  'प्रसाद + पानी शामिल': 'Prasad + water included',
  'दर्शन लाइन में सहायता': 'Help in the darshan queue',
  '💬 बेहतरीन ऑफ़र के लिए संपर्क करें': '💬 Contact us for the best offer',

  'वृंदावन – मथुरा': 'Vrindavan – Mathura',
  '~150 किमी • 1 दिन (सुबह–रात)': '~150 km • 1 day (morning–night)',
  'बांके बिहारी, प्रेम मंदिर, ISKCON, निधिवन एवं मथुरा जन्मभूमि — एक ही दिन में सम्पूर्ण दर्शन।': 'Banke Bihari, Prem Mandir, ISKCON, Nidhivan and Mathura Janmabhoomi — complete darshan in a single day.',
  '5 प्रमुख मंदिर कवर': '5 major temples covered',
  'प्रेम मंदिर लाइट शो': 'Prem Mandir light show',
  'बुज़ुर्गों हेतु व्हीलचेयर सहायता': 'Wheelchair help for elders',

  'मेहंदीपुर बालाजी': 'Mehandipur Balaji',
  'दौसा, राजस्थान • ~250 किमी • 1 दिन': 'Dausa, Rajasthan • ~250 km • 1 day',
  'बालाजी महाराज, प्रेतराज सरकार व भैरव बाबा के दर्शन। दर्शन विधि की पूरी जानकारी हमारे सहायक द्वारा।': 'Darshan of Balaji Maharaj, Pretraj Sarkar and Bhairav Baba. Our assistant explains the full darshan procedure.',
  'दर्शन विधि मार्गदर्शन': 'Darshan procedure guidance',
  'अर्जी सामग्री की व्यवस्था': 'Arji items arranged',
  'सुबह 4 बजे प्रस्थान': 'Departure at 4:00 AM',

  'खाटू श्याम + सालासर बालाजी': 'Khatu Shyam + Salasar Balaji',
  '~300 किमी • 2 दिन / 1 रात (वीकेंड)': '~300 km • 2 days / 1 night (weekend)',
  'दोनों धामों का संयुक्त पैकेज — रात्रि विश्राम, भोजन एवं दोनों जगह दर्शन सहायता सहित।': 'A combined package for both dhams — includes the night stay, meals and darshan help at both temples.',
  '1 रात होटल/धर्मशाला': '1 night hotel/dharamshala',
  '2 समय भोजन शामिल': '2 meals included',
  'भजन-कीर्तन का माहौल': 'Bhajan-kirtan all the way',

  'पूरा वाहन बुक करना है?': 'Want to book a whole vehicle?',
  'परिवार, सोसाइटी या मंदिर मंडली के लिए 17-सीटर टेम्पो ट्रैवलर व 35-सीटर बस उपलब्ध —': 'A 17-seater Tempo Traveller and 35-seater bus are available for families, societies or temple groups —',
  'कस्टम कोट लें': 'get a custom quote',
  '।': '.',

  /* ── why us ── */
  'हमारी सेवा': 'Our Seva',
  'सिर्फ़ ट्रैवल नहीं —': 'Not just travel —',
  'सेवा': 'seva',
  'तीर्थ यात्रा भावना का विषय है। हम हर छोटी बात का ध्यान रखते हैं।': 'A pilgrimage is a matter of feeling. We look after every small detail.',
  'मेट्रो पिकअप पॉइंट': 'Metro pickup points',
  'दिल्ली भर में तय पिकअप — उत्तम नगर, द्वारका, रोहिणी, लक्ष्मी नगर, आनंद विहार व अन्य।': 'Fixed pickups across Delhi — Uttam Nagar, Dwarka, Rohini, Laxmi Nagar, Anand Vihar and more.',
  'पूरे रास्ते भजन व कीर्तन — यात्रा नहीं, एक सत्संग जैसा अनुभव।': 'Bhajan and kirtan the whole way — less a journey, more a satsang.',
  'बुज़ुर्गों की विशेष सहायता': 'Special care for elders',
  'चढ़ने-उतरने में मदद, आगे की सीट, दवाई व आराम का पूरा ध्यान।': 'Help boarding and alighting, front seats, and full attention to medicines and comfort.',
  'अकेली यात्रा करने वाली महिलाओं के लिए अलग व सुरक्षित सीट व्यवस्था।': 'Separate, secure seating for women travelling alone.',
  'महिलाओं हेतु सुरक्षित सीटिंग': 'Safe seating for women',
  'परिवार को लाइव लोकेशन': 'Live location for family',
  'WhatsApp पर घरवालों को यात्रा की लाइव लोकेशन — पूरी निश्चिंतता।': 'Live location shared with family on WhatsApp — complete peace of mind.',
  'प्रसाद व पानी शामिल': 'Prasad & water included',
  'हर यात्री को पानी की बोतल एवं मंदिर का प्रसाद — कोई छिपा शुल्क नहीं।': 'A water bottle and temple prasad for every traveller — no hidden charges.',
  'यात्रा बीमा कवर': 'Travel insurance cover',
  'हर यात्री का ट्रैवल इंश्योरेंस — सुरक्षा में कोई समझौता नहीं।': 'Travel insurance for every passenger — no compromise on safety.',
  'पारदर्शी भुगतान': 'Transparent payments',
  'UPI से सीधा भुगतान, तुरंत रसीद, और लिखित रिफंड पॉलिसी।': 'Direct UPI payment, an instant receipt, and a written refund policy.',

  /* ── how to book ── */
  'बुकिंग प्रक्रिया': 'Booking Process',
  '3 आसान चरणों में बुकिंग': 'Book in 3 easy steps',
  'यात्रा चुनें': 'Choose your yatra',
  'नीचे फ़ॉर्म भरें या सीधे WhatsApp करें। हम उपलब्ध तिथियाँ व सीटें बताएँगे।': 'Fill the form below or message us on WhatsApp. We will share the available dates and seats.',
  'UPI से भुगतान': 'Pay by UPI',
  'सीट पक्की करने हेतु भुगतान करें। तुरंत बुकिंग कन्फ़र्मेशन व रसीद WhatsApp पर।': 'Pay to confirm your seat. Instant booking confirmation and receipt on WhatsApp.',
  'यात्रा पर निकलें': 'Set off on your yatra',
  'प्रस्थान से एक दिन पहले पिकअप पॉइंट व समय की पूरी जानकारी भेज दी जाती है।': 'Full pickup point and timing details are sent a day before departure.',

  /* ── departures ── */
  'आगामी प्रस्थान': 'Upcoming Departures',
  'इस महीने की यात्राएँ': 'This month’s yatras',
  'सीटें सीमित — पहले आओ, पहले पाओ के आधार पर।': 'Seats are limited — first come, first served.',
  'यात्रा': 'Yatra',
  'तिथि': 'Date',
  'प्रस्थान': 'Departure',
  'सीटें': 'Seats',
  'किराया': 'Fare',
  'हर शुक्रवार': 'Every Friday',
  'रात 10:00 बजे': '10:00 PM',
  '6 शेष': '6 left',
  '💬 ऑफ़र पूछें': '💬 Ask for offer',
  'हर रविवार': 'Every Sunday',
  'सुबह 5:00 बजे': '5:00 AM',
  '14 शेष': '14 left',
  'हर शनिवार': 'Every Saturday',
  'सुबह 4:00 बजे': '4:00 AM',
  '11 शेष': '11 left',
  'खाटू + सालासर': 'Khatu + Salasar',
  'माह का दूसरा शनिवार': '2nd Saturday of the month',
  'रात 9:00 बजे': '9:00 PM',
  '4 शेष': '4 left',

  /* ── testimonials ── */
  'यात्रियों के अनुभव': 'Traveller Experiences',
  'श्रद्धालु क्या कहते हैं': 'What pilgrims say',
  'माता जी 72 वर्ष की हैं, अकेले यात्रा मुश्किल थी। पूरे रास्ते इनके सहायक ने ध्यान रखा, खाटू में लाइन में भी साथ रहे। ऐसी सेवा कहीं नहीं मिली।': 'My mother is 72 and travelling alone was difficult for her. Their assistant looked after her the whole way and stayed with her in the queue at Khatu. We have not found service like this anywhere else.',
  'सुनीता शर्मा': 'Sunita Sharma',
  'उत्तम नगर, दिल्ली': 'Uttam Nagar, Delhi',
  'वृंदावन की एक दिन की ट्रिप में 5 मंदिर करा दिए, वो भी बिना भागदौड़ के। गाड़ी साफ़, ड्राइवर सज्जन। भजन चलते रहे — बहुत आनंद आया।': 'They covered 5 temples in a one-day Vrindavan trip, and without any rush. Clean vehicle, courteous driver. Bhajans played throughout — we enjoyed it thoroughly.',
  'राकेश गुप्ता': 'Rakesh Gupta',
  'रोहिणी, दिल्ली': 'Rohini, Delhi',
  'हमारी सोसाइटी की 32 लोगों की बुकिंग थी। रेट भी ठीक और व्यवस्था बढ़िया। घरवालों को लाइव लोकेशन मिलती रही — यही बात सबसे अच्छी लगी।': 'We booked for 32 people from our society. The rate was fair and the arrangements were good. Our families kept receiving the live location — that was the best part.',
  'अनिल यादव': 'Anil Yadav',
  'द्वारका, दिल्ली': 'Dwarka, Delhi',

  /* ── booking ── */
  'बुकिंग': 'Booking',
  'सीट बुक करें': 'Book your seat',
  'फ़ॉर्म भरें — आपकी जानकारी सीधे हमारे WhatsApp पर पहुँच जाएगी और हम कुछ ही मिनटों में उपलब्धता बताकर बुकिंग कन्फ़र्म कर देंगे।': 'Fill in the form — your details reach our WhatsApp directly, and within minutes we will confirm availability and your booking.',
  'दर्शन प्रभारी': 'Darshan In-charge',
  'यात्रा से जुड़ी हर बात के लिए सीधे बात करें': 'Speak directly about anything to do with your yatra',
  'सीधे WhatsApp करें': 'Message us on WhatsApp',
  '✓ न्यूनतम 12 सीट पर यात्रा कन्फ़र्म': '✓ Yatra confirmed at a minimum of 12 seats',
  '✓ प्रस्थान से 72 घंटे पहले तक 100% रिफंड': '✓ 100% refund up to 72 hours before departure',

  'पूरा नाम': 'Full name',
  'जैसे: राम कुमार': 'e.g. Ram Kumar',
  'मोबाइल नंबर': 'Mobile number',
  '10 अंकों का नंबर': '10-digit number',
  'कौन सी यात्रा?': 'Which yatra?',
  '— यात्रा चुनें —': '— Select a yatra —',
  'पूरा वाहन बुकिंग (कस्टम)': 'Whole vehicle booking (custom)',
  'यात्रा की तिथि': 'Date of yatra',
  'कितने लोग?': 'How many people?',
  '— चुनें —': '— Select —',
  '11–17 (पूरा टेम्पो)': '11–17 (full Tempo)',
  '18+ (बस)': '18+ (bus)',
  'पिकअप पॉइंट': 'Pickup point',
  '— नज़दीकी मेट्रो चुनें —': '— Choose nearest metro —',
  'उत्तम नगर ईस्ट': 'Uttam Nagar East',
  'द्वारका मोड़': 'Dwarka Mor',
  'रोहिणी सेक्टर 18': 'Rohini Sector 18',
  'लक्ष्मी नगर': 'Laxmi Nagar',
  'आनंद विहार ISBT': 'Anand Vihar ISBT',
  'कश्मीरी गेट': 'Kashmere Gate',
  'अन्य (बताएँगे)': 'Other (we will ask)',
  'कोई विशेष आवश्यकता?': 'Any special requirement?',
  'जैसे: बुज़ुर्ग यात्री हैं, आगे की सीट चाहिए / व्हीलचेयर सहायता': 'e.g. elderly traveller, need a front seat / wheelchair assistance',
  'WhatsApp पर बुकिंग भेजें →': 'Send booking on WhatsApp →',
  'भेजने पर WhatsApp खुलेगा, संदेश पहले से भरा मिलेगा — बस Send दबाएँ।': 'WhatsApp will open with the message already filled in — just press Send.',

  /* ── faq ── */
  'अक्सर पूछे जाने वाले प्रश्न': 'Frequently Asked Questions',
  'किराए में क्या-क्या शामिल है?': 'What is included in the fare?',
  'AC वाहन का किराया, टोल, पार्किंग, ड्राइवर, पानी की बोतल, मंदिर का प्रसाद और यात्रा सहायक की सेवा। भोजन (एक दिन की यात्राओं में) एवं मंदिर की विशेष पूजा/VIP दर्शन शुल्क अलग से।': 'The AC vehicle fare, tolls, parking, driver, a water bottle, temple prasad and the services of a travel assistant. Meals (on one-day yatras) and any special puja / VIP darshan fees at the temple are extra.',
  'भुगतान कैसे करना होगा?': 'How do I pay?',
  'UPI (GPay/PhonePe/Paytm) या बैंक ट्रांसफ़र से पूरा अग्रिम भुगतान करना होता है, क्योंकि हमें आपकी सीट पहले से आरक्षित करनी पड़ती है। भुगतान के तुरंत बाद WhatsApp पर रसीद मिल जाती है।': 'Full advance payment by UPI (GPay/PhonePe/Paytm) or bank transfer, because we have to reserve your seat ahead of time. A receipt reaches you on WhatsApp immediately after payment.',
  'रिफंड पॉलिसी क्या है?': 'What is the refund policy?',
  'प्रस्थान से 72 घंटे पहले रद्द करने पर 100% रिफंड। 24–72 घंटे पहले 50%। 24 घंटे के अंदर रिफंड संभव नहीं, परंतु आप अपनी सीट किसी और को दे सकते हैं या अगली यात्रा में समायोजित करा सकते हैं।': '100% refund if you cancel 72 hours before departure. 50% between 24 and 72 hours. No refund within 24 hours, but you may pass your seat to someone else or carry it over to a future yatra.',
  'क्या अकेली महिला यात्रा कर सकती है?': 'Can a woman travel alone?',
  'बिल्कुल। हमारी हर यात्रा में महिलाओं के लिए अलग एवं सुरक्षित सीटिंग की व्यवस्था रहती है, और वाहन में महिला यात्रियों का समूह हमेशा साथ बैठाया जाता है। परिवार को पूरी यात्रा की लाइव लोकेशन भी भेजी जाती है।': 'Absolutely. Every yatra has separate, secure seating for women, and women travellers are always seated together in the vehicle. Live location for the whole journey is also sent to the family.',
  'बुज़ुर्ग यात्रियों के लिए क्या व्यवस्था है?': 'What arrangements are there for elderly travellers?',
  'आगे की सीट प्राथमिकता, चढ़ने-उतरने में सहायता, दर्शन लाइन में साथ, और आवश्यकता होने पर व्हीलचेयर की व्यवस्था (पहले से बताने पर)। यह हमारी सबसे बड़ी विशेषता है।': 'Priority for front seats, help boarding and alighting, company in the darshan queue, and a wheelchair arranged if needed (on prior notice). This is what we do best.',
  'क्या दर्शन की गारंटी है?': 'Is darshan guaranteed?',
  'हम आपको समय पर मंदिर पहुँचाते हैं और लाइन में पूरी सहायता करते हैं। परंतु मंदिर की भीड़, कतार की अवधि या प्रशासन द्वारा किए गए बदलाव हमारे नियंत्रण में नहीं होते — इसे बुकिंग शर्तों में स्पष्ट लिखा गया है।': 'We get you to the temple on time and help you throughout the queue. But temple crowds, how long the queue takes, or changes made by the administration are outside our control — this is stated clearly in the booking terms.',
  'पूरा वाहन बुक करना हो तो?': 'What if I want to book a whole vehicle?',
  'परिवार, RWA, ऑफ़िस या मंदिर मंडली के लिए 17-सीटर टेम्पो ट्रैवलर और 35/45-सीटर बस उपलब्ध है। ऊपर फ़ॉर्म में "पूरा वाहन बुकिंग" चुनें — हम आपको कस्टम कोट भेज देंगे।': 'A 17-seater Tempo Traveller and 35/45-seater buses are available for families, RWAs, offices or temple groups. Select “Whole vehicle booking” in the form above — we will send you a custom quote.',
  'मेला/त्योहार के समय बुकिंग कब करें?': 'When should I book for a mela or festival?',
  'फाल्गुन मेला, जन्माष्टमी और एकादशी जैसे अवसरों पर सीटें 3–4 सप्ताह पहले भर जाती हैं। ऐसे समय पहले से बुकिंग कराना ज़रूरी है।': 'For occasions like the Phalgun Mela, Janmashtami and Ekadashi, seats fill up 3–4 weeks in advance. Booking early is essential at such times.',

  /* ── closing cta + footer ── */
  'अगली यात्रा में आपका स्वागत है 🙏': 'You are welcome on our next yatra 🙏',
  'सीटें सीमित हैं — आज ही अपनी जगह पक्की करें।': 'Seats are limited — reserve your place today.',
  'अभी बुक करें': 'Book now',
  'WhatsApp करें': 'WhatsApp us',
  'दिल्ली-NCR से तीर्थ यात्राओं की भरोसेमंद सेवा। आस्था, सुरक्षा और सम्मान के साथ।': 'A trusted pilgrimage service from Delhi-NCR. With faith, safety and respect.',
  'सालासर बालाजी': 'Salasar Balaji',
  'कंपनी': 'Company',
  'हमारे बारे में': 'About us',
  'संपर्क करें': 'Contact us',
  'संपर्क': 'Contact',
  'दिल्ली, भारत': 'Delhi, India',
  'Darshan Yatra Seva. सर्वाधिकार सुरक्षित।': 'Darshan Yatra Seva. All rights reserved.',
  '🙏 जय श्री श्याम': '🙏 Jai Shri Shyam',

  /* ── page title ── */
  'Darshan Yatra Seva — दिल्ली से खाटू श्याम, वृंदावन, मेहंदीपुर बालाजी यात्रा': 'Darshan Yatra Seva — Khatu Shyam, Vrindavan & Mehandipur Balaji yatras from Delhi'
};

/* ═══ स्विचिंग लॉजिक ═══════════════════════════════════════ */
(function(){
  const ATTRS = ['placeholder','aria-label','alt','title','data-l'];
  const store = [];               // { set(text), hi, en }
  const has = s => Object.prototype.hasOwnProperty.call(EN, s);

  /* हर अनुवाद-योग्य जगह एक बार ढूँढकर याद रखें */
  function collect(){
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()){
      const raw = n.nodeValue, hi = raw.trim();
      if (!hi || !has(hi)) continue;
      const pad = raw.split(hi);   // आगे-पीछे की खाली जगह बचाए रखें
      const node = n, before = pad[0], after = pad.slice(1).join(hi);
      store.push({ hi, en: EN[hi], set: t => { node.nodeValue = before + t + after; } });
    }
    document.querySelectorAll('*').forEach(el => {
      ATTRS.forEach(a => {
        const v = el.getAttribute(a);
        if (v && has(v.trim())) {
          const hi = v.trim();
          store.push({ hi, en: EN[hi], set: t => el.setAttribute(a, t) });
        }
      });
    });
    const t = document.title.trim();
    if (has(t)) store.push({ hi: t, en: EN[t], set: x => { document.title = x; } });
  }

  function apply(lang){
    const en = lang === 'en';
    store.forEach(item => item.set(en ? item.en : item.hi));
    document.documentElement.lang = lang;
    const btn = document.getElementById('langBtn');
    if (btn){
      btn.textContent = en ? 'हिंदी' : 'English';
      btn.setAttribute('aria-label', en ? 'हिंदी में देखें' : 'View in English');
    }
    try { localStorage.setItem('dys-lang', lang); } catch(e){}
  }

  function init(){
    collect();
    let saved = null;
    try { saved = localStorage.getItem('dys-lang'); } catch(e){}
    /* पहली बार आने वाले को हिंदी — हमारे ज़्यादातर यात्री हिंदी पढ़ते हैं */
    apply(saved === 'en' ? 'en' : 'hi');

    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => {
      apply(document.documentElement.lang === 'en' ? 'hi' : 'en');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva, i18n.js

   साइट हिंदी में लिखी है। यहाँ हर हिंदी वाक्य का अंग्रेज़ी अनुवाद है।
   नया टेक्स्ट जोड़ें तो उसका अनुवाद भी नीचे EN में जोड़ दें,
   वरना अंग्रेज़ी मोड में वो हिंदी ही दिखेगा।

   HTML में कुछ बदलने की ज़रूरत नहीं, मिलान पूरे वाक्य से होता है।
   ═══════════════════════════════════════════════════════════ */

const EN = {
  /* ── topbar / nav ── */
  'जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा': 'Jai Shri Shyam, weekly yatras',
  'दर्शन यात्रा सेवा': 'Pilgrimage tours from Delhi',
  'यात्राएँ': 'Yatras',
  'क्यों हम': 'Why Us',
  /* ⚠️ ये दो अनुवाद जान-बूझकर छोटे रखे हैं (1 अगस्त 2026)।
     "How to Book" और "Upcoming Dates" डेस्कटॉप की नेव में दो लाइन में
     टूट रहे थे। §4 नियम 2: English की लाइनें लंबी होती हैं, अनुवाद छोटा रखें।
     ये दोनों हिन्दी वाक्य सिर्फ़ नेव में हैं, कहीं और नहीं, इसलिए बदलना सुरक्षित था। */
  'कैसे बुक करें': 'Booking',
  'आगामी तिथियाँ': 'Departures',
  'सवाल-जवाब': 'FAQ',
  'बुक करें': 'Book Now',
  'मेन्यू': 'Menu',

  /* ── hero ── */
  'दिल्ली • NCR से तीर्थ यात्रा': 'Pilgrimage yatras from Delhi • NCR',
  'आस्था की यात्रा,': 'A journey of faith,',
  'सेवा के साथ': 'served with devotion',
  'दिल्ली से खाटू श्याम जी • वृंदावन-मथुरा • मेहंदीपुर बालाजी • सालासर धाम': 'From Delhi to Khatu Shyam Ji • Vrindavan–Mathura • Mehandipur Balaji • Salasar Dham',
  'आरामदायक AC टेम्पो ट्रैवलर, प्रसाद व पानी शामिल, बुज़ुर्गों की विशेष सहायता।': 'Comfortable AC Tempo Traveller, prasad and water included, special assistance for elders.',
  'सीट बुक करें →': 'Book your seat →',
  'यात्राएँ देखें': 'View yatras',
  '✓ विशेष छूट, WhatsApp पर पूछें': '✓ Special discount, ask on WhatsApp',
  '✓ मेट्रो स्टेशन से पिकअप': '✓ Pickup from metro stations',
  '✓ महिलाओं हेतु सुरक्षित सीटिंग': '✓ Safe seating for women',
  '✓ परिवार को लाइव लोकेशन': '✓ Live location for family',

  /* ── trust strip ── */
  'संतुष्ट यात्री': 'Happy pilgrims',
  'सफल यात्राएँ': 'Yatras completed',
  'औसत रेटिंग': 'Average rating',
  'बीमा कवर': 'Insurance cover',
  /* ⚠️ 28 जुलाई को "4.9★ औसत रेटिंग" हटाकर यह रिफंड वाली बात लगाई थी, पर
     अनुवाद जोड़ना रह गया था। इसलिए 12 अगस्त तक English मोड में ट्रस्ट
     पट्टी का यही एक खाना हिन्दी दिखता रहा, बाक़ी तीनों अंग्रेज़ी में।
     §4 नियम 2 की याद दिलाने वाला उदाहरण। */
  '72 घंटे': '72 hours',
  'पहले तक 100% रिफंड': 'before, 100% refund',

  /* ── yatras ── */
  'हमारी यात्राएँ': 'Our Yatras',
  'दिल्ली से चलने वाली प्रमुख यात्राएँ': 'Popular yatras departing from Delhi',
  'हर यात्रा में AC वाहन, प्रसाद, पानी, अनुभवी ड्राइवर और यात्रा सहायक शामिल।': 'Every yatra includes an AC vehicle, prasad, water, an experienced driver and a travel assistant.',
  'सबसे लोकप्रिय': 'Most popular',

  'खाटू श्याम जी': 'Khatu Shyam Ji',
  'सीकर, राजस्थान • ~261 किमी • रात्रि प्रस्थान / 1 दिन': 'Sikar, Rajasthan • ~261 km • night departure / 1 day',
  'रात को दिल्ली से प्रस्थान, सुबह दर्शन, दोपहर तक वापसी। श्याम बाबा के दरबार में निशान यात्रा की व्यवस्था भी उपलब्ध।': 'Depart Delhi at night, darshan in the morning, back by afternoon. Nishan Yatra at Shyam Baba’s darbar can also be arranged.',
  'AC टेम्पो ट्रैवलर / बस': 'AC Tempo Traveller / bus',
  'प्रसाद + पानी शामिल': 'Prasad + water included',
  'दर्शन लाइन में सहायता': 'Help in the darshan queue',
  '💬 बेहतरीन ऑफ़र के लिए संपर्क करें': '💬 Contact us for the best offer',

  /* कार्ड से उस यात्रा के अपने पेज तक (12 अगस्त 2026)।
     पेज ख़ुद build-yatra.js बनाता है और अपना अनुवाद साथ लाता है,
     पर कार्ड की ये चार लाइनें index.html में हैं, इसलिए यहाँ। */
  'खाटू श्याम यात्रा की पूरी जानकारी →': 'Full details of the Khatu Shyam yatra →',
  'वृंदावन मथुरा यात्रा की पूरी जानकारी →': 'Full details of the Vrindavan Mathura yatra →',
  'मेहंदीपुर बालाजी यात्रा की पूरी जानकारी →': 'Full details of the Mehandipur Balaji yatra →',
  'सालासर धाम यात्रा की पूरी जानकारी →': 'Full details of the Salasar Dham yatra →',

  'वृंदावन – मथुरा': 'Vrindavan – Mathura',
  '~160 किमी • 1 दिन (सुबह–रात)': '~160 km • 1 day (morning–night)',
  'बांके बिहारी, प्रेम मंदिर, ISKCON, निधिवन एवं मथुरा जन्मभूमि, एक ही दिन में सम्पूर्ण दर्शन।': 'Banke Bihari, Prem Mandir, ISKCON, Nidhivan and Mathura Janmabhoomi, complete darshan in a single day.',
  '5 प्रमुख मंदिर कवर': '5 major temples covered',
  'प्रेम मंदिर लाइट शो': 'Prem Mandir light show',
  'बुज़ुर्गों हेतु व्हीलचेयर सहायता': 'Wheelchair help for elders',

  'मेहंदीपुर बालाजी': 'Mehandipur Balaji',
  'दौसा, राजस्थान • ~245 किमी • 1 दिन': 'Dausa, Rajasthan • ~245 km • 1 day',
  'बालाजी महाराज, प्रेतराज सरकार व भैरव बाबा के दर्शन। दर्शन विधि की पूरी जानकारी हमारे सहायक द्वारा।': 'Darshan of Balaji Maharaj, Pretraj Sarkar and Bhairav Baba. Our assistant explains the full darshan procedure.',
  'दर्शन विधि मार्गदर्शन': 'Darshan procedure guidance',
  'अर्जी सामग्री की व्यवस्था': 'Arji items arranged',
  'सुबह 4 बजे प्रस्थान': 'Departure at 4:00 AM',

  'खाटू श्याम + सालासर बालाजी': 'Khatu Shyam + Salasar Balaji',
  '~410 किमी • 2 दिन / 1 रात (वीकेंड)': '~410 km • 2 days / 1 night (weekend)',
  'दोनों धामों का संयुक्त पैकेज, रात्रि विश्राम, भोजन एवं दोनों जगह दर्शन सहायता सहित।': 'A combined package for both dhams, includes the night stay, meals and darshan help at both temples.',
  '1 रात होटल/धर्मशाला': '1 night hotel/dharamshala',
  '2 समय भोजन शामिल': '2 meals included',
  'भजन-कीर्तन का माहौल': 'Bhajan-kirtan all the way',

  'पूरा वाहन बुक करना है?': 'Want to book a whole vehicle?',
  'परिवार, सोसाइटी या मंदिर मंडली के लिए 17-सीटर टेम्पो ट्रैवलर व 35-सीटर बस उपलब्ध,': 'A 17-seater Tempo Traveller and 35-seater bus are available for families, societies or temple groups,',
  'कस्टम कोट लें': 'get a custom quote',
  '।': '.',

  /* ── why us ── */
  'हमारी सेवा': 'Our Seva',
  'सिर्फ़ ट्रैवल नहीं,': 'Not just travel,',
  'सेवा': 'seva',
  'तीर्थ यात्रा भावना का विषय है। हम हर छोटी बात का ध्यान रखते हैं।': 'A pilgrimage is a matter of feeling. We look after every small detail.',
  'मेट्रो पिकअप पॉइंट': 'Metro pickup points',
  'दिल्ली भर में तय पिकअप: उत्तम नगर, द्वारका, रोहिणी, लक्ष्मी नगर, आनंद विहार व अन्य।': 'Fixed pickups across Delhi: Uttam Nagar, Dwarka, Rohini, Laxmi Nagar, Anand Vihar and more.',
  'पूरे रास्ते भजन व कीर्तन, यात्रा नहीं, एक सत्संग जैसा अनुभव।': 'Bhajan and kirtan the whole way, less a journey, more a satsang.',
  'बुज़ुर्गों की विशेष सहायता': 'Special care for elders',
  'चढ़ने-उतरने में मदद, आगे की सीट, दवाई व आराम का पूरा ध्यान।': 'Help boarding and alighting, front seats, and full attention to medicines and comfort.',
  'अकेली यात्रा करने वाली महिलाओं के लिए अलग व सुरक्षित सीट व्यवस्था।': 'Separate, secure seating for women travelling alone.',
  'महिलाओं हेतु सुरक्षित सीटिंग': 'Safe seating for women',
  'परिवार को लाइव लोकेशन': 'Live location for family',
  'WhatsApp पर घरवालों को यात्रा की लाइव लोकेशन, पूरी निश्चिंतता।': 'Live location shared with family on WhatsApp, complete peace of mind.',
  'प्रसाद व पानी शामिल': 'Prasad & water included',
  'हर यात्री को पानी की बोतल एवं मंदिर का प्रसाद, कोई छिपा शुल्क नहीं।': 'A water bottle and temple prasad for every traveller, no hidden charges.',
  'यात्रा बीमा कवर': 'Travel insurance cover',
  'हर यात्री का ट्रैवल इंश्योरेंस, सुरक्षा में कोई समझौता नहीं।': 'Travel insurance for every passenger, no compromise on safety.',
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
  'सीटें सीमित: पहले आओ, पहले पाओ के आधार पर।': 'Seats are limited: first come, first served.',
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
  'वृंदावन की एक दिन की ट्रिप में 5 मंदिर करा दिए, वो भी बिना भागदौड़ के। गाड़ी साफ़, ड्राइवर सज्जन। भजन चलते रहे, बहुत आनंद आया।': 'They covered 5 temples in a one-day Vrindavan trip, and without any rush. Clean vehicle, courteous driver. Bhajans played throughout, we enjoyed it thoroughly.',
  'राकेश गुप्ता': 'Rakesh Gupta',
  'रोहिणी, दिल्ली': 'Rohini, Delhi',
  'हमारी सोसाइटी की 32 लोगों की बुकिंग थी। रेट भी ठीक और व्यवस्था बढ़िया। घरवालों को लाइव लोकेशन मिलती रही, यही बात सबसे अच्छी लगी।': 'We booked for 32 people from our society. The rate was fair and the arrangements were good. Our families kept receiving the live location, that was the best part.',
  'अनिल यादव': 'Anil Yadav',
  'द्वारका, दिल्ली': 'Dwarka, Delhi',
  'पहली बार महिलाओं के समूह के साथ यात्रा पर गई थी, थोड़ा संकोच था। पर बैठने की व्यवस्था अलग और सुरक्षित रखी गई, रास्ते में कोई परेशानी नहीं हुई। समय पर निकले और समय पर लौटे। अब परिवार के साथ दोबारा जाऊँगी।': 'It was my first trip with a group of women, and I was a little hesitant. But the seating was kept separate and safe, and there was no trouble on the way. We left on time and returned on time. I will go again with my family.',
  'लक्ष्मी जी': 'Lakshmi Ji',
  'दिल्ली': 'Delhi',

  /* ── booking ── */
  'बुकिंग': 'Booking',
  'सीट बुक करें': 'Book your seat',
  'फ़ॉर्म भरें, आपकी जानकारी सीधे हमारे WhatsApp पर पहुँच जाएगी और हम कुछ ही मिनटों में उपलब्धता बताकर बुकिंग कन्फ़र्म कर देंगे।': 'Fill in the form, your details reach our WhatsApp directly, and within minutes we will confirm availability and your booking.',
  'दर्शन प्रभारी': 'Darshan In-charge',
  'यात्रा से जुड़ी हर बात के लिए सीधे बात करें': 'Speak directly about anything to do with your yatra',
  'सीधे WhatsApp करें': 'Message us on WhatsApp',
  '₹501 टोकन देकर सीट पक्की करें': 'Pay ₹501 token to hold your seat',
  'पहले WhatsApp पर सीट की उपलब्धता पूछ लें, कन्फ़र्म होने के बाद ही टोकन भेजें। भुगतान का स्क्रीनशॉट WhatsApp पर भेजते ही बुकिंग पक्की।': 'Please check seat availability on WhatsApp first, send the token only once we confirm. Share the payment screenshot on WhatsApp and your booking is locked in.',
  '✓ न्यूनतम 12 सीट पर यात्रा कन्फ़र्म': '✓ Yatra confirmed at a minimum of 12 seats',
  '✓ प्रस्थान से 72 घंटे पहले तक 100% रिफंड': '✓ 100% refund up to 72 hours before departure',

  'पूरा नाम': 'Full name',
  'जैसे: राम कुमार': 'e.g. Ram Kumar',
  'मोबाइल नंबर': 'Mobile number',
  '10 अंकों का नंबर': '10-digit number',
  'कौन सी यात्रा?': 'Which yatra?',
  'यात्रा चुनें': 'Select a yatra',
  'पूरा वाहन बुकिंग (कस्टम)': 'Whole vehicle booking (custom)',
  'यात्रा की तिथि': 'Date of yatra',
  'कितने लोग?': 'How many people?',
  'चुनें': 'Select',
  '11–17 (पूरा टेम्पो)': '11–17 (full Tempo)',
  '18+ (बस)': '18+ (bus)',
  'पिकअप पॉइंट': 'Pickup point',
  'नज़दीकी मेट्रो चुनें': 'Choose nearest metro',
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
  'भेजने पर WhatsApp खुलेगा, संदेश पहले से भरा मिलेगा, बस Send दबाएँ।': 'WhatsApp will open with the message already filled in, just press Send.',

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
  'हम आपको समय पर मंदिर पहुँचाते हैं और लाइन में पूरी सहायता करते हैं। परंतु मंदिर की भीड़, कतार की अवधि या प्रशासन द्वारा किए गए बदलाव हमारे नियंत्रण में नहीं होते, इसे बुकिंग शर्तों में स्पष्ट लिखा गया है।': 'We get you to the temple on time and help you throughout the queue. But temple crowds, how long the queue takes, or changes made by the administration are outside our control, this is stated clearly in the booking terms.',
  'पूरा वाहन बुक करना हो तो?': 'What if I want to book a whole vehicle?',
  'परिवार, RWA, ऑफ़िस या मंदिर मंडली के लिए 17-सीटर टेम्पो ट्रैवलर और 35/45-सीटर बस उपलब्ध है। ऊपर फ़ॉर्म में "पूरा वाहन बुकिंग" चुनें, हम आपको कस्टम कोट भेज देंगे।': 'A 17-seater Tempo Traveller and 35/45-seater buses are available for families, RWAs, offices or temple groups. Select “Whole vehicle booking” in the form above, we will send you a custom quote.',
  'मेला/त्योहार के समय बुकिंग कब करें?': 'When should I book for a mela or festival?',
  'फाल्गुन मेला, जन्माष्टमी और एकादशी जैसे अवसरों पर सीटें 3–4 सप्ताह पहले भर जाती हैं। ऐसे समय पहले से बुकिंग कराना ज़रूरी है।': 'For occasions like the Phalgun Mela, Janmashtami and Ekadashi, seats fill up 3–4 weeks in advance. Booking early is essential at such times.',

  /* AI/Google की खोज के लिए जोड़े गए तीन सवाल (31 जुलाई 2026),
     लोग यही शब्द टाइप करते हैं: दूरी, समय, पिकअप, कौन से मंदिर */
  'दिल्ली से खाटू श्याम कितनी दूर है और कितना समय लगता है?': 'How far is Khatu Shyam from Delhi, and how long does it take?',
  'दिल्ली से खाटू श्याम जी लगभग 261 किमी है, सड़क मार्ग से 5–6 घंटे लगते हैं। हमारी यात्रा रात को दिल्ली से चलती है, सुबह दर्शन होते हैं और दोपहर तक वापसी। वृंदावन लगभग 160 किमी (करीब 3 घंटे), मेहंदीपुर बालाजी लगभग 245 किमी और सालासर लगभग 299 किमी दूर है।': 'Khatu Shyam Ji is about 261 km from Delhi, roughly 5–6 hours by road. Our yatra leaves Delhi at night, darshan is in the morning, and we return by afternoon. Vrindavan is about 160 km (around 3 hours), Mehandipur Balaji about 245 km and Salasar about 299 km.',
  'पिकअप कहाँ से मिलता है?': 'Where is the pickup point?',
  'दिल्ली-NCR के मेट्रो स्टेशनों और तय पिकअप पॉइंट से। बुकिंग पक्की होते ही आपको WhatsApp पर अपना पिकअप पॉइंट, उसका समय और Google नक़्शे का लिंक भेज दिया जाता है। नोएडा, गुरुग्राम, ग़ाज़ियाबाद और फ़रीदाबाद से भी यात्री जुड़ते हैं।': 'From metro stations and fixed pickup points across Delhi-NCR. As soon as your booking is confirmed, we send your pickup point, its time and a Google Maps link on WhatsApp. Pilgrims also join from Noida, Gurugram, Ghaziabad and Faridabad.',
  'एक दिन की यात्रा में कौन-कौन से मंदिर होते हैं?': 'Which temples are covered in a one-day yatra?',
  'वृंदावन-मथुरा यात्रा में बांके बिहारी, प्रेम मंदिर, ISKCON, निधिवन और मथुरा जन्मभूमि, सब एक ही दिन में। खाटू श्याम यात्रा में श्री श्याम मंदिर के दर्शन, और चाहें तो सालासर बालाजी जोड़कर दो धाम एक साथ।': 'The Vrindavan-Mathura yatra covers Banke Bihari, Prem Mandir, ISKCON, Nidhivan and Mathura Janmabhoomi, all in a single day. The Khatu Shyam yatra covers Shri Shyam Mandir, and you can add Salasar Balaji to make it a two-dham trip.',

  /* ── closing cta + footer ── */
  'अगली यात्रा में आपका स्वागत है 🙏': 'You are welcome on our next yatra 🙏',
  'सीटें सीमित हैं, आज ही अपनी जगह पक्की करें।': 'Seats are limited, reserve your place today.',
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
  /* यात्रा कार्ड की तस्वीरों का alt, स्क्रीन रीडर और तस्वीर न खुलने पर यही दिखता है */
  'खाटू श्याम जी मंदिर का मुख्य द्वार, सीकर': 'Main gate of Khatu Shyam Ji temple, Sikar',
  'वृंदावन का प्रेम मंदिर, सफ़ेद संगमरमर की भव्य इमारत': 'Prem Mandir, Vrindavan, the grand white marble temple',
  'मेहंदीपुर बालाजी का गर्भगृह, सुनहरे स्वरूप के दर्शन': 'Sanctum of Mehandipur Balaji, darshan of the golden form',
  'सालासर धाम का प्रवेश द्वार, चूरू': 'Entrance gate of Salasar Dham, Churu',
  '🙏 जय श्री श्याम': '🙏 Jai Shri Shyam',
  /* ⚠️ 🔐 समेत लिखना ज़रूरी है, HTML में जो लिखा है, हूबहू वही key बनती है।
     (admin.html हमेशा हिन्दी में ही रहता है, वो i18n.js लोड नहीं करता) */
  '🔐 प्रबंधक लॉगिन': '🔐 Manager login',
  'यात्राओं की झलक देखें': 'See our yatras',
  /* सोशल बटन के नाम, फ़ुटर के आइकन और बुकिंग वाली पिल्स दोनों में लगते हैं */
  'इंस्टाग्राम': 'Instagram',
  'फ़ेसबुक': 'Facebook',
  'यूट्यूब': 'YouTube',

  /* ── पंचांग सेक्शन ──
     कैलेंडर के अंदर का टेक्स्ट (तिथि, नक्षत्र, त्योहार) panchang.js
     ख़ुद दोनों भाषाओं में बनाता है, उसे यहाँ जोड़ने की ज़रूरत नहीं। */
  'पंचांग': 'Panchang',
  'हिन्दू पंचांग': 'Hindu Panchang',
  '🗓️ पूरा पंचांग और आगामी व्रत-त्योहार देखें': '🗓️ See the full panchang and upcoming festivals',

  /* ── panchang.html ── */
  'आज की तिथि, नक्षत्र और इस महीने के व्रत-पर्व': 'Today’s tithi, nakshatra and this month’s festivals',
  'दिल्ली के सूर्योदय के अनुसार गणना: तिथि, नक्षत्र, योग, सूर्योदय-सूर्यास्त और आने वाले सभी बड़े व्रत-त्योहार की तारीख़ें।': 'Calculated for Delhi sunrise: tithi, nakshatra, yoga, sunrise-sunset and the dates of every major fast and festival ahead.',
  'आगे आने वाले व्रत और त्योहार': 'Upcoming fasts and festivals',
  'इन तिथियों पर यात्रा की सीटें सबसे पहले भरती हैं, 3–4 सप्ताह पहले बुकिंग करा लेना ठीक रहता है।': 'Seats fill up first on these dates, booking 3–4 weeks ahead is wise.',
  'पंचांग की पाँच बातें, आसान भाषा में': 'Five things about the panchang, in plain words',
  'तिथि क्या होती है?': 'What is a tithi?',
  'चंद्रमा और सूर्य के बीच का अंतर जब 12 अंश बढ़ता है, तब एक तिथि पूरी होती है। इसीलिए तिथि 24 घंटे की नहीं होती: कभी 20 घंटे की, कभी 26 घंटे की। जिस तिथि में सूर्योदय होता है, परंपरा में उसी दिन की तिथि मानी जाती है।': 'A tithi completes each time the gap between the moon and the sun grows by 12 degrees. That is why a tithi is not 24 hours: sometimes 20, sometimes 26. By tradition, the tithi running at sunrise is taken as that day’s tithi.',
  'शुक्ल पक्ष और कृष्ण पक्ष का मतलब?': 'What do Shukla and Krishna paksha mean?',
  'अमावस्या के बाद चंद्रमा बढ़ता है, वे 15 दिन शुक्ल पक्ष, जो पूर्णिमा पर पूरे होते हैं। फिर चंद्रमा घटता है, वे 15 दिन कृष्ण पक्ष, जो अमावस्या पर पूरे होते हैं। दोनों मिलाकर एक चंद्र मास।': 'After the new moon the moon waxes, those 15 days are Shukla paksha, ending at the full moon. Then it wanes, those 15 days are Krishna paksha, ending at the new moon. Together they make one lunar month.',
  'नक्षत्र क्या है?': 'What is a nakshatra?',
  'आकाश के चंद्र-पथ को 27 भागों में बाँटा गया है, हर भाग एक नक्षत्र। चंद्रमा जिस भाग में हो, उस दिन का वही नक्षत्र। शुभ कार्य के मुहूर्त में नक्षत्र देखा जाता है।': 'The moon’s path across the sky is divided into 27 parts, each one a nakshatra. Whichever part the moon occupies is that day’s nakshatra. It is consulted when choosing an auspicious muhurat.',
  'एकादशी हर महीने दो बार क्यों आती है?': 'Why does Ekadashi come twice a month?',
  'एकादशी यानी ग्यारहवीं तिथि, और ग्यारहवीं तिथि दोनों पक्षों में आती है, इसलिए महीने में दो एकादशी पड़ती हैं। खाटू श्याम जी के भक्तों के लिए शुक्ल पक्ष की एकादशी विशेष मानी जाती है।': 'Ekadashi means the eleventh tithi, and the eleventh tithi falls in both pakshas, so there are two each month. For devotees of Khatu Shyam Ji, the Shukla paksha Ekadashi is held especially dear.',
  'दीपावली और होली की तारीख़ हर साल बदलती क्यों है?': 'Why do Deepawali and Holi fall on different dates each year?',
  'हमारे त्योहार अंग्रेज़ी तारीख़ से नहीं, चंद्रमा की तिथि से तय होते हैं। चंद्र वर्ष सौर वर्ष से लगभग 11 दिन छोटा होता है, इसलिए तारीख़ हर साल खिसकती है, और तीन साल में एक बार अधिक मास जोड़कर हिसाब बराबर किया जाता है।': 'Our festivals follow the moon, not the English calendar. A lunar year is about 11 days shorter than a solar one, so the dates shift each year, and roughly every third year an extra month (adhika masa) is added to set the count right.',
  '⚠️ यह गणना से बना पंचांग है (दिल्ली सूर्योदय)। व्रत की तारीख़ पक्की करने से पहले अपने स्थानीय पंचांग से एक बार मिला लें।': '⚠️ This panchang is calculated (Delhi sunrise). Please cross-check with your local panchang before fixing a vrat date.',
  'शुभ तिथि पर दर्शन की तैयारी है? 🙏': 'Planning darshan on an auspicious date? 🙏',
  'आज की तिथि, व्रत-त्योहार की तारीख़ें | Darshan Yatra Seva': 'Today’s Tithi, Vrat & Festival Dates | Darshan Yatra Seva',
  'आज की तिथि और इस महीने के व्रत-पर्व': 'Today’s tithi and this month’s festivals',
  'तिथि, नक्षत्र, सूर्योदय और त्योहार, दिल्ली के समय के अनुसार। किसी भी तारीख़ पर दबाकर उस दिन की यात्रा के बारे में पूछ सकते हैं।': 'Tithi, nakshatra, sunrise and festivals, as per Delhi time. Tap any date to ask about a yatra on that day.',

  /* ── धामों की कथा (सेक्शन + katha.html) ──
     कार्ड और कथाओं के अंदर का टेक्स्ट katha.js ख़ुद दोनों भाषाओं में
     बनाता है, यहाँ सिर्फ़ पक्का HTML वाला टेक्स्ट है। */
  'धामों की कथा': 'Stories of the Dhams',
  'ये धाम क्यों माने जाते हैं, और पूजा कैसे होती है': 'Why these dhams are revered, and how the puja is done',
  'तीस वर्षों के सत्संग और यात्राओं के अनुभव से, सरल भाषा में, ताकि दर्शन से पहले मन तैयार हो।': 'From thirty years of satsang and yatras, told simply, so the heart is ready before darshan.',
  '📖 सातों धामों की कथा पढ़ें': '📖 Read the stories of all seven dhams',
  'मान्यता क्या है, और पूजा कैसे की जाती है': 'The belief behind each dham, and how the puja is done',
  'तीस वर्षों के सत्संग और यात्राओं के अनुभव से, सरल भाषा में, ताकि दर्शन से पहले मन तैयार हो और वहाँ जाकर यह न सोचना पड़े कि क्या करें, क्या न करें।': 'From thirty years of satsang and yatras, told simply, so the heart is ready before darshan, and you never have to wonder what to do once you are there.',
  '← मुख्य पेज': '← Main page',
  '🙏 ये कथाएँ श्रद्धा और परंपरा पर आधारित हैं। क्षेत्र, परिवार और गुरु-परंपरा के अनुसार पूजा की विधि में थोड़ा अंतर मिलता है, इसलिए धाम पर वहाँ के पुजारी जी से पूछ लेना सबसे अच्छा रहता है। कोई बात सुधारने योग्य लगे तो हमें WhatsApp पर ज़रूर बताइए, हम उसे ठीक कर देंगे।': '🙏 These stories rest on faith and tradition. The vidhi varies a little by region, family and guru-parampara, so it is always best to ask the pujari at the dham itself. If anything here deserves correction, please tell us on WhatsApp and we will set it right.',
  'खाटू श्याम व सालासर धाम की कथा | Darshan Yatra Seva': 'Khatu Shyam & Salasar Dham Katha | Darshan Yatra Seva',

  /* ── पंडित जी सेवा ──
     पूरे पेज (/pandit-ji) का अनुवाद build-pandit.js से बनकर उस पेज के
     window.EN_EXTRA में आता है, यहाँ नहीं। यह एक लाइन सिर्फ़ इसलिए है
     कि फ़ुटर का लिंक मुख्य पेज पर है (§4 नियम 2)। */
  'पंडित जी सेवा': 'Pandit Ji Seva',
  'पूजाओं का महत्व': 'Significance of Pujas',

  /* ── page title ── */
  'दिल्ली से खाटू श्याम व वृंदावन यात्रा | Darshan Yatra Seva': 'Khatu Shyam & Vrindavan Yatra from Delhi | Darshan Yatra Seva'
};

/* ═══ स्विचिंग लॉजिक ═══════════════════════════════════════ */
(function(){
  const ATTRS = ['placeholder','aria-label','alt','title','data-l'];
  const store = [];               // { set(text), hi, en }
  const has = s => Object.prototype.hasOwnProperty.call(EN, s);

  /* यात्रा वाले पेज अपना अनुवाद अपने साथ लाते हैं (window.EN_EXTRA), क्योंकि
     वो पेज और उनका अनुवाद दोनों build-yatra.js से एक साथ बनते हैं। इसलिए
     वहाँ §4 नियम 2 वाली "हूबहू मिलान टूट गया" वाली गड़बड़ी हो ही नहीं सकती।
     ⚠️ यहाँ मुख्य साइट का कोई अनुवाद मत डालना, वो नीचे EN में ही रहे। */
  if (window.EN_EXTRA) Object.assign(EN, window.EN_EXTRA);

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
    /* पहली बार आने वाले को हिंदी, हमारे ज़्यादातर यात्री हिंदी पढ़ते हैं */
    apply(saved === 'en' ? 'en' : 'hi');

    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => {
      apply(document.documentElement.lang === 'en' ? 'hi' : 'en');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* ═══════════════════════════════════════════════════════════
   build-guide.js, यात्रा की तैयारी वाले पेज  →  दर्जा 3

   बने (16 अगस्त 2026): PAGES-PLAN.md के पेज 31 और 32।

       /buzurgon-ke-saath-yatra
       /mahilaon-ke-liye-yatra

   क्यों यही दो सबसे पहले:
   ये हमारी सबसे बड़ी ताक़त हैं। §16 की पूरी मेहनत बुज़ुर्गों के लिए हुई
   थी, और llms.txt में भी यही दो बातें सबसे ऊपर लिखी हैं। इन पर हमसे
   बेहतर कोई नहीं लिख सकता, क्योंकि यह हमारा रोज़ का काम है।

   🔴 चलाने का तरीक़ा:
       node build-guide.js

   ⚠️ बनी हुई .html फ़ाइलों में हाथ से कुछ मत लिखना।

   ═══════════════════════════════════════════════════════════
   🔴 इन दो पेजों पर लिखते समय तीन बातें ध्यान में रखी गई हैं

   (1) **कोई नया वादा नहीं जोड़ा गया।** पेज पर वही सुविधाएँ लिखी हैं जो
       पहले से `llms.txt`, `index.html` और यात्रा पेजों पर हैं: आगे की
       सीट, चढ़ने-उतरने में मदद, लाइन में साथ, पहले से बताने पर
       व्हीलचेयर, महिलाओं की अलग और सुरक्षित बैठक, परिवार को लाइव
       लोकेशन, यात्रा सहायक, यात्रा बीमा।
       ⚠️ कोई नई सुविधा यहाँ मत जोड़िए जब तक Vinod हाँ न कहें (§4 नियम 4)।

   (2) **सुरक्षा का कोई पक्का दावा नहीं।** "पूरी तरह सुरक्षित",
       "कोई ख़तरा नहीं" जैसे शब्द कहीं नहीं हैं। जो हम करते हैं वो लिखा
       है, नतीजे की गारंटी नहीं दी गई। दर्शन की गारंटी न देने वाला
       नियम (§17) यहाँ भी उसी भाव से लागू है।

   (3) **सेहत की सलाह नहीं दी गई।** हम ट्रैवल वाले हैं, डॉक्टर नहीं।
       जहाँ ज़रूरी था वहाँ साफ़ लिखा है कि डॉक्टर से पूछ लीजिए।
       ⚠️ "यह बीमारी हो तो यात्रा कर सकते हैं" जैसा कुछ कभी मत लिखना।

   ⚠️ §4 नियम 1: कोई दाम नहीं। §4 नियम 5: डैश नहीं (build में जाँच है)।
   ⚠️ §4 नियम 2: अनुवाद यहीं t(हिन्दी, English) से।
   ═══════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.darshanyatraseva.com';
const V    = 22;
const TODAY = '2026-08-16';

const t = (hi, en) => ({ hi, en });

const PAGES = [

/* ═══════════════════════ 1. बुज़ुर्ग यात्री ═══════════════════════ */
{
  slug: 'buzurgon-ke-saath-yatra',

  title: t('बुज़ुर्ग माता पिता के साथ तीर्थ यात्रा कैसे कराएँ | Darshan Yatra Seva',
           'How to Take Elderly Parents on a Pilgrimage | Darshan Yatra Seva'),
  metaDesc: t('बुज़ुर्ग माता पिता को तीर्थ यात्रा कराने से पहले क्या तैयारी करें, कौन सी यात्रा उनके लिए आसान रहती है, दवा और काग़ज़ों में क्या साथ रखें, और दिल्ली से खाटू श्याम, वृंदावन, मेहंदीपुर या सालासर में से किसमें कितना चलना पड़ता है।',
              'How to prepare before taking elderly parents on a pilgrimage, which yatra is easier for them, what medicines and papers to carry, and how much walking is involved at Khatu Shyam, Vrindavan, Mehandipur and Salasar from Delhi.'),

  eyebrow: t('बुज़ुर्गों के साथ तीर्थ यात्रा', 'Pilgrimage with elderly parents'),
  h1: t('बुज़ुर्ग माता पिता के साथ तीर्थ यात्रा कैसे कराएँ',
        'How to take elderly parents on a pilgrimage'),
  lede: t('माता पिता की उम्र हो चली है और वे धाम जाना चाहते हैं। मन तो सबका होता है, पर सवाल यह रहता है कि इतनी लंबी यात्रा वे कर पाएँगे या नहीं। यह पेज उसी सवाल का जवाब है, हमारे अपने अनुभव से।',
          'Your parents are getting on in years and want to visit a dham. Everyone wants to take them, but the question is whether they can manage such a long journey. This page answers that question, from our own experience.'),

  facts: [
    { b: '440+', s: t('यात्री ले जा चुके हैं', 'pilgrims travelled with us') },
    { b: t('ज़्यादातर', 'Most'), s: t('यात्री बुज़ुर्ग ही होते हैं', 'of our pilgrims are elderly') },
    { b: '17px', s: t('साइट के अक्षर, पढ़ने लायक़', 'text on this site, easy to read') },
    { b: t('आगे की', 'Front'), s: t('सीट, कहने पर', 'seats, on request') }
  ],

  intro: t('हमारे ज़्यादातर यात्री बुज़ुर्ग ही होते हैं, इसलिए पूरी यात्रा शुरू से उसी हिसाब से बनाई जाती है। सच यह है कि उम्र से ज़्यादा फ़र्क़ तैयारी से पड़ता है। 75 साल के यात्री आराम से दर्शन करके लौटते हैं और 55 के यात्री बिना तैयारी के थक जाते हैं। नीचे लिखा है कि असल में दिक़्क़त कहाँ आती है, हम क्या करते हैं, और आपको घर से क्या तैयारी करके भेजनी है।',
           'Most of our pilgrims are elderly, so the whole trip is built around that from the start. The truth is that preparation matters more than age. Pilgrims of 75 complete their darshan comfortably and return, while someone of 55 who came unprepared gets worn out. Below is where the difficulty actually lies, what we do about it, and what you should prepare before they leave home.'),

  /* असली दिक़्क़तें। ये सुविधाएँ नहीं, चेतावनियाँ हैं, इसलिए ⚠️ वाली सूची */
  problemHead: t('असल में दिक़्क़त कहाँ आती है', 'Where the difficulty actually lies'),
  problems: [
    t('दर्शन की लाइन सबसे बड़ी परीक्षा होती है। एकादशी और मेले के दिन खाटू में लाइन 4 से 6 घंटे तक लग जाती है, और उसमें ज़्यादातर समय खड़े रहना पड़ता है',
      'The darshan queue is the hardest part. On Ekadashi and mela days the line at Khatu can run 4 to 6 hours, most of it spent standing'),
    t('मंदिरों में सीढ़ियाँ होती हैं और वो हमारे हाथ में नहीं हैं। किसी धाम में रैंप है, किसी में नहीं',
      'Temples have steps and those are not in our hands. Some dhams have a ramp, others do not'),
    t('शौचालय हर जगह पास नहीं मिलता, ख़ासकर लाइन में लगे रहते समय। यह वो बात है जो कोई पूछता नहीं पर सबसे ज़्यादा परेशान करती है',
      'Toilets are not always close by, especially while standing in the queue. This is the thing nobody asks about and that troubles people the most'),
    t('गर्मी में दोपहर का समय बुज़ुर्गों के लिए भारी पड़ता है, और सर्दी में सुबह का ठंडा फ़र्श',
      'Afternoon heat is hard on the elderly in summer, as is the cold floor in the early morning in winter'),
    t('दवा घर पर छूट जाना सबसे आम गड़बड़ी है। रात की यात्रा में दवा का समय भी अक्सर निकल जाता है',
      'Medicines left behind at home is the commonest slip. On a night journey the dose time is often missed too')
  ],

  sevaHead: t('हम क्या करते हैं', 'What we do'),
  seva: [
    { ic: '💺', h: t('आगे की सीट', 'Front seats'),
                p: t('कहने पर आगे की सीट दी जाती है, जहाँ हिलना कम लगता है और उतरना आसान रहता है।',
                     'Front seats are given on request, where the ride is steadier and getting down is easier.') },
    { ic: '🤝', h: t('चढ़ने और उतरने में मदद', 'Help boarding and alighting'),
                p: t('हर पिकअप और हर रुकाव पर सहायक हाथ पकड़कर चढ़ाता और उतारता है।',
                     'At every pickup and every halt the assistant helps them up and down by hand.') },
    { ic: '🧑‍🦳', h: t('लाइन में साथ', 'With them in the queue'),
                p: t('दर्शन की लाइन में हमारा यात्रा सहायक साथ खड़ा रहता है, अकेला नहीं छोड़ता।',
                     'Our travel assistant stands with them in the darshan queue and does not leave them alone.') },
    { ic: '♿', h: t('व्हीलचेयर, पहले से बताने पर', 'Wheelchair, on advance notice'),
                p: t('ज़रूरत हो तो बुकिंग के समय बता दीजिए, व्यवस्था करा दी जाती है।',
                     'If it is needed, tell us at booking time and it is arranged.') },
    { ic: '📍', h: t('परिवार को लाइव लोकेशन', 'Live location for the family'),
                p: t('घर बैठे बेटे बेटी को WhatsApp पर गाड़ी की लाइव लोकेशन मिलती रहती है।',
                     'Sons and daughters at home keep getting the vehicle\'s live location on WhatsApp.') },
    { ic: '🛡️', h: t('यात्रा बीमा', 'Travel insurance'),
                p: t('हर यात्री का ट्रैवल इंश्योरेंस किराए में ही शामिल रहता है।',
                     'Travel insurance for every pilgrim is included in the fare itself.') }
  ],

  prepHead: t('घर से क्या तैयारी करके भेजें', 'What to prepare before they leave home'),
  prep: [
    t('रोज़ की दवा पूरी यात्रा से दो दिन ज़्यादा की, और एक पर्ची जिस पर दवा के नाम और समय लिखे हों',
      'Their regular medicines for two days longer than the trip, and a slip listing the medicine names and timings'),
    t('डॉक्टर का नंबर और कोई पुरानी बीमारी हो तो उसका काग़ज़, बटुए में नहीं, बैग की ऊपरी जेब में',
      'The doctor\'s number and papers for any existing condition, in the outer pocket of the bag rather than in a wallet'),
    t('एक परची जिस पर उनका नाम, घर का पता और दो नंबर लिखे हों, जेब में रखवा दीजिए। फ़ोन बंद हो जाए तब यही काम आती है',
      'A slip in their pocket with their name, home address and two phone numbers. This is what helps if the phone dies'),
    t('चलने में आराम वाले जूते या चप्पल, और मोटे तलवे वाले, क्योंकि मंदिर के बाहर जूते उतारकर पैदल चलना पड़ता है',
      'Comfortable footwear with a thick sole, since one has to walk barefoot after leaving shoes outside the temple'),
    t('छोटी पानी की बोतल, ग्लूकोज़ या नमक चीनी का घोल, और गर्मी में एक सूती गमछा या टोपी',
      'A small water bottle, glucose or a salt and sugar solution, and a cotton cloth or cap in summer'),
    t('चश्मा, और कान की मशीन लगाते हों तो उसकी अतिरिक्त बैटरी',
      'Spectacles, and spare batteries if they use a hearing aid'),
    t('नक़दी थोड़ी सी अलग जेब में, क्योंकि मंदिर के अंदर फ़ोन और बटुआ अक्सर जमा कराने पड़ते हैं',
      'A little cash in a separate pocket, since phones and wallets often have to be deposited outside the temple')
  ],

  chooseHead: t('कौन सी यात्रा उनके लिए आसान रहेगी', 'Which yatra will be easier for them'),
  choose: [
    { n: '1', h: t('खाटू श्याम, रात की यात्रा', 'Khatu Shyam, night journey'),
             p: t('रात को गाड़ी चलती है इसलिए सफ़र सोते हुए कट जाता है और सुबह ताज़ा दम दर्शन होते हैं। पर एकादशी और लक्खी मेले के दिन लाइन बहुत लंबी होती है, बुज़ुर्गों के लिए वो दिन छोड़ देना बेहतर है।',
                  'The vehicle runs at night so the journey passes while they sleep and darshan happens fresh in the morning. But the queue is very long on Ekadashi and Lakkhi Mela days, and those dates are better avoided for the elderly.') },
    { n: '2', h: t('वृंदावन मथुरा, सबसे पास', 'Vrindavan Mathura, the nearest'),
             p: t('दिल्ली से सबसे पास है और सड़क अच्छी है, इसलिए सफ़र सबसे कम थकाता है। ध्यान यह रखिए कि एक ही दिन में पाँच मंदिर होते हैं, यानी चलना सबसे ज़्यादा इसी में पड़ता है।',
                  'It is the nearest to Delhi with a good road, so the journey itself tires them least. Keep in mind that five temples are covered in one day, so this involves the most walking.') },
    { n: '3', h: t('सालासर और खाटू, दो दिन में', 'Salasar and Khatu, over two days'),
             p: t('इसमें रात का ठहराव है, इसलिए बीच में आराम मिल जाता है। जिनसे एक ही दिन में पूरा सफ़र नहीं होता, उनके लिए यह ज़्यादा आराम की यात्रा है।',
                  'This one includes a night halt, so there is rest in between. For those who cannot manage the whole trip in a single day, this is the more restful option.') }
  ],

  faq: [
    { q: t('कितनी उम्र तक के यात्री जा सकते हैं?', 'Up to what age can pilgrims travel?'),
      a: t('हमने कोई उम्र की सीमा नहीं रखी है, और 80 पार के यात्री भी हमारे साथ जा चुके हैं। असल बात उम्र नहीं, चलने फिरने की हालत है। जो थोड़ी देर खड़े रह सकते हों और सहारे से चल लेते हों, वे आराम से यात्रा कर लेते हैं। ⚠️ हाल में कोई ऑपरेशन हुआ हो, या दिल, साँस या चक्कर की तकलीफ़ हो, तो यात्रा से पहले अपने डॉक्टर से एक बार ज़रूर पूछ लीजिए। यह सलाह हम नहीं दे सकते, वो आपके डॉक्टर का काम है।',
           'We have set no age limit, and pilgrims past 80 have travelled with us. What matters is mobility, not age. Anyone who can stand for a while and walk with support manages comfortably. ⚠️ If there has been a recent operation, or there is a heart, breathing or dizziness problem, do ask your own doctor before the trip. That advice is not ours to give, it is your doctor\'s.') },

    { q: t('अगर वे अकेले जा रहे हैं और घरवाले साथ नहीं हैं?',
           'What if they are travelling alone without family?'),
      a: t('यह आम बात है और इसी के लिए दो चीज़ें बनी हैं। एक, यात्रा सहायक पूरे समय समूह के साथ रहता है, दर्शन की लाइन में भी। दो, घरवालों को WhatsApp पर गाड़ी की लाइव लोकेशन भेजी जाती है, तो आप घर बैठे देख सकते हैं कि वे कहाँ पहुँचे। बुकिंग के समय अपना नंबर दे दीजिए, लोकेशन उसी पर आएगी।',
           'This is common and two things exist for exactly this. First, the travel assistant stays with the group throughout, including in the darshan queue. Second, the family is sent the vehicle\'s live location on WhatsApp, so you can see where they have reached from home. Give us your number at booking and the location comes to it.') },

    { q: t('क्या व्हीलचेयर मिल जाती है?', 'Is a wheelchair available?'),
      a: t('जी हाँ, पर **पहले से बताना ज़रूरी है**। बुकिंग के समय बता दीजिए तो व्यवस्था करा दी जाती है। ऐन मौक़े पर मंदिर में व्हीलचेयर मिल जाए, यह पक्का नहीं होता, इसलिए वादा हम तभी करते हैं जब पहले से पता हो।',
           'Yes, but it must be told in advance. Tell us at booking time and it is arranged. Getting a wheelchair at the temple at the last moment is not certain, so we promise it only when we know beforehand.') },

    { q: t('दर्शन की लंबी लाइन में वे खड़े नहीं रह सकते, तो?',
           'They cannot stand in a long queue, so what then?'),
      a: t('पहली बात, ऐसे यात्रियों के लिए एकादशी, मेले और बड़े त्योहार की तारीख़ें छोड़ दीजिए, उन दिनों लाइन सबसे लंबी होती है। आम दिनों में सुबह जल्दी पहुँचने पर लाइन काफ़ी कम मिलती है और हमारी खाटू यात्रा इसीलिए रात को चलती है। बहुत से मंदिरों में बुज़ुर्गों और दिव्यांगों के लिए अलग रास्ता होता है, हमारा सहायक वहाँ पहुँचकर पूछता है और जो सुविधा उपलब्ध हो उसमें मदद करता है। ⚠️ पर यह मंदिर प्रशासन के हाथ में है, हमारे नहीं, इसलिए इसका वादा हम नहीं कर सकते।',
           'First, avoid Ekadashi, mela and major festival dates for such pilgrims, as the queues are longest then. On ordinary days arriving early morning means a much shorter line, which is why our Khatu yatra runs at night. Many temples have a separate route for the elderly and disabled, and our assistant asks on arrival and helps with whatever is available. ⚠️ But that lies with the temple administration and not with us, so we cannot promise it.') },

    { q: t('क्या दर्शन हो ही जाएँगे?', 'Will the darshan definitely happen?'),
      a: t('नहीं, और यह हम साफ़ कह देते हैं। मंदिर की भीड़, लाइन की लंबाई और मंदिर प्रशासन के फ़ैसले हमारे हाथ में नहीं होते। हम लाइन में साथ रहते हैं और जो भी मदद हो सकती है वो करते हैं, पर दर्शन का वादा कोई नहीं कर सकता। जो करता है, वो सच नहीं बोल रहा।',
           'No, and we say so plainly. Temple crowding, queue length and the temple administration\'s decisions are not in our hands. We stay with them in the queue and help however we can, but nobody can promise darshan. Anyone who does is not telling the truth.') }
  ],

  ctaHead: t('माता पिता को दर्शन कराइए 🙏', 'Take your parents for darshan 🙏'),
  ctaSub: t('कौन सी यात्रा उनके लिए ठीक रहेगी, यह हमसे पूछ लीजिए। उनकी उम्र और चलने फिरने की हालत बता दीजिए, हम सही सलाह देंगे।',
            'Ask us which yatra will suit them. Tell us their age and how well they get about, and we will advise you honestly.'),
  wa: 'Jai Shri Shyam! Buzurg mata pita ke saath yatra karani hai, kaun si yatra theek rahegi bataayein.'
},

/* ═══════════════════════ 2. महिला यात्री ═══════════════════════ */
{
  slug: 'mahilaon-ke-liye-yatra',

  title: t('महिलाओं के लिए सुरक्षित तीर्थ यात्रा, दिल्ली से | Darshan Yatra Seva',
           'Safe Pilgrimage for Women Travellers from Delhi | Darshan Yatra Seva'),
  metaDesc: t('अकेले या महिलाओं के समूह के साथ तीर्थ यात्रा पर जाना हो तो बैठने की व्यवस्था, रात की यात्रा, परिवार को लाइव लोकेशन और यात्रा सहायक की व्यवस्था कैसी रहती है। किसी भी ट्रैवल वाले से बुकिंग से पहले क्या पूछना चाहिए, वो भी लिखा है।',
              'Seating, night travel, live location for the family and the travel assistant, for women travelling alone or in a group of women. Also what to ask any tour operator before booking.'),

  eyebrow: t('महिलाओं के लिए तीर्थ यात्रा', 'Pilgrimage for women travellers'),
  h1: t('महिलाओं के लिए सुरक्षित तीर्थ यात्रा', 'Safe pilgrimage for women travellers'),
  lede: t('अकेले जाना हो, या सहेलियों और सोसाइटी की महिलाओं के समूह के साथ, सबसे पहला सवाल यही उठता है कि व्यवस्था कैसी रहेगी। यह पेज उसी का जवाब है, और साथ में यह भी कि किसी भी ट्रैवल वाले से बुकिंग से पहले क्या पूछ लेना चाहिए।',
          'Whether travelling alone or with a group of friends or women from the society, the first question is always what the arrangements will be like. This page answers that, and also sets out what to ask any tour operator before booking.'),

  facts: [
    { b: t('अलग', 'Separate'), s: t('और सुरक्षित बैठक', 'and secure seating') },
    { b: t('साथ', 'Together'), s: t('महिला यात्री एक जगह', 'women seated as a group') },
    { b: '📍', s: t('परिवार को लाइव लोकेशन', 'live location for the family') },
    { b: '20+', s: t('यात्राएँ हो चुकी हैं', 'departures completed') }
  ],

  intro: t('तीर्थ यात्रा पर जाने का मन बहुत महिलाओं का होता है, पर घर से निकलने का फ़ैसला अक्सर इसी बात पर अटक जाता है कि रास्ते में और वहाँ पहुँचकर व्यवस्था कैसी मिलेगी। यह सवाल जायज़ है और इसे टालने की ज़रूरत नहीं। नीचे साफ़ लिखा है कि हम क्या करते हैं, आप ख़ुद क्या तैयारी रखें, और सबसे ज़रूरी, किसी भी ट्रैवल वाले से बुकिंग से पहले क्या पूछ लेना चाहिए। ये सवाल हमसे भी पूछे जा सकते हैं, हमें कोई दिक़्क़त नहीं।',
           'Many women want to go on a pilgrimage, but the decision to leave home often stalls on the question of what the arrangements will be like on the way and once there. It is a fair question and there is no need to skirt it. Below is what we do, what you should prepare yourself, and most importantly what to ask any tour operator before booking. These questions can be put to us too, and we do not mind at all.'),

  problemHead: t('जो बातें सबसे पहले पूछी जाती हैं', 'The questions asked first'),
  problems: [
    t('बैठने की व्यवस्था कैसी रहेगी, ख़ासकर तब जब अकेली यात्री हों और बाक़ी समूह अनजान हो',
      'What the seating will be like, especially when travelling alone among a group of strangers'),
    t('रात की यात्रा में गाड़ी कहाँ रुकती है और वहाँ शौचालय की हालत कैसी रहती है',
      'Where the vehicle halts on a night journey and what the toilets are like there'),
    t('घरवालों को कैसे पता चलता रहेगा कि आप कहाँ पहुँचीं',
      'How the family will keep knowing where you have reached'),
    t('मंदिर में फ़ोन और बटुआ जमा कराने पड़ते हैं, तब सामान का क्या होगा',
      'Phones and wallets have to be deposited at the temple, so what happens to belongings'),
    t('समूह में और कौन कौन जा रहा है, परिवार हैं या अकेले लोग',
      'Who else is on the trip, families or individuals')
  ],

  sevaHead: t('हम क्या करते हैं', 'What we do'),
  seva: [
    { ic: '💺', h: t('अलग और सुरक्षित बैठक', 'Separate and secure seating'),
                p: t('महिला यात्रियों को एक साथ बिठाया जाता है, अलग अलग सीटों पर बाँटा नहीं जाता।',
                     'Women passengers are seated together and not split up across the vehicle.') },
    { ic: '📍', h: t('परिवार को लाइव लोकेशन', 'Live location for the family'),
                p: t('घर पर जिसका नंबर दीजिए, उसे WhatsApp पर गाड़ी की लाइव लोकेशन जाती रहती है।',
                     'Whichever number you give at home receives the vehicle\'s live location on WhatsApp.') },
    { ic: '🧑‍🦳', h: t('यात्रा सहायक साथ', 'A travel assistant along'),
                p: t('पूरी यात्रा में एक सहायक समूह के साथ रहता है, दर्शन की लाइन में भी।',
                     'An assistant stays with the group through the whole trip, including in the darshan queue.') },
    { ic: '🚐', h: t('गाड़ी और ड्राइवर की जानकारी', 'Vehicle and driver details'),
                p: t('प्रस्थान से पहले गाड़ी का नंबर और ड्राइवर का नाम WhatsApp पर भेज दिया जाता है।',
                     'The vehicle number and driver\'s name are sent on WhatsApp before departure.') },
    { ic: '🛡️', h: t('यात्रा बीमा', 'Travel insurance'),
                p: t('हर यात्री का ट्रैवल इंश्योरेंस किराए में ही शामिल रहता है।',
                     'Travel insurance for every pilgrim is included in the fare itself.') },
    { ic: '🚇', h: t('मेट्रो से पिकअप', 'Pickup from the metro'),
                p: t('तय पिकअप पॉइंट मेट्रो स्टेशन के पास रखे जाते हैं, जहाँ रात में भी आना जाना रहता है।',
                     'Pickup points are kept near metro stations, where there is movement even at night.') }
  ],

  prepHead: t('अपनी तरफ़ से क्या तैयारी रखें', 'What to prepare from your side'),
  prep: [
    t('घर के किसी एक व्यक्ति का नंबर बुकिंग के समय दे दीजिए, लाइव लोकेशन उसी पर जाएगी',
      'Give one family member\'s number at booking time, the live location goes to that number'),
    t('गाड़ी का नंबर और ड्राइवर का नाम मिलने पर उसका स्क्रीनशॉट घर पर भेज दीजिए',
      'When you get the vehicle number and driver\'s name, send a screenshot of it home'),
    t('मंदिर में फ़ोन और बटुआ जमा कराने पड़ते हैं, इसलिए थोड़ी नक़दी अलग जेब में रखिए और गहने कम से कम पहनिए',
      'Phones and wallets have to be deposited at temples, so keep a little cash in a separate pocket and wear as little jewellery as possible'),
    t('चलने में आराम वाले कपड़े और ऐसा दुपट्टा या स्कार्फ़ जो सिर ढकने के काम आ जाए, ज़्यादातर मंदिरों में यह चलन है',
      'Comfortable clothes and a dupatta or scarf that can cover the head, which is the custom at most temples'),
    t('अपना पहचान पत्र साथ रखिए, और उसकी एक फ़ोटो अपने फ़ोन में भी',
      'Carry your identity card, and keep a photo of it on your phone as well'),
    t('अकेली जा रही हैं तो बुकिंग के समय बता दीजिए, बैठने की व्यवस्था उसी हिसाब से बनाई जाती है',
      'If you are travelling alone, say so at booking time and the seating is arranged accordingly')
  ],

  chooseHead: t('बुकिंग से पहले यह ज़रूर पूछिए', 'Ask this before you book'),
  choose: [
    { n: '1', h: t('गाड़ी का नंबर और ड्राइवर का नाम मिलेगा?',
                   'Will I get the vehicle number and driver name?'),
             p: t('जो ट्रैवल वाला यह पहले से देने में आनाकानी करे, वहाँ रुक जाइए। यह जानकारी देने में किसी को कोई दिक़्क़त नहीं होनी चाहिए।',
                  'If an operator hesitates to give this in advance, stop there. Nobody should have a problem sharing it.') },
    { n: '2', h: t('घर पर लोकेशन भेजी जाएगी?', 'Will the location be sent home?'),
             p: t('अगर हाँ, तो किस नंबर पर और कितनी देर में। सिर्फ़ "हाँ भेज देंगे" काफ़ी नहीं, तरीक़ा पूछिए।',
                  'If yes, to which number and how often. A plain yes is not enough, ask how it works.') },
    { n: '3', h: t('समूह में और कौन जा रहा है?', 'Who else is in the group?'),
             p: t('परिवार ज़्यादा हैं या अकेले लोग, और महिलाओं की गिनती कितनी है। यह पूछना बिल्कुल जायज़ है।',
                  'Whether it is mostly families or individuals, and how many women. It is entirely fair to ask.') },
    { n: '4', h: t('रास्ते में कहाँ रुकेंगे?', 'Where will we halt on the way?'),
             p: t('ढाबे का नाम या जगह पूछ लीजिए। जिन्हें रास्ता मालूम है वे तुरंत बता देते हैं।',
                  'Ask for the name or location of the dhaba. Those who know the route answer at once.') }
  ],

  faq: [
    { q: t('क्या अकेली महिला यात्रा कर सकती है?', 'Can a woman travel alone on the yatra?'),
      a: t('जी हाँ, और बहुत सी करती हैं। बुकिंग के समय बता दीजिए कि आप अकेली आ रही हैं, बैठने की व्यवस्था उसी हिसाब से बनाई जाती है और महिला यात्रियों को एक साथ बिठाया जाता है। यात्रा सहायक पूरे समय समूह के साथ रहता है।',
           'Yes, and many do. Say at booking time that you are coming alone, and the seating is arranged accordingly, with women passengers seated together. The travel assistant stays with the group throughout.') },

    { q: t('रात की यात्रा में गाड़ी कहाँ रुकती है?', 'Where does the vehicle halt on a night journey?'),
      a: t('खाटू वाली यात्रा रात को चलती है और रास्ते में तय ढाबों पर रुकती है, जहाँ रोशनी रहती है और आना जाना चलता रहता है। रुकाव की जगह बुकिंग के समय पूछ लीजिए, हम बता देते हैं। ⚠️ शौचालय ढाबे का होता है, हमारा नहीं, इसलिए उसकी हालत का वादा हम नहीं कर सकते। अपनी सुविधा का सामान साथ रखना हमेशा बेहतर रहता है।',
           'The Khatu yatra runs at night and halts at fixed dhabas on the route, which are lit and have people about. Ask where the halts are at booking time and we will tell you. ⚠️ The toilet belongs to the dhaba and not to us, so we cannot promise its condition. It is always better to carry your own supplies.') },

    { q: t('सोसाइटी की महिलाओं का पूरा समूह जाना चाहे तो?',
           'What if a whole group of women from a society wants to go?'),
      a: t('यह सबसे अच्छी व्यवस्था रहती है और अक्सर होता है। पूरी गाड़ी बुक कराई जा सकती है, 17 सीट की टेम्पो ट्रैवलर से लेकर 35 या 45 सीट की बस तक। तब पूरी गाड़ी में आपके अपने लोग ही रहते हैं और पिकअप भी आपकी सोसाइटी के गेट से हो जाता है।',
           'This works best and happens often. The whole vehicle can be booked, from a 17 seater Tempo Traveller to a 35 or 45 seater bus. Then everyone in the vehicle is from your own group, and the pickup can be from your society gate.') },

    { q: t('क्या आप सुरक्षा की गारंटी देते हैं?', 'Do you guarantee safety?'),
      a: t('गारंटी शब्द हम नहीं इस्तेमाल करेंगे, वो कहना आसान है और निभाना किसी के बस में नहीं। हम यह बता सकते हैं कि हम क्या करते हैं: महिला यात्री एक साथ बैठती हैं, यात्रा सहायक पूरे समय साथ रहता है, गाड़ी का नंबर और ड्राइवर का नाम पहले से आपके पास होता है, घर पर लाइव लोकेशन जाती रहती है, और हर यात्री का बीमा रहता है। यही हमारे हाथ में है और यही हम करते हैं।',
           'We will not use the word guarantee. It is easy to say and beyond anyone\'s power to deliver. What we can tell you is what we do: women passengers sit together, the travel assistant is with the group throughout, you have the vehicle number and driver\'s name in advance, live location goes home, and every pilgrim is insured. That is what is in our hands, and that is what we do.') },

    { q: t('बुकिंग रद्द करनी पड़े तो?', 'What if I have to cancel?'),
      a: t('प्रस्थान से 72 घंटे पहले तक रद्द करने पर 100% रिफंड। 24 से 72 घंटे के बीच 50%। 24 घंटे के अंदर रिफंड संभव नहीं, परंतु आप अपनी सीट किसी और को दे सकती हैं या अगली यात्रा में समायोजित करा सकती हैं।',
           '100% refund if you cancel more than 72 hours before departure. 50% between 24 and 72 hours. No refund within 24 hours, but you may pass your seat to someone else or carry it over to a future yatra.') }
  ],

  ctaHead: t('निश्चिंत होकर दर्शन कीजिए 🙏', 'Go for darshan with an easy mind 🙏'),
  ctaSub: t('कोई भी सवाल हो, बुकिंग से पहले पूछ लीजिए। जो पूछेंगी, सीधा जवाब मिलेगा।',
            'Ask whatever you want before booking. Whatever you ask, you will get a straight answer.'),
  wa: 'Jai Shri Shyam! Mahilaon ke liye yatra ki vyavastha ke baare mein jaankari chahiye.'
}
];

/* ═══════════════════════════════════════════════════════════
   सब पेजों पर एक जैसा
   ═══════════════════════════════════════════════════════════ */
const LBL = {
  faqHead:    t('पूछे जाने वाले सवाल', 'Questions people ask'),
  allYatras:  t('🚩 चारों यात्राएँ और आगामी प्रस्थान देखें',
                '🚩 See all four yatras and upcoming departures'),
  panchang:   t('🗓️ पूरा पंचांग और आगामी व्रत-त्योहार देखें',
                '🗓️ See the full panchang and upcoming vrat and festivals'),
  home:       t('← मुख्य पेज', '← Home'),
  book:       t('बुक करें', 'Book now'),
  ctaWa:      t('WhatsApp करें', 'Message on WhatsApp'),
  ctaBook:    t('अभी बुक करें', 'Book now'),
  topbar:     t('जय श्री श्याम, दिल्ली से हर सप्ताह यात्रा', 'Jai Shri Shyam, weekly yatras'),
  rights:     t('सर्वाधिकार सुरक्षित।', 'All rights reserved.')
};

/* ═══════════════════════════════════════════════════════════
   HTML
   ═══════════════════════════════════════════════════════════ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = txt => `https://wa.me/917289902692?text=${encodeURIComponent(txt)}`;

let _sec = 0;
const sec0  = () => { _sec = 0; };
const secCl = () => (_sec++ % 2 ? 'sec sec--alt' : 'sec');

function collectEN(cfg) {
  const out = {};
  const add = o => { if (o && o.hi && o.en && o.hi !== o.en) out[o.hi] = o.en; };
  add(cfg.title); add(cfg.eyebrow); add(cfg.h1); add(cfg.lede); add(cfg.intro);
  cfg.facts.forEach(f => { add(f.s); if (typeof f.b === 'object') add(f.b); });
  add(cfg.problemHead); cfg.problems.forEach(add);
  add(cfg.sevaHead); cfg.seva.forEach(s => { add(s.h); add(s.p); });
  add(cfg.prepHead); cfg.prep.forEach(add);
  add(cfg.chooseHead); cfg.choose.forEach(c => { add(c.h); add(c.p); });
  cfg.faq.forEach(f => { add(f.q); add(f.a); });
  add(cfg.ctaHead); add(cfg.ctaSub);
  Object.values(LBL).forEach(add);
  return out;
}

const factsHTML = cfg => cfg.facts.map(f => {
  const b = typeof f.b === 'object' ? esc(f.b.hi) : esc(f.b);
  return `      <div><b>${b}</b><span>${esc(f.s.hi)}</span></div>`;
}).join('\n');

const listHTML = (arr, cls) => arr.map(x =>
  `        <li>${esc(x.hi)}</li>`).join('\n');

const featHTML = cfg => cfg.seva.map(s =>
  `      <div class="feat"><span class="feat__ic">${s.ic}</span><h3>${esc(s.h.hi)}</h3><p>${esc(s.p.hi)}</p></div>`
).join('\n');

const stepHTML = cfg => cfg.choose.map(c =>
  `      <div class="step"><span class="step__n">${esc(c.n)}</span><h3>${esc(c.h.hi)}</h3><p>${esc(c.p.hi)}</p></div>`
).join('\n');

const faqHTML = cfg => cfg.faq.map(f =>
  `      <details><summary>${esc(f.q.hi)}</summary><p>${esc(f.a.hi)}</p></details>`).join('\n');

function schema(cfg) {
  const url = `${SITE}/${cfg.slug}`;
  const art = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: cfg.h1.hi, description: cfg.metaDesc.hi, inLanguage: 'hi-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': `${SITE}/#business` }, publisher: { '@id': `${SITE}/#business` },
    dateModified: TODAY
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
      { '@type': 'ListItem', position: 2, name: cfg.h1.hi, item: url }
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

function page(cfg) {
  const url = `${SITE}/${cfg.slug}`;
  const EN  = collectEN(cfg);
  sec0();

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

<!-- ⚠️ यह फ़ाइल build-guide.js से बनी है, हाथ से मत बदलिए -->
${schema(cfg)}
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

<!-- ══ मुख्य बातें ══ -->
<section class="trust">
  <div class="wrap trust__grid">
${factsHTML(cfg)}
  </div>
</section>

<!-- ══ परिचय ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <p class="ypage__intro">${esc(cfg.intro.hi)}</p>
  </div>
</section>

<!-- ══ असली दिक़्क़तें ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(cfg.problemHead.hi)}</h2>
    <ul class="kfull__list kfull__list--dhyan ypage__tips">
${listHTML(cfg.problems)}
    </ul>
  </div>
</section>

<!-- ══ हम क्या करते हैं ══ -->
<section class="${secCl()}">
  <div class="wrap">
    <h2 class="sec__title">${esc(cfg.sevaHead.hi)}</h2>
    <div class="feats slider is-open">
${featHTML(cfg)}
    </div>
  </div>
</section>

<!-- ══ तैयारी ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(cfg.prepHead.hi)}</h2>
    <ul class="kfull__list kfull__list--vidhi ypage__tips">
${listHTML(cfg.prep)}
    </ul>
  </div>
</section>

<!-- ══ कौन सी यात्रा / क्या पूछें ══ -->
<section class="${secCl()}">
  <div class="wrap">
    <h2 class="sec__title">${esc(cfg.chooseHead.hi)}</h2>
    <div class="steps slider is-open">
${stepHTML(cfg)}
    </div>
  </div>
</section>

<!-- ══ सवाल जवाब ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow">
    <h2 class="sec__title">${esc(LBL.faqHead.hi)}</h2>
    <div class="faq">
${faqHTML(cfg)}
    </div>
  </div>
</section>

<!-- ══ बाक़ी पेजों से जोड़ ══ -->
<section class="${secCl()}">
  <div class="wrap wrap--narrow ypage__links">
    <p class="katha__allWrap"><a class="btn btn--outline" href="/#yatras">${esc(LBL.allYatras.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/panchang">${esc(LBL.panchang.hi)}</a></p>
    <p class="katha__allWrap"><a class="btn btn--outline" href="/lekh">📖 यात्रा के लेख पढ़ें</a></p>
  </div>
</section>

<!-- ══ CTA ══ -->
<section class="cta">
  <div class="wrap cta__in">
    <h2>${esc(cfg.ctaHead.hi)}</h2>
    <p>${esc(cfg.ctaSub.hi)}</p>
    <div class="cta__btns">
      <a class="btn btn--gold btn--lg" href="/#book">${esc(LBL.ctaBook.hi)}</a>
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
   जाँच
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
  if (bad) { console.error(`\n  ❌ ${slug}.html में ${bad} डैश मिले (§4 नियम 5)।\n`); process.exit(1); }
}

/* 🔴 गारंटी वाले शब्द पकड़ो। सुरक्षा या दर्शन की गारंटी कभी नहीं देनी।
   "गारंटी नहीं देंगे" जैसी पंक्ति ठीक है, इसलिए सिर्फ़ चेतावनी छपती है। */
function checkPromise(slug, html) {
  const words = ['पूरी तरह सुरक्षित', 'कोई ख़तरा नहीं', '100% सुरक्षित', 'completely safe', 'guaranteed safe'];
  const hit = words.filter(w => html.includes(w));
  if (hit.length) {
    console.warn(`  ⚠️  ${slug}.html में दावे वाले शब्द: ${hit.join(', ')}`);
    console.warn('      §4 नियम 4 देखिए। जो हम करते हैं वो लिखिए, नतीजे की गारंटी मत दीजिए।');
  }
}

const KNOWN = i18nKeys();

for (const cfg of PAGES) {
  const html = page(cfg);
  checkTranslations(cfg.slug, html, collectEN(cfg), KNOWN);
  checkDash(cfg.slug, html);
  checkPromise(cfg.slug, html);
  fs.writeFileSync(path.join(__dirname, cfg.slug + '.html'), html, 'utf8');
  const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ')
                    .replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  ✅ ${cfg.slug}.html   (${words} शब्द Googlebot को दिखते हैं)`);
}
console.log('  ℹ️  sitemap.xml build-yatra.js से बनती है, वहाँ दोनों slug जोड़िए।');

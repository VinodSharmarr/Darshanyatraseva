/* ═══════════════════════════════════════════════════════════
   Darshan Yatra Seva — fontsize.js
   "अक्षर बड़े करें" — बुज़ुर्ग यात्रियों के लिए

   हमारे यात्रियों में बुज़ुर्गों की गिनती सबसे ज़्यादा है। साइट का आम आकार
   17px है (पहले 16px था), पर जिन्हें कम दिखता है वो यहाँ से तीन पायदान
   बड़ा कर सकते हैं:  17px → 19px → 21px → फिर वापस 17px.

   कैसे काम करता है
   ─────────────────
   पूरी साइट `rem` में नपी है, और `rem` हमेशा `html` से चलता है। इसलिए
   `html` का आकार बदलते ही अक्षर, बटन, कार्ड, गद्दी — सब एक साथ बढ़ जाते हैं।
   चुनाव localStorage (`dys-fs`) में रहता है, तो अगली बार अपने आप लग जाता है।

   ⚠️ यह फ़ाइल <head> में लगाई गई है, नीचे बाक़ी scripts के साथ नहीं।
      वजह: नीचे लगाने पर पेज पहले 17px में दिखता, फिर अचानक 21px में उछल
      जाता — बुज़ुर्ग विज़िटर को वो झटका सबसे ज़्यादा खटकता है।
      इसलिए इसे छोटा रखा गया है, ताकि <head> में होने से पेज धीमा न पड़े।

   ⚠️ बटन पर लिखा "A" है, कोई हिन्दी शब्द नहीं — इसलिए i18n.js में अनुवाद
      जोड़ने की ज़रूरत नहीं (§4 नियम 2)। पढ़कर सुनाने वाला नाम (aria-label)
      नीचे दोनों भाषाओं में है और भाषा बदलने पर अपने आप बदल जाता है।

   ⚠️ पायदान का हिसाब सिर्फ़ यहीं रखें, CSS में दोबारा मत लिखें।
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var STEPS = ['17px', '19px', '21px'];
  var KEY   = 'dys-fs';

  var LABEL = {
    hi: ['अक्षर बड़े करें', 'अक्षर और बड़े करें', 'अक्षर सामान्य आकार में लाएँ'],
    en: ['Make text bigger', 'Make text even bigger', 'Back to normal text size']
  };

  var step = 0;
  try {
    var saved = parseInt(localStorage.getItem(KEY), 10);
    if (saved >= 0 && saved < STEPS.length) step = saved;
  } catch (e) {}

  /* आकार सबसे पहले लगाओ — हर पेज पर, बटन हो या न हो।
     इससे कथा/पंचांग/रिव्यू वाले पेजों पर भी विज़िटर का चुना हुआ आकार बना रहता
     है। पहले यह सिर्फ़ मुख्य पेज पर लगता था और बाक़ी पेजों पर भूल जाता था। */
  function applySize() {
    document.documentElement.style.fontSize = STEPS[step];
  }
  applySize();

  /* बटन सिर्फ़ उन पेजों पर है जहाँ topbar है — न मिले तो चुपचाप छोड़ दो */
  function wireButton() {
    var btn = document.getElementById('fsBtn');
    if (!btn) return;

    function refresh() {
      applySize();
      btn.dataset.step = String(step);
      var lang = document.documentElement.lang === 'en' ? 'en' : 'hi';
      btn.setAttribute('aria-label', LABEL[lang][step]);
      btn.setAttribute('title', LABEL[lang][step]);
      try { localStorage.setItem(KEY, String(step)); } catch (e) {}
    }

    btn.addEventListener('click', function () {
      step = (step + 1) % STEPS.length;
      refresh();
    });

    /* भाषा बदले तो छुपा नाम भी बदल जाए — i18n.js सिर्फ़ दिखने वाले टेक्स्ट को
       छूता है, aria-label को नहीं (पंचांग भी इसी तरीक़े से चलता है) */
    if (window.MutationObserver) {
      new MutationObserver(refresh)
        .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButton);
  } else {
    wireButton();
  }
})();

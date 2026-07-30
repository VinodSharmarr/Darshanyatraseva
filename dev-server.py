#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
  Darshan Yatra Seva — सिर्फ़ लैपटॉप पर साइट देखने वाला server
═══════════════════════════════════════════════════════════════

चलाने का तरीक़ा:
    python dev-server.py            → http://localhost:5173
    python dev-server.py 5175       → कोई दूसरा पोर्ट चाहिए तो

⚠️ यह फ़ाइल असली साइट पर नहीं जाती (.vercelignore में डाल दी गई है)।
   असली साइट Vercel चलाता है, उसका हिसाब vercel.json में है।

── यह क्यों बनाई ────────────────────────────────────────────
पहले `python -m http.server` से काम चलाया जाता था। दिक़्क़त यह थी कि वो
ब्राउज़र को कुछ बताता ही नहीं कि फ़ाइल दोबारा माँगनी है या नहीं। तो ब्राउज़र
अपनी मर्ज़ी से styles.css की एक नक़ल रख लेता, और बदलाव करने के बाद भी
पुरानी साइट ही दिखाता रहता।

इससे असली नुक़सान हुआ है: 30 जुलाई 2026 को सुधार करने के बाद जाँच में
लगा कि कुछ बदला ही नहीं, जबकि फ़ाइलें बिल्कुल सही थीं — पूरी एक जाँच
इसी चक्कर में दोबारा करनी पड़ी।

अब यह server हर जवाब के साथ साफ़ कह देता है "no-store" — यानी
*"इसकी नक़ल मत रखना, हर बार मुझसे माँगना"*। साथ ही ब्राउज़र अगर पूछे भी
कि "फ़ाइल बदली है क्या?" तो वो सवाल हटा दिया जाता है, ताकि हर बार पूरी
नई फ़ाइल ही जाए।

नतीजा: फ़ाइल सेव कीजिए → ब्राउज़र में F5 → नया दिखेगा।
Ctrl+Shift+R की ज़रूरत नहीं, 127.0.0.1 वाले दूसरे पते की ज़रूरत नहीं।
═══════════════════════════════════════════════════════════════
"""

import http.server
import fnmatch
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
ROOT = os.path.dirname(os.path.abspath(__file__))

# 🔴 सिर्फ़ अपने कंप्यूटर को सुनाई दे — पूरे Wi-Fi को नहीं।
#    पहले यहाँ '' था (और `python -m http.server` में भी वही होता है), जिसका मतलब
#    है कि उसी Wi-Fi पर बैठा कोई भी `http://<आपका-IP>:5173/HANDOVER.md` खोलकर
#    प्रबंधक पैनल का पासकोड पढ़ सकता था। कैफ़े/स्टेशन के Wi-Fi पर यह ख़तरनाक है।
#    '127.0.0.1' से server सिर्फ़ इसी लैपटॉप को जवाब देता है।
#    ⚠️ इसे '' या '0.0.0.0' मत करना।
HOST = '127.0.0.1'

# अंदरूनी फ़ाइलें लोकल पर भी न परोसें — वही सूची जो .vercelignore में है,
# ताकि यहाँ जो दिखे वही असली साइट पर भी दिखे (और अंदाज़ा न लगाना पड़े)।
def _load_blocklist():
    pats = ['*.md', 'dev-server.py', '.indexnow-key', 'yatra/src/*', '.git/*', '.claude/*']
    try:
        with open(os.path.join(ROOT, '.vercelignore'), encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    pats.append(line)
    except OSError:
        pass                                  # फ़ाइल न हो तो ऊपर वाली सूची ही काफ़ी है
    return pats

BLOCKED = _load_blocklist()


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    """साइट की फ़ाइलें देता है, पर ब्राउज़र को नक़ल रखने नहीं देता।"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _blocked(self):
        p = self.path.split('?')[0].split('#')[0].lstrip('/')
        return any(fnmatch.fnmatch(p, pat) or fnmatch.fnmatch(p, pat.rstrip('/') + '/*')
                   for pat in BLOCKED)

    def send_head(self):
        if self._blocked():
            self.send_error(404, 'Not found')      # असली साइट पर भी यह फ़ाइल नहीं है
            return None
        return super().send_head()

    def list_directory(self, path):
        # फ़ोल्डर की सूची कभी न दिखाओ — किसी को यह जानने की ज़रूरत नहीं
        # कि अंदर कौन-कौन सी फ़ाइलें पड़ी हैं
        self.send_error(404, 'Not found')
        return None

    def parse_request(self):
        ok = super().parse_request()
        if ok:
            # ब्राउज़र यही दो सवाल पूछकर 304 ("वही पुराना चलेगा") मँगवाता है।
            # सवाल ही हटा दिया, तो हर बार पूरी नई फ़ाइल जाएगी।
            del self.headers['If-Modified-Since']
            del self.headers['If-None-Match']
        return ok

    def end_headers(self):
        # no-store = "इसे कहीं सेव मत करना"। बाक़ी दो पुराने ब्राउज़रों के लिए।
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # 404 और गड़बड़ ही दिखाओ — हर तस्वीर की लाइन से टर्मिनल भर जाता है
        msg = fmt % args
        if ' 200 ' not in msg and ' 304 ' not in msg:
            sys.stderr.write('  %s\n' % msg)


# ⚠️ ThreadingHTTPServer ज़रूरी है, सादा TCPServer नहीं।
#    सादे वाले में एक बार में एक ही माँग निपटती है। ब्राउज़र पेज खोलते ही
#    कई connection खोल देता है और कुछ पर तुरंत कुछ भेजता ही नहीं (आगे के लिए
#    तैयार रखता है) — सादा server उसी ख़ाली connection के इंतज़ार में अटक
#    जाता है और पेज कभी खुलता ही नहीं। (30 जुलाई 2026 को यही ग़लती हुई,
#    पेज 30 सेकंड तक लटका रहा।) `python -m http.server` भी threading वाला
#    ही इस्तेमाल करता है — इसे बदलना नहीं।
http.server.ThreadingHTTPServer.allow_reuse_address = True

if __name__ == '__main__':
    try:
        with http.server.ThreadingHTTPServer((HOST, PORT), NoCacheHandler) as httpd:
            print('')
            print('  Darshan Yatra Seva - local server chalu')
            print('  ---------------------------------------')
            print('  Site khole:  http://localhost:%d' % PORT)
            print('')
            print('  File save karke bas F5 dabaiye - naya dikhega.')
            print('  Ctrl+Shift+R ki zarurat nahi.')
            print('')
            print('  Sirf is laptop tak seemit hai (127.0.0.1).')
            print('  Wifi par kisi aur ko nahi dikhega.')
            print('  Band karne ke liye: Ctrl+C')
            print('')
            httpd.serve_forever()
    except OSError as e:
        print('')
        print('  Port %d pehle se busy hai.' % PORT)
        print('  Ya purana server band kijiye, ya doosra port dijiye:')
        print('      python dev-server.py 5174')
        print('  (%s)' % e)
        sys.exit(1)
    except KeyboardInterrupt:
        print('\n  Server band. Jai Shri Shyam.\n')

"""यात्रा कार्ड की तस्वीरें — 800x340 पर काटकर बनाई जाती हैं।

तीन तस्वीरें Vinod की अपनी खींची हुई हैं (yatra/src/ में असली फ़ाइलें) — इनका
कोई श्रेय नहीं चाहिए। चौथी (सालासर) अभी भी Wikimedia Commons से है, CC BY-SA —
उसका श्रेय index.html के फ़ुटर में है, हटाना मत। अपनी सालासर की तस्वीर मिलते ही
उसे भी src/ में डालें, नीचे SRC में लाइन बदलें, और फ़ुटर से आख़िरी श्रेय हटा दें।

दोबारा चलाने पर चारों तस्वीरें फिर से बन जाएँगी:  python yatra/build-images.py

कटाई (centering) हाथ से चुनी गई है ताकि मंदिर बीच में रहे — (x, y), 0 = ऊपर/बाएँ।
"""
import pathlib, urllib.request
from PIL import Image, ImageOps

HERE = pathlib.Path(__file__).parent
SRCDIR = HERE / "src"                    # अपनी तस्वीरें (repo में नहीं जातीं)
W, H = 800, 340
UA = {"User-Agent": "DarshanYatraSeva-SiteBuild/1.0 (darshanyatraseva@gmail.com)"}

# slug: (स्रोत, श्रेय, centering)   स्रोत = फ़ाइल का नाम (अपनी) या http लिंक
SRC = {
    "khatu":      ("khatu-orig.jpg",      "अपनी तस्वीर", (0.50, 0.34)),
    "vrindavan":  ("vrindavan-orig.jpg",  "अपनी तस्वीर", (0.50, 0.42)),
    "mehandipur": ("mehandipur-orig.jpg", "अपनी तस्वीर", (0.50, 0.46)),
    "salasar":    ("salasar-orig.jpg",    "अपनी तस्वीर", (0.50, 0.36)),
}

for slug, (src, credit, cent) in SRC.items():
    if src.startswith("http"):
        tmp = HERE / f"_{slug}.orig"
        with urllib.request.urlopen(urllib.request.Request(src, headers=UA), timeout=120) as r:
            tmp.write_bytes(r.read())
        im = Image.open(tmp).convert("RGB")
        tmp.unlink()
    else:
        im = Image.open(SRCDIR / src)
        im = ImageOps.exif_transpose(im).convert("RGB")   # फ़ोन की तस्वीर सीधी रहे

    before = im.size
    w = min(W, before[0]); h = round(w * H / W)           # स्रोत से बड़ा मत करो
    im = ImageOps.fit(im, (w, h), Image.LANCZOS, centering=cent)
    dest = HERE / f"{slug}.jpg"
    im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"  {slug:11s} {before[0]}x{before[1]} -> {w}x{h}  {dest.stat().st_size//1024} KB  [{credit}]")

"""यात्रा कार्ड की चारों तस्वीरें — Wikimedia Commons से, सब CC BY-SA.
श्रेय index.html के फ़ुटर में है। दोबारा चलाने पर तस्वीरें फिर से बन जाएँगी।

हर कार्ड 800x340 पर — कटाई (centering) हाथ से चुनी गई है ताकि मंदिर बीच में रहे।"""
import pathlib, urllib.request
from PIL import Image, ImageOps

OUT = pathlib.Path(r"C:\Users\VINOD\Desktop\clude new cv\darshan-yatra-seva\yatra")
OUT.mkdir(exist_ok=True)
TMP = pathlib.Path(__file__).parent
W, H = 800, 340
UA = {"User-Agent": "DarshanYatraSeva-SiteBuild/1.0 (darshanyatraseva@gmail.com)"}

SRC = {
    "khatu": ("https://upload.wikimedia.org/wikipedia/commons/1/12/Khatu_Shyam_Ji_Entrance_Gate.jpg",
              "TheSlumPanda", "CC BY-SA 4.0", (0.5, 0.42)),
    "vrindavan": ("https://upload.wikimedia.org/wikipedia/commons/9/99/Prem_Mandir_Angular_view.jpg",
                  "Chintu.wiki", "CC BY-SA 4.0", (0.5, 0.50)),
    "mehandipur": ("https://upload.wikimedia.org/wikipedia/commons/b/b2/Mehandipur_Balaji_exterior.jpg",
                   "VikramKaushik1976", "CC BY-SA 4.0", (0.5, 0.45)),
    # 2-दिन वाली यात्रा में खाटू भी है; सालासर की कोई ठीक बाहरी तस्वीर Commons पर नहीं मिली
    "salasar": ("https://upload.wikimedia.org/wikipedia/commons/7/77/Khatu_darbar.jpg",
                "Shubhamvs22", "CC BY-SA 4.0", (0.5, 0.18)),
}

for slug, (url, author, lic, cent) in SRC.items():
    raw = TMP / f"_{slug}.orig"
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        raw.write_bytes(r.read())
    im = Image.open(raw).convert("RGB")
    before = im.size
    w = min(W, before[0]); h = round(w * H / W)      # स्रोत से बड़ा मत करो
    im = ImageOps.fit(im, (w, h), Image.LANCZOS, centering=cent)
    dest = OUT / f"{slug}.jpg"
    im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
    raw.unlink()
    print(f"  {slug:11s} {before[0]}x{before[1]} -> {w}x{h}  {dest.stat().st_size//1024} KB  [{author}, {lic}]")

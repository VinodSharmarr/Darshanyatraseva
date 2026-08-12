"""
social/render.py, HTML को असली तस्वीर में बदलता है

चलाने का तरीक़ा:
    python social/render.py
    python social/render.py --only khatu          सिर्फ़ खाटू वाली
    python social/render.py --only story          सिर्फ़ Story के नाप वाली
    python social/render.py --limit 4             जाँचने के लिए चार

यह वही तरीक़ा है जो brand/build.py पहले से इस्तेमाल करता है: Edge को
बिना खिड़की के चलाकर पन्ने की तस्वीर उतार लेना। इसकी दो वजह हैं:

  1. देवनागरी सही जुड़ती है। तस्वीर बनाने वाली ज़्यादातर library
     हिन्दी की मात्राएँ तोड़ देती हैं, ब्राउज़र नहीं तोड़ता।
  2. कुछ ख़र्च नहीं होता, न कोई API key, न इंटरनेट की मजबूरी।
     फ़ॉन्ट न उतरें तो Windows का Nirmala UI काम चला लेता है।

⚠️ नाप बिल्कुल वही निकलता है जो फ़ाइल के नाम में लिखा है
   (1080x1080 और 1080x1920)। नाप बदलना हो तो templates.js का
   SIZES बदलिए, यहाँ कुछ मत छेड़िए।
"""
import argparse
import concurrent.futures as cf
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

HERE = pathlib.Path(__file__).parent
HTML = HERE / "html"
OUT = HERE / "out"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# फ़ॉन्ट Google से उतरने का इंतज़ार। कम किया तो कहीं कहीं
# Marcellus की जगह Georgia दिख जाएगी, और नाम चौड़ा हो जाएगा।
WAIT_MS = 6000

SIZE_RE = re.compile(r"-(\d+)x(\d+)\.html$")


def shot(job):
    """एक HTML से एक PNG। हर काम अपनी अलग Edge profile में चलता है,
    वरना कई Edge एक साथ चलाने पर वो आपस में टकराते हैं।"""
    src, width, height = job
    png = OUT / (src.stem + ".png")
    profile = tempfile.mkdtemp(prefix="dys-edge-")
    try:
        subprocess.run(
            [EDGE, "--headless", "--disable-gpu", "--hide-scrollbars",
             "--force-device-scale-factor=1",
             f"--user-data-dir={profile}",
             f"--virtual-time-budget={WAIT_MS}",
             f"--window-size={width},{height}",
             f"--screenshot={png}",
             src.as_uri()],
            capture_output=True, timeout=180)
    except subprocess.TimeoutExpired:
        return src.name, "Edge ne jawab nahi diya"
    finally:
        shutil.rmtree(profile, ignore_errors=True)

    if not png.exists():
        return src.name, "PNG bani hi nahi"

    # नाप जाँच लीजिए। Edge कभी कभी छोटी खिड़की दे देता है, और
    # Instagram पर वो तस्वीर धुँधली चढ़ती है।
    try:
        from PIL import Image
        with Image.open(png) as im:
            if (im.width, im.height) != (width, height):
                return src.name, f"naap galat: {im.width}x{im.height}"
    except ImportError:
        pass
    return src.name, None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", default="", help="नाम में यह शब्द हो, सिर्फ़ वही")
    ap.add_argument("--limit", type=int, default=0, help="इतनी ही बनाइए")
    ap.add_argument("--jobs", type=int, default=4, help="एक साथ कितनी")
    a = ap.parse_args()

    if not pathlib.Path(EDGE).exists():
        sys.exit(f"Edge nahi mila: {EDGE}")
    if not HTML.exists():
        sys.exit("social/html/ hai hi nahi. pehle chalaiye:  node social/build-social.js")

    jobs = []
    for f in sorted(HTML.glob("*.html")):
        if a.only and a.only not in f.name:
            continue
        m = SIZE_RE.search(f.name)
        if not m:
            print(f"  ?? naam mein naap nahi mila, chhoda: {f.name}")
            continue
        jobs.append((f, int(m.group(1)), int(m.group(2))))
    if a.limit:
        jobs = jobs[:a.limit]
    if not jobs:
        sys.exit("kuch banane ko mila hi nahi")

    OUT.mkdir(exist_ok=True)
    print(f"{len(jobs)} tasveerein bana rahe hain, {a.jobs} ek saath...")

    fails = []
    done = 0
    with cf.ThreadPoolExecutor(max_workers=a.jobs) as ex:
        for name, err in ex.map(shot, jobs):
            done += 1
            if err:
                fails.append((name, err))
                print(f"  !! {name}  {err}")
            elif done % 20 == 0 or done == len(jobs):
                print(f"  .. {done}/{len(jobs)}")

    print(f"\nban gayin: {len(jobs) - len(fails)}/{len(jobs)}  ->  {OUT}")
    if fails:
        print(f"{len(fails)} nahi banin:")
        for n, e in fails:
            print(f"  {n}: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

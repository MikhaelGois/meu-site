#!/usr/bin/env python3
"""
Optimize images in ./assets: create WebP versions and resized variants (1600/800/400).
Saves outputs to ./assets/optimized/
"""
import os
from PIL import Image, ImageOps

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ASSETS = os.path.join(BASE, 'assets')
OUT = os.path.join(ASSETS, 'optimized')

SIZES = [1600, 800, 400]
EXTS = ('.png', '.jpg', '.jpeg')

os.makedirs(OUT, exist_ok=True)

print('Searching for images in', ASSETS)
count = 0
for root, dirs, files in os.walk(ASSETS):
    # skip optimized output folder
    if os.path.abspath(root).startswith(os.path.abspath(OUT)):
        continue
    for fname in files:
        if not fname.lower().endswith(EXTS):
            continue
        src_path = os.path.join(root, fname)
        name, _ = os.path.splitext(fname)
        try:
            with Image.open(src_path) as im:
                im = ImageOps.exif_transpose(im).convert('RGB')
                # save full-size webp
                out_full = os.path.join(OUT, f"{name}.webp")
                im.save(out_full, 'WEBP', quality=85, method=6)
                # resized versions
                for w in SIZES:
                    if im.width <= w:
                        resized = im.copy()
                    else:
                        h = int(im.height * (w / im.width))
                        resized = im.resize((w, h), Image.LANCZOS)
                    out_name = f"{name}-{w}.webp"
                    out_path = os.path.join(OUT, out_name)
                    resized.save(out_path, 'WEBP', quality=85, method=6)
                count += 1
                print(f"Optimized: {src_path} -> {OUT}")
        except Exception as e:
            print('ERROR processing', src_path, e)

print(f'Done. {count} images processed. Optimized files are in {OUT}')

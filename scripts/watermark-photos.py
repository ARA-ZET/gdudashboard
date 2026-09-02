#!/usr/bin/env python3
"""
Prepare photographs for the website: watermark, resize, compress, rename.

Firebase App Hosting does not deploy the Next image optimizer, so whatever is
committed to /public is exactly what visitors download. This script produces
those final assets from the untouched originals.

Usage
-----
    python3 scripts/watermark-photos.py <source-dir> [--out public/images/work]

Every source file is:
  1. rotated per its EXIF orientation, then stripped of metadata,
  2. capped at 1600px on the longest edge,
  3. stamped bottom-right with the gold wordmark over a soft dark halo. Gold on
     cream is barely 1.5:1 on its own, so the halo — not the mark — is what
     keeps it legible on pale upholstery; do not weaken it,
  4. saved as WebP, stepping quality down until it fits the size budget.

Output names come from the source filename, so name your originals for search
before running: lead with the noun people type ("upholstered-headboard-..."),
then the distinguishing detail. Add the new files to lib/photos.ts with honest
alt text describing what is actually in the frame.

Requires Pillow:  pip3 install Pillow
"""
from __future__ import annotations

import argparse
import io
import os
import re
import sys
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

MARK_PATH = Path('public/logo/gdulogo-long-gold.png')
MAX_EDGE = 1600
BUDGET = 150 * 1024
QUALITY_STEPS = (82, 76, 70, 64, 58, 52)
SUFFIXES = {'.jpg', '.jpeg', '.png', '.webp', '.heic'}


def slugify(name: str) -> str:
    s = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return re.sub(r'-{2,}', '-', s)


def stamp(im: Image.Image, mark: Image.Image) -> Image.Image:
    """Composite the gold wordmark bottom-right over a blurred dark halo.

    The halo is deliberately heavier than a decorative drop shadow: brand gold
    against cream upholstery has almost no contrast of its own, so the darkened
    ground behind the glyphs is what makes the mark readable.
    """
    W, H = im.size
    target_w = max(150, int(W * 0.22))
    m = mark.resize((target_w, round(mark.height * target_w / mark.width)), Image.LANCZOS)
    # Knock the mark back so it credits the work rather than defacing it.
    m.putalpha(m.getchannel('A').point(lambda v: int(v * 0.92)))

    pad = max(10, int(target_w * 0.10))
    layer = Image.new('RGBA', (m.width + pad * 2, m.height + pad * 2), (0, 0, 0, 0))
    # Two passes: a wide soft halo to darken pale backgrounds, then a tighter
    # one to define the letterforms against it.
    for alpha, blur in ((150, 0.045), (190, 0.014)):
        shadow = Image.new('RGBA', layer.size, (0, 0, 0, 0))
        shadow.paste((0, 0, 0, alpha), (pad, pad), m.getchannel('A'))
        layer = Image.alpha_composite(
            layer, shadow.filter(ImageFilter.GaussianBlur(max(2, target_w * blur))))
    layer.alpha_composite(m, (pad, pad))

    margin = int(W * 0.035)
    im.alpha_composite(layer, (W - layer.width - margin, H - layer.height - margin))
    return im


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('source', help='directory of original photographs')
    ap.add_argument('--out', default='public/images/work', help='output directory')
    args = ap.parse_args()

    if not MARK_PATH.exists():
        print(f'error: wordmark not found at {MARK_PATH}', file=sys.stderr)
        return 1

    src_dir, out_dir = Path(args.source), Path(args.out)
    if not src_dir.is_dir():
        print(f'error: {src_dir} is not a directory', file=sys.stderr)
        return 1
    out_dir.mkdir(parents=True, exist_ok=True)

    mark = Image.open(MARK_PATH).convert('RGBA')
    mark = mark.crop(mark.getbbox())

    sources = sorted(p for p in src_dir.iterdir() if p.suffix.lower() in SUFFIXES)
    if not sources:
        print(f'error: no images found in {src_dir}', file=sys.stderr)
        return 1

    before_total = after_total = 0
    for src in sources:
        before = src.stat().st_size
        im = ImageOps.exif_transpose(Image.open(src)).convert('RGBA')
        if max(im.size) > MAX_EDGE:
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im = stamp(im, mark).convert('RGB')

        data = None
        for q in QUALITY_STEPS:
            buf = io.BytesIO()
            im.save(buf, 'WEBP', quality=q, method=6)
            data = buf.getvalue()
            # Never emit a file bigger than the original it replaced.
            if len(data) <= BUDGET and len(data) < before:
                break

        dest = out_dir / f'{slugify(src.stem)}.webp'
        dest.write_bytes(data)
        before_total += before
        after_total += len(data)
        print(f'{dest.name:58} {im.width:>4}x{im.height:<4} q{q} '
              f'{before / 1024:>7.0f}K -> {len(data) / 1024:>6.0f}K')

    saved = 100 * (1 - after_total / before_total)
    print(f'\n{len(sources)} images  '
          f'{before_total / 1024 / 1024:.2f} MB -> {after_total / 1024 / 1024:.2f} MB '
          f'({saved:.0f}% smaller)')
    print('\nNext: add the new files to lib/photos.ts with width, height and alt text.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

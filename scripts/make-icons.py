#!/usr/bin/env python3
"""
Generate the favicon and app-icon set from the gold logo on the brand navy.

Usage
-----
    python3 scripts/make-icons.py

Only the crown-and-diamond EMBLEM is used, not the stacked logo with its two
lines of type. A favicon renders at 16-32px in a browser tab and in Google's
search results; at that size the wordmark is an illegible smear, while the
emblem stays recognisable.

Outputs (all full-bleed navy, no transparency, so nothing renders oddly against
a dark tab strip or a light launcher):

  favicon.ico        16/32/48 multi-resolution - browser tabs, Google results
  icon-192.png       192x192 - Android home screen; a multiple of 48, which is
                     what Google asks for when it picks a search favicon
  icon.png           512x512 - PWA install icon (purpose "any")
  icon-maskable.png  512x512 - PWA maskable; emblem pulled in to Android's
                     80%-diameter safe circle so a round mask cannot clip it
  apple-icon.png     180x180 - iOS home screen; iOS ignores transparency and
                     applies its own rounding, so this is a plain square

Requires Pillow:  pip3 install Pillow
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

LOGO = Path('public/logo/gdulogo-small-gold.png')
OUT = Path('public')
NAVY = (4, 22, 50, 255)

# The stacked logo is emblem, then "Golden Diamond", then "Upholstery". Row
# 362 is inside the gap below the emblem's base bar and above the type.
EMBLEM_BOTTOM = 362

# Fraction of the canvas the emblem spans. The maskable icon is smaller because
# Android may crop to a circle of 80% diameter; a square mark must fit that
# circle's inscribed square (80% / sqrt(2) ~ 56%).
SCALE_STANDARD = 0.72
SCALE_MASKABLE = 0.55


def canvas(mark: Image.Image, size: int, scale: float) -> Image.Image:
    """Centre the emblem on a solid navy square of `size`."""
    out = Image.new('RGBA', (size, size), NAVY)
    ratio = min(size * scale / mark.width, size * scale / mark.height)
    m = mark.resize((max(1, round(mark.width * ratio)), max(1, round(mark.height * ratio))), Image.LANCZOS)
    out.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return out


def main() -> int:
    if not LOGO.exists():
        print(f'error: logo not found at {LOGO}', file=sys.stderr)
        return 1

    src = Image.open(LOGO).convert('RGBA')
    emblem = src.crop((0, 0, src.width, EMBLEM_BOTTOM))
    emblem = emblem.crop(emblem.getbbox())
    print(f'emblem cropped to {emblem.width}x{emblem.height}')

    written: list[tuple[str, int]] = []

    # Multi-resolution ICO. Each size is rendered from the full-quality emblem
    # rather than downscaled from one bitmap, so the 16px frame stays crisp.
    ico_sizes = (48, 32, 16)
    frames = [canvas(emblem, s, SCALE_STANDARD).convert('RGB') for s in ico_sizes]
    ico = OUT / 'favicon.ico'
    frames[0].save(ico, format='ICO', sizes=[(s, s) for s in ico_sizes],
                   append_images=frames[1:])
    written.append((ico.name, ico.stat().st_size))

    for name, size, scale in (
        ('icon-192.png', 192, SCALE_STANDARD),
        ('icon.png', 512, SCALE_STANDARD),
        ('icon-maskable.png', 512, SCALE_MASKABLE),
        ('apple-icon.png', 180, SCALE_STANDARD),
    ):
        path = OUT / name
        canvas(emblem, size, scale).convert('RGB').save(path, 'PNG', optimize=True)
        written.append((name, path.stat().st_size))

    for name, size in written:
        print(f'  {name:20} {size / 1024:>6.1f}K')
    print('\nDeclared in app/layout.tsx (metadata.icons) and app/manifest.ts.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

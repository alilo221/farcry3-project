#!/usr/bin/env python3
"""Download Far Cry 3 character images from the Fandom wiki CDN."""

from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
import sys

BASE_DIR = Path(__file__).resolve().parent / 'assets'
CHARACTERS_DIR = BASE_DIR / 'images' / 'characters'
WEAPONS_DIR = BASE_DIR / 'images' / 'weapons'

IMAGES = [
    # Characters
    ('vaas.jpg', 'Vaas Montenegro', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/f/f6/FC3_cutout_vaas.png/revision/latest?cb=20130906145042'),
    ('jason.jpg', 'Jason Brody', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/d/d2/FC3_Jason_%283%29.jpg/revision/latest?cb=20180526052702'),
    ('dennis.jpg', 'Dennis Rogers', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/7/71/FC3_cutout_dennis.png/revision/latest?cb=20130906144423'),
    ('earnhardt.jpg', 'Dr. Earnhardt', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/4/4a/Earnhardt.jpg/revision/latest?cb=20120915134315'),
    ('buck.jpg', 'Buck Hughes', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/0/00/Buck.jpg/revision/latest?cb=20121105190912'),
    ('citra.jpg', 'Citra Talugmai', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/b/bf/Citra_poster.jpg/revision/latest?cb=20130404161411'),
    ('hoyt.jpg', 'Hoyt Volker', CHARACTERS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/b/b2/FC3_cutout_hoyt.png/revision/latest?cb=20130906144423'),
    # Weapons
    ('ak47.jpg', 'AK-47', WEAPONS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/4/4e/FC3_cutout_rifle_ak47.png/revision/latest?cb=20130907102528'),
    ('dragon_knife.jpg', 'Silver Dragon Knife', WEAPONS_DIR,
     'https://static.wikia.nocookie.net/farcry/images/e/e1/FC3_cutout_knife_silverdragon.png/revision/latest?cb=20130907102526'),
    # Friends group (save friends ending scene)
    ('friends.jpg', "Jason's Friends", BASE_DIR / 'images',
     'https://static.wikia.nocookie.net/farcry/images/b/be/FC3_Credits_Background2.png/revision/latest?cb=20231105204528'),
    # Map background (Rook Islands world map)
    ('map_bg.jpg', 'Rook Islands Map', BASE_DIR / 'images',
     'https://static.wikia.nocookie.net/farcry/images/8/88/FC3_Worldmap_Level_1.png/revision/latest?cb=20130909090825'),
]


def download_image(url, dest, retries=2):
    for attempt in range(retries + 1):
        try:
            req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) < 1000:
                    print(f'  Too small ({len(data)} B), skipping')
                    return False
                with open(dest, 'wb') as f:
                    f.write(data)
                print(f'  OK  {dest.name}  ({len(data) // 1024} KB)')
                return True
        except (HTTPError, URLError, TimeoutError, OSError) as e:
            if attempt < retries:
                print(f'  Retry {attempt + 1}/{retries}...')
            else:
                print(f'  FAIL {dest.name}  {e}')
    return False


def main():
    for _, _, dest_dir, _ in IMAGES:
        dest_dir.mkdir(parents=True, exist_ok=True)
    print('=' * 50)
    print('  Far Cry 3 – Downloading All Images')
    print('=' * 50)
    print()

    ok = fail = 0
    for fname, name, dest_dir, url in IMAGES:
        path = dest_dir / fname
        if path.exists() and path.stat().st_size > 1000:
            print(f'  EXISTS {fname}  ({path.stat().st_size // 1024} KB)')
            ok += 1
            continue
        print(f'  [{name}] ({fname})')
        if download_image(url, path):
            ok += 1
        else:
            fail += 1
        print()

    print('=' * 50)
    print(f'  Done: {ok} OK, {fail} failed')
    if fail:
        print('  Re-run the script to retry failed downloads.')
    print('=' * 50)


if __name__ == '__main__':
    main()

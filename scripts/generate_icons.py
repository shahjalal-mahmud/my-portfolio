"""Generate PWA icons for the portfolio.

Creates:
- icon-192.png (192x192)
- icon-512.png (512x512)
- icon-maskable-512.png (512x512 with safe zone for adaptive icons)
- apple-touch-icon.png (180x180)
- favicon-32.png, favicon-16.png (optional, if you want to update favicon)

Design: rounded-square gradient with "SM" monogram.
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Script lives in <project>/scripts/ — public assets live in <project>/public/.
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(PROJECT_ROOT, "public", "icons")
PUBLIC = os.path.join(PROJECT_ROOT, "public")
os.makedirs(OUT, exist_ok=True)

# Brand palette (matches theme_color)
TOP = (124, 58, 237)      # violet-600
BOTTOM = (29, 78, 216)    # blue-700
TEXT = (255, 255, 255)

# Try to find a system font; fall back to default.
def load_font(size):
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf",  # Segoe UI Bold
        r"C:\Windows\Fonts\arialbd.ttf",    # Arial Bold
        r"C:\Windows\Fonts\calibrib.ttf",   # Calibri Bold
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

def rounded_rect(draw, xy, radius, fill):
    draw.rounded_rectangle(xy, radius=radius, fill=fill)

def gradient_bg(size, radius):
    img = Image.new("RGB", (size, size), TOP)
    for y in range(size):
        # linear vertical gradient TOP -> BOTTOM
        t = y / max(size - 1, 1)
        r = int(TOP[0] * (1 - t) + BOTTOM[0] * t)
        g = int(TOP[1] * (1 - t) + BOTTOM[1] * t)
        b = int(TOP[2] * (1 - t) + BOTTOM[2] * t)
        ImageDraw.Draw(img).line([(0, y), (size, y)], fill=(r, g, b))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out

def make_icon(size, radius_ratio=0.22, monogram="SM", safe_zone=False):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    if safe_zone:
        # Maskable: full bleed, content within inner safe area (~40% inset on each side).
        bg = gradient_bg(size, radius_ratio * size)
        canvas.paste(bg, (0, 0), bg)
        # Inner safe area content circle / square
        font = load_font(int(size * 0.45))
    else:
        bg = gradient_bg(size, radius_ratio * size)
        canvas.paste(bg, (0, 0), bg)
        font = load_font(int(size * 0.45))

    draw = ImageDraw.Draw(canvas)
    # Center text
    text = monogram
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) // 2 - bbox[0]
    ty = (size - th) // 2 - bbox[1]
    # Subtle shadow for depth
    draw.text((tx + 2, ty + 2), text, fill=(0, 0, 0, 60), font=font)
    draw.text((tx, ty), text, fill=TEXT + (255,), font=font)
    return canvas

# Standard icons
icon_192 = make_icon(192)
icon_192.save(os.path.join(OUT, "icon-192.png"), optimize=True)

icon_512 = make_icon(512)
icon_512.save(os.path.join(OUT, "icon-512.png"), optimize=True)

# Maskable: full bleed (no rounded corners removed) — but still render within safe area
maskable_512 = make_icon(512, radius_ratio=0.0, safe_zone=True)
maskable_512.save(os.path.join(OUT, "icon-maskable-512.png"), optimize=True)

# Apple touch icon (180x180)
apple = make_icon(180)
apple.save(os.path.join(PUBLIC, "apple-touch-icon.png"), optimize=True)

# Favicons (replacing .ico with png for crisper display)
fav32 = make_icon(32, radius_ratio=0.22)
fav32.save(os.path.join(PUBLIC, "favicon-32.png"), optimize=True)
fav16 = make_icon(16, radius_ratio=0.22)
fav16.save(os.path.join(PUBLIC, "favicon-16.png"), optimize=True)

print("Generated icons in", OUT, "and public/")
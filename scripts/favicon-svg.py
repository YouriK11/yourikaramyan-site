"""Build YK monogram SVGs from Bricolage Grotesque outlines (default instance: wght 800, wdth 100)."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font_path, out_dir = sys.argv[1], sys.argv[2]
font = TTFont(font_path)
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font['head'].unitsPerEm
cap = font['OS/2'].sCapHeight
names = [cmap[ord(c)] for c in 'YK']
adv = [font['hmtx'][n][0] for n in names]
print('capHeight', cap, 'advances', adv)

NUIT, ABRICOT, BLANC = '#18214F', '#EE9A35', '#FFFFFF'

def monogram(size, cap_px, radius, bar_h, bar_w, gap, tighten):
    s = cap_px / cap
    # x positions in font units: Y then K, with optional tightening
    xs = [0, adv[0] - tighten]
    # overall bounds in font units
    xmin, xmax = 10**9, -10**9
    for n, x in zip(names, xs):
        bp = BoundsPen(gs); gs[n].draw(bp)
        b = bp.bounds
        xmin = min(xmin, x + b[0]); xmax = max(xmax, x + b[2])
    width = (xmax - xmin) * s
    total_h = cap_px + gap + bar_h
    top = (size - total_h) / 2
    baseline = top + cap_px
    left = (size - width) / 2
    paths = []
    for n, x in zip(names, xs):
        pen = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
        tx = left + (x - xmin) * s
        gs[n].draw(TransformPen(pen, (s, 0, 0, -s, tx, baseline)))
        paths.append(pen.getCommands())
    bar_y = baseline + gap
    bg = f'<rect width="{size}" height="{size}" rx="{radius}" fill="{NUIT}"/>' if radius is not None else f'<rect width="{size}" height="{size}" fill="{NUIT}"/>'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">'
           f'{bg}'
           f'<path fill="{BLANC}" d="{" ".join(paths)}"/>'
           f'<rect x="{left:.2f}" y="{bar_y:.2f}" width="{bar_w:.2f}" height="{bar_h}" rx="{bar_h/2}" fill="{ABRICOT}"/>'
           f'</svg>')
    return svg, width

svg, w = monogram(64, cap_px=27, radius=14, bar_h=5, bar_w=20, gap=5, tighten=40)
open(f'{out_dir}/favicon.svg', 'w').write(svg); print('favicon.svg text width', round(w, 1))
svg, w = monogram(180, cap_px=70, radius=None, bar_h=12, bar_w=52, gap=13, tighten=40)
open(f'{out_dir}/apple-touch-icon.svg', 'w').write(svg); print('apple svg text width', round(w, 1))

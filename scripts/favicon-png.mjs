// Rasterizes the YK monogram SVGs produced by favicon-svg.py.
// Usage, from the project root: node scripts/favicon-png.mjs <folder containing favicon.svg and apple-touch-icon.svg>
// Then build favicon.ico from fav-16/32/48.png (Pillow) and copy the results into public/.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const dir = process.argv[2];
const favicon = readFileSync(`${dir}/favicon.svg`);
const apple = readFileSync(`${dir}/apple-touch-icon.svg`);

for (const size of [16, 32, 48, 256]) {
  await sharp(favicon, { density: ((72 * size) / 64) * 4 }).resize(size, size).png().toFile(`${dir}/fav-${size}.png`);
}
await sharp(apple, { density: 72 * 4 }).resize(180, 180).png().toFile(`${dir}/apple-touch-icon.png`);

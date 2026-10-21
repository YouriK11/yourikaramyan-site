// Youri's portrait, used on the home page, the company pages and the share images.
// The new cut-out photo (no background) is used as soon as it is copied to
// src/assets/photos/youri-portrait-detoure.png (from sources/photo_youri_portrait_transparent.png).
// Until then, the previous photo stays in place.
import type { ImageMetadata } from 'astro';
import portraitPrecedent from '../assets/photos/youri-portrait.jpg';
import visagePrecedent from '../assets/photos/youri-visage.jpg';

const trouvees = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/youri-portrait-detoure.png', {
  eager: true,
});
const detoure = Object.values(trouvees)[0]?.default;

/** True when the cut-out photo is in place: it is then shown on the midnight blue, with a light halo. */
export const PORTRAIT_DETOURE = Boolean(detoure);
/** Large portrait (desktop home page, company pages). */
export const PORTRAIT = detoure ?? portraitPrecedent;
/** Small square portrait (home page on phones): the same cut-out photo, framed on the face. */
export const VIGNETTE = detoure ?? visagePrecedent;
/** File read by the share images (src/pages/og/[page].png.ts), relative to the project root. */
export const FICHIER_PORTRAIT_OG = detoure
  ? 'src/assets/photos/youri-portrait-detoure.png'
  : 'src/assets/photos/youri-portrait.jpg';

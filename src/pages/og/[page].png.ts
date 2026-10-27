// Link preview images (Open Graph, 1200x630 PNG), drawn at build time with satori and sharp:
// /og/accueil.png for the site, /og/projet-<slug>.png for every project page and /og/<company>.png for every company
// page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import { PORTRAIT_DETOURE, FICHIER_PORTRAIT_OG } from '../../data/portrait';
import { PROJETS } from '../../data/projets';

const NUIT = '#18214F';
const ABRICOT = '#EE9A35';
const BLANC = '#FFFFFF';
const BRUME_SUR_NUIT = '#C3C9DF';

export const getStaticPaths = (async () => {
  const entreprises = await getCollection('entreprises');
  return [
    { params: { page: 'accueil' }, props: { titre: null, sousTitre: null } },
    // A project: its title in apricot, then its dates
    ...PROJETS.map((projet) => ({
      params: { page: `projet-${projet.slug}` },
      props: { titre: projet.titre, sousTitre: projet.periode.replace(/ /g, ' ') },
    })),
    // A company: "pour <name>" in apricot, then the preview line
    ...entreprises.map((entree) => ({
      params: { page: entree.id },
      props: { titre: `pour ${entree.data.nom}`, sousTitre: entree.data.apercu ?? '' },
    })),
  ];
}) satisfies GetStaticPaths;

// Paths relative to the project root (where "astro build" runs): import.meta.url would point into dist/.
// The variable fonts render at their default instance: Bricolage 800 / 100, Instrument Sans 400.
const [bricolage, instrument, photo] = await Promise.all([
  readFile('src/assets/fonts/bricolage-grotesque-latin-opsz96.woff2'),
  readFile('src/assets/fonts/instrument-sans-latin.woff2'),
  photoPartage(),
]);
const photoUrl = `data:image/jpeg;base64,${photo.toString('base64')}`;

// The portrait, 330 x 412. The cut-out photo (src/data/portrait.ts) stands on the bottom edge of a midnight blue
// frame with a light halo behind the shoulders, as on the pages; the previous photo is simply resized.
async function photoPartage(): Promise<Buffer> {
  if (!PORTRAIT_DETOURE) return sharp(FICHIER_PORTRAIT_OG).resize(330, 412).jpeg({ quality: 86 }).toBuffer();
  const fond = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="330" height="412">
      <defs>
        <radialGradient id="halo" cx="50%" cy="52%" r="62%">
          <stop offset="0" stop-color="#EEF1F8" stop-opacity="0.36"/>
          <stop offset="0.52" stop-color="#EEF1F8" stop-opacity="0.14"/>
          <stop offset="1" stop-color="#EEF1F8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="330" height="412" fill="${NUIT}"/>
      <rect width="330" height="412" fill="url(#halo)"/>
    </svg>`,
  );
  // Same framing as on the pages: portrait format, centred on the face (right of centre in the file),
  // standing on the bottom edge, with 34 px of room above the head.
  const { width = 1, height = 1 } = await sharp(FICHIER_PORTRAIT_OG).metadata();
  const hauteurCible = 412 - 34;
  const largeurCrop = Math.min(width, Math.round((height * 330) / hauteurCible));
  const gauche = Math.max(0, Math.min(width - largeurCrop, Math.round(width * 0.62 - largeurCrop / 2)));
  const personne = await sharp(FICHIER_PORTRAIT_OG)
    .extract({ left: gauche, top: 0, width: largeurCrop, height })
    .resize(330, hauteurCible)
    .png()
    .toBuffer();
  return sharp(fond).composite([{ input: personne, top: 34, left: 0 }]).jpeg({ quality: 86 }).toBuffer();
}

type Noeud = { type: string; props: Record<string, unknown> };
const div = (style: Record<string, unknown>, children?: unknown): Noeud => ({ type: 'div', props: { style, children } });

function image(titre: string | null, sousTitre: string | null): Noeud {
  const texte = titre
    ? [
        // Long titles get a smaller size so they stay on one line
        div(
          { display: 'flex', flexShrink: 0, marginTop: 34, color: ABRICOT, fontFamily: 'Bricolage', fontSize: titre.length > 22 ? 38 : 50, lineHeight: 1.05 },
          titre,
        ),
        div({ display: 'flex', flexShrink: 0, marginTop: 18, color: BRUME_SUR_NUIT, fontSize: 30 }, sousTitre ?? ''),
      ]
    : [
        div({ display: 'flex', marginTop: 34, color: BLANC, fontSize: 34 }, 'Étudiant en E-Business à la HEPL (Liège)'),
        // Two set lines: in one, "2027" ended up alone on the second line
        div({ display: 'flex', marginTop: 12, color: BRUME_SUR_NUIT, fontSize: 30 }, 'Stage en marketing digital'),
        div({ display: 'flex', marginTop: 4, color: BRUME_SUR_NUIT, fontSize: 30 }, 'de janvier à mai 2027'),
      ];

  return div(
    {
      boxSizing: 'border-box',
      width: 1200,
      height: 630,
      padding: '72px 80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: NUIT,
      fontFamily: 'Instrument',
    },
    [
      div({ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 640 }, [
        div({ display: 'flex', flexDirection: 'column', flexShrink: 0, color: BLANC, fontFamily: 'Bricolage', fontSize: 118, lineHeight: 0.94 }, [
          div({ display: 'flex' }, 'Youri'),
          div({ display: 'flex' }, 'Karamyan'),
        ]),
        // flexShrink 0: a name on two lines must not squash the bar
        div({ display: 'flex', flexShrink: 0, width: 300, height: 12, marginTop: 30, borderRadius: 6, background: ABRICOT }),
        ...texte,
        div({ display: 'flex', flexShrink: 0, marginTop: 44, color: BRUME_SUR_NUIT, fontSize: 26 }, 'yourikaramyan.com'),
      ]),
      // Photo over the CV's offset apricot block
      div({ display: 'flex', position: 'relative', width: 354, height: 436 }, [
        div({ position: 'absolute', left: 24, top: 24, width: 330, height: 412, borderRadius: 40, background: ABRICOT }),
        {
          type: 'img',
          props: { src: photoUrl, width: 330, height: 412, style: { position: 'absolute', left: 0, top: 0, borderRadius: 40 } },
        },
      ]),
    ],
  );
}

export const GET: APIRoute<{ titre: string | null; sousTitre: string | null }> = async ({ props }) => {
  // satori expects a React-like element tree; plain objects with type/props are accepted.
  const svg = await satori(image(props.titre, props.sousTitre) as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Bricolage', data: bricolage, weight: 800, style: 'normal' },
      { name: 'Instrument', data: instrument, weight: 400, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

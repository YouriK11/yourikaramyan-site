// Link preview images (Open Graph, 1200x630 PNG), drawn at build time with satori and sharp:
// /og/accueil.png for the site, and /og/<company>.png for every company page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

const NUIT = '#18214F';
const ABRICOT = '#EE9A35';
const BLANC = '#FFFFFF';
const BRUME_SUR_NUIT = '#C3C9DF';

export const getStaticPaths = (async () => {
  const entreprises = await getCollection('entreprises');
  return [
    { params: { page: 'accueil' }, props: { pour: null, apercu: null } },
    ...entreprises.map((entree) => ({
      params: { page: entree.id },
      props: { pour: entree.data.nom, apercu: entree.data.apercu },
    })),
  ];
}) satisfies GetStaticPaths;

// Paths relative to the project root (where "astro build" runs): import.meta.url would point into dist/.
// The variable fonts render at their default instance: Bricolage 800 / 100, Instrument Sans 400.
const [bricolage, instrument, photo] = await Promise.all([
  readFile('src/assets/fonts/bricolage-grotesque-latin-opsz96.woff2'),
  readFile('src/assets/fonts/instrument-sans-latin.woff2'),
  sharp('src/assets/photos/youri-portrait.jpg').resize(330, 412).jpeg({ quality: 86 }).toBuffer(),
]);
const photoUrl = `data:image/jpeg;base64,${photo.toString('base64')}`;

type Noeud = { type: string; props: Record<string, unknown> };
const div = (style: Record<string, unknown>, children?: unknown): Noeud => ({ type: 'div', props: { style, children } });

function image(pour: string | null, apercu: string | null): Noeud {
  const texte = pour
    ? [
        // Long company names get a smaller size so they stay on one line
        div(
          { display: 'flex', flexShrink: 0, marginTop: 34, color: ABRICOT, fontFamily: 'Bricolage', fontSize: pour.length > 18 ? 40 : 50, lineHeight: 1.05 },
          `pour ${pour}`,
        ),
        div({ display: 'flex', flexShrink: 0, marginTop: 18, color: BRUME_SUR_NUIT, fontSize: 30 }, apercu ?? ''),
      ]
    : [
        div({ display: 'flex', marginTop: 34, color: BLANC, fontSize: 34 }, 'Étudiant en E-Business à la HEPL (Liège)'),
        div({ display: 'flex', marginTop: 12, color: BRUME_SUR_NUIT, fontSize: 30 }, 'Stage en marketing digital et e-commerce'),
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

export const GET: APIRoute<{ pour: string | null; apercu: string | null }> = async ({ props }) => {
  // satori expects a React-like element tree; plain objects with type/props are accepted.
  const svg = await satori(image(props.pour, props.apercu) as unknown as Parameters<typeof satori>[0], {
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

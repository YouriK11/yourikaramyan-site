// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourikaramyan.com',
  // Astro 7 defaults to 'jsx', which glues words to <strong>/<a> across line breaks.
  compressHTML: true,
  // Pages are built as /page/index.html and served as /page/.
  trailingSlash: 'always',
  integrations: [sitemap()],
  // The whole stylesheet is a few KB: inline it so no CSS request blocks the first paint.
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: true,
  },
  // Self-hosted, latin subset only (latin-ext skews the fallback metrics in 7.4.1).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      fallbacks: ['system-ui'],
      options: {
        variants: [
          {
            // Google Fonts v9 latin file, optical size pinned at 96: wght 200-800, wdth 75-100.
            src: ['./src/assets/fonts/bricolage-grotesque-latin-opsz96.woff2'],
            weight: '200 800',
            style: 'normal',
            stretch: '75% 100%',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Instrument Sans',
      cssVariable: '--font-body',
      fallbacks: ['system-ui'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/instrument-sans-latin.woff2'],
            weight: '400 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
});

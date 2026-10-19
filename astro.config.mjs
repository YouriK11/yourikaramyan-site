// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourikaramyan.com',
  // Astro 7 defaults to 'jsx', which glues words to <strong>/<a> across line breaks.
  compressHTML: true,
  // Pages are built as /page/index.html and Netlify serves /page/.
  trailingSlash: 'always',
  integrations: [sitemap()],
});

# astro-core (Astro 7.4.1: manual setup, v6/v7 breaking changes, content collections, root dynamic route, PNG endpoint, sitemap, SEO head layout). Reviewed and corrected 2026-10-19

## Summary

I re-checked every claim against a fresh download of the current withastro/docs (main), against the published packages (astro 7.4.1, create-astro 5.3.0, @astrojs/sitemap 3.7.4, @astrojs/check 0.9.11, sharp 0.35.5), and with my own build, `astro check` and `astro dev --background` tests. All tests ran in C:\Users\youri\AppData\Local\Temp\claude\c--Users-youri-OneDrive-Documents-yourikaramyan-site-yourikaramyan-site\5a797359-679b-4d2c-b904-f5e930642034\scratchpad\review-build, never in the project. Almost every original fact holds: the manual setup, Node >=22.22.0, `src/content.config.ts` with `z` from `astro/zod`, a glob pattern that must exclude `_` files itself, root `[entreprise].astro` coexisting with index/404, the binary PNG endpoint with no `prerender` export, the sitemap's full-URL filter with trailing slash, and canonical via `new URL(Astro.url.pathname, Astro.site)`. The main correction is that Astro 7's default `compressHTML: 'jsx'` is more aggressive than the notes said. It also deletes the space between plain text and an inline element when a line break separates them: the build gave `développeur<strong>web</strong>` and `</a>suite`. Markdown bodies are not affected. For a text-heavy French CV, I recommend `compressHTML: true`, the v6 behavior. A second correction: the claim that a schema must not define `slug` is legacy. The error exists in 7.4.1 but is never thrown. I answered two open questions from Netlify's own docs. Netlify's current build image defaults to Node 24 and pins it at the first build. Its Pretty URLs setting, on by default, forwards /about to /about/, which matches build.format 'directory' + trailingSlash 'always'. New pitfalls, each verified:
- `public/robots.txt` silently wins over `src/pages/robots.txt.ts` (warning only, the endpoint is skipped).
- The 404 page gets a bogus canonical, https://yourikaramyan.com/404/.
- github-slugger keeps accents in entry ids, so use ASCII file names.
- `**/[^_]*.md` does not exclude files inside `_`-prefixed subfolders.
- noindex pages must not be blocked in robots.txt.

For the no-layout-shift name animation and the OG fonts, the Astro 6+ Fonts API is stable. It generates optimized fallbacks against font-swap shift, and the docs show an OG-image endpoint built from `fontData` + satori + sharp. sharp's `text.fontfile` is a lighter way to get deterministic fonts on Netlify. Note that astro 7.4.1 was published today (2026-10-19 14:13 UTC).

## Corrections
- ORIGINAL: Astro 7's compressHTML now defaults to 'jsx', which removes spaces between inline elements on separate lines (verified: `<span>hello</span><em>world</em>`).
  FIX: It also removes the space between plain TEXT and an inline element when a line break separates them in an .astro template. Verified: 'développeur⏎<strong>web</strong>' renders as 'développeur<strong>web</strong>', and '<a>lien</a>⏎suite' as '<a>lien</a>suite'. Same-line spaces are kept, and Markdown bodies are unaffected. compressHTML: true restores the v6 behavior (verified). For a text-heavy CV this is a real risk, so recommend compressHTML: true.
  SRC: https://docs.astro.build/en/reference/configuration-reference/#compresshtml ; local build review-build/dist/ws/index.html
- ORIGINAL: A `slug:` frontmatter key overrides it, and the schema must not define `slug`.
  FIX: A `slug:` frontmatter key does override the id. The 'schema must not define slug' rule is legacy and not enforced in 7.4.1: ContentSchemaContainsSlugError is defined in errors-data.js but nothing in astro/dist throws it, and the current docs do not mention it. Still avoid a `slug` field, because it changes the id and the URL.
  SRC: astro@7.4.1 dist (grep ContentSchemaContainsSlugError) ; https://docs.astro.build/en/guides/content-collections/#defining-custom-ids
- ORIGINAL: Open question: How Netlify handles /col-macarthur vs /col-macarthur/ for directory-format output was not checked here.
  FIX: Answered: Netlify's Pretty URLs is on by default and forwards /about to /about/ (and /about.html to /about/). Redirect rules cannot add or remove trailing slashes. This matches build.format 'directory' + trailingSlash 'always' + canonical with a slash.
  SRC: https://docs.netlify.com/manage/routing/redirects/redirect-options/
- ORIGINAL: Open question: Netlify Node version … Netlify's current default was not checked.
  FIX: Answered: the current Netlify build image ships Node 24 by default, and a site is pinned to the image default at its first build. Override with .nvmrc / .node-version / NODE_VERSION / the UI. Add a .nvmrc containing 24 so the version is explicit.
  SRC: https://docs.netlify.com/build/configure-builds/available-software-at-build-time/ ; https://docs.netlify.com/build/configure-builds/manage-dependencies/
- ORIGINAL: Sitemap discovery fact: robots.txt can be generated with src/pages/robots.txt.ts (no mention of public/robots.txt).
  FIX: The docs say to use robots.txt.ts 'instead of' a public/ file. If public/robots.txt exists (the manual-setup guide creates one), the build skips the endpoint with only a warning and serves the public file (verified).
  SRC: https://docs.astro.build/en/guides/integrations-guide/sitemap/#sitemap-discovery ; astro dist/core/build/generate.js checkPublicConflict()
- ORIGINAL: Layout snippet always emits <link rel="canonical"> (no exception for the 404 page).
  FIX: On 404.astro this produces canonical https://yourikaramyan.com/404/ (verified), which is not a real URL. The layout now takes a `canonical` prop so 404.astro can pass canonical={false} together with noindex.
  SRC: local build review-build/dist/404.html
- ORIGINAL: Entry id comes from the file name via github-slugger (kebab-case, lowercased): col-macarthur.md becomes id 'col-macarthur'.
  FIX: Correct, with an addition: github-slugger keeps accented letters ('Café Liège' becomes 'café-liège', leading to a percent-encoded URL) and strips '&'. Use ASCII kebab-case file names or an explicit ASCII `slug:`.
  SRC: local github-slugger test ; https://docs.astro.build/en/reference/content-loader-reference/#generateid
- ORIGINAL: The glob() loader does NOT skip `_`-prefixed files on its own. Use `pattern: '**/[^_]*.md'`.
  FIX: Correct for files, but '**/[^_]*.md' still matches files inside `_`-prefixed subdirectories (picomatch: '_dir/x.md' matches). Add '!**/_*/**' (pattern accepts string[]) if such folders are used.
  SRC: local picomatch test ; https://docs.astro.build/en/reference/content-loader-reference/#pattern

## Pitfalls
- Do not run `npm create astro@latest . -- --yes` in the non-empty project folder: create-astro silently creates a random subfolder instead (e.g. ./density-dwarf). Use the manual setup.
- The glob() loader does not skip `_`-prefixed files. Without `[^_]*` in the pattern, or a '!**/_*' negation, _modele.md becomes an entry, fails schema validation and gets a public route. `**/[^_]*.md` still matches files inside `_`-prefixed SUBFOLDERS (e.g. _brouillons/x.md); add '!**/_*/**' if you use such folders.
- Do not import `z` from 'astro:content' (deprecated in v6). Use `import { z } from 'astro/zod'`. Zod 4 rules apply: z.email() instead of z.string().email(), { error: '...' } instead of { message }, and .default() must match the output type (use .prefault() for the old behavior).
- The config file is src/content.config.ts. src/content/config.ts is the legacy location and only works with the temporary legacy.collectionsBackwardsCompat flag.
- Astro 7's compressHTML 'jsx' removes the space between TEXT and an inline element (<strong>, <a>, <em>) when a line break separates them in an .astro template, not only between two elements. Prettier wrapping a long CV paragraph will silently glue words together (verified: 'développeur<strong>web</strong>', '</a>suite'). Markdown bodies are not affected. For a text-heavy French site, set `compressHTML: true`, or audit every wrapped line and add {" "}.
- The Astro 7 Rust compiler fails on unclosed non-void tags and no longer fixes invalid nesting (a div inside a p). Write strict HTML.
- Never name a file src/fetch.ts (or src/fetch.js): it is reserved for advanced routing in Astro 7.
- Scripts render where they are declared (not moved into <head>). A <script> placed in a page after the closing layout tag ends up after </html> (re-verified). Put scripts inside components or inside the layout.
- No layout shift for the name animation:
- Processed scripts are type="module" and run after HTML parsing. Reserve the name's final box in CSS (fixed font-size/line-height, or min-height on the wrapper) and animate only transform/opacity.
- If CSS hides the name before GSAP runs, gate the hidden state behind a class set by a tiny is:inline script in <head> (e.g. document.documentElement.classList.add('js')), so no-JS visitors still see the name. Also honor prefers-reduced-motion.
- Self-host the font with the Astro Fonts API so optimized fallbacks limit the shift when the font swaps in.
- With <ClientRouter/>, bundled scripts (GSAP) run only once. Initialize on 'astro:page-load', or skip ClientRouter for this small static site; native cross-document view transitions need no JS.
- The canonical URL differs between dev (no trailing slash when requested without one) and build (trailing slash with build.format 'directory'). Set trailingSlash: 'always' and always link internally with a trailing slash. In production, Netlify's default Pretty URLs already forwards /col-macarthur to /col-macarthur/.
- A naive canonical on 404.astro becomes https://yourikaramyan.com/404/ (Astro.url.pathname is '/404/' at build, but the file is /404.html). Omit the canonical (and og:url) on the 404 page and mark it noindex.
- sitemap filter() compares full URLs, which end with '/' with build.format 'directory'. An exact match against 'https://yourikaramyan.com/col-macarthur' (no slash) will NOT exclude the page. Also, startsWith('…/col-macarthur') would also hide a future '/col-macarthur-2/'. Prefer a Set of exact URLs.
- Do not keep both public/robots.txt and src/pages/robots.txt.ts: the public file wins and the endpoint is skipped with only a warning. The manual-setup guide creates public/robots.txt, so delete it if you generate robots.txt.
- Do not Disallow the noindex company pages in robots.txt: Google must crawl a page to see its noindex. Use noindex + sitemap exclusion, not robots.txt blocking.
- Name company Markdown files in plain ASCII kebab-case (col-macarthur.md). github-slugger keeps accents ('café-liège' leads to a percent-encoded URL, and Astro 6+ partially decodes pathnames) and drops '&'. Or set an explicit ASCII `slug:` in frontmatter.
- Without `site` in astro.config, Astro.site is undefined (new URL(path, undefined) throws), prerendered pages get localhost URLs, canonical/og URLs break, and @astrojs/sitemap skips generation with a warning.
- Endpoint URLs with an extension (/og/x.png, /robots.txt) are never reachable with a trailing slash (404 in dev, verified). Use og:image URLs without one.
- Inside getStaticPaths, do not use Astro.site (deprecated); use import.meta.env.SITE. Params must be strings, not numbers.
- Astro.glob() is removed. Use getCollection(), or Object.values(import.meta.glob('…', { eager: true })), which is synchronous.
- If the OG endpoint imports sharp, add sharp as a direct dependency (and @types/node as a devDependency for Buffer typing, as the docs' OG example notes) rather than relying on transitive installs. Escape '&' in SVG text (Col&McArthur → Col&amp;McArthur).
- sharp renders SVG <text> with the build machine's fonts, so Windows and Netlify's Linux image can differ. For deterministic OG images, pass a bundled font file: sharp's text input with `fontfile`, or satori with font data (the docs show the fontData + satori + sharp pattern).
- Do not `npm install -D typescript` alone before @astrojs/check: it pulls TypeScript 7.0.2, which is outside @astrojs/check's peer range (^5 || ^6). Install both in one command, or pin typescript@^6.
- If remark/rehype plugins are ever needed, Astro 7 requires @astrojs/markdown-remark and `markdown: { processor: unified() }`, because Sätteri is the default.
- Images through <Image>/getImage() are cropped by default and never upscaled since Astro 6. Give the profile photo source enough resolution and the intended aspect ratio.

## Open questions
- Should the company pages (/col-macarthur/) be noindex and left out of the sitemap? The layout supports `noindex` per entry (the example schema defaults it to true), and the sitemap filter can exclude them. This is a product decision for the user.
- OG image text rendering: plain sharp + SVG with system fonts, sharp's text input with a bundled `fontfile`, or satori + Fonts API `fontData` (documented, but `experimental_getFontFileURL` is still experimental). Which fonts Netlify's build image has was not checked; bundling a font avoids the question.
- Whether to use <ClientRouter/> at all. It is not needed for a CV + company pages site and adds GSAP re-initialization work; native cross-document view transitions are a no-JS alternative.
- Whether to set compressHTML: true globally (recommended for a text-heavy CV) or keep the Astro 7 'jsx' default and audit wrapped lines.
- GSAP 3.15.0-specific APIs were out of scope. Only Astro's bundling of `import { gsap } from 'gsap'` was checked (it builds to a /_astro/*.js module script).

## Facts

### F1 [verified-in-docs]
Minimum Node version for Astro 7 is v22.22.0; odd-numbered versions (e.g. v23) are not supported. astro@7.4.1 declares engines node >=22.22.0, npm >=9.6.5. Local Node v24.16.0 / npm 11.13.0 are fine.
SRC: https://docs.astro.build/en/install-and-setup/#prerequisites ; npm view astro@7.4.1 engines
```
"engines": { "node": ">=22.22.0" }
```

### F2 [verified-in-docs]
Manual setup per docs: npm init --yes, then npm install astro (locally, never -g), then replace the placeholder scripts with dev/build/preview. The official minimal template (examples/minimal on main) also has "type": "module", "private": true, an "astro" script, engines node >=22.22.0 and astro ^7.4.1.
SRC: https://docs.astro.build/en/install-and-setup/#manual-setup ; https://github.com/withastro/astro/blob/main/examples/minimal/package.json
```
{
  "type": "module",
  "private": true,
  "engines": { "node": ">=22.22.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": { "astro": "^7.4.1" }
}
```

### F3 [verified-in-docs]
On npm 11.13, `npm init --yes` writes "type": "commonjs". Astro 7.4.1 still builds with it, but set "type": "module" to match the official template. Re-tested by the reviewer.
SRC: local test (npm 11.13.0, node v24.16.0)

### F4 [verified-in-docs]
astro.config.mjs is optional. The minimal template content is below. Astro 6 removed CommonJS config files (.cjs/.cts); supported extensions are .mjs, .js, .ts, .mts.
SRC: https://docs.astro.build/en/install-and-setup/#manual-setup ; https://docs.astro.build/en/guides/upgrade-to/v6/#removed-support-for-commonjs-config-files ; examples/minimal/astro.config.mjs
```
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});
```

### F5 [verified-in-docs]
tsconfig.json extends astro/tsconfigs/base, strict or strictest. The manual-setup page shows only `extends: base`. The TypeScript guide additionally recommends include [".astro/types.d.ts", "**/*"] and exclude ["dist"]. The official minimal template uses strict with those include/exclude settings. Content collections need strictNullChecks (built into strict/strictest; add it, plus allowJs, by hand with base).
SRC: https://docs.astro.build/en/guides/typescript/#tsconfig-templates ; https://docs.astro.build/en/guides/content-collections/#typescript-configuration-for-collections ; examples/minimal/tsconfig.json
```
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### F6 [verified-in-docs]
src/env.d.ts is NOT required. It is only a convention for custom global type declarations, or for getting Astro types when there is no tsconfig.json.
SRC: https://docs.astro.build/en/guides/typescript/#extending-global-types
```
// src/env.d.ts (optional)
/// <reference path="../.astro/types.d.ts" />
```

### F7 [verified-in-docs]
Recommended .gitignore from the manual-setup guide. The minimal template also ignores .env.production, the npm/yarn/pnpm debug logs, .DS_Store and .idea/.
SRC: https://docs.astro.build/en/install-and-setup/#manual-setup ; examples/minimal/.gitignore
```
.astro/
.env
dist/
node_modules/
```

### F8 [verified-in-docs]
create-astro 5.3.0 flags: --template <name>, --install/--no-install, --add <integration>, --git/--no-git, --no-ai (skip AGENTS.md), --yes (-y), --no (-n), --dry-run, --skip-houston, --ref, --fancy. With npm, put `--` before the flags. With --yes and no --template, the template defaults to 'basics'.
SRC: https://github.com/withastro/astro/blob/main/packages/create-astro/README.md ; create-astro@5.3.0 dist/index.js (template default 'basics' when ctx.yes)
```
npm create astro@latest my-dir -- --template minimal --install --no-git --yes --skip-houston --no-ai
```

### F9 [verified-in-docs]
create-astro will not scaffold into a non-empty directory. With --yes it prints '"<dir>" is not empty!', generates a random project name and creates ./<random-name> instead. Only a safe list is ignored: .DS_Store, .git, .gitkeep, .gitattributes, .gitignore, .gitlab-ci.yml, .hg*, .idea, .npmignore, .travis.yml, .yarn, .yarnrc.yml, docs, LICENSE, mkdocs.yml, Thumbs.db, *.iml, npm/yarn debug logs. A CV, photos, CLAUDE.md or .claude/ make the folder non-empty.
SRC: create-astro@5.3.0 dist/index.js (VALID_PROJECT_DIRECTORY_SAFE_LIST, isEmpty(), projectName())

### F10 [verified-in-docs]
Astro 7 has `astro dev --background` plus the subcommands `astro dev stop|status|logs [--follow]`; `astro preview` has the same since v7.2.0. create-astro writes an AGENTS.md recommending background mode unless --no-ai is passed. Re-tested: the background server started, served requests, and `astro dev stop` stopped it.
SRC: https://docs.astro.build/en/reference/cli-reference/ (background subcommands) ; `npx astro dev --help` (7.4.1) ; create-astro dist (ai: noAI ? false : true)
```
npx astro dev --background --port 4321
npx astro dev stop
```

### F11 [verified-in-docs]
Astro 6 breaking changes:
- Node 22+ (Node 18 and 20 dropped), Vite 7, Zod 4, Shiki 4.
- Legacy content collections removed: config must be src/content.config.ts, every collection needs a loader, no `type`, entry.slug becomes entry.id, entry.render() becomes render(entry). The temporary flag legacy.collectionsBackwardsCompat exists.
- Removed: Astro.glob() (use import.meta.glob), <ViewTransitions/> (use <ClientRouter/>), emitESMImage().
- Deprecated: astro:schema and `z` from astro:content (use astro/zod), and `Astro` inside getStaticPaths (use import.meta.env.SITE).
- getStaticPaths params must be strings, and import.meta.env values are always inlined.
- Image service: crops by default, never upscales, and can now rasterize SVG.
- Markdown heading IDs keep trailing hyphens.
- experimental.failOnPrerenderConflict became prerenderConflictBehavior. The csp, fonts and liveContentCollections flags became stable.
SRC: https://docs.astro.build/en/guides/upgrade-to/v6/
```
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
```

### F12 [verified-in-docs]
Since Astro 6, endpoints whose URL has a file extension (/og/x.png, /robots.txt, /sitemap.xml) are reachable ONLY without a trailing slash, whatever trailingSlash is set to. Re-tested in dev: /og/col-macarthur.png returned 200 and /og/col-macarthur.png/ returned 404.
SRC: https://docs.astro.build/en/guides/upgrade-to/v6/#changed-endpoints-with-a-file-extension-cannot-be-accessed-with-a-trailing-slash ; https://docs.astro.build/en/guides/endpoints/#static-file-endpoints

### F13 [verified-in-docs]
Since Astro 5, scripts are rendered where they are declared and are no longer hoisted to <head>. Since Astro 6, <script> and <style> render in source order. Re-tested: a <script> placed in a page after the closing </Base> layout tag was output AFTER </html> as `<script type="module">…</script>`. Put scripts inside components or the layout.
SRC: https://docs.astro.build/en/guides/upgrade-to/v5/#script-tags-are-rendered-directly-as-declared ; https://docs.astro.build/en/guides/upgrade-to/v6/#changed-script-and-style-tags-are-rendered-in-the-order-they-are-defined ; local build (review-build/dist/ws/index.html)

### F14 [verified-in-docs]
Script processing: a <script> with no attributes other than src is TypeScript, bundled (npm imports work), becomes type="module" (so it is deferred), is deduplicated, and is inlined when small. Any other attribute turns processing off, and is:inline opts out explicitly. Scripts from public/ or a CDN need is:inline. Verified: a component script importing gsap built to <script type="module" src="/_astro/Hero.astro_astro_type_script_index_0_lang.<hash>.js">, placed right after the component markup.
SRC: https://docs.astro.build/en/guides/client-side-scripts/#script-processing
```
<script>
  import { gsap } from 'gsap';
  gsap.from('.name', { opacity: 0, y: 20, duration: 1 });
</script>
```

### F15 [verified-in-docs]
Astro 7 breaking changes:
- Vite 8.
- The Rust compiler is the only compiler: unclosed non-void tags are errors, invalid nesting (a div inside a p) is no longer auto-corrected, and CSS serialization changes are cosmetic.
- src/fetch.ts (or .js) is reserved for advanced routing; change it with fetchFile, or disable with fetchFile: null.
- Sätteri is the default Markdown processor (GFM + SmartyPants kept). remark/rehype plugins need @astrojs/markdown-remark and markdown.processor: unified().
- compressHTML now defaults to 'jsx'.
- Removed: @astrojs/db and the astro:transitions internals (TRANSITION_* constants, isTransition*Event, createAnimationScope).
- Deprecated: getContainerRenderer from integration package roots.
- Flags now stable: logger, queuedRendering, rustCompiler, advancedRouting, cache/routeRules.
SRC: https://docs.astro.build/en/guides/upgrade-to/v7/

### F16 [verified-in-docs]
CORRECTED: Astro 7's default compressHTML 'jsx' applies JSX whitespace rules to .astro templates. It removes whitespace containing a line break between elements AND between text and an inline element, and collapses multi-line text onto one line. Same-line spaces are kept. Re-tested build output:
- `développeur⏎<strong>web</strong>` became `développeur<strong>web</strong>`
- `<a href="/">lien</a>⏎suite` became `<a href="/">lien</a>suite`
- `Ligne un⏎ligne deux` became `Ligne un ligne deux`
- `<span>un</span> <em>deux</em>` kept its space.
Markdown bodies rendered with <Content /> were NOT affected (the line breaks are kept). Fix with {" "}, or set compressHTML: true (the v6 HTML-aware behavior, verified to keep the spaces).
SRC: https://docs.astro.build/en/reference/configuration-reference/#compresshtml ; https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-whitespace-handling-compresshtml-jsx ; local build review-build/dist/ws/index.html
```
// astro.config.mjs
export default defineConfig({ compressHTML: true });

<!-- or, per spot, in .astro templates: -->
<p>Je suis développeur{" "}<strong>web</strong></p>
```

### F17 [verified-in-docs]
Defaults unchanged in v7: output 'static', trailingSlash 'ignore', build.format 'directory'. With 'directory', Astro.url.pathname has a trailing slash during the build (/col-macarthur/). The docs advise trailingSlash: 'always' with format 'directory' to avoid dev/build differences. With 'always', dev shows a warning page for URLs requested without the slash.
SRC: https://docs.astro.build/en/reference/configuration-reference/#trailingslash ; https://docs.astro.build/en/reference/configuration-reference/#buildformat (Effect on Astro.url)
```
export default defineConfig({
  site: 'https://yourikaramyan.com',
  trailingSlash: 'always',
});
```

### F18 [verified-in-docs]
Netlify (static, no adapter needed): Pretty URLs is enabled by default and forwards /about to /about/ and /about.html to /about/. Redirect rules cannot add or remove trailing slashes. So Astro's directory output + trailingSlash 'always' + canonical with a slash all match production.
SRC: https://docs.netlify.com/manage/routing/redirects/redirect-options/ (Trailing slash section) ; https://docs.astro.build/en/guides/deploy/netlify/

### F19 [verified-in-docs]
Netlify Node version: the current build image's default Node.js is 24, and a site is pinned to the image default at first build. Override with .nvmrc or .node-version in the base directory, a NODE_VERSION env var, or the UI. The Astro deploy guide uses build command `npm run build` and publish directory `dist` (optional netlify.toml).
SRC: https://docs.netlify.com/build/configure-builds/available-software-at-build-time/ ; https://docs.netlify.com/build/configure-builds/manage-dependencies/ ; https://docs.astro.build/en/guides/deploy/netlify/
```
# .nvmrc
24

# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

### F20 [verified-in-docs]
Image service: Sharp is the default. sharp ^0.35.4 is an optionalDependency of astro@7.4.1, so npm installs it automatically. The test lockfile contains both @img/sharp-win32-x64 and @img/sharp-linux-x64 0.35.5. Only strict package managers like pnpm need a manual install. If your own code imports sharp (the OG endpoint), add it as a direct dependency. sharp 0.35.5 needs node >=20.9.0.
SRC: https://docs.astro.build/en/guides/images/#default-image-service ; npm view astro@7.4.1 optionalDependencies ; npm view sharp@0.35.5 engines ; review-build/package-lock.json
```
npm install sharp
```

### F21 [verified-in-docs]
<ClientRouter/> (from astro:transitions) replaced <ViewTransitions/>, which was removed in v6. With ClientRouter, bundled module scripts run only once, so init code (GSAP) must listen for astro:page-load. Browser-native cross-document view transitions need no JS and do not change script behavior. The docs say ClientRouter will 'increasingly become unnecessary'.
SRC: https://docs.astro.build/en/guides/view-transitions/#script-re-execution ; https://docs.astro.build/en/guides/view-transitions/#differences-between-browser-native-view-transitions-and-astros-clientrouter- ; https://docs.astro.build/en/guides/upgrade-to/v6/#removed-viewtransitions--component
```
import { ClientRouter } from 'astro:transitions';
// in <head>: <ClientRouter />
document.addEventListener('astro:page-load', () => { /* init */ });
```

### F22 [verified-in-docs]
Content collection for src/content/entreprises that skips _-prefixed files. The glob() loader passes your pattern to tinyglobby and does NOT exclude `_` files on its own. `pattern` also accepts string[] with '!' negations. Re-tested: _modele.md (only `nom`, missing required fields) was skipped with no schema error. picomatch check: '**/[^_]*.md' rejects '_modele.md' and 'sub/_x.md' but ACCEPTS '_dir/x.md'.
SRC: https://docs.astro.build/en/guides/content-collections/#defining-build-time-content-collections ; https://docs.astro.build/en/reference/content-loader-reference/#pattern ; astro@7.4.1 dist/content/loaders/glob.js (tinyglobby(globOptions.pattern, ...))
```
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entreprises = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/entreprises' }),
  // alternative: pattern: ['**/*.md', '!**/_*', '!**/_*/**']
  schema: z.object({
    nom: z.string(),
    description: z.string(),
    noindex: z.boolean().default(true),
    idees: z.array(
      z.object({
        titre: z.string(),
        texte: z.string(),
      }),
    ),
  }),
});

export const collections = { entreprises };
```

### F23 [verified-in-docs]
CORRECTED: entry ids come from the file name via github-slugger (kebab-case, lowercased): col-macarthur.md gets id 'col-macarthur'. github-slugger KEEPS accented letters ('Café Liège' becomes 'café-liège') and strips '&' ('Col&McArthur' becomes 'colmcarthur'). A `slug:` frontmatter key overrides the id. The earlier claim that the schema must not define `slug` is legacy: ContentSchemaContainsSlugError still exists in 7.4.1 but nothing throws it. getCollection() order is non-deterministic and platform-dependent, so sort explicitly.
SRC: https://docs.astro.build/en/guides/content-collections/#defining-custom-ids ; https://docs.astro.build/en/reference/content-loader-reference/#generateid ; https://docs.astro.build/en/guides/content-collections/#querying-build-time-collections ; astro@7.4.1 dist (grep ContentSchemaContainsSlugError: only defined in errors-data.js) ; local github-slugger test

### F24 [verified-in-docs]
Root-level dynamic route with typed getStaticPaths and render() from astro:content. Builds /col-macarthur/index.html, and astro check reports 0 errors (re-tested).
SRC: https://docs.astro.build/en/guides/content-collections/#building-for-static-output-default ; https://docs.astro.build/en/guides/typescript/#infer-getstaticpaths-types
```
---
// src/pages/[entreprise].astro
import type { GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getCollection, render } from 'astro:content';
import Base from '../layouts/Base.astro';

export const getStaticPaths = (async () => {
  const entreprises = await getCollection('entreprises');
  return entreprises.map((entry) => ({
    params: { entreprise: entry.id },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const { entry } = Astro.props;
const { Content } = await render(entry);
---
<Base title={entry.data.nom} description={entry.data.description} image={`/og/${entry.id}.png`} noindex={entry.data.noindex}>
  <h1>{entry.data.nom}</h1>
  <Content />
</Base>
```

### F25 [verified-in-docs]
Route priority, in order:
1. Reserved routes (_astro/, _server_islands/, _actions/).
2. More path segments.
3. Static over dynamic.
4. Named params over rest params.
5. Prerendered over server.
6. Endpoints over pages.
7. File routes over redirects.
8. Alphabetical.
So index.astro (/) and 404.astro win over [entreprise].astro, and /og/[slug].png.ts (2 segments) never collides with it. An entry whose id equals a static route (e.g. '404') is a prerender conflict. The default prerenderConflictBehavior 'warn' (since v6) builds the higher-priority route and logs a warning; 'error' fails the build.
SRC: https://docs.astro.build/en/guides/routing/#route-priority-order ; https://docs.astro.build/en/reference/configuration-reference/#prerenderconflictbehavior

### F26 [verified-in-docs]
src/pages/404.astro builds to /404.html (verified with build.format 'directory'), and most hosts, Netlify included, use it automatically. Files or folders in src/pages starting with `_` are excluded from routing. During the build, the 404 page's Astro.url.pathname is '/404/', so a naive canonical becomes https://yourikaramyan.com/404/ (verified).
SRC: https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page ; https://docs.astro.build/en/guides/routing/#excluding-pages ; local build review-build/dist/404.html

### F27 [verified-in-docs]
Static endpoints: a .ts file in src/pages whose name includes the output extension, exporting GET that returns a Response. Binary output needs no `encoding`. Dynamic endpoints export getStaticPaths and can receive props in static mode. Everything is prerendered by default in static output, so `export const prerender` is NOT needed (only `prerender = false` to opt out, which needs an adapter). Re-tested: dist/og/default.png and dist/og/col-macarthur.png were generated.
SRC: https://docs.astro.build/en/guides/endpoints/#static-file-endpoints ; https://docs.astro.build/en/guides/endpoints/#params-and-dynamic-routing ; https://docs.astro.build/en/reference/routing-reference/#prerender
```
// src/pages/og/[slug].png.ts
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

export const getStaticPaths = (async () => {
  const entreprises = await getCollection('entreprises');
  return [
    { params: { slug: 'default' }, props: { title: 'Youri Karamyan' } },
    ...entreprises.map((e) => ({ params: { slug: e.id }, props: { title: e.data.nom } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ title: string }> = async ({ props }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">...${props.title.replace(/&/g, '&amp;')}...</svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
```

### F28 [verified-in-docs]
Type signatures in astro@7.4.1 (dist/types/public/common.d.ts):
- APIRoute<Props, Params> = (context: APIContext<Props, Params>) => Response | Promise<Response>
- GetStaticPaths = (options: GetStaticPathsOptions) => Promise<GetStaticPathsResult> | GetStaticPathsResult
- GetStaticPathsOptions = { paginate; routePattern }
- GetStaticPathsItem = { params; props?; cacheKey?: string | number }. cacheKey is in the d.ts but not in the routing reference docs.
Re-tested: passing the raw Node Buffer to new Response() passes astro check (0 errors, TS 6.0.3). @types/node was present only transitively via vite and sitemap; the docs' OG example says Buffer typing 'requires @types/node in your dependencies'.
SRC: astro@7.4.1 dist/types/public/common.d.ts ; https://docs.astro.build/en/reference/routing-reference/#getstaticpaths ; https://docs.astro.build/en/guides/fonts/#accessing-font-data-programmatically ; local astro check
```
export type APIRoute<APIProps extends Record<string, any> = Record<string, any>, APIParams extends Record<string, string | undefined> = Record<string, string | undefined>> = (context: APIContext<APIProps, APIParams>) => Response | Promise<Response>;
```

### F29 [verified-in-docs]
NEW: the Fonts API (stable since Astro 6, configured with the top-level `fonts` option) self-hosts fonts from local files or providers (Fontsource, Google, Bunny, etc.). The <Font /> component goes in <head> with optional `preload`. Optimized fallback fonts are generated by default to reduce layout shift when the web font swaps in, which is directly relevant to the 'no layout shift' requirement for the name animation.
SRC: https://docs.astro.build/en/guides/fonts/ ; https://docs.astro.build/en/guides/fonts/#customizing-font-fallbacks ; https://docs.astro.build/en/guides/upgrade-to/v6/#experimental-flags
```
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
export default defineConfig({
  fonts: [{
    provider: fontProviders.local(),
    name: 'MyFont',
    cssVariable: '--font-my',
    options: { variants: [{ src: ['./src/assets/fonts/MyFont.woff2'], weight: 'normal', style: 'normal' }] },
  }],
});

---
// layout
import { Font } from 'astro:assets';
---
<head><Font cssVariable="--font-my" preload /></head>
```

### F30 [verified-in-docs]
NEW: the docs show an OG-image static endpoint that reads the configured font through `fontData` and `experimental_getFontFileURL()` from astro:assets, renders with satori (+ satori-html) and converts with sharp. It returns new Response(new Uint8Array(pngBuffer)). experimental_getFontFileURL still carries the experimental_ prefix. A lighter alternative is sharp's own text input: `text.fontfile` takes an absolute path to a font file used by `text.font`, which makes text rendering independent of the build machine's fonts.
SRC: https://docs.astro.build/en/guides/fonts/#accessing-font-data-programmatically ; https://sharp.pixelplumbing.com/api-constructor/ (text.font, text.fontfile)
```
import { fontData, experimental_getFontFileURL } from 'astro:assets';
// const fontPath = fontData['--font-roboto'][0]?.src[0]?.url;
// const url = experimental_getFontFileURL(fontPath, context.url);
// const data = await fetch(url).then((r) => r.arrayBuffer());

// sharp-only alternative:
// sharp({ text: { text: 'Col&amp;McArthur', font: 'MyFont', fontfile: '/abs/path/MyFont.ttf', rgba: true, width: 1000 } })
```

### F31 [verified-in-docs]
@astrojs/sitemap: install with `npx astro add sitemap` (`--yes` accepts all prompts), or manually with `npm install @astrojs/sitemap` plus integrations: [sitemap()]. It needs `site` (http/https); otherwise it logs 'requires the `site` astro.config option. Skipping.' Output: sitemap-index.xml + sitemap-0.xml in dist. Current version 3.7.4; it has no astro peer dependency (dependencies: sitemap ^9, zod ^4) and works with astro 7.4.1 (re-tested).
SRC: https://docs.astro.build/en/guides/integrations-guide/sitemap/ ; `npx astro add --help` ; npm view @astrojs/sitemap@3.7.4 ; @astrojs/sitemap dist/index.js
```
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourikaramyan.com',
  integrations: [sitemap()],
});
```

### F32 [verified-in-docs]
sitemap filter(page) receives the FULL URL including site. With build.format 'directory' (and trailingSlash 'ignore' or 'always'), URLs end with '/', so exact comparisons must include the slash. 404/500 pages are excluded automatically, and endpoints (og/*.png, robots.txt.ts) are never listed because only routes of type 'page' are collected. Re-tested a filter built from the content folder file names, with trailingSlash 'always': sitemap-0.xml listed only / and /ws/, not /col-macarthur/. This relies on file name == entry id (ASCII kebab-case, no `slug:` override).
SRC: https://docs.astro.build/en/guides/integrations-guide/sitemap/#filter ; @astrojs/sitemap@3.7.4 dist/index.js ; astro dist/core/build/generate.js (addPageName only for route.type === 'page') ; local build
```
// astro.config.mjs
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://yourikaramyan.com';
const hiddenPages = new Set(
  readdirSync('./src/content/entreprises')
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => `${SITE}/${f.replace(/\.md$/, '')}/`),
);

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !hiddenPages.has(page) })],
});
```

### F33 [verified-in-docs]
Sitemap discovery: put <link rel="sitemap" href="/sitemap-index.xml" /> in <head> and a Sitemap: line in robots.txt. robots.txt can be generated from `site` with src/pages/robots.txt.ts. The docs say to do this 'instead of using a static file in the public/ directory'. If public/robots.txt also exists, the build logs 'Skipping src/pages/robots.txt.ts because a file with the same name exists in the public folder' and the public file wins (re-tested).
SRC: https://docs.astro.build/en/guides/integrations-guide/sitemap/#sitemap-discovery ; astro dist/core/build/generate.js checkPublicConflict() ; local build
```
import type { APIRoute } from 'astro';
const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /
Sitemap: ${sitemapURL.href}
`;
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};
```

### F34 [verified-in-docs]
Canonical URL pattern from the docs: new URL(Astro.url.pathname, Astro.site). Astro.site is a URL, or undefined when `site` is not set. Prerendered pages get site/base-based URLs during the build; without `site` they get localhost URLs. Re-tested:
- Build: <link rel="canonical" href="https://yourikaramyan.com/col-macarthur/">.
- Dev with trailingSlash 'ignore': /col-macarthur gives a canonical with no slash, /col-macarthur/ gives one with a slash.
Since v6, Astro.url.pathname may be partially decoded (percent-encoded segments).
SRC: https://docs.astro.build/en/reference/api-reference/#url ; https://docs.astro.build/en/reference/api-reference/#site ; https://docs.astro.build/en/guides/upgrade-to/v6/#changed-route-pathname-normalization
```
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
<link rel="canonical" href={canonicalURL} />
```

### F35 [verified-in-docs]
Per-page head layout with title, description, canonical, Open Graph, Twitter card and optional noindex. The original version was built and verified (attributes escaped, e.g. Col&amp;McArthur). The reviewer added a `canonical` prop so the 404 page can omit its bogus /404/ canonical. That one-line conditional was not separately built.
SRC: https://docs.astro.build/en/reference/api-reference/#url ; https://docs.astro.build/en/guides/view-transitions/#enabling-view-transitions-spa-mode (head meta example) ; local build
```
---
// src/layouts/Base.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  canonical?: boolean;
}
const { title, description, image = '/og/default.png', noindex = false, canonical = true } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogImageURL = new URL(image, Astro.site);
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonicalURL} />}
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageURL} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="sitemap" href="/sitemap-index.xml" />
  </head>
  <body>
    <slot />
  </body>
</html>

<!-- src/pages/404.astro -->
<Base title="Page introuvable" description="…" noindex canonical={false}>…</Base>
```

### F36 [verified-in-docs]
Type checking: `astro check` needs @astrojs/check (0.9.11), whose peer dependency is typescript ^5.0.0 || ^6.0.0. typescript@latest is 7.0.2. Re-tested a dry run: `npm install -D @astrojs/check typescript` in one command picks typescript 6.0.3. Pin typescript@^6 if you install it separately. astro check exits with code 1 on errors.
SRC: https://docs.astro.build/en/guides/typescript/#type-checking ; https://docs.astro.build/en/reference/cli-reference/#astro-check ; npm view @astrojs/check@0.9.11 peerDependencies ; npm view typescript dist-tags
```
npm install -D @astrojs/check typescript@^6
# package.json: "build": "astro check && astro build"
```

### F37 [verified-in-docs]
For a noindex rule to work, Google must be able to crawl the page: it must not be blocked in robots.txt. Keep /col-macarthur/ crawlable (no Disallow), use the robots meta noindex, and leave it out of the sitemap.
SRC: https://developers.google.com/search/docs/crawling-indexing/block-indexing

### F38 [verified-in-docs]
astro 7.4.1 was published on npm on 2026-10-19 at 14:13 UTC, i.e. the same day as this research; 7.0.0 came out 2026-06-22. Nothing wrong was found in 7.4.1 during these builds.
SRC: npm view astro time
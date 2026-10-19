# astro-assets: the Astro 7 Fonts API and image optimization (fonts, Image/Picture, responsive layout, sharp). Re-verified against the docs and by rebuilding with astro 7.4.1, unifont 1.0.3, sharp 0.35.5 and Node 24.16 on Windows.

## Summary

The Fonts API is stable. It lives under the top-level `fonts` key and has been since 6.0.0. I re-tested `experimental: { fonts }` in 7.4.1 and it fails with "Invalid or outdated experimental feature."

Recommended setup for the hero (best Lighthouse result, minimal CLS):
- Bricolage Grotesque through `fontProviders.google()` with `weights: ["200 800"]`, `subsets: ["latin"]` and `options.experimental.variableAxis: { opsz: ["96"], wdth: [["75","100"]] }`, loaded with `<Font cssVariable="--font-display" preload />`.
- This produces a 79,508-byte latin woff2 with the wght 200–800 and wdth 75–100 axes. Comparing outlines confirms opsz is fixed at 96.
- Astro writes `font-stretch: 75% 100%` and correct fallback metrics (size-adjust 100.0447%).
- You get the same output without the experimental option and without network access at build time by committing that file and using `fontProviders.local()` with `weight: "200 800"` and `stretch: "75% 100%"`. I tested this.

Body font: Instrument Sans through Google with `weights: ["400 700"]` and no variableAxis gives 29,904 B (normal) and 31,788 B (italic). Preload only the normal file with `preload={[{ style: "normal" }]}`.

Use the latin subset only:
- Adding latin-ext poisons the automatic fallback metrics. With Google this happens whatever the subset order (Bricolage 120.68%, Instrument Sans 135.26%). With Fontsource it happens only when latin-ext is listed first.
- `preload` (true) then also preloads the latin-ext files.
- Latin covers all French characters except U+202F (narrow no-break space), which neither font has in any subset.

Other routes:
- The Fontsource provider always downloads the 131,548-byte 'standard' file and writes no font-stretch.
- Correction: the NPM provider is the worst option. With `remote: false` the build fails with CannotFetchFontFile in 7.4.1. With the default `remote: true` it downloads the files from jsDelivr, ignores `subsets` (vietnamese + latin-ext + latin, all preloaded) and computes poisoned fallback metrics.
- The @fontsource-variable npm package plus a `?url` preload works, but you lose Astro's fallback metrics.

Zero CLS during the animation depends on layout, not font loading: a fixed number of lines, a unitless line-height, left alignment and a reserved box. Start the axis animation only after the web font is ready, because the Arial fallback has no wdth axis.

Images: `<Image>`/`<Picture>`, `layout`, `priority`, `image.layout` and `image.responsiveStyles` are stable (layout and priority since 5.10). The build output matches the notes. Two caveats: Astro never upscales, so the source photo should be at least twice the display width, and both doc pages show outdated responsive-style markup. Sharp 0.35.5 installs automatically as an optional dependency. The lockfile written on Windows includes the linux-x64 binaries Netlify needs. Astro 7.4.1 requires Node ≥ 22.22.0.

## Corrections
- ORIGINAL: The NPM provider ... provider options are `cdn` and `remote` (default true; set false to resolve only from node_modules). Code: provider: fontProviders.npm({ remote: false }), options: { package: "@fontsource-variable/bricolage-grotesque", file: "standard.css" }
  FIX: In astro 7.4.1, `remote: false` makes the build fail with CannotFetchFontFile (also with optimizedFallbacks: false). unifont returns file:// URLs, and Astro's CachedFontFetcher reads only absolute paths, so it passes them to Node fetch, which does not support file:. With the default `remote: true`, the CSS is read locally but the font files are downloaded from jsDelivr at build time. `subsets` is ignored (vietnamese, latin-ext and latin were all downloaded and preloaded), and the fallback metrics are poisoned (size-adjust 120.68%). Do not use this provider for this site.
  SRC: Local test builds (astro 7.4.1, unifont 1.0.3) ; unifont dist/index.mjs lines 1360-1490 ; astro dist/assets/fonts/infra/cached-font-fetcher.js
- ORIGINAL: Keeping the full opsz range costs 131.5 KB per file, whether you use the Fontsource provider or Google with opsz [["12","96"]] ("With the full opsz range (or the Fontsource provider) the latin file is 131,548 bytes")
  FIX: The two files differ slightly: Google with opsz [["12","96"]] + wdth gives 131,312 bytes, and the Fontsource 'standard' file is 131,548 bytes. Both are about 131 KB.
  SRC: Local test build (V=sizes) and the Fontsource npm package file listing
- ORIGINAL: The latin unicode-range already covers é, à, ç, œ, ’, «», U+202F and €.
  FIX: U+202F falls inside the latin unicode-range (U+2000-206F), but neither Bricolage Grotesque nor Instrument Sans has a glyph for it in any subset, so the browser takes it from the fallback font. All the other listed characters are present.
  SRC: fontTools cmap check on Google-built latin files and Fontsource latin/latin-ext files
- ORIGINAL: If latin-ext is ever needed with Fontsource, list "latin" first. (The summary implies only the Google provider is affected by order.)
  FIX: Confirmed for Fontsource: latin first gives 100.04%, latin-ext first gives 120.68%. With Google, the order in the config does not matter, because Google always returns vietnamese, latin-ext, latin, so any family that includes latin-ext is poisoned. Also, `preload` (true) preloads the latin-ext files too.
  SRC: Local test builds (V=ext, extrev, fsext, fsext REV=1) ; Google css2 response order
- ORIGINAL: getImage() ... returns {src, srcSet, attributes, options}
  FIX: GetImageResult also includes `rawOptions` (the original transformation settings).
  SRC: https://docs.astro.build/en/reference/modules/astro-assets/#getimage
- ORIGINAL: <Picture formats={['avif','webp']}> writes one <source> per format, plus an <img> fallback in the original format (jpg stays jpg, otherwise png)
  FIX: The fallbackFormat default is .jpg for JPG sources, .png for other static images, .gif for animated images and .svg for SVG files.
  SRC: https://docs.astro.build/en/reference/modules/astro-assets/#fallbackformat
- ORIGINAL: The docs still show inline `style="--fit: cover; --pos: center;"`, which the build no longer produces.
  FIX: Correct, and the v6 upgrade guide is out of date as well: it shows `class="__a_HaSh350" data-astro-fit data-astro-pos`. Astro 7.4.1 actually outputs data-astro-image, data-astro-image-fit and data-astro-image-pos with no class.
  SRC: https://docs.astro.build/en/guides/upgrade-to/v6/ (Changed: how responsive image styles are emitted) ; local build output
- ORIGINAL: Sharp ... requires node >= 20.9.0
  FIX: That is sharp's own engines field. astro@7.4.1 itself requires Node >= 22.22.0 (and npm >= 9.6.5), so pin Node on Netlify accordingly.
  SRC: npm view astro@7.4.1 engines
- ORIGINAL: (Automatic fallback metrics) computed by Capsize from the downloaded font.
  FIX: They are computed from the first collected file's default instance, which for the Google Bricolage file is wght 800, wdth 100. They do not track the wght or wdth values used at runtime, so the fallback matches the animated hero only approximately.
  SRC: astro dist/assets/fonts/infra/capsize-font-metrics-resolver.js ; fontTools fvar defaults
- ORIGINAL: Open question: Does Chrome emit a new LCP entry when a web font swaps on an already painted text node?
  FIX: Partly answered by web.dev. Text in the font block period does not count as rendered, and changes to size or position do not create new LCP candidates. With font-display: swap, the fallback paint should be the LCP for that text, and the swap should not add a later entry (inferred; confirm with Lighthouse).
  SRC: https://web.dev/articles/lcp

## Pitfalls
- Writing `experimental: { fonts: ... }`: it was removed in v6, and 7.4.1 rejects it with 'Invalid or outdated experimental feature'. Use the top-level `fonts` key.
- Setting `subsets: ["latin","latin-ext"]` in astro 7.4.1:
- With Google, the fallback metrics are measured on the latin-ext file whatever the order (Bricolage 120.68% instead of 100.04%, Instrument Sans 135.26% instead of 102.74%).
- With Fontsource, the same happens when latin-ext is listed first.
- `preload` (true) also preloads the latin-ext files.
Use `subsets: ["latin"]`. If latin-ext is ever needed, add `preload={[{ subset: "latin" }]}` and check the size-adjust in the build output.
- Do not use `fontProviders.npm({ remote: false })` in 7.4.1: the build fails with CannotFetchFontFile because of file:// URLs. The default `remote: true` downloads from jsDelivr at build time, ignores `subsets`, preloads every subset and poisons the fallback metrics. Prefer the Google or Local provider.
- The metrics cache is keyed by family `name`. Two families with the same name, such as a hero glyph subset and the main Bricolage family, share the metrics of whichever was computed first (112.38% in the test). Give the subset family `fallbacks: []` or `optimizedFallbacks: false`.
- `experimental.variableAxis` and `experimental.glyphs` are experimental provider options, so they can change in a minor release. Pin the exact astro version, or use the Local provider with the pre-cut opsz-96 file, which gives identical output and needs no network access at build time.
- The Fontsource provider always downloads the 131.5 KB 'standard' file for Bricolage, and 57 KB for Instrument Sans, because it keeps every axis and offers no way to choose fewer. It also emits no font-stretch; add `stretch: "75% 100%"` if you use the CSS font-stretch property.
- Fontsource's npm `wdth.css`, `index.css` and `wght.css` for Bricolage fix opsz at the small text size. A large headline then looks looser and lighter than the display cut. Use standard.css, or the Google or Local route with opsz fixed at 96.
- Fixing opsz at 96 makes font-optical-sizing do nothing. Bricolage then always shows the display cut, including in small headings. If you need small-size Bricolage, use opsz [["12","96"]] and accept the 131 KB file.
- The npm package's index.css (the default import) has only the wght axis, so font-variation-settings 'wdth' and 'opsz' silently do nothing.
- The real font-family name is hashed ("Bricolage Grotesque-<hash>") and the hash changes whenever the config changes. Never write font-family: 'Bricolage Grotesque' by hand; use var(--font-display). For document.fonts.load(), pass getComputedStyle(el).fontFamily, or await document.fonts.ready.
- Start the GSAP axis animation only after the web font is ready. The Arial fallback has no wdth axis, so animating it does nothing and then jumps at the swap. Also, the fallback metrics match only the font's default instance (wght 800, wdth 100), so reserve the hero box with layout instead of relying on the fallback metrics (inferred).
- Do not start the hero headline at opacity:0 or visibility:hidden. Chromium excludes opacity-0 elements from LCP, so a fade-in delays LCP. Animate the axes from a visible state instead.
- Wrapping changes height. If wdth or wght changes how many lines the name takes on mobile, the content below moves. Keep a fixed number of lines (nowrap, one block span per word), set a unitless line-height, left-align the text, and size the font for the widest axis state.
- Under compressHTML: 'jsx' (the v7 default), inline spans lose the whitespace between them, so copy/paste and screen readers may get 'YouriKaramyan'. Add {" "} between the spans.
- U+202F (narrow no-break space, used before ; : ! ? » in French) has no glyph in either font. If you use it, the browser draws it with the fallback font. Use U+00A0 if you want the space rendered in the web font.
- Astro's sans-serif fallback is local('Arial'), and Arial is usually missing on Android, so real Android users may get no metric correction. `fallbacks: ["system-ui"]` adds metric-adjusted faces for Segoe UI, Roboto, BlinkMacSystemFont, Helvetica Neue and Arial. That was verified in a build; whether Android Chrome matches local('Roboto') is unverified.
- Preload only the files needed above the fold: the Bricolage latin file and the Instrument Sans latin normal file. Use `preload={[{ style: "normal" }]}` for Instrument Sans, otherwise the italic file is preloaded too.
- The automatic `sizes` for constrained assumes the image is near full width on small screens. Override `sizes` when the portrait sits in a column.
- Since v6 the default service never upscales, and it crops by default when both width and height are given. Supply a source photo at least twice the display width (960 px or more for a 480 px slot), and pass only `width` to keep the aspect ratio.
- Images in public/ are never optimized or made responsive. Put the CV photo in src/assets and import it.
- With the npm package plus ?url preload, you have to write the size-adjust and ascent-override fallback @font-face yourself, because Astro only generates it through the Fonts API.
- Do not copy the docs' example output for responsive styles (inline --fit/--pos, or a hash class with data-astro-fit). In 7.4.1 the attributes are data-astro-image, data-astro-image-fit and data-astro-image-pos, inside @layer astro.images, so target those in custom CSS.
- og:image in webp may not be accepted by every social crawler (LinkedIn support is unverified). A jpg from getImage is the safer choice for a CV site.
- astro 7.4.1 requires Node >= 22.22.0. Pin Node on Netlify, for example with NODE_VERSION = "24" in netlify.toml or an .nvmrc file, instead of relying on the platform default (inferred).
- AVIF plus WebP plus fallback at several widths multiplies build-time encodes, which is fine for a small site. Astro's build cache lives in node_modules/.astro (fonts are confirmed there; images are expected there too).

## Open questions
- Is the LCP element on mobile the hero name (text) or the portrait photo? That decides which one gets priority/preload. If it is the text, consider not preloading the body font so the Bricolage file is fetched first.
- Will Bricolage also be used at small sizes (subheadings under about 24px)? If yes, decide between opsz fixed at 96 (79.5 KB) and the full opsz range (131.3 KB from Google).
- Does body text in Instrument Sans actually use the wdth axis? If not, keep wght only (29.9 KB instead of 57.1 KB).
- Will the GSAP animation split the name into letters (SplitText)? Per-letter inline spans can register layout shifts, so check this together with the GSAP research.
- Is the hero-only glyph subset (5 KB) worth the extra complexity? It requires keeping the glyph list in sync with the displayed name.
- Google provider or Local provider with a committed opsz-96 file? Local avoids the experimental option and the build-time network dependency, but the file has to be refreshed by hand.
- Does Chrome on Android honor local('Arial') or local('Roboto') for the generated fallback faces? This was not verified; test it on a real device if CLS on Android matters.
- Is the latin-ext fallback-metrics bug already reported upstream (withastro/astro)? I found no report. Worth filing, or worth re-checking after upgrading past 7.4.1.

## Facts

### F1 [verified-in-docs]
The Fonts API is stable. Every font.* option is badged 'Added in astro@6.0.0', and fonts are configured with the top-level `fonts` array, which defaults to []. The v6 upgrade guide lists `fonts` among the experimental flags 'removed in Astro 6.0 and are now stable'. In astro 7.4.1 the experimental schema is a z.strictObject without fonts, and a test build with `experimental: { fonts }` fails with '! Invalid or outdated experimental feature.'
SRC: https://docs.astro.build/en/reference/configuration-reference/#fonts ; https://docs.astro.build/en/guides/upgrade-to/v6/#experimental-flags ; astro@7.4.1 dist/core/config/schemas/base.js line 296 `fonts: z.array(FontFamilySchema).optional()` ; local build re-test
```
import { defineConfig, fontProviders } from "astro/config";
export default defineConfig({ fonts: [{ provider: fontProviders.fontsource(), name: "Roboto", cssVariable: "--font-roboto" }] });
```

### F2 [verified-in-docs]
Each family takes these options, with these defaults:
- `weights`: [400]
- `styles`: ["normal","italic"]
- `subsets`: ["latin"]
- `formats`: ["woff2"]
- `fallbacks`: ["sans-serif"]
- `optimizedFallbacks`: true
- `display`: "swap"

There are also `unicodeRange`, `stretch`, `featureSettings`, `variationSettings` and the provider-specific `options`. For a variable font, give the weight range as one string. You can declare the same font more than once (same `cssVariable`, `name` and `provider`), and Astro merges them.
SRC: https://docs.astro.build/en/reference/configuration-reference/#fontweights ; https://docs.astro.build/en/guides/fonts/#granular-font-configuration
```
weights: ["200 800"]   // variable range
stretch: "75% 100%"     // emitted as @font-face font-stretch (tested with the Fontsource provider)
```

### F3 [verified-in-docs]
The built-in providers are Adobe, Bunny, Fontshare, Fontsource, Google, Google Icons, Local and NPM, all imported with `import { fontProviders } from 'astro/config'`. The Google provider has two family options: `experimental.variableAxis` and `experimental.glyphs`. Without `variableAxis`, the Google provider requests only the wght and ital axes (unifont candidateAxes = ['wght','ital', ...variableAxis keys]). The docs list no options for the Fontsource provider.
SRC: https://docs.astro.build/en/reference/font-provider-reference/#google ; unifont@1.0.3 dist/index.mjs lines 878-930
```
provider: fontProviders.google(),
options: { experimental: { variableAxis: { slnt: [["-15", "0"]], CASL: [["0", "1"]], CRSV: ["1"] } } }
```

### F4 [verified-in-docs]
Reproduced with a fresh astro 7.4.1 build. Bricolage Grotesque through the Google provider with `variableAxis {opsz:["96"], wdth:[["75","100"]]}` gives:
- a 79,508-byte latin woff2 whose fvar holds wght 200–800 and wdth 75–100;
- opsz fixed at 96, confirmed because glyph outlines match the full file pinned at opsz 96;
- `@font-face` output with `font-weight:200 800; font-stretch:75% 100%`;
- a single preload link.

Other Google variants:
- full opsz range [["12","96"]]: 131,312 bytes;
- opsz 96 without wdth (wght only): 41,232 bytes.

The Fontsource 'standard' file is 131,548 bytes.
SRC: https://docs.astro.build/en/reference/font-provider-reference/#experimentalvariableaxis ; local test build (astro 7.4.1) + fontTools fvar/instancer comparison
```
{
  name: "Bricolage Grotesque",
  cssVariable: "--font-display",
  provider: fontProviders.google(),
  weights: ["200 800"],
  styles: ["normal"],
  subsets: ["latin"],
  fallbacks: ["sans-serif"],
  options: { experimental: { variableAxis: { opsz: ["96"], wdth: [["75", "100"]] } } },
}
```

### F5 [verified-in-docs]
Same result, no experimental option: commit the 79.5 KB opsz-96 file (for example to src/assets/fonts) and load it through the Local provider. A test build produced:
- `font-weight:200 800; font-stretch:75% 100%`;
- correct fallback metrics (size-adjust 100.0447%, ascent-override 92.9585%);
- the preload link.

This route also needs no access to Google at build time. The Local variant properties are weight, style, src, display, unicodeRange, stretch, featureSettings and variationSettings.
SRC: https://docs.astro.build/en/reference/font-provider-reference/#local ; local test build
```
{ name: "Bricolage Grotesque", cssVariable: "--font-display", provider: fontProviders.local(), fallbacks: ["sans-serif"],
  options: { variants: [{ src: ["./src/assets/fonts/bricolage-latin-opsz96.woff2"], weight: "200 800", style: "normal", stretch: "75% 100%" }] } }
```

### F6 [verified-in-docs]
The Fontsource provider (unifont 1.0.3) keeps every registered axis automatically. It picks the 'standard' file when the family has wdth, opsz or slnt, picks 'full' when it has a custom axis, and otherwise picks 'wght'. For Bricolage the latin file is 131,548 bytes (opsz 12–96, wght 200–800, wdth 75–100). There is no option to choose fewer axes. For Instrument Sans it picks standard too: 57,332 B normal and 61,636 B italic, compared with 29,904 B wght-only from Google. The provider emits no font-stretch descriptor. Adding `stretch: "75% 100%"` to the family restores it, as tested; `font-variation-settings` works either way.
SRC: unifont@1.0.3 dist/index.mjs lines 728-800 ; https://api.fontsource.org/v1/variable/bricolage-grotesque ; local test build
```
function pickFontsourceAxisSlug(axes) { ... return hasRegisteredExtra ? "standard" : "wght"; }
// url: https://cdn.jsdelivr.net/fontsource/fonts/${id}:vf@latest/${subset}-${axisSlug}-${style}.woff2
```

### F7 [verified-in-docs]
Fontsource metadata:
- Bricolage Grotesque: opsz 12–96 (metadata default 14; the fvar default inside the file is 96), wdth 75–100, wght 200–800; style normal only; subsets latin, latin-ext, vietnamese.
- Instrument Sans: wght 400–700, wdth 75–100, ital 0–1; styles normal and italic; subsets latin, latin-ext.

The npm packages ship italic as separate *-italic.css and *-italic.woff2 files, not as an ital axis inside one file.
SRC: https://api.fontsource.org/v1/variable/bricolage-grotesque ; https://api.fontsource.org/v1/variable/instrument-sans ; https://api.fontsource.org/v1/fonts/instrument-sans ; fontTools fvar

### F8 [verified-in-docs]
`<Font />` comes from astro:assets (Added in 6.0.0) and goes in <head>. It takes:
- `cssVariable` (required);
- `preload`: false by default, or true, or an array of {weight?, style?, subset?}.

It writes an inline <style> holding the @font-face rules and the :root variable, followed by `<link rel="preload" as="font" type="font/woff2" crossorigin>` for each preloaded file. A variable file is preloaded when any requested weight falls inside its range. The real font-family name is hashed and changes whenever the config changes (for example "Bricolage Grotesque-d9a4b0cb7ac69d5c"), so always use var(--font-display).
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#font- ; https://docs.astro.build/en/reference/modules/astro-assets/#preload ; astro@7.4.1 components/Font.astro + dist/assets/fonts/core/filter-preloads.js
```
---
import { Font } from "astro:assets";
---
<Font cssVariable="--font-display" preload />
<Font cssVariable="--font-body" preload={[{ style: "normal" }]} />
<style is:global> h1 { font-family: var(--font-display); } body { font-family: var(--font-body); } </style>
```

### F9 [verified-in-docs]
Automatic fallbacks: when the last fallback is a generic family, Astro adds a fallback @font-face that points at a local font, local("Arial") for sans-serif. Its size-adjust, ascent-override, descent-override and line-gap-override are computed by @capsizecss/unpack from the downloaded file. The metrics come from the file's default instance; for Bricolage on Google that is wght 800, wdth 100. The CSS variable becomes "<font>", "<font> fallback: Arial", sans-serif. `optimizedFallbacks: false` turns this off, and `fallbacks: []` removes fallbacks entirely. With `fallbacks: ["system-ui"]`, Astro instead generates metric-adjusted faces for BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue and Arial.
SRC: https://docs.astro.build/en/guides/fonts/#customizing-font-fallbacks ; astro@7.4.1 dist/assets/fonts/core/optimize-fallbacks.js + infra/capsize-font-metrics-resolver.js ; local test builds
```
@font-face{font-family:"Bricolage Grotesque-… fallback: Arial";src:local("Arial");font-display:swap;font-weight:200 800;font-style:normal;size-adjust:100.0447%;ascent-override:92.9585%;descent-override:26.9879%;line-gap-override:0%;}
```

### F10 [inferred]
Bug in astro 7.4.1, reproduced in my own build: `getMetrics(family.name, …)` caches by family name and measures the first collected file. Google returns subsets in the order vietnamese, latin-ext, latin.

| Config | Bricolage size-adjust | Instrument Sans size-adjust |
|---|---|---|
| Google, latin + latin-ext (either order) | 120.6817% (ascent 77.06%) | 135.2622% |
| Fontsource, latin listed first | 100.0447% (correct) | |
| Fontsource, latin-ext listed first | 120.68% | |
| Google or Fontsource, latin only | 100.0447% | 102.7365% |

A hero glyph-subset family with the same `name` and default fallbacks also poisons the main family (112.382%), unless it has `fallbacks: []`.
SRC: astro@7.4.1 dist/assets/fonts/infra/capsize-font-metrics-resolver.js + core/optimize-fallbacks.js ; Google css2 response order ; local test builds
```
async getMetrics(name, font) { return this.#cache[name] ??= filterRequiredMetrics(await fromBuffer(await this.#fontFetcher.fetch(font))); }
```

### F11 [verified-in-docs]
The latin subset is enough for French text. Its unicode-range is U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC and a few more. fontTools confirms that é è à ç É À œ Œ ’ « » … € and U+00A0 are present in both the Bricolage and Instrument Sans latin files. Two exceptions:
- Ÿ (U+0178) is only in latin-ext.
- U+202F (narrow no-break space) falls inside the range but has no glyph in either font, in any subset, so the browser takes it from the fallback font.
SRC: https://api.fontsource.org/v1/fonts/bricolage-grotesque (unicodeRange.latin) ; fontTools cmap check on Google-built and Fontsource latin/latin-ext files

### F12 [verified-in-docs]
Instrument Sans through the Google provider with `weights: ["400 700"]` and no variableAxis serves wght-only files: 29,904 bytes for latin normal and 31,788 bytes for latin italic. Adding `variableAxis: { wdth: [["75","100"]] }` makes latin normal 57,100 bytes, with axes wdth 75–100 and wght 400–700.
SRC: local test build (astro 7.4.1) + fontTools
```
{ name: "Instrument Sans", cssVariable: "--font-body", provider: fontProviders.google(), weights: ["400 700"], styles: ["normal", "italic"], subsets: ["latin"], fallbacks: ["sans-serif"] }
```

### F13 [verified-in-docs]
Optional extra step, reproduced: a hero-only family using `experimental.glyphs` (Google `text=`) produces a 4,956-byte woff2 that keeps wght 200–800 and wdth 75–100, with opsz fixed at 96. Astro writes a unicode-range limited to those glyphs (U+20,U+4b,U+59,U+61,U+69,U+6d-6f,U+72,U+75,U+79). With `fallbacks: []` the main family's metrics stay correct.
SRC: https://docs.astro.build/en/reference/font-provider-reference/#experimentalglyphs ; local test build
```
{ name: "Bricolage Grotesque", cssVariable: "--font-hero", provider: fontProviders.google(), weights: ["200 800"], styles: ["normal"], subsets: ["latin"], fallbacks: [],
  options: { experimental: { glyphs: [...new Set("Youri Karamyan")], variableAxis: { opsz: ["96"], wdth: [["75", "100"]] } } } }
// head: <Font cssVariable="--font-hero" preload /> <Font cssVariable="--font-display" />
// css:  .hero-name { font-family: var(--font-hero), var(--font-display); }
```

### F14 [inferred]
NPM provider (`fontProviders.npm()`) options:
- provider options: `cdn` (default https://cdn.jsdelivr.net/npm) and `remote` (default true; the docs describe it as falling back to the CDN when local resolution fails);
- family options: `package`, `version` (default 'latest') and `file` (default 'index.css').

What it actually does in 7.4.1:
- With `remote: true`, unifont reads the CSS from node_modules but rewrites every font URL to jsDelivr at the installed version, so the files are downloaded from the CDN at build time.
- Faces have no subset metadata, so `subsets: ["latin"]` is ignored. With standard.css the build downloaded vietnamese (22 KB), latin-ext (53.6 KB) and latin (131.5 KB) files, and `preload` (true) preloaded all three. Fallback metrics were poisoned (size-adjust 120.68%). A `preload` subset filter matches nothing.
- With `remote: false` the build fails with CannotFetchFontFile: unifont returns file:// URLs, and Astro's CachedFontFetcher only reads absolute filesystem paths, sending everything else to Node fetch, which rejects file:. It fails even with optimizedFallbacks: false.
SRC: https://docs.astro.build/en/reference/font-provider-reference/#npm ; unifont@1.0.3 dist/index.mjs lines 1310-1490 ; astro@7.4.1 dist/assets/fonts/infra/cached-font-fetcher.js + core/filter-preloads.js ; local test builds
```
// Do not use in astro 7.4.1:
provider: fontProviders.npm({ remote: false }) // -> [CannotFetchFontFile] ... file:///…/bricolage-grotesque-vietnamese-standard-normal.woff2
```

### F15 [verified-in-docs]
Entry files in @fontsource-variable/bricolage-grotesque@5.3.0 (all format woff2-variations, family 'Bricolage Grotesque Variable'):

| File | Axes | latin woff2 size |
|---|---|---|
| index.css = wght.css | wght only | 41,344 |
| standard.css | opsz + wdth + wght, font-stretch 75% 100% | 131,548 |
| wdth.css | wght + wdth, opsz fixed at the small text size (≈14; my outline comparison lands between 12 and 14) | 78,156 |
| opsz.css | wght + opsz | 76,888 |

There is no full.css: the Fontsource docs say full.css holds all axes including custom ones, and neither font has a custom axis.

In @fontsource-variable/instrument-sans@5.3.0:
- index.css and wght.css hold wght only, with wght-italic.css alongside.
- standard.css and wdth.css hold wdth + wght and use byte-identical woff2 files, with -italic variants.

The package `exports` map allows `./files/*.woff2` and `./*.css`.
SRC: node_modules/@fontsource-variable/*@5.3.0 (package.json exports, file listing) ; https://fontsource.org/docs/getting-started/variable ; fontTools instancer comparison
```
import "@fontsource-variable/bricolage-grotesque/standard.css"; // all axes
import "@fontsource-variable/instrument-sans/wght.css";           // body, wght only
```

### F16 [verified-in-docs]
Preloading with the npm package and a Vite `?url` import works in Astro 7.4.1, re-tested. The `?url` import and the CSS url() resolve to the same hashed asset, /_astro/bricolage-grotesque-latin-standard-normal.C5Lc8Qmc.woff2, and Astro inlines the small stylesheet. There are no automatic fallback metrics on this route, and the family name is the literal 'Bricolage Grotesque Variable'.
SRC: https://docs.astro.build/en/guides/imports/ ; local test build
```
---
import "@fontsource-variable/bricolage-grotesque/standard.css";
import bricoLatin from "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2?url";
---
<link rel="preload" href={bricoLatin} as="font" type="font/woff2" crossorigin />
```

### F17 [verified-in-docs]
`<Image>` and `<Picture>` come from astro:assets. Keep local images in src/ (for example src/assets) and import them; files in public/ are never optimized and cannot be responsive. `<Image>` outputs webp by default. `<Picture formats={['avif','webp']}>` writes one <source> per format in order, plus an <img> fallback. The `fallbackFormat` default is .jpg for a JPG source, .png for other static images, .gif for animated images and .svg for SVG. `alt` is required. Width and height are inferred for imported images, and giving only `width` keeps the aspect ratio (width=480 gives height=600).
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#picture- ; https://docs.astro.build/en/guides/images/ ; local test build
```
---
import { Picture } from "astro:assets";
import portrait from "../assets/portrait.jpg";
---
<Picture src={portrait} formats={["avif", "webp"]} alt="Youri Karamyan" width={480} layout="constrained" priority quality="mid" sizes="(min-width: 768px) 480px, 100vw" />
```

### F18 [verified-in-docs]
`priority` (Added in 5.10.0, default false) sets loading="eager", decoding="sync" and fetchpriority="high", including on the <img> inside <picture>. Each of these can be overridden. Without `priority`, the image gets loading="lazy" and decoding="async", and fetchpriority is omitted. Astro does not add a <link rel=preload> for images.
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#priority ; astro@7.4.1 dist/assets/internal.js lines 113-122 ; local build output
```
<img ... loading="eager" decoding="sync" fetchpriority="high" data-astro-image="constrained" data-astro-image-fit="cover" data-astro-image-pos="center" width="480" height="600">
```

### F19 [verified-in-docs]
`layout` accepts 'constrained', 'full-width', 'fixed' or 'none' (Added in 5.10.0, stable). It generates srcset and sizes automatically. The generated `sizes` are:
- constrained: `(min-width: Wpx) Wpx, 100vw`
- fixed: `Wpx`
- full-width: `100vw`

The global defaults are `image.layout`, `image.responsiveStyles` (default false; the docs say to enable it unless you style images yourself), `image.objectFit` (default cover), `image.objectPosition` (default center) and `image.breakpoints`. `densities` is ignored when a layout is set. User `widths` and `sizes` override the generated values. In the build, width 480 produced srcset 480, 640, 750, 828 and 960w.
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#layout ; https://docs.astro.build/en/reference/configuration-reference/#imagelayout ; https://docs.astro.build/en/reference/configuration-reference/#imageresponsivestyles ; astro@7.4.1 dist/assets/layout.js getSizesAttribute
```
export default defineConfig({ image: { layout: "constrained", responsiveStyles: true } });
```

### F20 [inferred]
In astro 7.4.1 the responsive styles are emitted as `@layer astro.images{…}` with `:where([data-astro-image]){height:auto}` and data-astro-image-fit / data-astro-image-pos attributes, and no class. Both doc pages are out of date. The images guide still shows inline `style="--fit: cover; --pos: center;"`. The v6 upgrade guide shows `class="__a_HaSh350" data-astro-fit data-astro-pos`. Neither matches the real output.
SRC: local test build astro 7.4.1 vs https://docs.astro.build/en/guides/images/ and https://docs.astro.build/en/guides/upgrade-to/v6/ (Changed: how responsive image styles are emitted)
```
<style>@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=cover]{object-fit:cover}...}</style>
```

### F21 [verified-in-docs]
`quality` accepts a preset (low, mid, high, max) or a number from 0 to 100. In the Sharp service the presets map to low=25, mid=50, high=80, max=100. Default encoder options per format can be set with image.service.config.{jpeg,webp,avif,png} (Added in 6.1.0), and a per-image quality takes precedence. The default service is {entrypoint: 'astro/assets/services/sharp', config: {}}.
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#quality ; https://docs.astro.build/en/reference/configuration-reference/#imageservice ; astro@7.4.1 dist/assets/services/sharp.js qualityTable
```
image: { service: { entrypoint: "astro/assets/services/sharp", config: { avif: { effort: 4 }, webp: { effort: 6 } } } }
```

### F22 [verified-in-docs]
`getImage()` runs on the server only and throws on the client. It takes the same options as `<Image>` except alt and sizes. It returns a GetImageResult {src, srcSet, attributes, options, rawOptions}. In the build, og.src is root-relative (/_astro/portrait.xxx.webp), and `new URL(og.src, Astro.site)` produced https://yourikaramyan.com/_astro/….webp.
SRC: https://docs.astro.build/en/reference/modules/astro-assets/#getimage ; local test build
```
---
import { getImage } from "astro:assets";
import portrait from "../assets/portrait.jpg";
const og = await getImage({ src: portrait, format: "jpg", width: 1200 });
---
<meta property="og:image" content={new URL(og.src, Astro.site)} />
```

### F23 [verified-in-docs]
Sharp is the default image service. astro@7.4.1 declares `sharp: ^0.35.4` as an optionalDependency, and `npm install` placed sharp 0.35.5 (engines node >= 20.9.0). A package-lock.json created on Windows with npm 11.13 includes @img/sharp-linux-x64 and @img/sharp-libvips-linux-x64, so `npm ci` on Netlify gets the Linux binary. The docs say a manual `pnpm add sharp` is needed only with strict package managers. Otherwise Astro throws MissingSharp ('Could not find Sharp…'). astro@7.4.1 itself requires Node >= 22.22.0.
SRC: https://docs.astro.build/en/guides/images/#default-image-service ; npm view astro@7.4.1 optionalDependencies engines ; local install + package-lock.json ; astro dist/core/errors/errors-data.js MissingSharp
```
pnpm add sharp   // only needed for strict package managers
```

### F24 [inferred]
CLS rules from web.dev:
- A shift is recorded when a visible element changes its start position.
- An element changing size does not count unless it moves other visible elements.
- CSS transforms animate without causing layout shifts.
- Shifts within 500 ms of user input get hadRecentInput.
- Good CLS is 0.1 or less.

What this means for the hero: a left-aligned h1 whose height is fixed (a set number of lines and a unitless line-height) can animate font-variation-settings without moving the content below. Centered text, or letters split into inline spans, change their start positions as widths change.
SRC: https://web.dev/articles/cls
```
.hero-name { font-family: var(--font-display); line-height: .95; white-space: nowrap; font-size: clamp(2.5rem, 12vw, 7rem); font-variation-settings: 'wght' 800, 'wdth' 100; }
.hero-name > span { display: block; } /* one line per word => constant height */
```

### F25 [inferred]
LCP rules from web.dev:
- Chromium excludes elements with opacity 0.
- Text still in the font block period does not count as rendered.
- Changes to an element's size or position do not create a new LCP candidate.

So with font-display: swap, the hero text's LCP is its first paint in the fallback font, and the later swap to Bricolage should not add a later entry (inferred).
SRC: https://web.dev/articles/lcp

### F26 [verified-in-docs]
The Astro 7 default `compressHTML: 'jsx'` strips whitespace between inline elements, and I reproduced it: `<span>Youri</span>` followed by a newline and `<span>Karamyan</span>` built as `<span>Youri</span><span>Karamyan</span>`. Use {" "} between them, or set compressHTML: true.
SRC: https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-whitespace-handling-compresshtml-jsx ; local test build
```
<span>Youri</span>{" "}<span>Karamyan</span>
```
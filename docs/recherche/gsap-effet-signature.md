# GSAP 3.15.0 for the variable-font hero name, lens, counter and zero layout shift (Astro 7 static site): reviewed and corrected

## Summary

Use only the GSAP core (`import { gsap } from "gsap"`). Re-measured today: 28.3 KB gzip, 25.5 KB brotli. Skip ScrollTrigger (+18.0 KB gzip) and SplitText (+3.2 KB gzip). npm `latest` is gsap 3.15.0, which ships every plugin under Webflow's Standard 'No Charge' license, commercial use included. Animate registered custom properties `--wght` and `--wdth` through `font-variation-settings` with opsz pinned at 96, snap the values, and give each letter a build-time inline-block box at its kerned final-state width. All of this held up in testing: kerned widths, opsz drift, axis defaults and the missing U+202F glyph were confirmed in Chromium and with fontkit. The review found four real defects in the notes, each fixed and re-tested in Playwright. (1) The 'CLS 0' claim only holds once the web font is cached. When the font arrives late under font-display: swap, the glyph text nodes move about 10 px vertically at the swap. That records one layout-shift entry (CLS 0.0012 desktop, 0.0008 mobile), even though the content below does not move. A metric-matched fallback @font-face (ascent-override 93%, descent-override 27%, line-gap-override 0%) brings it back to 0 entries. (2) gsap.quickSetter writes are not recorded by gsap.context or matchMedia, so the scroll-lens cleanup must clear its own inline --wght/--wdth. (3) Toggling reduced motion during the intro left `introDone` pending forever, so the lens never restarted. The intro handler must resolve it in its cleanup. (4) The counter displayed the server-rendered final value, then jumped to 0 when it came into view; reset it to 0 at init. In Astro 7, `compressHTML` now defaults to 'jsx', which strips whitespace between elements (the char spans benefit). Bundled `<script>` and `is:inline` behave as in Astro 5 and 6, and ClientRouter/astro:page-load are unchanged. The fixed prototype is at C:\Users\youri\AppData\Local\Temp\claude\c--Users-youri-OneDrive-Documents-yourikaramyan-site-yourikaramyan-site\5a797359-679b-4d2c-b904-f5e930642034\scratchpad\review-gsap\site\hero.js; the fallback-font test page is hero-fb.html in that same folder.

## Corrections
- ORIGINAL: With fixed boxes the full prototype (intro, mouse lens, scroll lens) recorded zero entries. / Fixed em boxes, nowrap lines and a fixed line-height give CLS 0.
  FIX: That holds only once the web font is already available. With the font delayed 1.8 s under font-display: swap, the same page records 1 layout-shift entry: CLS 0.0012 at 1280x800, 0.0008 at 390x844, also with reduced motion. The sources are glyph text nodes moving about 10 px vertically at the swap; the content below does not move. Adding a metric-matched fallback @font-face (src local('Arial'); ascent-override 93%; descent-override 27%; line-gap-override 0%, from the font's typo metrics with USE_TYPO_METRICS set) brings it to 0 entries.
  SRC: Playwright Chromium tests in this review (route-delayed font, layout-shift entry sources); fontkit OS/2 and hhea of the v9 woff2; scratchpad/review-gsap/site/hero-fb.html
- ORIGINAL: Switching to reduced motion at runtime reverts everything to the CSS rest state (tested). / Revert removes the inline styles GSAP set.
  FIX: gsap.quickSetter writes are not recorded by gsap.context or matchMedia: the 3.15 source has no context hook in quickSetter. On touch emulation, after the scroll lens ran and reduced motion was enabled, inline --wght/--wdth values stayed on the letters. They only happened to be 800/100, the rest values. The scroll-lens cleanup must call lensTo.tween.kill() and el.style.removeProperty('--wght' and '--wdth'). Tested: inline styles cleared.
  SRC: node_modules/gsap/gsap-core.js quickSetter (line ~4144); Playwright test in this review
- ORIGINAL: Full client script ... introDone = new Promise((resolve) => tween.eventCallback("onComplete", resolve));
  FIX: If reduced motion turns on during the intro, the intro tween is reverted before onComplete and introDone never settles. When motion is re-enabled, the intro handler returns early (the class is gone) and the lens waits forever. Tested: no letter reacted to the cursor. Fix: keep the resolver and return () => finish() from the intro handler. Tested: the lens works after the toggle.
  SRC: Playwright test in this review (toggle reduce at 400 ms, back at 800 ms)
- ORIGINAL: Counter: ... Under reduced motion, skip it and keep the server-rendered final value. (Script animates from 0 when 60% visible.)
  FIX: As written, a counter that becomes partly visible shows the server-rendered '1 700', then jumps to 0 when the 0.6 threshold fires, then counts up. Reset the visible value to format(0) at script init when motion is allowed. No-JS and reduced-motion users still see the final value.
  SRC: Review of the snippet's IntersectionObserver timing
- ORIGINAL: const format = (n) => fmt.format(n).replace(/ /g, " ");
  FIX: Use explicit escapes: .replace(/ /g, " "). Invisible literal characters are easily lost in copy and paste, which would leave U+202F in place and render it from the fallback font.
  SRC: node -e (fr-BE 1700 gives 31 202f 37 30 30); fontkit hasGlyphForCodePoint(0x202F) false
- ORIGINAL: ctx.add("start", () => {...}); introDone.then(() => alive && ctx.start());
  FIX: This works at runtime, but ctx.start is not in the TypeScript Context type, so astro check flags it in an Astro <script>, which is TypeScript. Context.add returns the wrapped function (typed Function): const start = ctx.add('start', fn); then call start(). Also type the queries: querySelectorAll<HTMLElement>('.char').
  SRC: node_modules/gsap/gsap-core.js Context.add (returns name ? self[name] = f : f); types/gsap-core.d.ts add(methodName, func, scope): Function
- ORIGINAL: It reads its start value when created, so create it after the intro finishes.
  FIX: The docs say quickTo 'will start from whatever the CURRENT value is inside the tween at its current progress', and each call restarts the tween toward the new value. Create it after the intro anyway: with the default overwrite: false, the intro tween and the quickTo tween would both render the same property.
  SRC: https://gsap.com/docs/v3/GSAP/gsap.quickTo()
- ORIGINAL: gsap.matchMedia() ... reverts then re-runs whenever any condition toggles. Return a cleanup function only for custom work.
  FIX: The docs say the returned cleanup is 'called when none of the conditions match anymore (after having matched)'. In testing it runs on every revert, including a toggle of one condition while another still matches (reduced motion on, pointer still fine: the lens stopped). Don't rely on the narrower docs wording, and write the cleanups to be idempotent. gsap.matchMediaRefresh() also exists to force a revert and re-run.
  SRC: https://gsap.com/docs/v3/GSAP/gsap.matchMedia(); Playwright test in this review
- ORIGINAL: Generate the char spans with map(): any whitespace between inline-block spans would render as visible gaps (no mention of Astro 7 behavior).
  FIX: Astro 7 changed the compressHTML default from true to 'jsx'. Whitespace and line breaks around elements are stripped as in React, a space between two inline elements on one line is kept, and an explicit space needs {" "}. map() without spaces remains correct. Astro 7's Rust compiler is also stricter about invalid HTML.
  SRC: https://docs.astro.build/en/guides/upgrade-to/v7/ ; https://docs.astro.build/en/reference/configuration-reference/#compresshtml
- ORIGINAL: ignoreMobileResize: on touch-only devices it is already TRUE by default in 3.15 (cited as verified-in-docs).
  FIX: Correct, but the docs page does not state a default; only the source shows it (_ignoreMobileResize = Observer.isTouch === 1). The exact rule: refresh is skipped when the width is unchanged and the height change is at most 25% of innerHeight.
  SRC: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config() ; node_modules/gsap/ScrollTrigger.js lines 397 and 2038

## Pitfalls
- Do not tween or quickTo the fontVariationSettings string. quickTo silently ignores it, and resetTo only updates the first number of a complex string. Use --wght and --wdth.
- Decimal axis values force new font instances. Snap wght to steps of 10 and wdth to steps of 2.5, and skip writes when a value has not changed.
- Never put a CSS transition on --wght or --wdth.
- matchMedia and context revert remove the inline styles of recorded TWEENS only. gsap.quickSetter writes are never recorded (3.15 source), so the scroll-lens cleanup must kill its quickTo and call el.style.removeProperty('--wght' and '--wdth'). Tested: without this, inline values were left on the letters.
- If the intro context is reverted before onComplete (for example, reduced motion turned on mid-intro), a promise resolved only in onComplete never settles, and the lens never restarts. Resolve it in the intro handler's cleanup as well. Tested.
- The matchMedia docs say the cleanup runs 'when none of the conditions match anymore', but it actually runs on every revert, including when one condition toggles and another still matches. Write the cleanups to be idempotent.
- Fixed letter boxes do not stop font-swap shifts. With font-display: swap and a late font, glyph text nodes move about 10 px vertically when the fallback and web font metrics differ: 1 layout-shift entry, CLS about 0.001. Add a metric-matched fallback @font-face (ascent-override 93%, descent-override 27%, line-gap-override 0%). Tested: 0 entries.
- local('Arial') is missing on Android, so add more local() names (Helvetica, Roboto) or generate the fallback with a tool. Safari support for the *-override descriptors is uncertain, but CLS is only measured in Chromium.
- font-optical-sizing: auto ties opsz to the font size and changes widths by up to 12%. Pin "opsz" 96.
- Splitting loses kerning (a lone Y measures 0.595em against its 0.506em kerned box). Use the kerned advances as box widths, and recompute them for another font build or letter-spacing.
- text-align inherits into inline-block letters. If the hero is centered, the glyphs center inside their boxes. Set text-align: start on .char explicitly.
- The pointer lens computes centers with offsetLeft and offsetTop. .hero-name must stay position: relative so it is the offsetParent that getBoundingClientRect() refers to.
- Pointer and scroll interactions are not 'recent input', so any lens-driven shift counts toward CLS.
- Do not hide the headline (opacity 0 or visibility hidden) while fonts load: it delays LCP.
- In Astro scoped styles, write :global(html.hero-intro) .char. The class-setting head script must be is:inline, because processed scripts are deferred modules.
- Astro 7 defaults compressHTML to 'jsx'. Whitespace around elements is stripped, but a space between two inline elements on the same line is kept. Generate the char spans with map() and no spaces, and use {" "} where a visible space is needed. Astro 7's Rust compiler is stricter about invalid HTML.
- Astro scripts are TypeScript. querySelectorAll('.char') yields Element, which lacks dataset and offsetLeft, so astro check flags it. Use querySelectorAll<HTMLElement>. ctx.start() is not in the Context type: use the function returned by ctx.add('start', fn). Use ctx.conditions ?? {}.
- Create quickTo functions after the intro completes. With overwrite: false, an intro tween and a quickTo on the same property would both render it.
- Animations created later in callbacks are recorded in the matchMedia context only through context.add('name', fn).
- SplitText autoSplit only acts when splitting 'lines' (3.15 source), despite broader docs wording. The documented console.warn for splitting before fonts load is not in the 3.15 source.
- SplitText aria:'auto' puts aria-label on the split element. That is fine on an h1, but aria-label on a generic span or div is prohibited by ARIA. Screen-reader-only text plus an aria-hidden visual copy is more robust.
- Intl.NumberFormat('fr-BE') uses U+202F, which Bricolage Grotesque lacks. Replace it with U+00A0 using explicit escapes (/ /g, " "), both server-side and client-side. Pasted invisible characters can silently become normal spaces.
- A counter that is server-rendered at its final value and animated from 0 visibly jumps 1 700 → 0 → 1 700. Reset the visible value to 0 at script init when motion is allowed, and keep the ghost copy for the width.
- Do not use 100dvh for a hero whose height drives the scroll mapping. Use svh or lvh. ScrollTrigger already ignores small vertical resizes on touch-only devices.
- ScrollTrigger.normalizeScroll() is experimental scroll-jacking. Do not use it for this effect.
- On hybrid devices, ignore pointermove events with pointerType 'touch' in the mouse lens, and use '(hover: hover) and (pointer: fine)'.
- @property needs Firefox 128+ and Safari 16.4+. Keep the var(--wght, 800) fallbacks.
- Scratchpad note: the original prototype is in scratchpad/gsap-research-test. The review copy with the fixes and the fallback-font test page is in C:\Users\youri\AppData\Local\Temp\claude\c--Users-youri-OneDrive-Documents-yourikaramyan-site-yourikaramyan-site\5a797359-679b-4d2c-b904-f5e930642034\scratchpad\review-gsap. No project files were touched.

## Open questions
- Lens direction: the rest state is wght 800 / wdth 100, the maximum of both axes, so the lens can only make letters lighter and narrower near the cursor. For bolder-near-cursor, the rest state must be lighter; the boxes stay reserved at 800/100.
- Which Bricolage Grotesque file will be self-hosted? The widths and the 93%/27% fallback overrides come from the Google Fonts v9 latin woff2. Any other build (Fontsource, a GitHub release, a subset or instance) needs both recomputed.
- Should the Astro Fonts API be used instead of hand-written @font-face? It is a top-level `fonts` config with local and Fontsource providers, and `optimizedFallbacks` defaults to true, generating metric-matched fallbacks. Not verified: whether it emits font-stretch 75% 100% for the wdth axis and how its fallback handles Android.
- Subset or instance the 131.5 KB hero font (for example, pin opsz 96)? This is the biggest Lighthouse lever left.
- Will the site use Astro <ClientRouter />? If so, move initialisation to astro:page-load and cleanup to astro:before-swap, and decide whether the intro replays on client-side navigation. The is:inline head script that sets html.hero-intro would not re-run without data-astro-rerun.
- CSS scroll-driven animations (animation-timeline) as a zero-JS touch lens: web reports conflict. One June 2026 article says Firefox stable still keeps it behind layout.css.scroll-driven-animations.enabled; another claims cross-browser support by May 2026. Check MDN compat data before relying on it.
- Does Lighthouse mobile emulation match (hover: none)/(pointer: coarse), so the scroll-lens path runs during audits? No Lighthouse documentation was found; verify with a real run.
- Exact Safari (2026) support for ascent-override, descent-override and line-gap-override is not verified.

## Facts

### F1 [verified-in-docs]
Install and import from the public npm package. npm view today: version 3.15.0, dist-tag latest 3.15.0, last modified 2026-04-13. Plugins import from their subpath; package.json 'exports' maps './*' to the ESM files. package.json declares "sideEffects": false. The Installation FAQ says to register plugins explicitly because tree shaking can remove them. Types ship in the package. types/index.d.ts references split-text.d.ts and scroll-trigger.d.ts, which declare module 'gsap/SplitText' and 'gsap/ScrollTrigger'.
SRC: https://gsap.com/docs/v3/Installation/ (FAQ: tree shaking, registerPlugin; 'all the plugins are now freely available on npm'; 'The private NPM repository is no longer maintained') ; node_modules/gsap/package.json 3.15.0 ; npm view gsap
```
npm install gsap@3.15.0

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // only if really used
import { SplitText } from "gsap/SplitText";       // only if really used
gsap.registerPlugin(ScrollTrigger, SplitText);
```

### F2 [verified-in-docs]
In 3.15.0 every plugin ships in the public npm package, each with a dist/*.min.js. That includes ScrollTrigger, SplitText, ScrollSmoother, MorphSVGPlugin, DrawSVGPlugin, Flip, InertiaPlugin and the rest. The npm license field reads: "Standard 'no charge' license: https://gsap.com/standard-license."
SRC: npm view gsap ; package file listing of node_modules/gsap 3.15.0 ; README.md

### F3 [verified-in-docs]
License summary: the 'Standard "No Charge" GSAP License' is granted by Webflow, effective April 30, 2025 (page last modified May 30, 2025). It is a non-exclusive worldwide license for use on 'any website, web application, or digital interface'. The FAQ says commercial use is free and that AI-generated code is not a Prohibited Use. Prohibited uses:
- using GSAP in tools that let users build visual animations without code, competing with Webflow's visual animation builder;
- reverse engineering GSAP to build Competitive Products;
- removing or altering proprietary notices or branding.
The license requires no attribution. Webflow may terminate it at its discretion on non-compliance, after which all copies must be destroyed. It is not an OSI open-source license. A personal CV site is clearly allowed.
SRC: https://gsap.com/standard-license ; https://gsap.com/licensing/

### F4 [inferred]
Bundle sizes, re-measured in this review. Bytes are from esbuild --minify ESM bundles with gzip -9 and Node brotli; 1 KB = 1000 B.
- core + CSSPlugin: 71,658 B minified, 28,315 B gzip, 25,529 B brotli.
- + ScrollTrigger: 46,276 B gzip (+18.0 KB, about +64%).
- + SplitText only: 31,468 B gzip (+3.2 KB).
- core + ScrollTrigger + SplitText: 124,195 B minified, 49,360 B gzip, 44,161 B brotli.
- gsap-core without CSSPlugin: 20,646 B gzip. It cannot tween DOM CSS variables.
Standalone dist files at gzip -9: gsap.min.js 28,268 B, ScrollTrigger.min.js 17,998 B, SplitText.min.js 3,658 B.
SRC: Local re-measurement of scratchpad/bundle-test out-a..e.js and node_modules/gsap/dist (gsap 3.15.0)

### F5 [inferred]
Tween CSS custom properties, not the fontVariationSettings string. quickTo is 'an optimized function tied to one particular numeric property' (docs). The earlier local test found that quickTo on fontVariationSettings silently did nothing; resetTo only updates the first numeric value of a complex string (gsap-core.js comment). quickTo and quickSetter on '--wght' work. This review confirmed in Chromium that quickTo with snap on '--wght' and '--wdth' produced stepped values such as 660, 97.5 and 77.5.
SRC: https://gsap.com/docs/v3/GSAP/gsap.quickTo() ; node_modules/gsap/gsap-core.js ; Playwright re-test in scratchpad/review-gsap
```
const toW = gsap.quickTo(el, "--wght", { duration: 0.45, ease: "power3", snap: { "--wght": 10 } });
toW(400);
const setW = gsap.quickSetter(el, "--wght"); setW(320);
```

### F6 [verified-in-docs]
Register the variables with @property. The initial values are the final rest state (800/100), so any context revert falls back to it. Keep var() fallbacks and pin opsz. MDN: font-variation-settings 'will always override' the basic properties, but 'In some browsers, this is currently only true when the @font-face declaration includes a font-weight range'. Google's CSS for this font (fetched today) declares font-weight: 200 800 and font-stretch: 75% 100%, with the v9 latin URL 3y996as8bTXq_nANBjzKo3IeZx8z6up5L-iNGQ.woff2.
SRC: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings ; https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800
```
@font-face { font-family: "Bricolage Grotesque"; src: url(/fonts/bricolage.woff2) format("woff2"); font-weight: 200 800; font-stretch: 75% 100%; font-display: swap; }
@property --wght { syntax: "<number>"; inherits: false; initial-value: 800; }
@property --wdth { syntax: "<number>"; inherits: false; initial-value: 100; }
.char { display: inline-block; width: var(--w); text-align: start;
  font-variation-settings: "opsz" 96, "wght" var(--wght, 800), "wdth" var(--wdth, 100); }
```

### F7 [inferred]
Performance, measured by the original author in headless Chromium for 13 letters (style + layout only):
- decimal axis values: about 1.2 to 1.7 ms per update;
- snapped (wght steps of 10, wdth steps of 2.5): about 0.2 to 0.6 ms;
- random decimals on every letter: about 15 to 16 ms.
contain: layout gave no gain. Snap all axis values and skip writes when a value has not changed. This review did not re-run the benchmark.
SRC: Original local Playwright benchmark (scratchpad gsap-research-test); not re-run
```
snap: { "--wght": 10, "--wdth": 2.5 }
```

### F8 [inferred]
Font facts for Bricolage Grotesque (Google Fonts v9 latin woff2, 131,548 bytes), re-verified:
- fvar axes: opsz 12–96 (default 96), wght 200–800 (default 800), wdth 75–100 (default 100). The default instance is the final state.
- Vertical metrics: UPM 1000; typo/hhea ascender 930, descender -270, lineGap 0; USE_TYPO_METRICS set; winAscent 1160, winDescent 400.
- 'Karamyan' at 800/100 measures 4.5841em at opsz 96, 4.900em at opsz 48 and 5.1391em at opsz 12 in Chromium, so opsz changes the widths by up to 12%. Pin "opsz" 96.
SRC: fontkit on scratchpad/review-gsap/site/bricolage.woff2 ; Playwright Chromium measurement

### F9 [inferred]
Kerned per-letter box widths in em at 800/100/96. Re-verified in Chromium: the unsplit 'Youri' measures 2.2641em and 'Karamyan' 4.5841em, both equal to the sums of the boxes. A lone 'Y' measures 0.595em, against its kerned box of 0.506em. Recompute the widths for another font build, or if letter-spacing is added.
SRC: Playwright Chromium re-measurement in this review; original fontkit GPOS layout
```
Youri:    Y 0.506, o 0.567, u 0.557, r 0.400, i 0.234   (sum 2.264em)
Karamyan: K 0.611, a 0.543, r 0.383, a 0.543, m 0.860, y 0.539, a 0.543, n 0.562   (sum 4.584em)
```

### F10 [verified-in-docs]
Layout-shift rules (Layout Instability explainer):
- Shifting nodes are elements (box fragments) and text nodes (line boxes).
- A node that changes size but 'starts at the same offset, is not a shifting node'.
- Transform changes do not count.
- 'Events caused by pointer movement or scrolling do not count as input'. Only taps, key presses and clicks set hadRecentInput, for 500 ms.
So a mouse lens or scroll lens must never move a letter's starting point.
SRC: https://github.com/WICG/layout-instability/blob/main/README.md

### F11 [inferred]
Space-reservation results:
- Natural inline-block letters: CLS 0.0016 to 0.0027 during the intro (original test).
- Fixed em boxes with start-aligned glyphs: 0 entries for the intro, the mouse lens and the touch scroll lens, with the font already loaded. Re-confirmed here at 1280x800 and on 390x844 touch.
CORRECTION: with the web font delayed 1.8 s under font-display: swap, the same page records 1 layout-shift entry: CLS 0.0012 at 1280x800, 0.0008 at 390x844, also with reduced motion. The sources are glyph text nodes ('m', 'K', 'n', 'Y', 'y') whose y moved about 10 px at the swap, because the fallback font has different ascent/descent. The paragraph below kept the same y. So fixed boxes remove the animation's shifts but not font-swap shifts.
Options compared:
- Hidden duplicate in the final state: reserves the outer box only.
- Runtime measurement: needs the font loaded and causes a jump.
- Absolute or transform layouts: more complex for no gain.
Recommended: build-time fixed em widths plus a metric-matched fallback font.
SRC: Playwright Chromium tests in this review (route-delayed font; layout-shift entry sources) on scratchpad/review-gsap/site/hero.html
```
.hero { container-type: inline-size; }
.hero-name { position: relative; margin: 0; font-family: "Bricolage Grotesque", "Bricolage Fallback", system-ui, sans-serif; font-weight: 800; line-height: .95; font-size: min(calc(100cqi / 4.7), 9rem); }
.hero-name__line { display: block; white-space: nowrap; }
.char { display: inline-block; width: var(--w); text-align: start; }
```

### F12 [inferred]
A metric-matched fallback @font-face removes the font-swap shift. The values are the font's typo metrics divided by the UPM. Tested in Chromium with the font delayed 1.8 s: 0 layout-shift entries on desktop, on mobile touch and with reduced motion, against 1 entry without it. size-adjust is not needed, because the boxes are fixed widths. local('Arial') exists on Windows and macOS but not on Android, so add more local() names. Safari support for the *-override descriptors is uncertain, but CLS is only measured by Chromium (Lighthouse, CrUX).
SRC: fontkit OS/2 + hhea of the v9 woff2 ; Playwright test of scratchpad/review-gsap/site/hero-fb.html
```
@font-face {
  font-family: "Bricolage Fallback";
  src: local("Arial"), local("Helvetica"), local("Roboto");
  ascent-override: 93%; descent-override: 27%; line-gap-override: 0%;
}
```

### F13 [verified-in-docs]
Astro component with a build-time split:
- Each letter's em width and normalized center x (used for the stagger and the scroll lens) are computed in the frontmatter.
- The accessible name comes from screen-reader-only text; the visual letters are aria-hidden.
- Generate the char spans with map().
Astro 7 defaults compressHTML to 'jsx'. It strips whitespace and line breaks around elements as React does, but keeps a space between two inline elements on the same line; use {" "} where a space is wanted. Astro 7 also uses a Rust compiler that is stricter about invalid HTML.
SRC: https://docs.astro.build/en/guides/upgrade-to/v7/ (New default whitespace handling: compressHTML 'jsx'; Rust compiler) ; https://docs.astro.build/en/reference/configuration-reference/#compresshtml
```
---
// HeroName.astro
const LINES = [
  { text: "Youri", w: [0.506, 0.567, 0.557, 0.4, 0.234] },
  { text: "Karamyan", w: [0.611, 0.543, 0.383, 0.543, 0.86, 0.539, 0.543, 0.562] },
];
const maxW = Math.max(...LINES.map((l) => l.w.reduce((a, b) => a + b, 0)));
const lines = LINES.map(({ text, w }) => {
  let x = 0;
  return [...text].map((ch, i) => { const c = x + w[i] / 2; x += w[i]; return { ch, w: w[i], x: +(c / maxW).toFixed(4) }; });
});
---
<h1 class="hero-name" data-hero-name>
  <span class="sr-only">Youri Karamyan</span>
  <span aria-hidden="true">{lines.map((line) => (<span class="hero-name__line">{line.map((c) => <span class="char" style={`--w:${c.w}em`} data-x={c.x}>{c.ch}</span>)}</span>))}</span>
</h1>
<style>
  /* rules from the CSS facts; put @font-face and @property in a global stylesheet */
  :global(html.hero-intro) .char { --wght: 200; --wdth: 75; }
</style>
```

### F14 [verified-in-docs]
Thin start state without a flash and without hiding the LCP text. An is:inline script in <head> adds html.hero-intro only when motion is allowed, with a 4 s failsafe. Processed Astro scripts are bundled type=module scripts and run deferred, so this one must be is:inline. Never use opacity: 0. The stylesheet default stays at the final state (800/100).
SRC: https://docs.astro.build/en/guides/client-side-scripts/ (Script processing; is:inline opts out)
```
<script is:inline>
  if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    document.documentElement.classList.add("hero-intro");
    setTimeout(() => document.documentElement.classList.remove("hero-intro"), 4000);
  }
</script>
```

### F15 [inferred]
Corrected client script for the processed <script> in HeroName.astro, typed for astro check, with three fixes:
(a) the intro handler resolves introDone in its cleanup, so a reduced-motion toggle mid-intro no longer blocks the lens forever (tested: before the fix the lens never restarted; after it, it works);
(b) the scroll-lens cleanup kills its quickTo and removes the inline --wght/--wdth written by quickSetter, which no context records (tested: inline styles cleared);
(c) the start function comes from the return value of ctx.add, typed Function, instead of ctx.start, which is not in the Context type.
Tested in Playwright Chromium with CLS 0 (font cached): desktop mouse, 390x844 isMobile+hasTouch, reduced motion toggled mid-intro and after the intro.
SRC: Patched copy tested in Playwright: scratchpad/review-gsap/site/hero.js ; gsap-core.js Context.add (returns the wrapped function) and quickSetter (no context hook)
```
import { gsap } from "gsap";

const REST = { w: 800, d: 100 }, MIN = { w: 200, d: 75 };
const snapW = gsap.utils.snap(10), snapD = gsap.utils.snap(2.5);
const strength = (dist: number, radius: number) => { const t = Math.max(0, 1 - dist / radius); return t * t * (3 - 2 * t); };

const root = document.querySelector<HTMLElement>("[data-hero-name]");
if (root) init(root);

function init(root: HTMLElement) {
  const chars = Array.from(root.querySelectorAll<HTMLElement>(".char"));
  const html = document.documentElement;
  const fontReady = Promise.race([
    document.fonts.load('800 1em "Bricolage Grotesque"'),
    new Promise((r) => setTimeout(r, 2500)),
  ]);
  const mm = gsap.matchMedia();
  let introDone: Promise<unknown> = Promise.resolve();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (!html.classList.contains("hero-intro")) return; // failsafe fired or already played
    const tween = gsap.fromTo(chars,
      { "--wght": MIN.w, "--wdth": MIN.d },
      { "--wght": REST.w, "--wdth": REST.d, duration: 0.9, ease: "power2.inOut",
        snap: { "--wght": 10, "--wdth": 2.5 },
        stagger: (i: number, el: HTMLElement) => Number(el.dataset.x) * 0.6, paused: true });
    html.classList.remove("hero-intro"); // fromTo (immediateRender) already wrote 200/75 inline
    let finish: (v?: unknown) => void = () => {};
    introDone = new Promise((resolve) => (finish = resolve));
    tween.eventCallback("onComplete", finish);
    fontReady.then(() => tween.play());
    return () => finish(); // FIX: reverted mid-intro -> never leave the lens waiting
  });

  mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
    const { motion, fine } = ctx.conditions ?? {};
    if (!motion) return;
    let alive = true, stop = () => {};
    const start = ctx.add("start", () => { stop = fine ? pointerLens(root, chars) : scrollLens(root, chars); });
    introDone.then(() => alive && start());
    return () => { alive = false; stop(); };
  });
}

function pointerLens(root: HTMLElement, chars: HTMLElement[]) {
  const set = chars.map((el) => ({
    w: gsap.quickTo(el, "--wght", { duration: 0.45, ease: "power3", snap: { "--wght": 10 } }),
    d: gsap.quickTo(el, "--wdth", { duration: 0.45, ease: "power3", snap: { "--wdth": 2.5 } }),
    k: 0,
  }));
  let centers: { x: number; y: number }[] = [], fontPx = 16, px = -1e5, py = -1e5;
  const measure = () => {
    fontPx = parseFloat(getComputedStyle(root).fontSize);
    centers = chars.map((el) => ({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 })); // needs .hero-name { position: relative }
  };
  const ro = new ResizeObserver(measure); ro.observe(root); measure();
  const onMove = (e: PointerEvent) => { if (e.pointerType !== "touch") { px = e.clientX; py = e.clientY; } };
  const onOut = (e: MouseEvent) => { if (!e.relatedTarget) px = py = -1e5; };
  const tick = () => {
    const r = root.getBoundingClientRect(), R = fontPx * 1.4;
    centers.forEach((c, i) => {
      const k = Math.round(strength(Math.hypot(r.left + c.x - px, r.top + c.y - py), R) * 100) / 100;
      const s = set[i];
      if (k === s.k) return;
      s.k = k; s.w(REST.w - (REST.w - MIN.w) * k); s.d(REST.d - (REST.d - MIN.d) * k);
    });
  };
  addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("mouseout", onOut);
  gsap.ticker.add(tick, false, true); // prioritize: before GSAP renders this frame
  return () => { removeEventListener("pointermove", onMove); document.removeEventListener("mouseout", onOut); gsap.ticker.remove(tick); ro.disconnect(); };
}

function scrollLens(root: HTMLElement, chars: HTMLElement[]) {
  const hero = root.closest<HTMLElement>("[data-hero]") || root;
  const xs = chars.map((el) => Number(el.dataset.x));
  const setW = chars.map((el) => gsap.quickSetter(el, "--wght"));
  const setD = chars.map((el) => gsap.quickSetter(el, "--wdth"));
  const last = chars.map(() => "");
  const lens = { x: -0.4 };
  const draw = () => xs.forEach((x, i) => {
    const k = strength(Math.abs(x - lens.x), 0.22);
    const w = snapW(REST.w - (REST.w - MIN.w) * k), d = snapD(REST.d - (REST.d - MIN.d) * k), key = w + "/" + d;
    if (key === last[i]) return;
    last[i] = key; setW[i](w); setD[i](d);
  });
  const lensTo = gsap.quickTo(lens, "x", { duration: 0.35, ease: "power2.out", onUpdate: draw });
  let top = 0, height = 1, lastP = -1;
  const onScroll = () => {
    const p = gsap.utils.clamp(0, 1, (scrollY - top) / height);
    if (p === lastP) return; lastP = p;
    lensTo(gsap.utils.mapRange(0, 1, -0.4, 1.4, p));
  };
  const measure = () => { top = hero.getBoundingClientRect().top + scrollY; height = Math.max(1, hero.offsetHeight); lastP = -1; onScroll(); };
  const ro = new ResizeObserver(measure); ro.observe(hero); measure();
  addEventListener("scroll", onScroll, { passive: true });
  return () => {
    removeEventListener("scroll", onScroll); ro.disconnect();
    lensTo.tween.kill(); // FIX: no late onUpdate after cleanup
    chars.forEach((el) => { el.style.removeProperty("--wght"); el.style.removeProperty("--wdth"); }); // FIX: quickSetter writes are not reverted by the context
  };
}
```

### F16 [verified-in-docs]
gsap.quickTo returns a function that 'basically restarts the animation, redirecting it to that new value' on each call. An optional numeric start goes in as the second parameter; the source also accepts a third, startIsRelative. It skips unit conversion, relative values, function-based values and alias conversion ('x' works, 'translateX' does not). It handles one numeric property. The function has a .tween property, a regular Tween usable except for delay(). By default it 'will start from whatever the CURRENT value is inside the tween at its current progress'. Create it only after the intro ends: the default overwrite is false, so an intro tween and a quickTo on the same property would both render it.
SRC: https://gsap.com/docs/v3/GSAP/gsap.quickTo() ; gsap-core.js quickTo source
```
let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" });
container.addEventListener("mousemove", (e) => xTo(e.pageX));
```

### F17 [verified-in-docs]
gsap.quickSetter(target, property, unit?) returns an optimized setter. The docs claim 'you can boost performance 50% - 250%' over gsap.set(), but 'in most cases you'd never notice a real-world performance difference'. 'css' as the property accepts an object, with less boost. The docs point to quickTo for animated values. In the 3.15 source, quickSetter writes directly through the plugin or cache setter and is NOT recorded by gsap.context or matchMedia. A revert does not undo its writes, so clean them up yourself.
SRC: https://gsap.com/docs/v3/GSAP/gsap.quickSetter() ; node_modules/gsap/gsap-core.js quickSetter (line ~4144)
```
const xSet = gsap.utils.pipe(gsap.utils.clamp(0, 100), gsap.utils.snap(5), gsap.quickSetter("#id", "x", "px"));
```

### F18 [verified-in-docs]
gsap.ticker.add(callback, once, prioritize) passes callback(time, deltaTime, frame). With prioritize, 'the callback will be added to the top of the queue', so it runs before GSAP's global timeline in the same tick. lagSmoothing is on by default (threshold 500 ms, adjustedLag 33 ms); fps(n) caps the frame rate; deltaRatio(fps = 60). For throttling, store the pointer coordinates in the event and do the work in the ticker; scroll events fire at most once per frame. No extra rAF throttle is needed.
SRC: https://gsap.com/docs/v3/GSAP/gsap.ticker
```
gsap.ticker.add(tick, false, true);
// later: gsap.ticker.remove(tick);
```

### F19 [verified-in-docs]
gsap.matchMedia() conditions syntax:
- 'the function will get called when any of those conditions match'; context.conditions holds a boolean per condition.
- 'It will revert and run the handler function again if/when any of the conditions toggle.'
- An optional returned cleanup function must not call context.revert(). The docs say it is called 'when none of the conditions match anymore', but in testing it runs on EVERY revert, including when one condition toggles and another still matches (the pointer lens stopped after only reduced motion toggled).
- mm.add(query, fn, scope) scopes selector text; mm.revert() reverts all.
- For work created later (event handlers, promises), use context.add('name', fn), which returns the wrapped function.
- gsap.matchMediaRefresh() forces all handlers to revert and re-run.
Keep the intro and the lens in separate mm.add calls.
SRC: https://gsap.com/docs/v3/GSAP/gsap.matchMedia() ; https://gsap.com/docs/v3/GSAP/gsap.context() ; gsap-core.js Context.add ; Playwright test in this review
```
const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
  const { motion, fine } = ctx.conditions ?? {};
  const start = ctx.add("start", () => { /* tweens created here are recorded */ });
  return () => { /* custom cleanup only */ };
});
```

### F20 [inferred]
A function-based stagger takes (index, target, targets) (types: FunctionBasedValue) and returns a delay. It works with CSS-variable tweens and fromTo; the total duration is 0.9 s plus the largest delay. Use it instead of grid:'auto', which assumes equal columns per row (5 letters against 8 here). fromTo renders its start values immediately even when paused (immediateRender).
SRC: node_modules/gsap/types/gsap-core.d.ts (FunctionBasedValue) ; Playwright test
```
stagger: (i: number, el: HTMLElement) => Number(el.dataset.x) * 0.6
```

### F21 [verified-in-docs]
ScrollTrigger:
- scrub: true 'Links the progress of the animation directly to the scrollbar'; a number is a catch-up time in seconds.
- Defaults: start 'top bottom' ('top top' when pinned), end 'bottom top'.
- onUpdate(self) exposes self.progress from 0 to 1.
- once: true kills the trigger after the end is reached once, without killing the animation, and sets toggleActions to 'play none none none'.
- It 'waits until there's a 200ms gap in resize events' before refreshing.
- Not in core: register it with gsap.registerPlugin(ScrollTrigger).
SRC: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
```
gsap.to(lens, { x: 1.4, ease: "none", onUpdate: draw,
  scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.35 } });
ScrollTrigger.create({ trigger: el, start: "top 80%", once: true, onEnter: () => countUp(el) });
```

### F22 [verified-in-docs]
ScrollTrigger mobile pitfalls:
- ignoreMobileResize ('added in version 3.10.0'; the docs do not state its default) is effectively TRUE on touch-only devices in 3.15. The source sets _ignoreMobileResize = Observer.isTouch === 1, where isTouch is 1 when '(hover: none), (pointer: coarse)' matches. A resize then skips refresh when the width is unchanged and the height changes by at most 25% of innerHeight.
- autoRefreshEvents defaults to 'visibilitychange,DOMContentLoaded,load,resize'.
- normalizeScroll() 'Forces scrolling to be done on the JavaScript thread' and is 'considered an experimental feature'. The docs describe it as a hybrid form of scroll-jacking, opt-in because 'it often isn't needed'. Known exception: 'the most recent version of iOS, only on phones in portrait orientation'. Do not use it here.
SRC: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config() ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll() ; node_modules/gsap/ScrollTrigger.js lines 397, 2038, 2175 ; Observer.js line 229
```
ScrollTrigger.config({ ignoreMobileResize: true }); // redundant on touch-only devices
```

### F23 [inferred]
Verdict: ScrollTrigger is not worth +18 KB gzip for one progress mapping and one 'once' trigger. A passive scroll listener with a cached hero top and height (kept current by ResizeObserver) plus quickTo smoothing reproduces scrub; IntersectionObserver replaces once:true at 0 KB. Re-tested on 390x844 touch: the lens swept across the letters with 0 layout-shift entries when the font was cached. Size the hero with svh or lvh, not dvh.
SRC: Playwright re-test plus the bundle measurements

### F24 [verified-in-docs]
SplitText 3.15 API (rewritten in 3.13: 'half the size, 14 new features'):
- SplitText.create(target, vars) exists in the types.
- Vars: type (default 'chars,words,lines'), charsClass/wordsClass/linesClass, mask, aria ('auto' | 'hidden' | 'none', default 'auto'), tag ('By default, SplitText wraps things in <div> elements'), propIndex, smartWrap, autoSplit (default false), onSplit, onRevert, ignore, prepareText, specialChars, wordDelimiter, deepSlice (default true), reduceWhiteSpace (default true).
- aria 'auto' sets aria-label = textContent.trim() on the split element and aria-hidden='true' on each generated element. The docs warn it 'will not honor the semantics or functionality of nested elements' and recommend aria:'hidden' plus a screen-reader-only duplicate.
- With any tag other than 'span', generated elements get inline position:relative and display:inline-block (block for lines).
- onSplit can return an animation; on re-split SplitText reverts it and carries over its totalTime.
SRC: https://gsap.com/docs/v3/Plugins/SplitText/ ; node_modules/gsap/SplitText.js lines 45-56, 204-213, 283-308 ; types/split-text.d.ts
```
const split = SplitText.create("h1", { type: "chars", aria: "auto", tag: "span" });
// split.chars, split.revert(), split.kill()
```

### F25 [verified-in-docs]
autoSplit and fonts: the docs say that with autoSplit: true SplitText will 'revert and re-split whenever the fonts finish loading' or the width changes. They also say it will 'console.warn() you if you try splitting before the fonts finish loading and you didn't set autoSplit: true'. The 3.15.0 source attaches the document.fonts 'loadingdone' listener and the ResizeObserver only when lines are split, and contains no such console.warn. For a chars-only split, autoSplit does nothing in practice. Build-time splitting in Astro is better here: no JS split, kerned fixed widths, controlled accessible markup, 3.2 KB gzip saved.
SRC: node_modules/gsap/SplitText.js line 283 (3.15.0) ; https://gsap.com/docs/v3/Plugins/SplitText/
```
_fonts && splitLines && autoSplit && _fonts.addEventListener("loadingdone", this._split);
```

### F26 [inferred]
Intl.NumberFormat('fr-BE') groups with U+202F NARROW NO-BREAK SPACE. In Node 24.16 (ICU 78.3, CLDR 48), 1700 gives code points 31 202f 37 30 30. The Google latin @font-face lists U+2000-206F in its unicode-range, but the file has no glyph for U+202F (fontkit hasGlyphForCodePoint false), so the browser draws it from the next font: at 100px, '1 700' measured 196.8px against 207.5px with U+00A0. The font has U+00A0 (0.203em), U+2009 (0.100em) and tnum. Write the replacement with explicit escapes, never pasted invisible characters.
SRC: node -e test (Node 24.16.0) ; fontkit cmap of the v9 latin woff2 ; Playwright measurement ; Google Fonts CSS unicode-range
```
const fmt = new Intl.NumberFormat("fr-BE");
const format = (n: number) => fmt.format(n).replace(/ /g, " ");
```

### F27 [inferred]
Counter (corrected):
- Animate a proxy object with snap:{v:1}, the documented SnapPlugin increment form.
- Start it with an IntersectionObserver and unobserve after the first hit.
- Reserve the final width with a hidden copy in the same grid cell, aligned to start, with tabular-nums.
- Fix: when motion is allowed, reset the visible value to 0 at init. Otherwise the server-rendered '1 700' is seen while partly visible, then jumps to 0 when the 60% threshold fires.
- No-JS and reduced motion keep the server-rendered final value.
SRC: https://gsap.com/docs/v3/GSAP/CorePlugins/Snap ('x snaps to the closest increment of 20') ; review reasoning on IO timing
```
---
// Counter.astro
const { value } = Astro.props;
const text = new Intl.NumberFormat("fr-BE").format(value).replace(/ /g, " ");
---
<span class="count" data-count-to={value}>
  <span class="count__ghost" aria-hidden="true">{text}</span>
  <span class="count__value" aria-hidden="true" data-count-value>{text}</span>
  <span class="sr-only">{text}</span>
</span>
<style>
  .count { display: inline-grid; font-variant-numeric: tabular-nums; }
  .count > * { grid-area: 1 / 1; text-align: start; }
  .count__ghost { visibility: hidden; }
</style>
<script>
  import { gsap } from "gsap";
  const fmt = new Intl.NumberFormat("fr-BE");
  const format = (n: number) => fmt.format(n).replace(/ /g, " ");
  const counters = document.querySelectorAll<HTMLElement>("[data-count-to]");
  if (counters.length && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const out = el.querySelector<HTMLElement>("[data-count-value]")!;
        const state = { v: 0 };
        gsap.to(state, { v: Number(el.dataset.countTo), duration: 1.6, ease: "power2.out",
          snap: { v: 1 }, onUpdate: () => { out.textContent = format(state.v); } });
      }
    }, { threshold: 0.6 });
    counters.forEach((el) => {
      el.querySelector<HTMLElement>("[data-count-value]")!.textContent = format(0); // FIX: no 1 700 -> 0 jump
      io.observe(el);
    });
  }
</script>
```

### F28 [verified-in-docs]
Astro processed <script> tags (no attributes other than src):
- TypeScript by default, imports bundled, type=module, deduplicated, inlined 'If the script is small enough'.
- Since Astro 5 they render where declared and are no longer hoisted to <head>; Astro 7 did not change scripts.
- is:inline opts out of processing.
- With <ClientRouter /> (still imported from astro:transitions), 'Bundled module scripts ... are only ever executed once'. Run initialisation on astro:page-load and call mm.revert() on astro:before-swap. Inline scripts re-run only with data-astro-rerun.
SRC: https://docs.astro.build/en/guides/client-side-scripts/ ; https://docs.astro.build/en/guides/upgrade-to/v5/ ; https://docs.astro.build/en/guides/upgrade-to/v7/ ; https://docs.astro.build/en/guides/view-transitions/
```
document.addEventListener("astro:page-load", init);
document.addEventListener("astro:before-swap", () => mm.revert());
```

### F29 [inferred]
Lighthouse mobile above 90: the core-only GSAP bundle (about 28 KB gzip, deferred module) has a negligible TBT impact. The real levers:
- LCP: never hide the h1; the thin start state still paints text.
- CLS: fixed em boxes, nowrap lines, a fixed line-height AND a metric-matched fallback font (without it, a late font swap records a small CLS).
- The 131.5 KB variable woff2: preload it with crossorigin, and consider subsetting or instancing.
SRC: Bundle and font measurements in this review; LCP/CLS reasoning
```
<link rel="preload" href="/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
```
// mirrors the <script> of HeroName.astro (import { gsap } from "gsap" replaced by the global for this test)
const gsap = window.gsap;
const REST = { w: 800, d: 100 }, MIN = { w: 200, d: 75 };
const snapW = gsap.utils.snap(10), snapD = gsap.utils.snap(2.5);
const strength = (dist, radius) => { const t = Math.max(0, 1 - dist / radius); return t * t * (3 - 2 * t); };

const root = document.querySelector("[data-hero-name]");
if (root) init(root);

function init(root) {
  const chars = Array.from(root.querySelectorAll(".char"));
  const html = document.documentElement;
  const fontReady = Promise.race([
    document.fonts.load('800 1em "Bricolage Grotesque"'),
    new Promise((r) => setTimeout(r, 2500)),
  ]);
  const mm = gsap.matchMedia();
  let introDone = Promise.resolve();

  // 1) intro wave
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (!html.classList.contains("hero-intro")) return; // failsafe fired or already played: stay at rest
    const tween = gsap.fromTo(chars,
      { "--wght": MIN.w, "--wdth": MIN.d },
      { "--wght": REST.w, "--wdth": REST.d, duration: 0.9, ease: "power2.inOut",
        snap: { "--wght": 10, "--wdth": 2.5 },
        stagger: (i, el) => Number(el.dataset.x) * 0.6, paused: true });
    html.classList.remove("hero-intro"); // fromTo already wrote the start values inline
    let finish;
    introDone = new Promise((resolve) => (finish = resolve));
    tween.eventCallback("onComplete", finish);
    fontReady.then(() => tween.play());
    return () => finish(); // intro reverted early: never leave the lens waiting
  });

  // 2) lens (pointer or scroll), re-created when the pointer type changes
  mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
    const { motion, fine } = ctx.conditions;
    if (!motion) return;
    let alive = true, stop = () => {};
    ctx.add("start", () => { stop = fine ? pointerLens(root, chars) : scrollLens(root, chars); });
    introDone.then(() => alive && ctx.start());
    return () => { alive = false; stop(); };
  });
  window.__mm = mm;
}

function pointerLens(root, chars) {
  const set = chars.map((el) => ({
    w: gsap.quickTo(el, "--wght", { duration: 0.45, ease: "power3", snap: { "--wght": 10 } }),
    d: gsap.quickTo(el, "--wdth", { duration: 0.45, ease: "power3", snap: { "--wdth": 2.5 } }),
    k: 0,
  }));
  let centers = [], fontPx = 16, px = -1e5, py = -1e5;
  const measure = () => {
    fontPx = parseFloat(getComputedStyle(root).fontSize);
    centers = chars.map((el) => ({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 }));
  };
  const ro = new ResizeObserver(measure); ro.observe(root); measure();
  const onMove = (e) => { if (e.pointerType !== "touch") { px = e.clientX; py = e.clientY; } };
  const onOut = (e) => { if (!e.relatedTarget) px = py = -1e5; };
  const tick = () => {
    const r = root.getBoundingClientRect(), R = fontPx * 1.4;
    centers.forEach((c, i) => {
      const k = Math.round(strength(Math.hypot(r.left + c.x - px, r.top + c.y - py), R) * 100) / 100;
      const s = set[i];
      if (k === s.k) return; // nothing changed for this letter: no style write
      s.k = k; s.w(REST.w - (REST.w - MIN.w) * k); s.d(REST.d - (REST.d - MIN.d) * k);
    });
  };
  addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("mouseout", onOut);
  gsap.ticker.add(tick, false, true); // prioritize: read layout before GSAP writes this frame
  return () => { removeEventListener("pointermove", onMove); document.removeEventListener("mouseout", onOut); gsap.ticker.remove(tick); ro.disconnect(); };
}

function scrollLens(root, chars) {
  const hero = root.closest("[data-hero]") || root;
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
  return () => { removeEventListener("scroll", onScroll); ro.disconnect(); lensTo.tween.kill(); chars.forEach((el) => { el.style.removeProperty("--wght"); el.style.removeProperty("--wdth"); }); };
}
window.__scrollLens = scrollLens;

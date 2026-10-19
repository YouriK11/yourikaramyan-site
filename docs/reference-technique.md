# Référence technique

Documentation vérifiée le 19/10/2026 : 4 sujets, chacun recherché par un agent puis contre-vérifié par un second (docs officielles, context7, builds de test).
Notes complètes avec sources et extraits de code : `docs/recherche/*.md`. Les chemins `scratchpad/...` cités dedans n'existent plus.
Prototype de l'effet d'accueil (lecture seule, ses fichiers gsap.js et bricolage.woff2 ne sont pas copiés) : `docs/recherche/prototype-accueil/`.

## Versions

| Paquet | Version | Remarque |
|---|---|---|
| astro | 7.4.1 | Node ≥ 22.22.0, versions impaires non supportées. Node local : 24.16. |
| gsap | 3.15.0 | Licence Webflow « Standard No Charge » : usage commercial gratuit, aucune attribution exigée. Tous les plugins sont dans le paquet npm. |
| @astrojs/sitemap | 3.7.4 | Fonctionne avec Astro 7. |
| sharp | 0.35.x | Dépendance optionnelle d'Astro. L'ajouter en dépendance directe dès que notre code l'importe (images de partage). |
| satori | 0.63.0 | Évolue très vite (56 versions en 17 jours). Épingler la version exacte, sans `^`. |

## Astro 7 : pièges vérifiés

- **`compressHTML: true`** (réglé). Le défaut d'Astro 7 (`'jsx'`) colle les mots aux balises en ligne quand un retour à la ligne les sépare : « développeur⏎<strong>web</strong> » devient « développeurweb ».
- **`trailingSlash: 'always'`** (réglé). Les pages sont construites en `/page/index.html` et Netlify sert `/page/`. Liens internes toujours avec la barre finale. Les fichiers générés avec extension (`/og/x.png`, `/robots.txt`) s'appellent sans barre finale.
- **Scripts** : un `<script>` sans attribut est du TypeScript, regroupé, chargé en `type="module"` (différé). Il s'affiche là où il est écrit : le mettre dans un composant ou dans la mise en page, jamais après la balise de fermeture de la mise en page. Un script qui doit s'exécuter tout de suite dans `<head>` prend `is:inline`.
- **Compilateur Rust** : HTML strict. Toute balise non vide doit être fermée, pas de `<div>` dans un `<p>`.
- Ne jamais créer `src/fetch.ts` (nom réservé en Astro 7).
- **Collections** : fichier `src/content.config.ts`, `import { z } from 'astro/zod'` (Zod 4), chargeur `glob({ pattern: '**/[^_]*.md', base: './src/content/entreprises' })`. Le motif exclut `_modele.md`. Noms de fichiers en ASCII, minuscules, tirets (`col-macarthur.md`) : le nom devient l'adresse. Trier `getCollection()` explicitement.
- **Routes** : `index.astro` et `404.astro` passent avant `[entreprise].astro`. Un fichier nommé `404.md` dans les entreprises créerait un conflit.
- **Page 404** : `noindex` et aucune balise canonical (sinon elle pointe vers `/404/`).
- **robots.txt** : le générer avec `src/pages/robots.txt.ts`. Pas de `public/robots.txt` (il prendrait le dessus en silence). Ne jamais bloquer les pages entreprises dans robots.txt : Google et LinkedIn doivent pouvoir les lire pour voir le `noindex` et l'aperçu.
- **Sitemap** : `filter()` reçoit l'URL complète avec barre finale. Construire un `Set` des URL à exclure à partir des noms de fichiers de `src/content/entreprises/` (voir `docs/recherche/astro-base.md`, F32).
- **Canonical** : `new URL(Astro.url.pathname, Astro.site)`. `site` doit rester défini dans la config.
- Pas de `<ClientRouter />` : inutile pour ce site, et il compliquerait l'initialisation de GSAP.
- **Vérification des types** : `npm install -D @astrojs/check typescript@^6` (TypeScript 7 est incompatible avec @astrojs/check). Dans les scripts : `querySelectorAll<HTMLElement>(...)`.

## Polices (étape 1)

- L'API Fonts d'Astro est stable : clé `fonts` au premier niveau de la config (`experimental.fonts` est refusé).
- **Bricolage Grotesque** : graisse 200-800 et largeur 75-100, taille optique figée à 96, sous-ensemble `latin` seulement. Fichier d'environ 79,5 Ko, `font-stretch: 75% 100%` généré.
  - Option A : `fontProviders.google()` avec `weights: ["200 800"]`, `styles: ["normal"]`, `subsets: ["latin"]`, `options: { experimental: { variableAxis: { opsz: ["96"], wdth: [["75","100"]] } } }`.
  - Option B (recommandée) : récupérer une fois ce fichier, le placer dans `src/assets/fonts/` et utiliser `fontProviders.local()` avec `weight: "200 800"`, `stretch: "75% 100%"`. Aucune option expérimentale, aucun accès réseau pendant la construction.
- **Instrument Sans** : `fontProviders.google()`, `weights: ["400 700"]`, `subsets: ["latin"]`. Environ 29,9 Ko. Précharger seulement le style normal : `<Font cssVariable="--font-body" preload={[{ style: "normal" }]} />`.
- **Sous-ensemble `latin` uniquement** : ajouter `latin-ext` fausse les métriques de la police de secours en 7.4.1. Le latin couvre tout le français sauf U+202F.
- **Espace fine insécable U+202F** : absente des deux polices. `Intl.NumberFormat('fr-BE')` en produit une (« 1 700 »). La remplacer par U+00A0 avec un échappement explicite : `.replace(/ /g, " ")`. Utiliser U+00A0 devant « : ; ! ? » et à l'intérieur des guillemets.
- Ne jamais écrire le nom de la police à la main : il est haché. Utiliser `var(--font-display)` et `var(--font-body)`.
- Avec la taille optique figée à 96, Bricolage garde son dessin d'affichage même en petit. Réserver Bricolage aux titres.
- À éviter : `fontProviders.npm()` (cassé en 7.4.1) et l'`index.css` des paquets @fontsource (graisse seule, la largeur ne marche pas).
- Android n'a pas Arial : envisager `fallbacks: ["system-ui"]`, à vérifier.

## Images

- Images dans `src/assets/`, importées, affichées avec `<Picture formats={["avif","webp"]} layout="constrained" ...>`. Les images de `public/` ne sont jamais optimisées.
- `priority` seulement sur l'image visible au chargement. Préciser `sizes` quand l'image est dans une colonne.
- Astro n'agrandit jamais une image. La source doit faire au moins 2 fois la largeur affichée. `sources/photo-cv.jpg` (640 × 768) : 320 px de large au maximum à l'écran.
- `image: { responsiveStyles: true }` dans la config si on ne gère pas ces styles nous-mêmes. Les attributs générés sont `data-astro-image`, `data-astro-image-fit`, `data-astro-image-pos` (la doc montre une ancienne syntaxe).
- Image de partage en PNG ou JPG, jamais en WebP.

## Effet signature (étape 2) : aucun décalage de mise en page

Condition de Youri : le nom ne pousse jamais le contenu en dessous. Le Cumulative Layout Shift (CLS) compte aussi le déplacement des lettres elles-mêmes, et les mouvements de souris ou le défilement ne sont pas des « interactions récentes » qui l'excusent.

- **Découpage à la construction** (pas de SplitText) : chaque lettre est un `inline-block` de largeur fixe en `em`, égale à son avance crénée dans l'état final (graisse 800, largeur 100, taille optique 96). Le glyphe est aligné au début de sa case (`text-align: start`). Largeurs mesurées sur le fichier Google v9 : Youri `0.506 0.567 0.557 0.400 0.234`, Karamyan `0.611 0.543 0.383 0.543 0.860 0.539 0.543 0.562`. **À recalculer si le fichier de police change.**
- Chaque mot sur sa propre ligne (`display: block`, `white-space: nowrap`), `line-height` sans unité, texte aligné à gauche, taille calculée pour la ligne la plus large.
- **Police de secours aux métriques alignées** (ascent 93 %, descent 27 %, line-gap 0 %), sinon l'arrivée tardive de la police décale les glyphes d'environ 10 px (CLS 0,001). Vérifier ce que génère l'API Fonts, et tester avec une police retardée.
- `@property --wght` et `--wdth` (valeurs initiales 800 et 100), `font-variation-settings: "opsz" 96, "wght" var(--wght, 800), "wdth" var(--wdth, 100)`.
- **Ne jamais masquer le titre** (`opacity: 0`, `visibility: hidden`) : ça retarde le LCP. L'état fin de départ vient d'un script `is:inline` dans `<head>` qui ajoute `html.hero-intro` uniquement si les animations sont permises, avec une sécurité de 4 s.
- Attendre la police avant d'animer (`document.fonts.load`, délai maximal 2,5 s) : la police de secours n'a pas d'axe de largeur.
- **GSAP core seul** (28 Ko gzip). Pas de ScrollTrigger (+18 Ko) : défilement passif + `gsap.quickTo`, et `IntersectionObserver` pour les compteurs.
- Arrondir les valeurs (graisse par pas de 10, largeur par pas de 2,5). Jamais de transition CSS sur ces variables. Ne pas animer la chaîne `fontVariationSettings`.
- `gsap.matchMedia()` : nettoyages idempotents (ils s'exécutent à chaque changement de condition). Les écritures de `quickSetter` ne sont pas annulées : retirer `--wght`/`--wdth` à la main. Résoudre la promesse de fin d'intro dans le nettoyage.
- Pointeur fin : `(hover: hover) and (pointer: fine)`, ignorer `pointerType === "touch"`.
- Hauteur de l'accueil en `svh` ou `lvh`, pas en `dvh`.
- Nom accessible : texte réservé aux lecteurs d'écran + lettres en `aria-hidden`.
- **Sens de la loupe, à trancher visuellement** : les cases sont réservées à l'état maximal (800/100). Pour tenir la promesse faite à Youri (« les lettres proches du curseur gonflent, les éloignées s'affinent »), les lettres éloignées s'affinent sous l'état maximal et laissent un petit espace à droite de leur glyphe. Doser l'amincissement pour que l'espacement reste beau.
- Implémentation de référence : `docs/recherche/gsap-effet-signature.md`, F13 à F15.

## Compteurs (étape 3)

Modèle `Counter.astro` dans `docs/recherche/gsap-effet-signature.md`, F27 :
- un double invisible réserve la largeur finale ;
- remise à 0 au démarrage si les animations sont permises (sinon on voit « 1 700 », puis 0, puis le comptage) ;
- `IntersectionObserver` ;
- espaces U+00A0.

## Images de partage (étape 6)

- satori 0.63.0 épinglé + sharp. Lire les polices avec des chemins relatifs à la racine du projet (`import.meta.url` pointe dans `dist/` et échoue). `boxSizing: 'border-box'` sur la racine, `display: 'flex'` sur chaque div à plusieurs enfants. Échapper `&` (Col&McArthur).
- LinkedIn : 1200 × 630, URL absolue en https, `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`. Rafraîchir avec le Post Inspector après chaque changement. Gmail n'affiche aucun aperçu : le texte de l'e-mail doit se suffire.

## Compteur de visites (étape 6)

- **GoatCounter** : gratuit pour un site personnel, sans cookies, hébergé en Finlande et en Allemagne, vues par page et par jour, sources des visites.
  - Code : `<script is:inline data-goatcounter="https://yourikaramyan.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`.
  - Exclure ses propres visites : ouvrir le site une fois avec `#toggle-goatcounter` dans chaque navigateur.
  - Les bloqueurs de publicité bloquent le script : les chiffres sont des minimums.
- L'autorité belge (APD) lit largement les règles sur le traçage. Ajouter une courte note de confidentialité qui nomme GoatCounter.
- Autres options moins adaptées : Cloudflare Web Analytics (données complètes 7 jours seulement), Umami Cloud (US/UE), Netlify Analytics (gratuit : 1 jour d'historique).

## Mise en ligne (étape 7)

- **Netlify** : aucun adaptateur. `netlify.toml` avec `command = "npm run build"` et `publish = "dist"`. Version de Node fixée par `.nvmrc` (24, déjà en place) : ne pas ajouter `NODE_VERSION` en plus.
- **Crédits du plan gratuit** : 300 crédits par mois, 15 par mise en production, 20 par Go de bande passante. Environ 20 mises en production par mois au maximum. Au-delà, tous les sites sont mis en pause. Regrouper les envois, travailler sur une branche (aperçus gratuits) ou ajouter `[skip netlify]` au message du dernier commit.
- **Visibilité** : les nouvelles équipes Netlify créent des projets privés par défaut. Passer le projet en public (Project configuration > General > Visitor access), sinon recruteurs et LinkedIn tombent sur une page de connexion.
- Dépôt GitHub privé sous le compte personnel de Youri (un dépôt d'organisation privé exige un plan payant).
- **En-têtes** : cache d'un an sur `/_astro/*`. `X-Robots-Tag: noindex` sur `/col-macarthur` et `/col-macarthur/*`, en plus de la balise `meta robots`. Vérifier avec `curl -sI`.
- **Domaine** : OVH .com à 7,99 € HT la 1re année puis 14,29 € HT par an. Combell 9,99 € puis 46,99 € HTVA par an. Chez OVH : `A @ 75.2.60.5` et `CNAME www <site>.netlify.app`, www en domaine principal, supprimer les enregistrements de parking. Désactiver DNSSEC avant de déléguer les serveurs DNS à Netlify.
- Si `www` devient le domaine principal, passer `site` à `https://www.yourikaramyan.com` dans `astro.config.mjs` : la canonical doit correspondre à l'adresse servie.

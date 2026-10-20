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
- **`trailingSlash: 'always'`** (réglé). Les pages sont construites en `/page/index.html` et servies en `/page/` (Vercel : `"trailingSlash": true`). Liens internes toujours avec la barre finale. Les fichiers générés avec extension (`/og/x.png`, `/robots.txt`) s'appellent sans barre finale.
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
  - Option B (**retenue, en place à l'étape 1**) : fichier `src/assets/fonts/bricolage-grotesque-latin-opsz96.woff2` (79 Ko, axes wght 200-800 et wdth 75-100, défauts 800/100) chargé par `fontProviders.local()` avec `weight: "200 800"`, `stretch: "75% 100%"`. Aucune option expérimentale, aucun accès réseau pendant la construction. Instrument Sans : `src/assets/fonts/instrument-sans-latin.woff2` (30 Ko). Licences OFL à côté.
  - Avec `fallbacks: ['system-ui']`, Astro génère des polices de secours ajustées pour BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue et Arial (vérifié dans `dist/index.html`).
- **Instrument Sans** : `fontProviders.google()`, `weights: ["400 700"]`, `subsets: ["latin"]`. Environ 29,9 Ko. Précharger seulement le style normal : `<Font cssVariable="--font-body" preload={[{ style: "normal" }]} />`.
- **Sous-ensemble `latin` uniquement** : ajouter `latin-ext` fausse les métriques de la police de secours en 7.4.1. Le latin couvre tout le français sauf U+202F.
- **Espace fine insécable U+202F** : absente des deux polices. `Intl.NumberFormat('fr-BE')` en produit une (« 1 700 »). La remplacer par U+00A0 avec un échappement explicite : `.replace(/ /g, " ")`. Utiliser U+00A0 devant « : ; ! ? » et à l'intérieur des guillemets.
- Ne jamais écrire le nom de la police à la main : il est haché. Utiliser `var(--font-display)` et `var(--font-body)`.
- Avec la taille optique figée à 96, Bricolage garde son dessin d'affichage même en petit. Réserver Bricolage aux titres.
- À éviter : `fontProviders.npm()` (cassé en 7.4.1) et l'`index.css` des paquets @fontsource (graisse seule, la largeur ne marche pas).
- Android n'a pas Arial : envisager `fallbacks: ["system-ui"]`, à vérifier.

## Fondations en place (étape 1)

- **Favicon** : monogramme YK tracé à partir de Bricolage (800/100), fond bleu nuit, trait abricot. Pour le refaire :
  1. `python scripts/favicon-svg.py <police.woff2> <dossier>` (fontTools et brotli requis) ;
  2. `node scripts/favicon-png.mjs <dossier>` ;
  3. `favicon.ico` (16/32/48) avec Pillow ;
  4. copier les fichiers dans `public/`.
- **Menu mobile** : panneau plein écran en `popover` natif (s'ouvre sans JS). Le script ajoute :
  - la fermeture au clic sur un lien ;
  - `inert` sur la page derrière pendant l'ouverture (posé au `toggle` ouvert, retiré au `beforetoggle` fermé, pour que le focus revienne sur « Menu ») ;
  - la fermeture quand la largeur passe en mode ordinateur.
  - Sans prise en charge du Popover API, le panneau et son bouton restent masqués.
- **Ancres** : `<body id="haut">` pour « Haut de page ». `#top` laisse le focus sur le lien du pied de page dans Firefox et Safari.
- **Pied de page** collé en bas des pages courtes : `body` en flex colonne, `main { flex: 1 0 auto }`.
- **`SITE.enConstruction`** (`src/data/site.ts`) met toutes les pages en `noindex`. À passer à false à l'étape 7, seulement quand le CV corrigé (sans Google Play) est en place.

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

### Ce qui est en place (étape 2, `src/components/Accueil.astro`)

- **Largeurs des cases** mesurées sur notre fichier (identiques au fichier Google v9). Mesure correcte : début de la lettre suivante moins début de la lettre, dans le mot crénelé, avec une `Range` par caractère. La différence de largeur des préfixes attribue le crénage à la mauvaise lettre.
- **Animation des axes** par `font-weight: var(--wght)` et `font-stretch: calc(var(--wdth) * 1%)` (pas de `font-variation-settings`). La police de secours reçoit ainsi une graisse sensée.
- **Attente de la police** : `document.fonts.load()` uniquement sur la **première** famille de la liste calculée, avec `.catch()`. La liste contient des polices locales absentes (BlinkMacSystemFont sur Windows) qui font rejeter la promesse. Bug réel trouvé en test : sans ce correctif, l'intro ne démarrait jamais.
- **Aucun espace dans les cases des lettres** : écrire chaque `<span class="lettre">` sur une seule ligne.
- **Valeurs** : départ 200/75, repos 800/100, lettres éloignées de la loupe 560/88. Vague 0,9 s avec décalage `x × 0,6`. Trait abricot 1,5 s. Fondu de la photo et des boutons à 0,45 s.
- **Paliers** : la vague d'entrée avance par pas de 20 (graisse) et 5 (largeur), la loupe par pas de 10 et 2,5. Chaque nouvelle paire crée une instance de police. Avec les pas fins pendant la vague, Lighthouse mesurait jusqu'à 300 ms de blocage (score 92). Avec les pas larges : 99 sur 4 mesures, blocage de 3 à 13 ms.
- **Visibles dès le premier affichage** : la phrase de présentation et la ligne de preuve MonArc. Ce sont les plus grands textes sur téléphone ; les cacher retardait le LCP à 1,9 s. Seuls la photo et les boutons arrivent en fondu.
- **Photo** : deux recadrages (`youri-visage.jpg` carré pour téléphone, `youri-portrait.jpg` 4:5 pour ordinateur), tous deux en `loading="lazy"` : celui qui est masqué n'est jamais téléchargé. Le bloc abricot décalé est dessiné dans le cadre (padding) pour ne pas dépasser la colonne.
- **Délais** : l'attente de la police se compte depuis l'ouverture de la page (2,5 s au maximum). Si le script lui-même arrive après 3 s, l'entrée est sautée et l'état final s'affiche.
- **Loupe souris** : une seule image demandée (`requestAnimationFrame`) quand la souris bouge, défile ou que la taille change. Pas d'écouteur permanent sur `gsap.ticker`, sinon GSAP ne s'endort jamais.
- **Écrans bas** (min-width 64em et max-height 52em) : le nom rétrécit pour garder les boutons et la ligne de preuve au-dessus de la ligne de flottaison.
- **Mesures** (build de production, 19/10/2026) :
  - CLS 0 pour le nom, police d'affichage retardée de 1,2 s comprise, et pendant la souris et le défilement ;
  - compromis accepté : si la police du texte (Instrument Sans) arrive tard, la phrase de présentation peut changer de coupure de ligne à certaines largeurs. CLS mesuré : environ 0 à 360, 390, 393, 412 et 430 px ; 0,016 à 375 px ; jusqu'à 0,09 à 405 ou 465 px. Tout reste sous le seuil de 0,1. La seule parade (`display: 'optional'`) ferait perdre la police du texte à la plupart des premiers visiteurs sur mobile ;
  - Lighthouse mobile : performance 94 à 99, accessibilité 100, bonnes pratiques 100 ;
  - aucun débordement de 360 à 1920 px.
- **Tests** : `page.clock.install()` de Playwright permet de photographier la vague à des instants précis. Contexte `isMobile: true, hasTouch: true` pour la loupe au défilement.

## Étude de cas et compteurs (étape 3)

- **Compteurs** (`src/components/Compteur.astro`) :
  - un double invisible réserve la largeur finale ;
  - remise à 0 au démarrage si les animations sont permises ;
  - `IntersectionObserver`, puis une boucle `requestAnimationFrame` de 1,6 s ;
  - pas de GSAP, pour que GSAP reste dans le seul paquet de l'accueil.
- **Ne jamais utiliser `Intl.NumberFormat` au chargement** : sa première création charge les données de langue. Mesuré : environ 110 ms de blocage (442 ms avec le processeur ralenti 4 fois), soit une tâche longue de plus pour Lighthouse. Utiliser `formaterNombre()` de `src/data/nombres.ts`.
- **Typographie** : `typo()` de `src/data/typographie.ts` (avec `set:html`, chaînes écrites dans `src/` uniquement) rend les mots à trait d'union insécables et met « 1er » en exposant. Les polices n'ont pas de U+2011 (trait d'union insécable).
- **CSS intégré** : `build.inlineStylesheets: 'always'`. Le CSS fait quelques Ko, et un second fichier CSS bloquant retardait le premier affichage.
- **`content-visibility: auto` : retiré partout (étape 4)**. Vérifié avec l'arbre d'accessibilité de Chrome (CDP `Accessibility.getFullAXTree`) : les sections pas encore affichées en sortent, donc un lecteur d'écran ne trouve pas Parcours, Compétences ni Contact au chargement. Sans lui, Lighthouse mobile reste à 98 (médiane A/B) et l'accessibilité à 100. Ne pas le remettre.
- **Carrousel des captures** : les images `lazy` cachées à droite ne se chargent qu'au glissement. Un petit script les passe en `eager` quand la rangée approche de l'écran.
- **Captures floutées** : flou fort (pixellisation puis flou gaussien) sur les photos de profil et les prénoms des autres participants, avec Pillow, à partir de `sources/monarc/`. Résultat dans `src/assets/monarc/`. Les grades, les points et l'habitude restent lisibles.
- **Badge App Store** : non utilisé. La licence d'Apple est réservée au titulaire du compte développeur. Boutons texte à la place.
- **Mesurer Lighthouse en A/B alterné** (ancienne version, nouvelle version, et ainsi de suite) : la charge de la machine fait varier un même build de 86 à 99. Résultat de l'étape 3 : médiane 99, blocage médian 43 ms, LCP 1,95 s.

## Pages entreprises (étape 5)

- **Nom du fichier = adresse** : `generateId` du chargeur `glob` (`src/content.config.ts`) refuse tout nom qui n'est pas en minuscules sans accent, chiffres et tirets, ainsi que `404` et `accueil` (déjà pris). Sans ce contrôle, Astro transforme le nom en silence (« Atelier Dubois » devient `atelier-dubois`).
- **Plan du site** : filtre en liste blanche, l'accueil seulement (`new URL(page).pathname === '/'`). Aucun risque d'y voir une page entreprise, quel que soit le nom du fichier.
- **Titre** : « Bonjour à l'équipe de/d' + nom », élision automatique devant une voyelle. Champ facultatif `salutation` pour les autres cas (article, « h »).
- **Garde-fous** testés dans une copie du projet : nom de fichier invalide, « [À COMPLÉTER » oublié et nombre d'idées différent de 3 arrêtent la construction avec un message en français.

## Images de partage (étape 6)

- Champ facultatif `apercu` (40 signes au maximum) dans un fichier entreprise : la ligne sous le nom sur l'image. Par défaut : « Trois idées pour votre e-commerce ». `flexShrink: 0` sur chaque bloc, et un nom de plus de 18 signes passe en 40 px, pour qu'un nom long ne tasse pas le trait abricot.
- satori 0.63.0 épinglé + sharp. Lire les polices avec des chemins relatifs à la racine du projet (`import.meta.url` pointe dans `dist/` et échoue). `boxSizing: 'border-box'` sur la racine, `display: 'flex'` sur chaque div à plusieurs enfants. Échapper `&` (Col&McArthur).
- LinkedIn : 1200 × 630, URL absolue en https, `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`. Rafraîchir avec le Post Inspector après chaque changement. Gmail n'affiche aucun aperçu : le texte de l'e-mail doit se suffire.

## Finitions (étape 6)

- **Un seul effet signature** : le nom de l'accueil. Ailleurs, seulement des détails discrets, coupés par `prefers-reduced-motion` : soulignement des liens, flèche de téléchargement au survol, trait du menu dessiné au survol (fond en `background-size`, rien ne bouge), téléphones soulevés de 6 px au survol.
- **Survol réservé à la souris** : `@media (hover: hover)` autour de chaque `:hover` qui change l'aspect. Sinon, sur téléphone et tablette, l'état reste collé après un appui (lien de téléchargement, menu). Le soulèvement des téléphones ne s'applique qu'à partir de 64em : en dessous, la rangée défilante coupe ce qui dépasse.
- **Défilement doux après le chargement seulement** : `scroll-behavior: smooth` est posé sur `html.defilement-doux`, classe ajoutée au `load` par `Base.astro`. Sans cela, un lien `/#contact` depuis une autre page fait défiler tout l'accueil (1,4 s) et déclenche tous les traits de titres en route.
- **Trait abricot des titres de section** : il se dessine une fois quand le titre entre à l'écran. `html.titres-anim` est posé avant le premier affichage par un script en ligne dans `Base.astro`, puis retiré au bout de 4 s si le script principal ne tourne pas : le trait n'est jamais perdu. Animation en `transform` seulement : aucun décalage de mise en page.
- **Transitions entre pages** : `@view-transition { navigation: auto; }`, fondu de 0,2 s, l'en-tête reste en place. Sans effet dans les navigateurs qui ne le gèrent pas.
- **Attribut `hidden`** : `[hidden] { display: none !important; }` dans `global.css`, sinon `.bouton { display: inline-flex }` l'emporte et un bouton caché reste visible.
- **Impression** : en-tête, menu et boutons masqués (les navigateurs n'impriment pas les couleurs de fond par défaut, un bouton bleu nuit deviendrait un cadre vide). Fonds retirés, texte en noir, `--brume-sur-nuit` remplacé par `--ardoise`, compteurs à leur valeur finale, nom de l'accueil forcé à son état final (`--wght: 800`, `--wdth: 100` en `!important`, plus fort que les styles posés par GSAP). Repères de la frise, puces et traits abricot gardés avec `print-color-adjust: exact`. Les quatre captures MonArc côte à côte (plus de rangée défilante), un téléphone jamais coupé entre deux pages, années de la frise en `position: static`.
- **Captures pleine page** : Chrome ne dépasse pas environ 16 384 pixels de haut. À 390 px en ×2, l'accueil (9 500 px) dépasse : la capture repart du haut de la page. Faire deux captures avec `clip`.
- **Page 404** : « 404 » décoratif en `::before { content: '404' / ''; }` (texte alternatif vide : ignoré par les lecteurs d'écran et par le contrôle de contraste d'axe).
- **Outil d'édition** : les outils Edit et Write de Claude transforment l'échappement ` ` en vrai caractère U+00A0. C'est accepté : le caractère est le bon.

## Compteur de visites (étape 6)

- **GoatCounter** : gratuit pour un site personnel, sans cookies, hébergé en Finlande et en Allemagne, vues par page et par jour, sources des visites.
  - Code : `<script is:inline data-goatcounter="https://yourikaramyan.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`.
  - Exclure ses propres visites : ouvrir le site une fois avec `#toggle-goatcounter` dans chaque navigateur.
  - Les bloqueurs de publicité bloquent le script : les chiffres sont des minimums.
- L'autorité belge (APD) lit largement les règles sur le traçage. Ajouter une courte note de confidentialité qui nomme GoatCounter.
- Autres options moins adaptées : Vercel Web Analytics (1 mois d'historique, région non documentée), Cloudflare Web Analytics (données complètes 7 jours seulement), Umami Cloud (US/UE).

## Mise en ligne (étape 7) : Vercel

Netlify a été écarté (environ 20 mises en ligne par mois sur le plan gratuit). Notes complètes : `docs/recherche/vercel.md`. Les notes Netlify (`docs/recherche/netlify-analytics-og.md`) restent valables pour GoatCounter, les images de partage et LinkedIn.

- **Plan Hobby** (gratuit) : usage personnel et non commercial uniquement. Pas d'offre payante, de prix, de publicité ni de lien d'affiliation sur le site.
- **Limites Hobby** :
  - 100 mises en ligne par jour, 100 par heure, 60 par 5 minutes ; une construction à la fois.
  - Par mois : 100 Go de transfert, 1 million de requêtes.
  - Hobby n'achète jamais de dépassement : au-delà, les fonctions s'arrêtent et un projet en pause se relance à la main.
  - Regrouper plusieurs pages entreprises dans un même envoi.
- **Construction** : Astro est détecté tout seul (sortie `dist`, aucun adaptateur pour un site statique, ne pas ajouter @astrojs/vercel). Le préréglage Astro met déjà un cache d'un an sur `/_astro/*`.
- **Node** : Vercel ignore `.nvmrc`. Il lit `"engines": { "node": "24.x" }` dans `package.json` (réglé). `.nvmrc` sert seulement en local.
- **Dépôt privé sur Hobby** : Vercel ne publie que les commits dont l'auteur est le propriétaire du compte (compte GitHub `YouriK11`). Les premiers commits sont signés `youri.karamyan@student.hepl.be`.
  - Avant le premier envoi, soit faire vérifier cette adresse sur GitHub, soit configurer `git config user.email "266993000+YouriK11@users.noreply.github.com"`.
  - Effet des lignes `Co-Authored-By` inconnu : surveiller la première mise en ligne.
- **Compte Vercel** : s'inscrire avec « Continue with GitHub » (YouriK11), et donner à l'application GitHub de Vercel l'accès au dépôt privé.
- **vercel.json** : `"trailingSlash": true` (redirection 308 de `/x` vers `/x/`, cohérent avec Astro). Laisser `cleanUrls` à false. Pas de `rewrites` avec Astro. Un seul fichier entre `vercel.json` et `vercel.ts`.
- **noindex des pages entreprises** :
  - balise `meta robots` dans la mise en page entreprise ;
  - exclusion du sitemap ;
  - en option, en-tête `X-Robots-Tag` généré par `vercel.ts` à partir de la liste des entreprises, pour ne jamais éditer de fichier à la main.
  - Les motifs `source` sont stricts et sensibles à la casse : écrire `/col-macarthur/`. Pas de point dans un nom d'entreprise.
- **Protection des déploiements** : les adresses d'aperçu (`*-git-*.vercel.app`, `*-<hash>-*.vercel.app`) exigent une connexion Vercel. Ne partager que le domaine (ou `<projet>.vercel.app`). LinkedInBot fait partie des robots reconnus par Vercel.
- **CLI** : elle ignore `.gitignore`. `.vercelignore` (en place) exclut `sources/`. Préférer les envois par Git. Ne jamais lancer `vercel --public`.
- **Domaine acheté sur Vercel** :
  - .com à 11,25 $ par an hors TVA, facturé en dollars ;
  - renouvellement automatique 30 jours avant l'échéance, confidentialité WHOIS incluse ;
  - DNS et HTTPS configurés par Vercel, aucune boîte e-mail fournie ;
  - utiliser l'e-mail du compte pour le titulaire et confirmer l'e-mail de vérification ICANN.
  - **Domaine principal** : choisir `yourikaramyan.com` (sans www) comme Production et rediriger `www` vers lui, pour correspondre à `site` dans `astro.config.mjs`.
- **Avant la mise en ligne du domaine** : `site` pointe vers un domaine inexistant, donc les aperçus LinkedIn n'auront pas d'image. Ne partager aucun lien entreprise avant que le domaine fonctionne. Après correction, rafraîchir avec le LinkedIn Post Inspector.
- **Vercel Web Analytics** (Hobby) : 50 000 événements par mois, 1 mois d'historique garanti, région de stockage non documentée. GoatCounter reste le choix recommandé (UE, sans cookies, historique long).
